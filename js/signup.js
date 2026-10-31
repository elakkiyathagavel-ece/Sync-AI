/* ==========================================================
   SYNC AI - CREATE ACCOUNT JAVASCRIPT
   Single Profile Flow & Real Backend Integration
   ========================================================== */

document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
    const regionSelect = document.getElementById("region");
    const stateSelect = document.getElementById("state");
    const districtSelect = document.getElementById("district");

    /* STATE DATA */
    const states = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
        "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
        "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
        "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
        "Uttar Pradesh", "Uttarakhand", "West Bengal"
    ];

    /* DISTRICT DATA */
    const districts = {
        "Tamil Nadu": [
            "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore",
            "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram",
            "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai",
            "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai",
            "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi",
            "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli",
            "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur",
            "Vellore", "Viluppuram", "Virudhunagar"
        ],
        "Kerala": [
            "Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod",
            "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad",
            "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"
        ],
        "Karnataka": [
            "Bengaluru Urban", "Mysuru", "Mangaluru", "Belagavi", "Dharwad",
            "Hubballi", "Shivamogga", "Tumakuru", "Udupi", "Ballari"
        ],
        "Andhra Pradesh": [
            "Anakapalli", "Anantapur", "Chittoor", "East Godavari", "Guntur",
            "Kakinada", "Krishna", "Kurnool", "Nellore", "Prakasam",
            "Tirupati", "Visakhapatnam", "Vizianagaram", "West Godavari"
        ],
        "Telangana": [
            "Adilabad", "Hyderabad", "Karimnagar", "Khammam", "Medak",
            "Nalgonda", "Nizamabad", "Rangareddy", "Warangal"
        ],
        "Maharashtra": [
            "Ahmednagar", "Aurangabad", "Mumbai City", "Mumbai Suburban",
            "Nagpur", "Nashik", "Pune", "Satara", "Solapur", "Thane"
        ],
        "Gujarat": [
            "Ahmedabad", "Anand", "Bhavnagar", "Gandhinagar", "Jamnagar",
            "Rajkot", "Surat", "Vadodara", "Valsad"
        ],
        "West Bengal": [
            "Bankura", "Bardhaman", "Darjeeling", "Hooghly", "Howrah",
            "Jalpaiguri", "Kolkata", "Malda", "Murshidabad", "Nadia",
            "North 24 Parganas", "South 24 Parganas"
        ]
    };

    /* LOAD STATES */
    function loadStates() {
        if (!stateSelect) return;
        stateSelect.innerHTML = `<option value="">Select state</option>`;
        states.forEach(function (state) {
            const option = document.createElement("option");
            option.value = state;
            option.textContent = state;
            stateSelect.appendChild(option);
        });
    }

    loadStates();

    /* STATE CHANGE */
    if (stateSelect && districtSelect) {
        stateSelect.addEventListener("change", function () {
            const selectedState = stateSelect.value;
            districtSelect.innerHTML = `<option value="">Select district</option>`;
            districtSelect.disabled = selectedState === "";

            if (selectedState !== "" && districts[selectedState]) {
                districts[selectedState].forEach(function (district) {
                    const option = document.createElement("option");
                    option.value = district;
                    option.textContent = district;
                    districtSelect.appendChild(option);
                });
            } else if (selectedState !== "") {
                const option = document.createElement("option");
                option.value = "Other";
                option.textContent = "Other / Not listed";
                districtSelect.appendChild(option);
            }
        });
    }

    /* FORM SUBMIT */
    if (signupForm) {
        signupForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const fullName = document.getElementById("fullName").value.trim();
            const username = document.getElementById("username").value.trim();
            const college = document.getElementById("college").value.trim();
            const collegeEmail = document.getElementById("collegeEmail").value.trim();
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;
            const region = regionSelect ? regionSelect.value : "";
            const state = stateSelect ? stateSelect.value : "";
            const district = districtSelect ? districtSelect.value : "";

            /* VALIDATION */
            if (!fullName || !username || !college || !collegeEmail) {
                alert("Please complete all required account details.");
                return;
            }

            if (password.length < 6) {
                alert("Password must contain at least 6 characters.");
                return;
            }

            if (password !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }

            if (!region || !state || !district) {
                alert("Please select your region, state and district.");
                return;
            }

            /* DOMAINS */
            const selectedDomains = Array.from(
                document.querySelectorAll('input[name="domain"]:checked')
            ).map(cb => cb.value);

            if (selectedDomains.length === 0) {
                alert("Please select at least one preferred domain.");
                return;
            }

            const studentData = {
                fullName: fullName,
                name: fullName,
                username: username,
                college: college,
                collegeName: college,
                collegeEmail: collegeEmail,
                email: collegeEmail,
                password: password,
                region: region,
                state: state,
                district: district,
                preferredDomains: selectedDomains,
                accountCreated: true,
                emailVerified: false,
                assessmentCompleted: false,
                profileCompleted: false,
                createdAt: new Date().toISOString()
            };

            const submitBtn = signupForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = "Creating Account...";
            }

            try {
                // Call backend API
                if (window.syncApi && window.syncApi.auth) {
                    try {
                        const result = await window.syncApi.auth.signup(studentData);
                        if (result && result.alreadyCompleted) {
                            alert("An account with this college email already exists with a completed profile! Redirecting to Sign In...");
                            window.location.href = "login.html";
                            return;
                        }
                    } catch (apiErr) {
                        if (apiErr.message && apiErr.message.includes("already exists")) {
                            alert(apiErr.message);
                            window.location.href = "login.html";
                            return;
                        }
                        console.warn("Backend signup notification:", apiErr.message);
                    }
                }

                // Save student in localStorage for fast browser access
                localStorage.setItem("syncAI_student", JSON.stringify(studentData));
                localStorage.setItem("syncAI_email", collegeEmail);

                // Move to OTP verification
                window.location.href = "otp.html";

            } catch (err) {
                console.error("Signup error:", err);
                alert("Account registration error. " + err.message);
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = "Create Account";
                }
            }
        });
    }
});