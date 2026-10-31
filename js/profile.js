document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // ACCESS PROTECTION
    // =========================

    const student = JSON.parse(
        localStorage.getItem("syncAI_student")
    );

    if (!student) {
        window.location.href = "login.html";
        return;
    }

    if (student.emailVerified !== true) {
        window.location.href = "otp.html";
        return;
    }

    if (student.assessmentCompleted !== true) {
        window.location.href = "assessment-intro.html";
        return;
    }

    if (
        localStorage.getItem("syncAI_profileCompleted") !== "true"
    ) {
        window.location.href = "profile-setup.html";
        return;
    }


    // =========================
    // HELPER
    // =========================

    function getValue(...values) {

        for (const value of values) {

            if (
                value !== undefined &&
                value !== null &&
                value !== ""
            ) {
                return value;
            }

        }

        return "-";
    }


    // =========================
    // STUDENT DATA
    // =========================

    const p = student.profile || {};

    const name = getValue(
        student.fullName,
        student.name,
        p.fullName
    );

    const college = getValue(
        p.collegeName,
        student.collegeName,
        student.college
    );

    const email = getValue(
        student.collegeEmail,
        student.email,
        p.collegeEmail
    );

    const degree = getValue(
        p.course,
        student.degree,
        student.course
    );

    const department = getValue(
        p.department,
        student.department,
        student.branch
    );

    const year = getValue(
        p.year,
        student.year,
        student.studyYear
    );

    const region = getValue(
        p.region,
        student.region
    );

    const state = getValue(
        p.state,
        student.state
    );

    const district = getValue(
        p.district,
        student.district
    );

    const city = getValue(
        p.city,
        student.city,
        student.currentCity,
        student.location
    );



    // =========================
    // PROFILE NAME
    // =========================

    document.getElementById("profileName").textContent =
        name;

    document.getElementById("profileCollege").textContent =
        college;

    document.getElementById("profileEmail").textContent =
        email;

    document.getElementById("profileAvatar").textContent =
        name.charAt(0).toUpperCase();

    document.getElementById("sidebarAvatar").textContent =
        name.charAt(0).toUpperCase();

    document.getElementById("sidebarName").textContent =
        name;


    // =========================
    // PROFILE LOCATION HERO
    // =========================

    document.getElementById("profileDistrict").textContent =
        district;

    document.getElementById("profileState").textContent =
        state;


    // =========================
    // PERSONAL INFORMATION
    // =========================

    document.getElementById("infoName").textContent =
        name;

    document.getElementById("infoCollege").textContent =
        college;

    document.getElementById("infoDegree").textContent =
        degree;

    document.getElementById("infoDepartment").textContent =
        department;

    document.getElementById("infoYear").textContent =
        year;

    document.getElementById("infoEmail").textContent =
        email;


    // =========================
    // LOCATION INFORMATION
    // =========================

    document.getElementById("infoRegion").textContent =
        region;

    document.getElementById("infoState").textContent =
        state;

    document.getElementById("infoDistrict").textContent =
        district;

    document.getElementById("infoCity").textContent =
        city;


    // =========================
    // ASSESSMENT RESULT
    // =========================

    const assessmentResult = JSON.parse(
        localStorage.getItem("syncAI_assessmentResult")
    );


    let skillScore = getValue(
        student.verifiedSkillScore
    );

    if (
        assessmentResult &&
        (
            assessmentResult.overallScore !== undefined ||
            assessmentResult.overall !== undefined
        )
    ) {

        skillScore = getValue(
            assessmentResult.overallScore,
            assessmentResult.overall
        );

    }


    document.getElementById("skillScore").textContent =
        skillScore;


    // =========================
    // GROWTH DATA
    // =========================

    let growthScore = getValue(
        student.growthScore
    );

    let learningStreak = getValue(
        student.learningStreak
    );

    let xpPoints = getValue(
        student.xp,
        student.xpPoints
    );


    // Default prototype values

    if (growthScore === "-") {
        growthScore = 72;
    }

    if (learningStreak === "-") {
        learningStreak = 7;
    }

    if (xpPoints === "-") {
        xpPoints = 420;
    }


    document.getElementById("growthScore").textContent =
        growthScore;

    document.getElementById("learningStreak").textContent =
        learningStreak;

    document.getElementById("xpPoints").textContent =
        xpPoints;


    // =========================
    // DOMAINS
    // =========================

    const domainList =
        document.getElementById("domainList");

    let domains =
        student.preferredDomains ||
        student.domains ||
        student.interests ||
        [];


    if (!Array.isArray(domains)) {
        domains = [domains];
    }


    if (domains.length === 0) {

        domains = [
            "Web Development",
            "AI / Machine Learning"
        ];

    }


    domainList.innerHTML = "";


    domains.forEach(function (domain) {

        const tag =
            document.createElement("div");

        tag.className = "domain-tag";

        tag.textContent = domain;

        domainList.appendChild(tag);

    });


    // =========================
    // TECHNICAL SKILLS
    // =========================

    const skillList =
        document.getElementById("skillList");

    let skills =
        student.skills ||
        student.technicalSkills ||
        [];


    if (!Array.isArray(skills)) {

        if (typeof skills === "string") {

            skills = skills
                .split(",")
                .map(skill => skill.trim())
                .filter(Boolean);

        } else {

            skills = [];

        }

    }


    if (skills.length === 0) {

        skills = [
            "HTML",
            "CSS",
            "JavaScript",
            "Java",
            "Python"
        ];

    }


    skillList.innerHTML = "";


    skills.forEach(function (skill) {

        const tag =
            document.createElement("div");

        tag.className = "skill-tag";

        tag.textContent = skill;

        skillList.appendChild(tag);

    });


    // =========================
    // EDIT PROFILE
    // =========================

    document
        .getElementById("editProfileBtn")
        .addEventListener("click", function () {

            window.location.href =
                "profile-setup.html";

        });

});