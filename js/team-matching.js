/* =========================================
   SYNC AI - TEAM MATCHING
========================================= */


/* ---------- LOCATION DATA ---------- */

const locationData = {

    "South India": {

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
            "Thoothukudi",
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

        "Karnataka": [
            "Bengaluru",
            "Mysuru",
            "Mangaluru",
            "Hubballi",
            "Belagavi",
            "Tumakuru"
        ],

        "Andhra Pradesh": [
            "Visakhapatnam",
            "Vijayawada",
            "Guntur",
            "Tirupati",
            "Nellore",
            "Kurnool"
        ],

        "Telangana": [
            "Hyderabad",
            "Warangal",
            "Nizamabad",
            "Karimnagar",
            "Khammam"
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
            "New Delhi",
            "North Delhi",
            "South Delhi",
            "East Delhi",
            "West Delhi"
        ],

        "Haryana": [
            "Gurugram",
            "Faridabad",
            "Panipat",
            "Ambala",
            "Hisar"
        ],

        "Punjab": [
            "Amritsar",
            "Ludhiana",
            "Jalandhar",
            "Patiala",
            "Bathinda"
        ],

        "Rajasthan": [
            "Jaipur",
            "Jodhpur",
            "Udaipur",
            "Kota",
            "Ajmer"
        ],

        "Uttar Pradesh": [
            "Lucknow",
            "Noida",
            "Kanpur",
            "Agra",
            "Varanasi",
            "Prayagraj"
        ],

        "Uttarakhand": [
            "Dehradun",
            "Haridwar",
            "Nainital",
            "Almora"
        ],

        "Himachal Pradesh": [
            "Shimla",
            "Kangra",
            "Mandi",
            "Solan"
        ],

        "Jammu and Kashmir": [
            "Srinagar",
            "Jammu",
            "Anantnag",
            "Baramulla"
        ],

        "Ladakh": [
            "Leh",
            "Kargil"
        ],

        "Chandigarh": [
            "Chandigarh"
        ]
    }
};


/* ---------- DEMO TEAM DATA ---------- */

const teams = [

    {
        id: 1,
        name: "CodeCrafters",
        shortName: "CC",
        region: "South India",
        state: "Tamil Nadu",
        district: "Coimbatore",
        domain: "Web Development",
        skills: ["HTML", "JavaScript", "UI/UX"],
        members: 3,
        maxMembers: 5,
        compatibility: 94,
        description: "Building a smart web platform for students and hackathon communities.",
        created: 10
    },

    {
        id: 2,
        name: "AI Innovators",
        shortName: "AI",
        region: "South India",
        state: "Tamil Nadu",
        district: "Chennai",
        domain: "AI / Machine Learning",
        skills: ["Python", "ML", "Data Science"],
        members: 2,
        maxMembers: 4,
        compatibility: 91,
        description: "Looking for motivated students interested in practical AI solutions.",
        created: 8
    },

    {
        id: 3,
        name: "Tech Titans",
        shortName: "TT",
        region: "South India",
        state: "Tamil Nadu",
        district: "Thoothukudi",
        domain: "Web Development",
        skills: ["JavaScript", "Frontend", "Backend"],
        members: 3,
        maxMembers: 5,
        compatibility: 89,
        description: "A student team working on technology solutions for real-world problems.",
        created: 6
    },

    {
        id: 4,
        name: "NextGen Builders",
        shortName: "NB",
        region: "South India",
        state: "Karnataka",
        district: "Bengaluru",
        domain: "App Development",
        skills: ["Flutter", "Java", "UI Design"],
        members: 2,
        maxMembers: 5,
        compatibility: 87,
        description: "Creating useful mobile applications for students and communities.",
        created: 5
    },

    {
        id: 5,
        name: "Cyber Shield",
        shortName: "CS",
        region: "South India",
        state: "Kerala",
        district: "Kochi",
        domain: "Cyber Security",
        skills: ["Security", "Networking", "Linux"],
        members: 3,
        maxMembers: 4,
        compatibility: 84,
        description: "Interested in cybersecurity, secure systems and ethical technology.",
        created: 4
    },

    {
        id: 6,
        name: "Data Minds",
        shortName: "DM",
        region: "North India",
        state: "Delhi",
        district: "New Delhi",
        domain: "Data Science",
        skills: ["Python", "SQL", "Analytics"],
        members: 2,
        maxMembers: 5,
        compatibility: 82,
        description: "A data-focused team looking for students who enjoy analytics.",
        created: 3
    },

    {
        id: 7,
        name: "Cloud Crew",
        shortName: "CC",
        region: "North India",
        state: "Haryana",
        district: "Gurugram",
        domain: "Cloud / DevOps",
        skills: ["AWS", "Docker", "DevOps"],
        members: 3,
        maxMembers: 5,
        compatibility: 80,
        description: "Working on scalable cloud-based solutions for hackathons.",
        created: 2
    },

    {
        id: 8,
        name: "Design & Build",
        shortName: "DB",
        region: "South India",
        state: "Tamil Nadu",
        district: "Madurai",
        domain: "UI/UX",
        skills: ["Figma", "UX Research", "Design"],
        members: 2,
        maxMembers: 4,
        compatibility: 78,
        description: "Designers and developers building user-friendly digital products.",
        created: 1
    }

];


