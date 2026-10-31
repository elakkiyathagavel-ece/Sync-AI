document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // ACCESS PROTECTION
    // =========================

    const student = JSON.parse(localStorage.getItem("syncAI_student"));

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

    if (localStorage.getItem("syncAI_profileCompleted") !== "true") {
        window.location.href = "profile-setup.html";
        return;
    }


    // =========================
    // STUDENT NAME
    // =========================

    const studentName =
        student.fullName ||
        student.name ||
        "Student";

    document.getElementById("sidebarName").textContent = studentName;

    document.getElementById("sidebarAvatar").textContent =
        studentName.charAt(0).toUpperCase();


    // =========================
    // TEAM DATA
    // =========================

    let myTeam = JSON.parse(
        localStorage.getItem("syncAI_myTeam")
    );


    // Demo team for prototype

    if (!myTeam) {

        myTeam = {

            name: "CodeCrafters",

            description:
                "A collaborative team focused on building innovative web solutions.",

            compatibility: 94,

            hackathon: "HackACE 2026",

            hackathonMode: "Hybrid • Open Innovation",

            location: "Coimbatore",

            state: "Tamil Nadu",

            region: "South India",

            domain: "Web Development",

            maxMembers: 5,

            members: [

                {
                    name: studentName,
                    role: "Team Member",
                    skills: "HTML • CSS • JavaScript",
                    isCurrentUser: true
                },

                {
                    name: "Arun Kumar",
                    role: "Team Leader",
                    skills: "JavaScript • Node.js • Backend"
                },

                {
                    name: "Meena Priya",
                    role: "Team Member",
                    skills: "UI/UX • Figma • Frontend"
                }

            ]

        };

        localStorage.setItem(
            "syncAI_myTeam",
            JSON.stringify(myTeam)
        );
    }


    // =========================
    // TEAM INFORMATION
    // =========================

    document.getElementById("teamName").textContent =
        myTeam.name;

    document.getElementById("teamDescription").textContent =
        myTeam.description;

    document.getElementById("compatibilityScore").textContent =
        myTeam.compatibility + "%";

    document.getElementById("hackathonName").textContent =
        myTeam.hackathon;

    document.getElementById("hackathonMode").textContent =
        myTeam.hackathonMode;

    document.getElementById("teamLocation").textContent =
        myTeam.location;

    document.getElementById("teamRegion").textContent =
        myTeam.state + " • " + myTeam.region;

    document.getElementById("teamDomain").textContent =
        myTeam.domain;

    document.getElementById("memberCount").textContent =
        myTeam.members.length;

    document.getElementById("maxMembers").textContent =
        myTeam.maxMembers;


    const vacancies =
        myTeam.maxMembers - myTeam.members.length;

    document.getElementById("vacancyText").textContent =
        vacancies > 0
            ? vacancies + " positions available"
            : "Team is full";


    // =========================
    // MEMBERS
    // =========================

    const membersList =
        document.getElementById("membersList");

    membersList.innerHTML = "";

    myTeam.members.forEach(function (member) {

        const firstLetter =
            member.name.charAt(0).toUpperCase();

        const memberCard =
            document.createElement("div");

        memberCard.className = "member-card";

        memberCard.innerHTML = `
            <div class="member-avatar">
                ${firstLetter}
            </div>

            <div class="member-info">
                <strong>${member.name}</strong>
                <span>${member.skills}</span>
                <span class="member-role">${member.role}</span>
            </div>
        `;

        membersList.appendChild(memberCard);
    });


    // =========================
    // CREATE TEAM
    // =========================

    document
        .getElementById("createTeamBtn")
        .addEventListener("click", function () {

            alert(
                "Create Team feature is ready for the next stage.\n\n" +
                "You will be able to choose:\n" +
                "• Team Name\n" +
                "• Hackathon\n" +
                "• Domain\n" +
                "• Region\n" +
                "• State\n" +
                "• District\n" +
                "• Required Skills\n" +
                "• Team Size"
            );

        });


    // =========================
    // INVITE MEMBER
    // =========================

    document
        .getElementById("inviteBtn")
        .addEventListener("click", function () {

            if (vacancies <= 0) {

                alert("Your team is already full.");

                return;
            }

            alert(
                "Invite Member\n\n" +
                "You can invite compatible students from Team Matching."
            );

        });


    // =========================
    // TEAM INFORMATION
    // =========================

    document
        .getElementById("teamInfoBtn")
        .addEventListener("click", function () {

            alert(
                "Team: " + myTeam.name +
                "\nHackathon: " + myTeam.hackathon +
                "\nDomain: " + myTeam.domain +
                "\nLocation: " + myTeam.location +
                "\nState: " + myTeam.state +
                "\nRegion: " + myTeam.region +
                "\nCompatibility: " +
                myTeam.compatibility + "%"
            );

        });


    // =========================
    // LEAVE TEAM
    // =========================

    document
        .getElementById("leaveTeamBtn")
        .addEventListener("click", function () {

            const confirmLeave = confirm(
                "Are you sure you want to leave this team?"
            );

            if (!confirmLeave) {
                return;
            }

            myTeam.members =
                myTeam.members.filter(function (member) {
                    return !member.isCurrentUser;
                });

            localStorage.setItem(
                "syncAI_myTeam",
                JSON.stringify(myTeam)
            );

            alert(
                "You have left the team."
            );

            window.location.href =
                "team-matching.html";

        });

});