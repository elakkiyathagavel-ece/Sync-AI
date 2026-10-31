/* =========================================
   SYNC AI - FIND HACKATHONS JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       ELEMENTS
    ===================================== */

    const searchInput =
        document.getElementById("searchInput");

    const domainFilter =
        document.getElementById("domainFilter");

    const modeFilter =
        document.getElementById("modeFilter");

    const locationFilter =
        document.getElementById("locationFilter");

    const deadlineFilter =
        document.getElementById("deadlineFilter");

    const sortFilter =
        document.getElementById("sortFilter");

    const clearFilters =
        document.getElementById("clearFilters");

    const hackathonGrid =
        document.getElementById("hackathonGrid");

    const resultCount =
        document.getElementById("resultCount");

    const noResults =
        document.getElementById("noResults");

    const notificationBtn =
        document.getElementById("notificationBtn");

    const profileBtn =
        document.getElementById("profileBtn");


    /* =====================================
       STUDENT DATA
    ===================================== */

    let student = {};

    try {
        student = JSON.parse(
            localStorage.getItem("syncAI_student") || "{}"
        );
    } catch (error) {
        student = {};
    }


    const studentName =
        student.fullName ||
        student.name ||
        student.username ||
        "Student";


    const firstLetter =
        studentName
            .trim()
            .charAt(0)
            .toUpperCase() || "S";


    document.getElementById("topUserName").textContent =
        studentName;

    document.getElementById("topAvatar").textContent =
        firstLetter;


    /* =====================================
       HACKATHON DATA
    ===================================== */

    const hackathonData = {

        "ai-future": {
            title: "AI Future Builders",
            organizer: "Student Innovation Network",
            domain: "AI / Machine Learning",
            mode: "Online",
            location: "Online",
            prize: "₹1,00,000",
            deadline: "7 Days Left"
        },

        "web-build": {
            title: "Web Build Challenge",
            organizer: "Campus Tech Community",
            domain: "Web Development",
            mode: "Offline",
            location: "Coimbatore",
            prize: "₹75,000",
            deadline: "12 Days Left"
        },

        "cyber-shield": {
            title: "Cyber Shield Hackathon",
            organizer: "SecureTech Community",
            domain: "Cyber Security",
            mode: "Hybrid",
            location: "Chennai",
            prize: "₹1,50,000",
            deadline: "18 Days Left"
        },

        "app-innovate": {
            title: "App Innovate 2026",
            organizer: "Developer Community India",
            domain: "App Development",
            mode: "Offline",
            location: "Bengaluru",
            prize: "₹2,00,000",
            deadline: "21 Days Left"
        },

        "data-minds": {
            title: "Data Minds Challenge",
            organizer: "Open Data Community",
            domain: "Data Science",
            mode: "Online",
            location: "Online",
            prize: "₹1,25,000",
            deadline: "25 Days Left"
        },

        "design-sprint": {
            title: "Design Sprint Challenge",
            organizer: "Design & Innovation Club",
            domain: "UI/UX",
            mode: "Offline",
            location: "Tamil Nadu",
            prize: "₹60,000",
            deadline: "16 Days Left"
        },

        "cloud-build": {
            title: "Cloud Build India",
            organizer: "Cloud Developer Network",
            domain: "Cloud / DevOps",
            mode: "Hybrid",
            location: "India",
            prize: "₹1,75,000",
            deadline: "30 Days Left"
        },

        "web3-builders": {
            title: "Web3 Builders Hackathon",
            organizer: "Web3 Student Community",
            domain: "Blockchain / Web3",
            mode: "Online",
            location: "Online",
            prize: "₹2,50,000",
            deadline: "35 Days Left"
        }

    };


    /* =====================================
       SAVED HACKATHONS
    ===================================== */

    let savedHackathons = [];

    try {
        savedHackathons = JSON.parse(
            localStorage.getItem(
                "syncAI_savedHackathons"
            ) || "[]"
        );
    } catch (error) {
        savedHackathons = [];
    }


    function saveHackathons() {

        localStorage.setItem(
            "syncAI_savedHackathons",
            JSON.stringify(savedHackathons)
        );

    }


    /* =====================================
       UPDATE SAVE BUTTONS
    ===================================== */

    function updateSavedButtons() {

        document
            .querySelectorAll(".save-btn")
            .forEach(button => {

                const id =
                    button.dataset.id;

                if (
                    savedHackathons.includes(id)
                ) {

                    button.classList.add("saved");

                    button.textContent = "♥";

                } else {

                    button.classList.remove("saved");

                    button.textContent = "♡";

                }

            });

    }


    updateSavedButtons();


    /* =====================================
       FILTER FUNCTION
    ===================================== */

    function filterHackathons() {

        const search =
            searchInput.value
                .trim()
                .toLowerCase();

        const domain =
            domainFilter.value;

        const mode =
            modeFilter.value;

        const location =
            locationFilter.value;

        const deadline =
            deadlineFilter.value;


        const cards =
            Array.from(
                document.querySelectorAll(
                    ".hackathon-card"
                )
            );


        let visibleCards = [];


        cards.forEach(card => {

            const title =
                card
                    .querySelector("h3")
                    .textContent
                    .toLowerCase();

            const organizer =
                card
                    .querySelector(".organizer")
                    .textContent
                    .toLowerCase();

            const cardDomain =
                card.dataset.domain;

            const cardMode =
                card.dataset.mode;

            const cardLocation =
                card.dataset.location;

            const days =
                Number(card.dataset.deadline);


            const matchesSearch =
                !search ||
                title.includes(search) ||
                organizer.includes(search) ||
                cardDomain.toLowerCase().includes(search);


            const matchesDomain =
                domain === "all" ||
                cardDomain === domain;


            const matchesMode =
                mode === "all" ||
                cardMode === mode;


            const matchesLocation =
                location === "all" ||
                cardLocation === location ||
                (
                    location === "India" &&
                    cardLocation !== "Online"
                ) ||
                (
                    location === "Tamil Nadu" &&
                    (
                        cardLocation === "Coimbatore" ||
                        cardLocation === "Chennai" ||
                        cardLocation === "Tamil Nadu"
                    )
                );


            let matchesDeadline = true;

            if (deadline === "week") {
                matchesDeadline = days <= 7;
            }

            if (deadline === "month") {
                matchesDeadline = days <= 30;
            }


            const visible =
                matchesSearch &&
                matchesDomain &&
                matchesMode &&
                matchesLocation &&
                matchesDeadline;


            if (visible) {

                card.style.display = "block";

                visibleCards.push(card);

            } else {

                card.style.display = "none";

            }

        });


        resultCount.textContent =
            `${visibleCards.length} hackathon${
                visibleCards.length !== 1 ? "s" : ""
            } found`;


        if (visibleCards.length === 0) {

            noResults.style.display = "block";

        } else {

            noResults.style.display = "none";

        }

    }


    /* =====================================
       SEARCH EVENTS
    ===================================== */

    searchInput.addEventListener(
        "input",
        filterHackathons
    );


    domainFilter.addEventListener(
        "change",
        filterHackathons
    );


    modeFilter.addEventListener(
        "change",
        filterHackathons
    );


    locationFilter.addEventListener(
        "change",
        filterHackathons
    );


    deadlineFilter.addEventListener(
        "change",
        filterHackathons
    );


    /* =====================================
       CLEAR FILTERS
    ===================================== */

    clearFilters.addEventListener(
        "click",
        () => {

            searchInput.value = "";

            domainFilter.value = "all";

            modeFilter.value = "all";

            locationFilter.value = "all";

            deadlineFilter.value = "all";

            sortFilter.value = "recommended";

            filterHackathons();

        }
    );


    /* =====================================
       SORT
    ===================================== */

    sortFilter.addEventListener(
        "change",
        () => {

            const cards =
                Array.from(
                    document.querySelectorAll(
                        ".hackathon-card"
                    )
                );


            if (
                sortFilter.value === "deadline"
            ) {

                cards.sort(
                    (a, b) =>
                        Number(a.dataset.deadline) -
                        Number(b.dataset.deadline)
                );

            }


            if (
                sortFilter.value === "prize"
            ) {

                cards.sort(
                    (a, b) =>
                        Number(b.dataset.prize) -
                        Number(a.dataset.prize)
                );

            }


            cards.forEach(card => {

                hackathonGrid.appendChild(card);

            });


            filterHackathons();

        }
    );


    /* =====================================
       SAVE BUTTON
    ===================================== */

    document
        .querySelectorAll(".save-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        button.dataset.id;


                    if (
                        savedHackathons.includes(id)
                    ) {

                        savedHackathons =
                            savedHackathons.filter(
                                item => item !== id
                            );

                    } else {

                        savedHackathons.push(id);

                    }


                    saveHackathons();

                    updateSavedButtons();

                }
            );

        });


    /* =====================================
       MODAL ELEMENTS
    ===================================== */

    const detailsModal =
        document.getElementById(
            "detailsModal"
        );

    const modalClose =
        document.getElementById(
            "modalClose"
        );

    const modalTitle =
        document.getElementById(
            "modalTitle"
        );

    const modalOrganizer =
        document.getElementById(
            "modalOrganizer"
        );

    const modalDomain =
        document.getElementById(
            "modalDomain"
        );

    const modalMode =
        document.getElementById(
            "modalMode"
        );

    const modalLocation =
        document.getElementById(
            "modalLocation"
        );

    const modalPrize =
        document.getElementById(
            "modalPrize"
        );

    const modalDeadline =
        document.getElementById(
            "modalDeadline"
        );

    const modalAction =
        document.getElementById(
            "modalAction"
        );


    let currentModalId = "";


    /* =====================================
       OPEN DETAILS
    ===================================== */

    document
        .querySelectorAll(".details-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        button.dataset.id;

                    const data =
                        hackathonData[id];

                    if (!data) {
                        return;
                    }


                    currentModalId = id;


                    modalTitle.textContent =
                        data.title;

                    modalOrganizer.textContent =
                        data.organizer;

                    modalDomain.textContent =
                        data.domain;

                    modalMode.textContent =
                        data.mode;

                    modalLocation.textContent =
                        data.location;

                    modalPrize.textContent =
                        data.prize;

                    modalDeadline.textContent =
                        data.deadline;


                    updateModalButton();


                    detailsModal.classList.add(
                        "show"
                    );

                }
            );

        });


    /* =====================================
       MODAL SAVE
    ===================================== */

    function updateModalButton() {

        if (
            savedHackathons.includes(
                currentModalId
            )
        ) {

            modalAction.textContent =
                "Remove from Saved";

        } else {

            modalAction.textContent =
                "Save Hackathon";

        }

    }


    modalAction.addEventListener(
        "click",
        () => {

            if (
                savedHackathons.includes(
                    currentModalId
                )
            ) {

                savedHackathons =
                    savedHackathons.filter(
                        id =>
                            id !== currentModalId
                    );

            } else {

                savedHackathons.push(
                    currentModalId
                );

            }


            saveHackathons();

            updateSavedButtons();

            updateModalButton();

        }
    );


    /* =====================================
       CLOSE MODAL
    ===================================== */

    modalClose.addEventListener(
        "click",
        () => {

            detailsModal.classList.remove(
                "show"
            );

        }
    );


    detailsModal.addEventListener(
        "click",
        event => {

            if (
                event.target === detailsModal
            ) {

                detailsModal.classList.remove(
                    "show"
                );

            }

        }
    );


    /* =====================================
       NAVIGATION
    ===================================== */

    notificationBtn.addEventListener(
        "click",
        () => {

            window.location.href =
                "notifications.html";

        }
    );


    profileBtn.addEventListener(
        "click",
        () => {

            window.location.href =
                "profile.html";

        }
    );


    /* =====================================
       FOOTER
    ===================================== */

    document.getElementById(
        "footerYear"
    ).textContent =
        new Date().getFullYear();


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
                link
                    .getAttribute("href")
                    ?.split("/")
                    .pop()
                    .toLowerCase();


            if (linkPage === currentPage) {

                link.classList.add("active");

            } else {

                link.classList.remove("active");

            }

        });


    /* =====================================
       INITIAL FILTER
    ===================================== */

    filterHackathons();

});