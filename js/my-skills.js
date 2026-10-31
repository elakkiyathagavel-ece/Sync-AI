/* =========================================
   SYNC AI - MY SKILLS
========================================= */


/* ---------- LOAD STUDENT ---------- */

function loadStudent() {

    const student = JSON.parse(
        localStorage.getItem("syncAI_student") || "null"
    );

    if (!student) {
        return;
    }

    const name =
        student.fullName ||
        student.name ||
        "Student";

    document.getElementById("profileName").textContent = name;

    document.getElementById("profileAvatar").textContent =
        name.charAt(0).toUpperCase();
}


/* ---------- LOAD ASSESSMENT ---------- */

function loadAssessmentResult() {

    const result = JSON.parse(
        localStorage.getItem("syncAI_assessmentResult") || "null"
    );


    if (!result) {

        document.getElementById("overallScore").textContent = "0";

        return;
    }


    /* OVERALL */

    const overall =
        Number(
            result.overallScore ??
            result.overall ??
            0
        );

    document.getElementById("overallScore").textContent =
        Math.round(overall);


    /* STATUS */

    let status = "Assessment Score";

    if (overall >= 80) {
        status = "Strong Skill Profile";
    }

    else if (overall >= 60) {
        status = "Good Skill Profile";
    }

    else if (overall >= 40) {
        status = "Developing Skills";
    }

    else {
        status = "Keep Learning";
    }

    document.getElementById("scoreStatus").textContent =
        status;


    /* CATEGORY SCORES */

    const scores =
        result.categoryScores ||
        result.scores ||
        {};


    setSkill(
        "codingScore",
        "codingBar",
        scores.Coding || scores.coding || 0
    );

    setSkill(
        "problemScore",
        "problemBar",
        scores["Problem Solving"] ||
        scores.problemSolving ||
        scores.problem ||
        0
    );

    setSkill(
        "logicalScore",
        "logicalBar",
        scores["Logical Reasoning"] ||
        scores.logicalReasoning ||
        scores.logical ||
        0
    );

    setSkill(
        "communicationScore",
        "communicationBar",
        scores.Communication ||
        scores.communication ||
        0
    );

    setSkill(
        "teamworkScore",
        "teamworkBar",
        scores.Teamwork ||
        scores.teamwork ||
        0
    );
}


/* ---------- SET SKILL ---------- */

function setSkill(scoreId, barId, value) {

    const score =
        Math.max(
            0,
            Math.min(
                100,
                Number(value) || 0
            )
        );

    document.getElementById(scoreId).textContent =
        Math.round(score) + "%";

    document.getElementById(barId).style.width =
        score + "%";
}


/* ---------- LOAD TECHNICAL SKILLS ---------- */

function loadTechnicalSkills() {

    const student = JSON.parse(
        localStorage.getItem("syncAI_student") || "null"
    );

    if (!student) {
        return;
    }


    const container =
        document.getElementById("technicalSkills");


    let skills = [];


    /* Try different possible profile fields */

    if (Array.isArray(student.skills)) {
        skills = student.skills;
    }

    else if (Array.isArray(student.technicalSkills)) {
        skills = student.technicalSkills;
    }


    /* If no saved skills, show defaults */

    if (skills.length === 0) {

        skills = [
            "HTML",
            "CSS",
            "JavaScript",
            "Java",
            "Python"
        ];

    }


    container.innerHTML = "";


    skills.forEach(skill => {

        const tag =
            document.createElement("span");

        tag.className = "skill-tag";

        tag.textContent = skill;

        container.appendChild(tag);

    });

}


/* ---------- EDIT BUTTON ---------- */

document
    .getElementById("editSkillsBtn")
    .addEventListener("click", function () {

        alert(
            "Skill editing will be connected to your Profile Setup."
        );

    });


/* ---------- INITIALIZE ---------- */

loadStudent();

loadAssessmentResult();

loadTechnicalSkills();