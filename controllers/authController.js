const dbStore = require("../data/dbStore");

// Helper to determine next navigation page
const getNextPageForUser = (user) => {
    if (!user.emailVerified) {
        return "otp.html";
    }
    if (!user.assessmentCompleted) {
        return "assessment-intro.html";
    }
    if (!user.profileCompleted) {
        return "profile-setup.html";
    }
    return "dashboard.html";
};

// SIGNUP
exports.signup = async (req, res) => {
    try {
        const {
            fullName,
            username,
            college,
            collegeEmail,
            password,
            region,
            state,
            district,
            preferredDomains
        } = req.body;

        if (!collegeEmail || !password || !fullName) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all required fields (Full name, College Email, Password)."
            });
        }

        const normalizedEmail = collegeEmail.toLowerCase().trim();

        // Check if user already exists
        const existingUser = await dbStore.users.findOne({ collegeEmail: normalizedEmail });

        if (existingUser) {
            // If already exists and profile completed
            if (existingUser.profileCompleted) {
                return res.status(400).json({
                    success: false,
                    alreadyCompleted: true,
                    message: "An account with this college email already exists. Please sign in directly.",
                    nextPage: "login.html"
                });
            } else {
                // If exists but did not complete setup, resume their setup
                const nextPage = getNextPageForUser(existingUser);
                return res.status(200).json({
                    success: true,
                    message: "Resuming your existing registration.",
                    user: existingUser,
                    nextPage
                });
            }
        }

        // Create new user (OTP defaults to 123456 for demo or random 6 digits)
        const demoOtp = "123456";

        const newUser = await dbStore.users.create({
            fullName: fullName.trim(),
            username: username ? username.trim() : fullName.toLowerCase().replace(/\s+/g, ""),
            college: college ? college.trim() : "",
            collegeEmail: normalizedEmail,
            password: password, // For prototype demo
            region: region || "",
            state: state || "",
            district: district || "",
            preferredDomains: Array.isArray(preferredDomains) ? preferredDomains : [],
            emailVerified: false,
            otpCode: demoOtp,
            otpExpires: new Date(Date.now() + 10 * 60 * 1000), // 10 mins
            assessmentCompleted: false,
            verifiedSkillScore: 0,
            profileCompleted: false,
            growthScore: 75,
            learningStreak: 1,
            xpPoints: 100
        });

        res.status(201).json({
            success: true,
            message: "Account created successfully! Verification OTP sent.",
            user: {
                _id: newUser._id,
                fullName: newUser.fullName,
                collegeEmail: newUser.collegeEmail,
                college: newUser.college,
                emailVerified: false,
                profileCompleted: false,
                nextPage: "otp.html"
            },
            demoOtp: demoOtp,
            nextPage: "otp.html"
        });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({
            success: false,
            message: "Server error during registration. " + error.message
        });
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide both college email and password."
            });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const user = await dbStore.users.findOne({ collegeEmail: normalizedEmail });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "No account found with this college email. Please create an account first."
            });
        }

        // Verify password
        if (user.password !== password) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password. Please try again."
            });
        }

        // Determine destination:
        // IF PROFILE IS ALREADY COMPLETED: go directly to dashboard.html! NEVER create profile again!
        const nextPage = getNextPageForUser(user);

        res.status(200).json({
            success: true,
            message: user.profileCompleted
                ? "Welcome back to SYNC AI!"
                : "Welcome back! Please complete your pending onboarding step.",
            user: {
                _id: user._id,
                fullName: user.fullName,
                name: user.fullName,
                username: user.username,
                college: user.college,
                collegeName: user.profile?.collegeName || user.college,
                collegeEmail: user.collegeEmail,
                email: user.collegeEmail,
                region: user.region || user.profile?.region,
                state: user.state || user.profile?.state,
                district: user.district || user.profile?.district,
                currentCity: user.profile?.city || user.district,
                preferredDomains: user.preferredDomains || user.profile?.domains || [],
                emailVerified: user.emailVerified,
                assessmentCompleted: user.assessmentCompleted,
                verifiedSkillScore: user.verifiedSkillScore || user.assessmentResult?.overallScore || 0,
                growthScore: user.growthScore || 75,
                learningStreak: user.learningStreak || 7,
                xpPoints: user.xpPoints || 450,
                profileCompleted: !!user.profileCompleted,
                profileCompletedAt: user.profileCompletedAt,
                profile: user.profile || {}
            },
            profileCompleted: !!user.profileCompleted,
            nextPage: nextPage
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Server error during login."
        });
    }
};

// VERIFY OTP
exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP code are required."
            });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const user = await dbStore.users.findOne({ collegeEmail: normalizedEmail });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        // Accept demo OTP 123456 or stored code
        const isMatch = otp === "123456" || otp === user.otpCode;

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP code. Please enter the 6-digit code or demo OTP 123456."
            });
        }

        // Update user
        const updated = await dbStore.users.updateOne(
            { collegeEmail: normalizedEmail },
            {
                emailVerified: true
            }
        );

        res.status(200).json({
            success: true,
            message: "College email verified successfully!",
            user: {
                fullName: updated.fullName,
                collegeEmail: updated.collegeEmail,
                emailVerified: true,
                assessmentCompleted: updated.assessmentCompleted,
                profileCompleted: updated.profileCompleted
            },
            nextPage: updated.assessmentCompleted ? (updated.profileCompleted ? "dashboard.html" : "profile-setup.html") : "assessment-intro.html"
        });

    } catch (error) {
        console.error("Verify OTP error:", error);
        res.status(500).json({
            success: false,
            message: "Server error verifying OTP."
        });
    }
};

// RESEND OTP
exports.resendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required." });
        }

        const demoOtp = "123456";
        await dbStore.users.updateOne(
            { collegeEmail: email.toLowerCase().trim() },
            { otpCode: demoOtp, otpExpires: new Date(Date.now() + 10 * 60 * 1000) }
        );

        res.status(200).json({
            success: true,
            message: "New verification code sent to your college email.",
            demoOtp: demoOtp
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET ME
exports.getMe = async (req, res) => {
    try {
        const email = req.query.email || req.headers["x-user-email"];
        if (!email) {
            return res.status(400).json({ success: false, message: "Email parameter required." });
        }

        const user = await dbStore.users.findOne({ collegeEmail: email.toLowerCase().trim() });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
