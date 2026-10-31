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
    // STUDENT
    // =========================

    const studentName =
        student.fullName ||
        student.name ||
        "Student";

    const domains =
        student.preferredDomains ||
        student.domains ||
        ["Web Development"];

    const selectedDomain =
        Array.isArray(domains)
            ? domains[0]
            : domains;


    const district =
        student.district ||
        "Your District";

    const state =
        student.state ||
        "Your State";


    document.getElementById("sidebarName").textContent =
        studentName;

    document.getElementById("sidebarAvatar").textContent =
        studentName.charAt(0).toUpperCase();

    document.getElementById("domainSummary").textContent =
        selectedDomain
            .replace(" Development", "")
            .replace(" / Machine Learning", " / ML");

    document.getElementById("locationSummary").textContent =
        district !== "Your District"
            ? "Local"
            : "State";


    // =========================
    // RECOMMENDED TEAMS
    // =========================

    const teams = [

        {
            name: "CodeCrafters",
            compatibility: 94,
            location: "Coimbatore, Tamil Nadu",
            domain: "Web Development",
            vacancy: "2 positions available",
            description:
                "Building modern web solutions for innovative hackathon ideas.",
            image:
                "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85"
        },

        {
            name: "AI Innovators",
            compatibility: 91,
            location: "Chennai, Tamil Nadu",
            domain: "AI / Machine Learning",
            vacancy: "2 positions available",
            description:
                "A team exploring practical AI and machine learning solutions.",
            image:
                "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=85"
        },

        {
            name: "Tech Titans",
            compatibility: 89,
            location: "Thoothukudi, Tamil Nadu",
            domain: "Web Development",
            vacancy: "2 positions available",
            description:
                "Frontend and backend developers working together on hackathon projects.",
            image:
                "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=85"
        },

        {
            name: "NextGen Builders",
            compatibility: 87,
            location: "Bengaluru, Karnataka",
            domain: "App Development",
            vacancy: "3 positions available",
            description:
                "Creating useful mobile applications and digital experiences.",
            image:
                "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=85"
        }

    ];


    const recommendationGrid =
        document.getElementById("recommendationGrid");

    recommendationGrid.innerHTML = "";


    teams.forEach(function (team, index) {

        const card =
            document.createElement("div");

        card.className = "team-card";

        card.innerHTML = `

            <div class="team-image">

                <img
                    src="${team.image}"
                    alt="${team.name} team"
                >

                <span class="match-badge">
                    ${team.compatibility}% Match
                </span>

            </div>


            <div class="team-body">

                <h3>${team.name}</h3>

                <p class="team-description">
                    ${team.description}
                </p>


                <div class="team-meta">

                    <span class="meta-tag">
                        ${team.domain}
                    </span>

                    <span class="meta-tag">
                        ${team.location}
                    </span>

                </div>


                <div class="team-footer">

                    <span class="vacancy">
                        ${team.vacancy}
                    </span>

                    <button
                        class="interest-btn"
                        data-team="${team.name}"
                    >
                        I'm Interested
                    </button>

                </div>

            </div>
        `;

        recommendationGrid.appendChild(card);

    });


    document.getElementById("teamCount").textContent =
        teams.length;


    // =========================
    // INTEREST BUTTON
    // =========================

    document
        .querySelectorAll(".interest-btn")
        .forEach(function (button) {

            button.addEventListener("click", function () {

                const teamName =
                    this.dataset.team;

                let interestedTeams =
                    JSON.parse(
                        localStorage.getItem(
                            "syncAI_interestedTeams"
                        )
                    ) || [];


                if (!interestedTeams.includes(teamName)) {

                    interestedTeams.push(teamName);

                    localStorage.setItem(
                        "syncAI_interestedTeams",
                        JSON.stringify(interestedTeams)
                    );

                    this.textContent = "Interest Sent";

                    this.style.background =
                        "#35a66f";

                    alert(
                        "Your interest has been sent to " +
                        teamName +
                        ".\n\nThe team leader can accept or reject your request."
                    );

                } else {

                    alert(
                        "You have already shown interest in this team."
                    );

                }

            });

        });


    // =========================
    // REFRESH
    // =========================

    document
        .getElementById("refreshBtn")
        .addEventListener("click", function () {

            this.textContent = "Refreshing...";

            setTimeout(() => {

                this.textContent =
                    "Refresh Recommendations";

                alert(
                    "AI recommendations refreshed based on your current profile."
                );

            }, 700);

        });


    // =========================
    // TEAM MATCHING
    // =========================

    document
        .getElementById("matchingBtn")
        .addEventListener("click", function () {

            window.location.href =
                "team-matching.html";

        });

});