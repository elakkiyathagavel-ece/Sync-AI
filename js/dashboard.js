/* =========================================
   SYNC AI - DASHBOARD JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       READ LOCAL STORAGE
    ===================================== */

    let student = {};
    let assessment = {};
    let settings = {};

    try {
        student = JSON.parse(
            localStorage.getItem("syncAI_student") || "{}"
        );
    } catch (error) {
        student = {};
    }

    try {
        assessment = JSON.parse(
            localStorage.getItem("syncAI_assessmentResult") || "{}"
        );
    } catch (error) {
        assessment = {};
    }

    try {
        settings = JSON.parse(
            localStorage.getItem("syncAI_settings") || "{}"
        );
    } catch (error) {
        settings = {};
    }


    /* =====================================
       HELPER
    ===================================== */

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

        return "";
    }


    const p = student.profile || {};

    const studentName = getValue(
        student.fullName,
        student.name,
        p.fullName,
        student.username,
        "Student"
    );

    const college = getValue(
        p.collegeName,
        student.collegeName,
        student.college,
        "College"
    );

    const domain = getValue(
        p.domains?.[0],
        student.preferredDomains?.[0],
        student.preferredDomain,
        student.domain,
        "Web Development"
    );

    const location = getValue(
        p.city,
        student.currentCity,
        student.city,
        p.district,
        student.district,
        student.state,
        "Location"
    );


    /* =====================================
       SCORE INFORMATION
    ===================================== */

    const verifiedSkillScore = getValue(
        student.verifiedSkillScore,
        assessment.overallScore,
        assessment.score,
        0
    );

    const growthScore = getValue(
        student.growthScore,
        0
    );

    const learningStreak = getValue(
        student.learningStreak,
        student.streak,
        0
    );

    const xpPoints = getValue(
        student.xp,
        student.xpPoints,
        0
    );


    /* =====================================
       AVATAR INITIAL
    ===================================== */

    const firstLetter =
        String(studentName)
            .trim()
            .charAt(0)
            .toUpperCase() || "S";


    /* =====================================
       TOP BAR
    ===================================== */

    const topUserName =
        document.getElementById("topUserName");

    const topAvatar =
        document.getElementById("topAvatar");


    if (topUserName) {
        topUserName.textContent = studentName;
    }

    if (topAvatar) {
        topAvatar.textContent = firstLetter;
    }


    /* =====================================
       WELCOME MESSAGE
    ===================================== */

    const welcomeName =
        document.getElementById("welcomeName");

    if (welcomeName) {
        welcomeName.textContent = studentName;
    }


    /* =====================================
       PROFILE
    ===================================== */

    const profileName =
        document.getElementById("profileName");

    const profileCollege =
        document.getElementById("profileCollege");

    const profileLocation =
        document.getElementById("profileLocation");

    const profileDomain =
        document.getElementById("profileDomain");

    const profileAvatar =
        document.getElementById("profileAvatar");


    if (profileName) {
        profileName.textContent = studentName;
    }

    if (profileCollege) {
        profileCollege.textContent = college;
    }

    if (profileLocation) {
        profileLocation.textContent = location;
    }

    if (profileDomain) {
        profileDomain.textContent = domain;
    }

    if (profileAvatar) {
        profileAvatar.textContent = firstLetter;
    }


    /* =====================================
       STAT CARDS
    ===================================== */

    const skillElement =
        document.getElementById("verifiedSkillScore");

    const growthElement =
        document.getElementById("growthScore");

    const streakElement =
        document.getElementById("learningStreak");

    const xpElement =
        document.getElementById("xpPoints");


    if (skillElement) {
        skillElement.textContent =
            Number(verifiedSkillScore);
    }

    if (growthElement) {
        growthElement.textContent =
            Number(growthScore);
    }

    if (streakElement) {
        streakElement.textContent =
            Number(learningStreak);
    }

    if (xpElement) {
        xpElement.textContent =
            Number(xpPoints);
    }


    /* =====================================
       GROWTH SCORE PRIVACY
    ===================================== */

    if (settings.showGrowthScore === false) {

        const growthCard =
            growthElement?.closest(".stat-card");

        if (growthCard) {
            growthCard.style.display = "none";
        }
    }


    /* =====================================
       NOTIFICATION BUTTON
    ===================================== */

    const notificationBtn =
        document.getElementById("notificationBtn");

    if (notificationBtn) {

        notificationBtn.addEventListener(
            "click",
            () => {
                window.location.href =
                    "notifications.html";
            }
        );

    }


    /* =====================================
       PROFILE BUTTON
    ===================================== */

    const profileBtn =
        document.getElementById("profileBtn");

    if (profileBtn) {

        profileBtn.addEventListener(
            "click",
            () => {
                window.location.href =
                    "profile.html";
            }
        );

    }


    /* =====================================
       FOOTER YEAR
    ===================================== */

    const footerYear =
        document.getElementById("footerYear");

    if (footerYear) {
        footerYear.textContent =
            new Date().getFullYear();
    }


    /* =====================================
       AI TEAM MATCH SCORE
    ===================================== */

    const interestedTeams =
        JSON.parse(
            localStorage.getItem(
                "syncAI_interestedTeams"
            ) || "[]"
        );

    /*
       Demo recommendation is shown on the
       dashboard. The detailed recommendation
       page handles the complete matching logic.
    */

    if (interestedTeams.length > 0) {

        const matchName =
            document.querySelector(".match-info strong");

        if (matchName) {
            matchName.textContent =
                "Team Interest Sent";
        }
    }


    /* =====================================
       ACTIVE SIDEBAR
    ===================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    document
        .querySelectorAll(".sidebar-nav a")
        .forEach(link => {

            const linkPage =
                link.getAttribute("href")
                    ?.split("/")
                    .pop()
                    .toLowerCase();

            if (linkPage === currentPage) {

                link.classList.add("active");

            } else {

                link.classList.remove("active");

            }

        });

});
async function testBackendConnection() {
    try {
        const result = await apiRequest("/health");
        console.log("SYNC AI Backend Connected:", result);

        // Fetch fresh AI recommendations
        const email = localStorage.getItem("syncAI_email");
        if (email && window.syncApi) {
            try {
                const recs = await window.syncApi.ai.getRecommendations(email);
                if (recs && recs.recommendations) {
                    const topTeam = recs.recommendations.topTeams?.[0];
                    if (topTeam) {
                        const matchElem = document.querySelector(".match-info strong");
                        if (matchElem && !matchElem.textContent.includes("Sent")) {
                            matchElem.textContent = `${topTeam.name} (${topTeam.compatibilityScore}% Match)`;
                        }
                    }
                }
            } catch (e) {}
        }
    } catch (error) {
        console.warn("Backend Connection Status: Running in local-first mode", error.message);
    }
}

testBackendConnection();