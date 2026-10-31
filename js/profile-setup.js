document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       LOAD STUDENT DATA
    ========================= */

    const studentData = JSON.parse(
        localStorage.getItem("syncAI_student") || "null"
    );

    const assessmentResult = JSON.parse(
        localStorage.getItem("syncAI_assessmentResult") || "null"
    );


    /* =========================
       ACCESS PROTECTION
    ========================= */

    if (!studentData) {
        window.location.href = "signup.html";
        return;
    }

    if (
        !studentData.emailVerified &&
        localStorage.getItem("syncAI_emailVerified") !== "true"
    ) {
        window.location.href = "otp.html";
        return;
    }

    if (
        !studentData.assessmentCompleted &&
        localStorage.getItem("syncAI_assessmentCompleted") !== "true"
    ) {
        window.location.href = "assessment-intro.html";
        return;
    }


    /* =========================
       ELEMENTS
    ========================= */

    const form = document.getElementById("profileForm");

    const fullName = document.getElementById("fullName");
    const collegeEmail = document.getElementById("collegeEmail");

    const collegeName = document.getElementById("collegeName");
    const course = document.getElementById("course");
    const department = document.getElementById("department");
    const year = document.getElementById("year");

    const region = document.getElementById("region");
    const state = document.getElementById("state");
    const district = document.getElementById("district");
    const city = document.getElementById("city");

    const bio = document.getElementById("bio");
    const github = document.getElementById("github");
    const linkedin = document.getElementById("linkedin");

    const formMessage = document.getElementById("formMessage");


    /* =========================
       PRE-FILL ACCOUNT DATA
    ========================= */

    fullName.value = studentData.fullName || studentData.name || "";
    collegeEmail.value = studentData.collegeEmail || studentData.email || localStorage.getItem("syncAI_email") || "";
    if (collegeName && (studentData.collegeName || studentData.college)) {
        collegeName.value = studentData.collegeName || studentData.college;
    }


    /* =========================
       LOCATION DATA
    ========================= */

    const locationData = {

        "South India": {

            "Andhra Pradesh": [
                "Anantapur",
                "Chittoor",
                "East Godavari",
                "Guntur",
                "Kadapa",
                "Krishna",
                "Kurnool",
                "Nellore",
                "Prakasam",
                "Srikakulam",
                "Visakhapatnam",
                "Vizianagaram",
                "West Godavari"
            ],

            "Karnataka": [
                "Bengaluru Urban",
                "Bengaluru Rural",
                "Mysuru",
                "Mangaluru",
                "Hubballi-Dharwad",
                "Belagavi",
                "Shivamogga",
                "Tumakuru",
                "Ballari",
                "Kalaburagi"
            ],

            "Kerala": [
                "Thiruvananthapuram",
                "Kollam",
                "Pathanamthitta",
                "Alappuzha",
                "Kottayam",
                "Idukki",
                "Ernakulam",
                "Thrissur",
                "Palakkad",
                "Malappuram",
                "Kozhikode",
                "Wayanad",
                "Kannur",
                "Kasaragod"
            ],

            "Tamil Nadu": [
                "Ariyalur",
                "Chengalpattu",
                "Chennai",
                "Coimbatore",
                "Cuddalore",
                "Dharmapuri",
                "Dindigul",
                "Erode",
                "Kallakurichi",
                "Kancheepuram",
                "Karur",
                "Krishnagiri",
                "Madurai",
                "Mayiladuthurai",
                "Nagapattinam",
                "Namakkal",
                "Nilgiris",
                "Perambalur",
                "Pudukkottai",
                "Ramanathapuram",
                "Ranipet",
                "Salem",
                "Sivaganga",
                "Tenkasi",
                "Thanjavur",
                "Theni",
                "Thoothukudi (Tuticorin)",
                "Tiruchirappalli",
                "Tirunelveli",
                "Tirupathur",
                "Tiruppur",
                "Tiruvallur",
                "Tiruvannamalai",
                "Tiruvarur",
                "Vellore",
                "Viluppuram",
                "Virudhunagar"
            ],

            "Telangana": [
                "Hyderabad",
                "Warangal",
                "Karimnagar",
                "Nizamabad",
                "Khammam",
                "Nalgonda",
                "Adilabad",
                "Mahabubnagar",
                "Siddipet",
                "Suryapet"
            ],

            "Puducherry": [
                "Puducherry",
                "Karaikal",
                "Mahe",
                "Yanam"
            ]
        },


        "North India": {

            "Delhi": [
                "Central Delhi",
                "East Delhi",
                "New Delhi",
                "North Delhi",
                "North East Delhi",
                "North West Delhi",
                "Shahdara",
                "South Delhi",
                "South East Delhi",
                "South West Delhi",
                "West Delhi"
            ],

            "Haryana": [
                "Gurugram",
                "Faridabad",
                "Panipat",
                "Ambala",
                "Hisar",
                "Karnal",
                "Rohtak",
                "Sonipat",
                "Panchkula",
                "Rewari"
            ],

            "Himachal Pradesh": [
                "Shimla",
                "Kangra",
                "Mandi",
                "Kullu",
                "Solan",
                "Sirmaur",
                "Una",
                "Hamirpur"
            ],

            "Jammu and Kashmir": [
                "Jammu",
                "Srinagar",
                "Anantnag",
                "Baramulla",
                "Kathua",
                "Kupwara",
                "Pulwama",
                "Udhampur"
            ],

            "Ladakh": [
                "Leh",
                "Kargil"
            ],

            "Punjab": [
                "Amritsar",
                "Ludhiana",
                "Jalandhar",
                "Patiala",
                "Bathinda",
                "Mohali",
                "Hoshiarpur",
                "Pathankot",
                "Gurdaspur"
            ],

            "Rajasthan": [
                "Jaipur",
                "Jodhpur",
                "Udaipur",
                "Kota",
                "Ajmer",
                "Bikaner",
                "Alwar",
                "Bharatpur",
                "Sikar",
                "Sri Ganganagar"
            ],

            "Uttar Pradesh": [
                "Lucknow",
                "Noida",
                "Ghaziabad",
                "Kanpur",
                "Agra",
                "Varanasi",
                "Prayagraj",
                "Meerut",
                "Gorakhpur",
                "Bareilly"
            ],

            "Uttarakhand": [
                "Dehradun",
                "Haridwar",
                "Nainital",
                "Almora",
                "Pauri Garhwal",
                "Udham Singh Nagar"
            ],

            "Chandigarh": [
                "Chandigarh"
            ]
        }
    };


    /* =========================
       REGION → STATE
    ========================= */

    region.addEventListener("change", () => {

        state.innerHTML =
            '<option value="">Select state</option>';

        district.innerHTML =
            '<option value="">Select district</option>';

        district.disabled = true;

        if (!region.value) {
            state.disabled = true;
            return;
        }

        state.disabled = false;

        const states = Object.keys(
            locationData[region.value]
        );

        states.forEach(stateName => {

            const option = document.createElement("option");

            option.value = stateName;
            option.textContent = stateName;

            state.appendChild(option);
        });
    });


    /* =========================
       STATE → DISTRICT
    ========================= */

    state.addEventListener("change", () => {

        district.innerHTML =
            '<option value="">Select district</option>';

        if (!state.value) {
            district.disabled = true;
            return;
        }

        district.disabled = false;

        const districts =
            locationData[region.value][state.value];

        districts.forEach(districtName => {

            const option = document.createElement("option");

            option.value = districtName;
            option.textContent = districtName;

            district.appendChild(option);
        });
    });


    /* =========================
       LOAD EXISTING PROFILE
    ========================= */

    if (studentData.profile) {

        const profile = studentData.profile;

        collegeName.value = profile.collegeName || "";
        course.value = profile.course || "";
        department.value = profile.department || "";
        year.value = profile.year || "";

        city.value = profile.city || "";
        bio.value = profile.bio || "";
        github.value = profile.github || "";
        linkedin.value = profile.linkedin || "";

        if (profile.region) {

            region.value = profile.region;

            region.dispatchEvent(
                new Event("change")
            );

            if (profile.state) {

                state.value = profile.state;

                state.dispatchEvent(
                    new Event("change")
                );

                if (profile.district) {
                    district.value = profile.district;
                }
            }
        }


        /* DOMAIN SELECTION */

        if (Array.isArray(profile.domains)) {

            document
                .querySelectorAll(
                    'input[name="domains"]'
                )
                .forEach(input => {

                    input.checked =
                        profile.domains.includes(
                            input.value
                        );
                });
        }


        /* AVAILABILITY */

        if (profile.availability) {

            const radio = document.querySelector(
                `input[name="availability"][value="${profile.availability}"]`
            );

            if (radio) {
                radio.checked = true;
            }
        }
    }


    /* =========================
       FORM SUBMIT
    ========================= */

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        formMessage.className = "form-message";
        formMessage.textContent = "";


        /* DOMAIN VALIDATION */

        const selectedDomains = Array.from(
            document.querySelectorAll(
                'input[name="domains"]:checked'
            )
        ).map(input => input.value);


        if (selectedDomains.length === 0) {

            showError(
                "Please select at least one preferred domain."
            );

            return;
        }


        /* LOCATION VALIDATION */

        if (
            !region.value ||
            !state.value ||
            !district.value
        ) {

            showError(
                "Please select your region, state and district."
            );

            return;
        }


        /* =========================
           COLLECT PROFILE
        ========================= */

        const availabilityInput =
            document.querySelector(
                'input[name="availability"]:checked'
            );


        const profile = {

            collegeName: collegeName.value.trim(),

            course: course.value,

            department: department.value.trim(),

            year: year.value,

            domains: selectedDomains,

            region: region.value,

            state: state.value,

            district: district.value,

            city: city.value.trim(),

            bio: bio.value.trim(),

            github: github.value.trim(),

            linkedin: linkedin.value.trim(),

            availability:
                availabilityInput
                    ? availabilityInput.value
                    : "",

            profileCompletedAt:
                new Date().toISOString()
        };


        /* =========================
           SAVE TO LOCAL STORAGE & BACKEND
        ========================= */

        studentData.profile = profile;
        studentData.profileCompleted = true;
        studentData.profileCompletedAt = profile.profileCompletedAt;

        if (assessmentResult) {
            studentData.verifiedSkillScore = assessmentResult.overallScore;
        }

        localStorage.setItem(
            "syncAI_student",
            JSON.stringify(studentData)
        );

        localStorage.setItem(
            "syncAI_profileCompleted",
            "true"
        );

        // Call backend API to permanently record profile
        const targetEmail = (studentData.collegeEmail || studentData.email || collegeEmail.value || "").toLowerCase().trim();
        if (window.syncApi && window.syncApi.profile && targetEmail) {
            window.syncApi.profile.save({
                collegeEmail: targetEmail,
                email: targetEmail,
                collegeName: profile.collegeName,
                course: profile.course,
                department: profile.department,
                year: profile.year,
                domains: profile.domains,
                region: profile.region,
                state: profile.state,
                district: profile.district,
                city: profile.city,
                bio: profile.bio,
                github: profile.github,
                linkedin: profile.linkedin,
                availability: profile.availability
            }).catch(e => console.warn("Backend profile save notice:", e.message));
        }

        /* =========================
           SUCCESS
        ========================= */

        formMessage.className =
            "form-message success";

        formMessage.textContent =
            "Profile created successfully! Loading your SYNC AI dashboard...";

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 800);

    });


    /* =========================
       ERROR FUNCTION
    ========================= */

    function showError(message) {

        formMessage.className =
            "form-message error";

        formMessage.textContent =
            message;

        formMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }

});