/* ---------- ELEMENTS ---------- */

const regionFilter = document.getElementById("regionFilter");
const stateFilter = document.getElementById("stateFilter");
const districtFilter = document.getElementById("districtFilter");
const domainFilter = document.getElementById("domainFilter");
const searchInput = document.getElementById("searchInput");
const sortFilter = document.getElementById("sortFilter");

const teamsContainer = document.getElementById("teamsContainer");
const noResults = document.getElementById("noResults");

const resultCount = document.getElementById("resultCount");

const locationTitle = document.getElementById("locationTitle");
const locationDescription = document.getElementById("locationDescription");

const clearFilters = document.getElementById("clearFilters");
const resetSearch = document.getElementById("resetSearch");


/* ---------- PROFILE ---------- */

function loadStudentProfile() {

    const student = JSON.parse(
        localStorage.getItem("syncAI_student")
    );

    if (!student) {
        return;
    }

    const name = student.fullName || student.name || "Student";

    document.getElementById("profileName").textContent = name;

    document.getElementById("profileAvatar").textContent =
        name.charAt(0).toUpperCase();
}

loadStudentProfile();


/* ---------- REGION CHANGE ---------- */

regionFilter.addEventListener("change", function () {

    const region = this.value;

    stateFilter.innerHTML =
        `<option value="all">All States</option>`;

    districtFilter.innerHTML =
        `<option value="all">All Districts</option>`;

    if (region !== "all") {

        const states = Object.keys(locationData[region]);

        states.forEach(state => {

            const option = document.createElement("option");

            option.value = state;
            option.textContent = state;

            stateFilter.appendChild(option);

        });
    }

    updateResults();
});


/* ---------- STATE CHANGE ---------- */

stateFilter.addEventListener("change", function () {

    const region = regionFilter.value;
    const state = this.value;

    districtFilter.innerHTML =
        `<option value="all">All Districts</option>`;

    if (region !== "all" && state !== "all") {

        const districts = locationData[region][state];

        districts.forEach(district => {

            const option = document.createElement("option");

            option.value = district;
            option.textContent = district;

            districtFilter.appendChild(option);

        });
    }

    updateResults();
});


/* ---------- DISTRICT CHANGE ---------- */

districtFilter.addEventListener("change", function () {

    updateResults();

});


/* ---------- OTHER FILTERS ---------- */

domainFilter.addEventListener("change", updateResults);
searchInput.addEventListener("input", updateResults);
sortFilter.addEventListener("change", updateResults);


/* ---------- UPDATE LOCATION TEXT ---------- */

function updateLocationText() {

    const region = regionFilter.value;
    const state = stateFilter.value;
    const district = districtFilter.value;

    if (district !== "all") {

        locationTitle.textContent =
            `Showing teams from ${district}`;

        locationDescription.textContent =
            `${district} teams matching your selected criteria.`;

    } else if (state !== "all") {

        locationTitle.textContent =
            `Showing teams from ${state}`;

        locationDescription.textContent =
            `${state} teams matching your selected criteria.`;

    } else if (region !== "all") {

        locationTitle.textContent =
            `Showing teams from ${region}`;

        locationDescription.textContent =
            `${region} teams matching your selected criteria.`;

    } else {

        locationTitle.textContent =
            "Showing teams from all locations";

        locationDescription.textContent =
            "Select a region, state or district to narrow your search.";
    }
}


/* ---------- FILTER TEAMS ---------- */

function getFilteredTeams() {

    const region = regionFilter.value;
    const state = stateFilter.value;
    const district = districtFilter.value;
    const domain = domainFilter.value;

    const search = searchInput.value
        .trim()
        .toLowerCase();

    let filtered = teams.filter(team => {

        const regionMatch =
            region === "all" ||
            team.region === region;

        const stateMatch =
            state === "all" ||
            team.state === state;

        const districtMatch =
            district === "all" ||
            team.district === district;

        const domainMatch =
            domain === "all" ||
            team.domain === domain;

        const searchMatch =
            search === "" ||
            team.name.toLowerCase().includes(search) ||
            team.domain.toLowerCase().includes(search) ||
            team.skills.some(skill =>
                skill.toLowerCase().includes(search)
            );

        return (
            regionMatch &&
            stateMatch &&
            districtMatch &&
            domainMatch &&
            searchMatch
        );

    });


    /* SORT */

    if (sortFilter.value === "compatibility") {

        filtered.sort(
            (a, b) => b.compatibility - a.compatibility
        );

    }

    else if (sortFilter.value === "vacancy") {

        filtered.sort(
            (a, b) =>
                (b.maxMembers - b.members) -
                (a.maxMembers - a.members)
        );

    }

    else if (sortFilter.value === "recent") {

        filtered.sort(
            (a, b) => b.created - a.created
        );

    }

    return filtered;
}


