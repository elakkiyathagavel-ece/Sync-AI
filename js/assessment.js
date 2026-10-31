// ==========================================
// SYNC AI - INITIAL SKILL ASSESSMENT
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // --------------------------------------
    // CHECK STUDENT SESSION
    // --------------------------------------

    const storedStudent =
        localStorage.getItem("syncAI_student");

    if (!storedStudent) {
        alert("Please create your account first.");
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
    // CHECK EMAIL VERIFICATION
    // --------------------------------------

    const emailVerified =
        studentData.emailVerified === true ||
        localStorage.getItem("syncAI_emailVerified") === "true";

    if (!emailVerified) {
        alert("Please complete email verification first.");
        window.location.href = "signup.html";
        return;
    }


    // --------------------------------------
    // QUESTIONS
    // --------------------------------------

    const questions = [

        {
            category: "Coding",
            question: "Which data structure follows the LIFO principle?",
            options: [
                "Queue",
                "Stack",
                "Linked List",
                "Array"
            ],
            answer: 1
        },

        {
            category: "Coding",
            question: "What is the output of: 5 + 3 * 2 ?",
            options: [
                "16",
                "11",
                "13",
                "10"
            ],
            answer: 1
        },

        {
            category: "Coding",
            question: "Which keyword is commonly used to declare a constant in JavaScript?",
            options: [
                "var",
                "let",
                "const",
                "static"
            ],
            answer: 2
        },

        {
            category: "Coding",
            question: "Which of the following is used to repeat a block of code?",
            options: [
                "Loop",
                "Class",
                "Object",
                "Package"
            ],
            answer: 0
        },


        {
            category: "Problem Solving",
            question: "A program works correctly for 9 test cases but fails for one unusual input. What should you investigate first?",
            options: [
                "Change the entire program",
                "Check the failing input and edge case",
                "Delete the test case",
                "Increase the font size"
            ],
            answer: 1
        },

        {
            category: "Problem Solving",
            question: "You have a problem that can be divided into smaller similar problems. Which approach can be useful?",
            options: [
                "Divide and conquer",
                "Random guessing",
                "Ignoring the problem",
                "Manual repetition only"
            ],
            answer: 0
        },

        {
            category: "Problem Solving",
            question: "What is generally the first step when solving a programming problem?",
            options: [
                "Write code immediately",
                "Understand the problem",
                "Choose colors",
                "Delete previous code"
            ],
            answer: 1
        },

        {
            category: "Problem Solving",
            question: "If an algorithm becomes slower as input size increases, which factor should you analyze?",
            options: [
                "Time complexity",
                "Screen resolution",
                "Keyboard layout",
                "File name"
            ],
            answer: 0
        },


        {
            category: "Logical Reasoning",
            question: "If all developers are learners and some learners are designers, which statement is definitely true?",
            options: [
                "All designers are developers",
                "All developers are learners",
                "All learners are developers",
                "No developer is a designer"
            ],
            answer: 1
        },

        {
            category: "Logical Reasoning",
            question: "Find the next number: 2, 4, 8, 16, ?",
            options: [
                "20",
                "24",
                "32",
                "36"
            ],
            answer: 2
        },

        {
            category: "Logical Reasoning",
            question: "If A is taller than B and B is taller than C, who is the shortest?",
            options: [
                "A",
                "B",
                "C",
                "Cannot determine"
            ],
            answer: 2
        },

        {
            category: "Logical Reasoning",
            question: "Which number does not belong: 3, 5, 7, 10, 11?",
            options: [
                "3",
                "7",
                "10",
                "11"
            ],
            answer: 2
        },


        {
            category: "Communication",
            question: "During a project presentation, a teammate does not understand your explanation. What should you do?",
            options: [
                "Ignore them",
                "Explain it again using a simpler example",
                "Tell them to search online",
                "End the discussion"
            ],
            answer: 1
        },

        {
            category: "Communication",
            question: "Which is most important when explaining a technical idea to a beginner?",
            options: [
                "Using complex words",
                "Speaking as quickly as possible",
                "Using clear and simple language",
                "Avoiding examples"
            ],
            answer: 2
        },

        {
            category: "Communication",
            question: "What is a good way to handle a disagreement during a team discussion?",
            options: [
                "Listen and discuss the reasons",
                "Stop talking to the team",
                "Force your opinion",
                "Leave the project"
            ],
            answer: 0
        },


        {
            category: "Teamwork",
            question: "A teammate is struggling with their assigned task. What is a constructive response?",
            options: [
                "Blame them",
                "Ignore them",
                "Offer help and understand the issue",
                "Remove them immediately"
            ],
            answer: 2
        },

        {
            category: "Teamwork",
            question: "Which behavior supports a healthy project team?",
            options: [
                "Keeping all information private",
                "Sharing progress and communicating regularly",
                "Doing everything alone",
                "Ignoring deadlines"
            ],
            answer: 1
        },

        {
            category: "Teamwork",
            question: "A good team member should primarily focus on:",
            options: [
                "Only personal success",
                "Helping the team achieve its goal",
                "Avoiding responsibility",
                "Competing with teammates"
            ],
            answer: 1
        },

        {
            category: "Teamwork",
            question: "Your team has limited time before a hackathon deadline. What is the best approach?",
            options: [
                "Prioritize important tasks and coordinate",
                "Work without communicating",
                "Wait until the last hour",
                "Ignore the deadline"
            ],
            answer: 0
        }

    ];


    // --------------------------------------
    // VARIABLES
    // --------------------------------------

    let currentIndex = 0;

    let answers =
        JSON.parse(
            localStorage.getItem("syncAI_assessmentAnswers")
        ) || {};

    let timeRemaining = 30 * 60;

    let warningShown = false;

    let assessmentSubmitted = false;


    // --------------------------------------
    // DOM ELEMENTS
    // --------------------------------------

    const questionNumber =
        document.getElementById("questionNumber");

    const questionText =
        document.getElementById("questionText");

    const optionsContainer =
        document.getElementById("optionsContainer");

    const currentQuestion =
        document.getElementById("currentQuestion");

    const totalQuestions =
        document.getElementById("totalQuestions");

    const categoryName =
        document.getElementById("categoryName");

    const progressFill =
        document.getElementById("progressFill");

    const previousBtn =
        document.getElementById("previousBtn");

    const nextBtn =
        document.getElementById("nextBtn");

    const answeredCount =
        document.getElementById("answeredCount");

    const timer =
        document.getElementById("timer");

    const studentName =
        document.getElementById("studentName");

    const studentAvatar =
        document.getElementById("studentAvatar");


    // --------------------------------------
    // STUDENT NAME
    // --------------------------------------

    const name =
        studentData.fullName ||
        studentData.name ||
        "Student";

    studentName.textContent = name;

    studentAvatar.textContent =
        name.charAt(0).toUpperCase();


    // --------------------------------------
    // TOTAL QUESTIONS
    // --------------------------------------

    totalQuestions.textContent =
        questions.length;


    // --------------------------------------
    // DISPLAY QUESTION
    // --------------------------------------

    function displayQuestion() {

        const question =
            questions[currentIndex];

        questionNumber.textContent =
            `QUESTION ${String(currentIndex + 1).padStart(2, "0")}`;

        questionText.textContent =
            question.question;

        currentQuestion.textContent =
            currentIndex + 1;

        categoryName.textContent =
            question.category;


        // Progress
        const progress =
            ((currentIndex + 1) / questions.length) * 100;

        progressFill.style.width =
            `${progress}%`;


        // Options
        optionsContainer.innerHTML = "";

        question.options.forEach((option, index) => {

            const optionElement =
                document.createElement("div");

            optionElement.className = "option";

            if (answers[currentIndex] === index) {
                optionElement.classList.add("selected");
            }

            optionElement.innerHTML = `
                <div class="option-radio"></div>

                <div class="option-letter">
                    ${String.fromCharCode(65 + index)}
                </div>

                <div class="option-text">
                    ${option}
                </div>
            `;

            optionElement.addEventListener(
                "click",
                () => selectAnswer(index)
            );

            optionsContainer.appendChild(optionElement);

        });


        // Previous button
        previousBtn.disabled =
            currentIndex === 0;


        // Next button
        if (currentIndex === questions.length - 1) {

            nextBtn.textContent =
                "Review & Submit →";

        } else {

            nextBtn.textContent =
                "Next →";
        }


        updateAnsweredCount();

        updateCategoryIndicator();
    }


    // --------------------------------------
    // SELECT ANSWER
    // --------------------------------------

    function selectAnswer(index) {

        answers[currentIndex] = index;

        localStorage.setItem(
            "syncAI_assessmentAnswers",
            JSON.stringify(answers)
        );

        displayQuestion();
    }


    // --------------------------------------
    // ANSWER COUNT
    // --------------------------------------

    function updateAnsweredCount() {

        const count =
            Object.keys(answers).length;

        answeredCount.textContent =
            `${count} / ${questions.length} answered`;
    }


    // --------------------------------------
    // CATEGORY INDICATOR
    // --------------------------------------

    function updateCategoryIndicator() {

        const categories =
            document.querySelectorAll(".category-item");

        categories.forEach(item => {
            item.classList.remove("active");
        });

        const categoryMap = {
            "Coding": 0,
            "Problem Solving": 1,
            "Logical Reasoning": 2,
            "Communication": 3,
            "Teamwork": 4
        };

        const activeIndex =
            categoryMap[
                questions[currentIndex].category
            ];

        if (categories[activeIndex]) {
            categories[activeIndex]
                .classList.add("active");
        }
    }


    // --------------------------------------
    // NEXT
    // --------------------------------------

    nextBtn.addEventListener("click", () => {

        if (currentIndex < questions.length - 1) {

            currentIndex++;

            displayQuestion();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        } else {

            openSubmitModal();
        }
    });


    // --------------------------------------
    // PREVIOUS
    // --------------------------------------

    previousBtn.addEventListener("click", () => {

        if (currentIndex > 0) {

            currentIndex--;

            displayQuestion();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    });


    // --------------------------------------
    // TIMER
    // --------------------------------------

    function updateTimer() {

        const minutes =
            Math.floor(timeRemaining / 60);

        const seconds =
            timeRemaining % 60;

        timer.textContent =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;


        if (timeRemaining <= 300) {
            timer.classList.add("warning");
        }

        if (timeRemaining <= 60) {
            timer.classList.remove("warning");
            timer.classList.add("danger");
        }


        if (timeRemaining <= 0) {

            clearInterval(timerInterval);

            submitAssessment(true);

            return;
        }

        timeRemaining--;
    }

    updateTimer();

    const timerInterval =
        setInterval(updateTimer, 1000);


    // --------------------------------------
    // SUBMIT MODAL
    // --------------------------------------

    const submitOverlay =
        document.getElementById("submitOverlay");

    const submitAnswered =
        document.getElementById("submitAnswered");

    const submitRemaining =
        document.getElementById("submitRemaining");

    const cancelSubmit =
        document.getElementById("cancelSubmit");

    const confirmSubmit =
        document.getElementById("confirmSubmit");


    function openSubmitModal() {

        const answered =
            Object.keys(answers).length;

        const remaining =
            questions.length - answered;

        submitAnswered.textContent =
            `${answered} / ${questions.length}`;

        submitRemaining.textContent =
            remaining;

        submitOverlay.classList.add("show");
    }


    cancelSubmit.addEventListener(
        "click",
        () => {
            submitOverlay.classList.remove("show");
        }
    );


    confirmSubmit.addEventListener(
        "click",
        () => {
            submitAssessment(false);
        }
    );


    // --------------------------------------
    // SUBMIT ASSESSMENT
    // --------------------------------------

    async function submitAssessment(autoSubmit) {

        if (assessmentSubmitted) {
            return;
        }

        assessmentSubmitted = true;
        clearInterval(timerInterval);

        // Calculate scores
        const scores = {
            Coding: 0,
            "Problem Solving": 0,
            "Logical Reasoning": 0,
            Communication: 0,
            Teamwork: 0
        };

        const totals = {
            Coding: 0,
            "Problem Solving": 0,
            "Logical Reasoning": 0,
            Communication: 0,
            Teamwork: 0
        };

        questions.forEach((question, index) => {
            totals[question.category]++;
            if (
                answers[index] !== undefined &&
                answers[index] === question.answer
            ) {
                scores[question.category]++;
            }
        });

        const totalCorrect =
            Object.values(scores)
                .reduce((sum, value) => sum + value, 0);

        const overallScore =
            Math.round((totalCorrect / questions.length) * 100);

        const assessmentResult = {
            overallScore,
            correctAnswers: totalCorrect,
            totalQuestions: questions.length,
            categoryScores: scores,
            categoryTotals: totals,
            completed: true,
            completedAt: new Date().toISOString()
        };

        // Call backend API
        const email = (studentData && (studentData.collegeEmail || studentData.email)) || localStorage.getItem("syncAI_email") || "";
        if (window.syncApi && window.syncApi.assessment && email) {
            try {
                await window.syncApi.assessment.submit(email, answers);
            } catch (err) {
                console.warn("Backend assessment submit warning:", err.message);
            }
        }

        localStorage.setItem(
            "syncAI_assessmentResult",
            JSON.stringify(assessmentResult)
        );

        // Update student profile
        if (studentData) {
            studentData.assessmentCompleted = true;
            studentData.verifiedSkillScore = overallScore;
            studentData.assessmentCompletedAt = assessmentResult.completedAt;

            localStorage.setItem(
                "syncAI_student",
                JSON.stringify(studentData)
            );
        }

        localStorage.setItem(
            "syncAI_assessmentCompleted",
            "true"
        );

        localStorage.removeItem(
            "syncAI_assessmentAnswers"
        );

        if (autoSubmit) {
            alert(
                "Time is over. Your assessment has been submitted automatically."
            );
        } else {
            alert(
                "Assessment submitted successfully!"
            );
        }

        // Go to result page
        window.location.href = "assessment-result.html";
    }



    // --------------------------------------
    // TAB SWITCH DETECTION
    // --------------------------------------

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden &&
                !assessmentSubmitted &&
                !warningShown
            ) {

                warningShown = true;

                showWarning(
                    "You switched away from the assessment. Please return and continue."
                );
            }

        }
    );


    // --------------------------------------
    // WARNING
    // --------------------------------------

    const warningOverlay =
        document.getElementById("warningOverlay");

    const warningMessage =
        document.getElementById("warningMessage");

    const warningClose =
        document.getElementById("warningClose");


    function showWarning(message) {

        warningMessage.textContent =
            message;

        warningOverlay.classList.add("show");
    }


    warningClose.addEventListener(
        "click",
        () => {

            warningOverlay.classList.remove("show");

            warningShown = false;
        }
    );


    // --------------------------------------
    // FULLSCREEN
    // --------------------------------------

    document.addEventListener(
        "click",
        () => {

            if (
                !document.fullscreenElement &&
                document.documentElement.requestFullscreen
            ) {

                document.documentElement
                    .requestFullscreen()
                    .catch(() => {});

            }

        },
        { once: true }
    );


    // --------------------------------------
    // PREVENT ACCIDENTAL BACK NAVIGATION
    // --------------------------------------

    history.pushState(null, "", location.href);

    window.addEventListener(
        "popstate",
        () => {

            if (!assessmentSubmitted) {

                history.pushState(
                    null,
                    "",
                    location.href
                );

                showWarning(
                    "Please complete the assessment before leaving this page."
                );
            }

        }
    );


    // --------------------------------------
    // INITIAL DISPLAY
    // --------------------------------------

    displayQuestion();

});