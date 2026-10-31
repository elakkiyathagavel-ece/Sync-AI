document.addEventListener("DOMContentLoaded", () => {

    /* ================= ACCESS CHECK ================= */

    const student = JSON.parse(
        localStorage.getItem("syncAI_student") || "null"
    );

    if (!student) {
        window.location.href = "login.html";
        return;
    }

    if (
        !student.emailVerified ||
        !student.assessmentCompleted ||
        localStorage.getItem("syncAI_profileCompleted") !== "true"
    ) {
        window.location.href = "assessment-intro.html";
        return;
    }


    /* ================= STUDENT NAME ================= */

    const studentName =
        student.fullName ||
        student.name ||
        "Student";

    document.getElementById("sidebarName").textContent = studentName;

    const initial = studentName
        .trim()
        .charAt(0)
        .toUpperCase();

    document.getElementById("sidebarAvatar").textContent = initial;
    document.getElementById("headerAvatar").textContent = initial;


    /* ================= ASSESSMENT DATA ================= */

    const result = JSON.parse(
        localStorage.getItem("syncAI_assessmentResult") || "null"
    );

    let overallScore = Number(
        student.verifiedSkillScore || 0
    );

    let scores = {};

    if (result) {

        overallScore = Number(
            result.overallScore ??
            result.overall ??
            overallScore
        );

        scores =
            result.categoryScores ||
            result.scores ||
            {};
    }


    /* ================= CATEGORY SCORES ================= */

    const coding = getScore(
        scores,
        ["Coding", "coding"]
    );

    const problemSolving = getScore(
        scores,
        [
            "Problem Solving",
            "problemSolving",
            "problem"
        ]
    );

    const logicalReasoning = getScore(
        scores,
        [
            "Logical Reasoning",
            "logicalReasoning",
            "logical"
        ]
    );

    const communication = getScore(
        scores,
        [
            "Communication",
            "communication"
        ]
    );

    const teamwork = getScore(
        scores,
        [
            "Teamwork",
            "teamwork"
        ]
    );


    /* ================= GROWTH SCORE ================= */

    /*
       Initial growth score is based on verified skill score.
       Future weekly assessments can increase/decrease it
       using the same stored value.
    */

    let growthScore = Number(
        student.growthScore || overallScore
    );

    growthScore = Math.max(
        0,
        Math.min(100, growthScore)
    );


    /* ================= XP ================= */

    let xp = Number(
        student.xp ||
        student.xpPoints ||
        0
    );

    if (xp === 0 && overallScore > 0) {
        xp = Math.round(overallScore * 10);
    }


    /* ================= LEARNING STREAK ================= */

    let streak = Number(
        student.learningStreak || 1
    );

    if (streak < 1) {
        streak = 1;
    }


    /* ================= DISPLAY SCORES ================= */

    document.getElementById("growthScore").textContent =
        Math.round(growthScore);

    document.getElementById("growthPercent").textContent =
        Math.round(growthScore) + "%";

    document.getElementById("verifiedScore").textContent =
        Math.round(overallScore);

    document.getElementById("learningStreak").textContent =
        streak;

    document.getElementById("xpPoints").textContent =
        xp;


    /* ================= PROGRESS BARS ================= */

    setProgress("growthProgress", growthScore);

    setProgress("codingBar", coding);
    setProgress("problemBar", problemSolving);
    setProgress("logicalBar", logicalReasoning);
    setProgress("communicationBar", communication);
    setProgress("teamworkBar", teamwork);


    document.getElementById("codingScore").textContent =
        Math.round(coding) + "%";

    document.getElementById("problemScore").textContent =
        Math.round(problemSolving) + "%";

    document.getElementById("logicalScore").textContent =
        Math.round(logicalReasoning) + "%";

    document.getElementById("communicationScore").textContent =
        Math.round(communication) + "%";

    document.getElementById("teamworkScore").textContent =
        Math.round(teamwork) + "%";


    /* ================= WEEKLY PROGRESS ================= */

    document.getElementById("weeklyCompleted").textContent =
        "1";

    document.getElementById("weeklyPercent").textContent =
        "20%";


    /* ================= BADGES ================= */

    awardBadges(
        growthScore,
        coding,
        problemSolving,
        communication,
        teamwork,
        streak
    );


    /* ================= ASSESSMENT DATE ================= */

    const completedAt =
        student.assessmentCompletedAt ||
        (result && result.completedAt);

    if (completedAt) {

        const date = new Date(completedAt);

        if (!isNaN(date.getTime())) {

            document.getElementById("assessmentDate").textContent =
                "Completed on " +
                date.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                });
        }
    }


    /* ================= SAVE GROWTH DATA ================= */

    student.growthScore = growthScore;
    student.xp = xp;
    student.learningStreak = streak;

    localStorage.setItem(
        "syncAI_student",
        JSON.stringify(student)
    );

});


/* =========================================================
   HELPER FUNCTIONS
========================================================= */

function getScore(scoreObject, possibleKeys) {

    for (const key of possibleKeys) {

        if (
            scoreObject &&
            scoreObject[key] !== undefined &&
            scoreObject[key] !== null
        ) {

            const value = Number(scoreObject[key]);

            if (!isNaN(value)) {
                return Math.max(0, Math.min(100, value));
            }
        }
    }

    return 0;
}


function setProgress(elementId, value) {

    const element =
        document.getElementById(elementId);

    if (!element) return;

    const safeValue =
        Math.max(0, Math.min(100, Number(value) || 0));

    setTimeout(() => {
        element.style.width =
            safeValue + "%";
    }, 100);
}


function awardBadges(
    growth,
    coding,
    problemSolving,
    communication,
    teamwork,
    streak
) {

    /*
      Badges are unlocked from actual stored
      assessment/progress values.
    */

    if (growth >= 60) {
        activateBadge("badgeRising");
    }

    if (growth >= 75) {
        activateBadge("badgeFast");
    }

    if (streak >= 3) {
        activateBadge("badgeConsistent");
    }

    if (problemSolving >= 75) {
        activateBadge("badgeProblem");
    }

    if (teamwork >= 75) {
        activateBadge("badgeTeam");
    }

    if (communication >= 75) {
        activateBadge("badgeCommunicator");
    }
}


function activateBadge(id) {

    const badge =
        document.getElementById(id);

    if (badge) {
        badge.classList.add("earned");
    }
}