/* ---------- RENDER TEAMS ---------- */

function renderTeams() {

    const filteredTeams = getFilteredTeams();

    teamsContainer.innerHTML = "";

    resultCount.textContent =
        `${filteredTeams.length} team${filteredTeams.length !== 1 ? "s" : ""} found`;

    updateLocationText();


    if (filteredTeams.length === 0) {

        noResults.classList.remove("hidden");

        return;
    }

    noResults.classList.add("hidden");


    filteredTeams.forEach(team => {

        const vacancy =
            team.maxMembers - team.members;

        const card = document.createElement("div");

        card.className = "team-card";

        card.innerHTML = `

            <div class="team-top">

                <div class="team-info">

                    <div class="team-logo">
                        ${team.shortName}
                    </div>

                    <div>

                        <h3>${team.name}</h3>

                        <p>
                            ${team.domain}
                        </p>

                    </div>

                </div>

                <div class="compatibility">
                    ${team.compatibility}% Match
                </div>

            </div>


            <p class="team-description">
                ${team.description}
            </p>


            <div class="team-tags">

                ${team.skills.map(skill => `
                    <span class="team-tag">
                        ${skill}
                    </span>
                `).join("")}

            </div>


            <div class="team-details">

                <div class="detail-item">

                    Location

                    <strong>
                        ${team.district}, ${team.state}
                    </strong>

                </div>


                <div class="detail-item">

                    Region

                    <strong>
                        ${team.region}
                    </strong>

                </div>


                <div class="detail-item">

                    Team Size

                    <strong>
                        ${team.members}/${team.maxMembers} Members
                    </strong>

                </div>


                <div class="detail-item">

                    Vacancies

                    <strong>
                        ${vacancy} Position${vacancy !== 1 ? "s" : ""}
                    </strong>

                </div>

            </div>


            <div class="team-bottom">

                <span class="member-count">
                    ${vacancy} opening${vacancy !== 1 ? "s" : ""}
                </span>

                <button
                    class="interest-btn"
                    data-team-id="${team.id}"
                >
                    I'm Interested
                </button>

            </div>

        `;

        teamsContainer.appendChild(card);

    });


    attachInterestButtons();
}


/* ---------- INTEREST BUTTON ---------- */

function attachInterestButtons() {

    const buttons =
        document.querySelectorAll(".interest-btn");

    const interestedTeams =
        JSON.parse(
            localStorage.getItem("syncAI_interestedTeams") || "[]"
        );


    buttons.forEach(button => {

        const teamId =
            Number(button.dataset.teamId);

        if (interestedTeams.includes(teamId)) {

            button.textContent = "Interested ✓";

            button.classList.add("interested");
        }


        button.addEventListener("click", async function () {

            let saved =
                JSON.parse(
                    localStorage.getItem("syncAI_interestedTeams") || "[]"
                );


            if (saved.includes(teamId)) {

                saved = saved.filter(
                    id => id !== teamId
                );

                button.textContent = "I'm Interested";
                button.classList.remove("interested");

            } else {

                saved.push(teamId);
                button.textContent = "Interested ✓";
                button.classList.add("interested");

                // Call backend API
                const email = localStorage.getItem("syncAI_email");
                const student = JSON.parse(localStorage.getItem("syncAI_student") || "{}");
                if (window.syncApi && email) {
                    try {
                        await window.syncApi.teams.apply(teamId, {
                            email,
                            studentName: student.fullName || student.name || "Student"
                        });
                    } catch (e) {
                        console.warn("Backend team apply warning:", e.message);
                    }
                }
            }


            localStorage.setItem(
                "syncAI_interestedTeams",
                JSON.stringify(saved)
            );

        });


    });
}


/* ---------- CLEAR FILTERS ---------- */

function resetFilters() {

    regionFilter.value = "all";

    stateFilter.innerHTML =
        `<option value="all">All States</option>`;

    districtFilter.innerHTML =
        `<option value="all">All Districts</option>`;

    domainFilter.value = "all";

    searchInput.value = "";

    sortFilter.value = "compatibility";

    updateResults();
}


clearFilters.addEventListener(
    "click",
    resetFilters
);

resetSearch.addEventListener(
    "click",
    resetFilters
);


/* ---------- UPDATE ---------- */

function updateResults() {

    renderTeams();

}


/* ---------- INITIAL LOAD ---------- */

renderTeams();