// ==========================================
// SYNC AI - ASSESSMENT INTRODUCTION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // --------------------------------------
    // GET STUDENT DATA
    // --------------------------------------

    const storedStudent = localStorage.getItem("syncAI_student");

    if (!storedStudent) {
        alert("Please create your SYNC AI account first.");
        window.location.href = "login.html";
        return;
    }

    let studentData;

    try {
        studentData = JSON.parse(storedStudent);
    } catch (error) {
        console.error("Student data error:", error);

        localStorage.removeItem("syncAI_student");

        alert("Your session data is invalid. Please login again.");
        window.location.href = "login.html";
        return;
    }


    // --------------------------------------
    // CHECK EMAIL VERIFICATION
    // --------------------------------------

    const emailVerified =
        studentData.emailVerified === true ||
        localStorage.getItem("syncAI_emailVerified") === "true";

    if (!emailVerified) {
        alert("Please complete college email verification first.");
        window.location.href = "signup.html";
        return;
    }


    // --------------------------------------
    // DISPLAY STUDENT NAME
    // --------------------------------------

    const studentNameElement =
        document.getElementById("studentName");

    if (studentNameElement) {

        const name =
            studentData.fullName ||
            studentData.name ||
            "Student";

        studentNameElement.textContent = name;
    }


    // --------------------------------------
    // START ASSESSMENT
    // --------------------------------------

    const startButton =
        document.getElementById("startAssessmentBtn");

    if (startButton) {

        startButton.addEventListener("click", () => {

            // Save assessment state
            localStorage.setItem(
                "syncAI_assessmentStarted",
                "true"
            );

            // Move to actual assessment page
            window.location.href = "assessment.html";

        });
    }

});