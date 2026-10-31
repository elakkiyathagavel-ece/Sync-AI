// ==========================================
// SYNC AI - ASSESSMENT RESULT
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // --------------------------------------
    // GET STUDENT DATA
    // --------------------------------------

    const storedStudent =
        localStorage.getItem("syncAI_student");

    if (!storedStudent) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    let studentData;

    try {
        studentData = JSON.parse(storedStudent);
    } catch (error) {

        localStorage.removeItem("syncAI_student");

        alert("Invalid student session.");
        window.location.href = "login.html";

        return;
    }


    // --------------------------------------
    // CHECK ASSESSMENT
    // --------------------------------------

    const storedResult =
        localStorage.getItem("syncAI_assessmentResult");

    if (!storedResult) {

        alert("Please complete the assessment first.");

        window.location.href =
            "assessment-intro.html";

        return;
    }

    let result;

    try {
        result = JSON.parse(storedResult);
    } catch (error) {

        localStorage.removeItem(
            "syncAI_assessmentResult"
        );

        alert("Assessment result could not be loaded.");

        window.location.href =
            "assessment-intro.html";

        return;
    }


    // --------------------------------------
    // STUDENT NAME
    // --------------------------------------

    const studentName =
        studentData.fullName ||
        studentData.name ||
        "Student";

    document.getElementById("studentName")
        .textContent = studentName;


    // --------------------------------------
    // AVATAR
    // --------------------------------------

    document.getElementById("studentAvatar")
        .textContent =
        studentName.charAt(0).toUpperCase();


    // --------------------------------------
    // OVERALL SCORE
    // --------------------------------------

    const overallScore =
        Number(result.overallScore) || 0;

    document.getElementById("overallScore")
        .textContent = overallScore;


    // --------------------------------------
    // SCORE MESSAGE
    // --------------------------------------

    const scoreMessage =
        document.getElementById("scoreMessage");

    if (overallScore >= 80) {

        scoreMessage.textContent =
            "Strong foundation";

    } else if (overallScore >= 60) {

        scoreMessage.textContent =
            "Good foundation";

    } else if (overallScore >= 40) {

        scoreMessage.textContent =
            "Growing foundation";

    } else {

        scoreMessage.textContent =
            "Great starting point";
    }


    // --------------------------------------
    // CATEGORY DATA
    // --------------------------------------

    const categoryScores =
        result.categoryScores || {};

    const categoryTotals =
        result.categoryTotals || {};


    function getPercentage(category) {

        const correct =
            Number(categoryScores[category]) || 0;

        const total =
            Number(categoryTotals[category]) || 0;

        if (total === 0) {
            return 0;
        }

        return Math.round(
            (correct / total) * 100
        );
    }


    // --------------------------------------
    // UPDATE SKILL BAR
    // --------------------------------------

    function updateSkill(
        scoreElementId,
        barElementId,
        percentage
    ) {

        const scoreElement =
            document.getElementById(scoreElementId);

        const barElement =
            document.getElementById(barElementId);

        scoreElement.textContent =
            `${percentage}%`;

        setTimeout(() => {

            barElement.style.width =
                `${percentage}%`;

        }, 150);
    }


    updateSkill(
        "codingScore",
        "codingBar",
        getPercentage("Coding")
    );

    updateSkill(
        "problemScore",
        "problemBar",
        getPercentage("Problem Solving")
    );

    updateSkill(
        "logicalScore",
        "logicalBar",
        getPercentage("Logical Reasoning")
    );

    updateSkill(
        "communicationScore",
        "communicationBar",
        getPercentage("Communication")
    );

    updateSkill(
        "teamworkScore",
        "teamworkBar",
        getPercentage("Teamwork")
    );


    // --------------------------------------
    // SCORE CIRCLE
    // --------------------------------------

    const scoreCircle =
        document.querySelector(".score-circle");

    const degree =
        Math.round(
            (overallScore / 100) * 360
        );

    scoreCircle.style.background =
        `conic-gradient(
            #6259f5 0deg,
            #4778e8 ${degree}deg,
            #e6e8f0 ${degree}deg
        )`;


    // --------------------------------------
    // CONTINUE
    // --------------------------------------

    const continueBtn =
        document.getElementById("continueBtn");

    continueBtn.addEventListener(
        "click",
        () => {

            // Mark result as viewed
            localStorage.setItem(
                "syncAI_resultViewed",
                "true"
            );

            // Next step
            window.location.href =
                "profile-setup.html";
        }
    );

});