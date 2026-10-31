/* ==========================================================
   SYNC AI - LOGIN JAVASCRIPT
   Single Profile Flow: Redirects directly to Dashboard
   if profile already completed. NEVER asks to recreate profile!
   ========================================================== */

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");
    const rememberMeCheckbox = document.getElementById("rememberMe");
    const createAccountBtn = document.getElementById("createAccountBtn");
    const forgotPassword = document.getElementById("forgotPassword");

    // Remembered email check
    const savedEmail = localStorage.getItem("syncAI_rememberedEmail");
    if (savedEmail && emailInput) {
        emailInput.value = savedEmail;
        if (rememberMeCheckbox) rememberMeCheckbox.checked = true;
    }

    // PASSWORD SHOW / HIDE
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener("click", function () {
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                togglePassword.textContent = "Hide";
                togglePassword.setAttribute("aria-label", "Hide password");
            } else {
                passwordInput.type = "password";
                togglePassword.textContent = "Show";
                togglePassword.setAttribute("aria-label", "Show password");
            }
        });
    }

    // LOGIN FORM SUBMISSION
    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            const rememberMe = rememberMeCheckbox ? rememberMeCheckbox.checked : false;

            if (!email) {
                alert("Please enter your college email.");
                emailInput.focus();
                return;
            }

            if (!password) {
                alert("Please enter your password.");
                passwordInput.focus();
                return;
            }

            // Disable submit button temporarily
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn ? submitBtn.textContent : "Sign In";
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = "Signing In...";
            }

            try {
                // Call backend API
                let result = null;
                if (window.syncApi && window.syncApi.auth) {
                    try {
                        result = await window.syncApi.auth.login({ email, password });
                    } catch (apiErr) {
                        console.warn("Backend auth failed, checking local session:", apiErr.message);
                    }
                }

                // If backend returned success
                if (result && result.success) {
                    const user = result.user;

                    // Save session state
                    localStorage.setItem("syncAI_loggedIn", "true");
                    localStorage.setItem("syncAI_email", user.collegeEmail || email);
                    localStorage.setItem("syncAI_student", JSON.stringify(user));

                    if (rememberMe) {
                        localStorage.setItem("syncAI_rememberedEmail", email);
                    } else {
                        localStorage.removeItem("syncAI_rememberedEmail");
                    }

                    // SINGLE PROFILE CHECK:
                    // If user profile is already completed in backend / user record:
                    if (user.profileCompleted || result.profileCompleted) {
                        localStorage.setItem("syncAI_profileCompleted", "true");
                        localStorage.setItem("syncAI_emailVerified", "true");
                        localStorage.setItem("syncAI_assessmentCompleted", "true");

                        // GO DIRECTLY TO DASHBOARD - ONE TIME PROFILE CREATED!
                        window.location.href = "dashboard.html";
                        return;
                    }

                    // If profile is not yet completed, advance to their exact pending onboarding step
                    if (result.nextPage) {
                        window.location.href = result.nextPage;
                        return;
                    }
                }

                // Fallback check against localStorage prototype data
                const storedStudentStr = localStorage.getItem("syncAI_student");
                if (storedStudentStr) {
                    const localStudent = JSON.parse(storedStudentStr);
                    const localEmail = (localStudent.collegeEmail || localStudent.email || "").toLowerCase();

                    if (localEmail === email.toLowerCase()) {
                        localStorage.setItem("syncAI_loggedIn", "true");
                        localStorage.setItem("syncAI_email", email);

                        // If user has already completed profile, go straight to dashboard
                        if (
                            localStudent.profileCompleted ||
                            localStorage.getItem("syncAI_profileCompleted") === "true"
                        ) {
                            localStorage.setItem("syncAI_profileCompleted", "true");
                            window.location.href = "dashboard.html";
                            return;
                        }

                        // Otherwise continue setup
                        if (!localStudent.emailVerified) {
                            window.location.href = "otp.html";
                        } else if (!localStudent.assessmentCompleted) {
                            window.location.href = "assessment-intro.html";
                        } else {
                            window.location.href = "profile-setup.html";
                        }
                        return;
                    }
                }

                // If no matching account
                alert(result?.message || "Invalid college email or password. Please try again or create an account.");

            } catch (error) {
                console.error("Login Error:", error);
                alert("Login failed: " + (error.message || "Unknown error"));
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                }
            }
        });
    }

    // CREATE ACCOUNT BUTTON
    if (createAccountBtn) {
        createAccountBtn.addEventListener("click", function () {
            window.location.href = "signup.html";
        });
    }

    // FORGOT PASSWORD
    if (forgotPassword) {
        forgotPassword.addEventListener("click", function (event) {
            event.preventDefault();
            alert("A password reset link will be sent to your college email upon request.");
        });
    }
});