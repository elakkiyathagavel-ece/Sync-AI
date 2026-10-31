document.addEventListener("DOMContentLoaded", () => {

    /* ================= ACCESS PROTECTION ================= */

    const studentData = JSON.parse(
        localStorage.getItem("syncAI_student") || "null"
    );

    const emailVerified =
        localStorage.getItem("syncAI_emailVerified") === "true";

    const assessmentCompleted =
        localStorage.getItem("syncAI_assessmentCompleted") === "true";

    const profileCompleted =
        localStorage.getItem("syncAI_profileCompleted") === "true";


    if (
        !studentData ||
        !emailVerified ||
        !assessmentCompleted ||
        !profileCompleted
    ) {
        window.location.href = "login.html";
        return;
    }


    /* ================= STUDENT ================= */

    const studentName =
        studentData.fullName ||
        studentData.name ||
        "Student";

    document.getElementById("profileName").textContent =
        studentName;

    document.getElementById("profileAvatar").textContent =
        studentName.charAt(0).toUpperCase();

    document.getElementById("currentStudentName").textContent =
        studentName;


    /* ================= DEFAULT NOTIFICATIONS ================= */

    const defaultNotifications = [

        {
            id: 1,
            type: "team",
            icon: "◉",
            title: "New Team Match Found",
            message:
                "SYNC AI found a strong team match based on your skills and preferred location.",
            time: "10 minutes ago",
            unread: true
        },

        {
            id: 2,
            type: "team",
            icon: "✦",
            title: "AI Recommendation Ready",
            message:
                "CodeCrafters matches your selected domain and team preferences.",
            time: "1 hour ago",
            unread: true
        },

        {
            id: 3,
            type: "hackathon",
            icon: "◆",
            title: "Hackathon Opportunity",
            message:
                "A new Web Development hackathon has been added to your discovery list.",
            time: "3 hours ago",
            unread: true
        },

        {
            id: 4,
            type: "growth",
            icon: "↗",
            title: "Growth Progress Updated",
            message:
                "Your learning progress has been recorded. Keep completing weekly activities.",
            time: "Yesterday",
            unread: false
        },

        {
            id: 5,
            type: "growth",
            icon: "★",
            title: "Skill Assessment Completed",
            message:
                "Your Verified Skill Score is now available in My Skills.",
            time: "Yesterday",
            unread: false
        },

        {
            id: 6,
            type: "team",
            icon: "◇",
            title: "Team Activity Update",
            message:
                "Your current team has updated its collaboration activity.",
            time: "2 days ago",
            unread: false
        },

        {
            id: 7,
            type: "hackathon",
            icon: "◈",
            title: "Hackathon Deadline Reminder",
            message:
                "Remember to check upcoming hackathon registration deadlines.",
            time: "3 days ago",
            unread: false
        },

        {
            id: 8,
            type: "system",
            icon: "✓",
            title: "Profile Verified",
            message:
                "Your college email and student profile information have been verified.",
            time: "4 days ago",
            unread: false
        }

    ];


    /* ================= STORAGE ================= */

    let notifications = JSON.parse(
        localStorage.getItem("syncAI_notifications") || "null"
    );

    if (!Array.isArray(notifications)) {
        notifications = defaultNotifications;
        saveNotifications();
    }


    function saveNotifications() {

        localStorage.setItem(
            "syncAI_notifications",
            JSON.stringify(notifications)
        );

        if (window.syncApi && window.syncApi.notifications) {
            window.syncApi.notifications.markRead("all").catch(e => {
                console.warn("Backend notification sync notice:", e.message);
            });
        }

    }



    /* ================= ELEMENTS ================= */

    const notificationList =
        document.getElementById("notificationList");

    const emptyState =
        document.getElementById("emptyState");

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    let currentFilter = "all";


    /* ================= RENDER ================= */

    function renderNotifications() {

        notificationList.innerHTML = "";

        let filtered = notifications;

        if (currentFilter !== "all") {

            filtered = notifications.filter(
                notification =>
                    notification.type === currentFilter
            );

        }


        const unread =
            notifications.filter(
                notification => notification.unread
            ).length;


        document.getElementById("totalCount").textContent =
            notifications.length;

        document.getElementById("unreadCount").textContent =
            unread;

        document.getElementById("todayCount").textContent =
            notifications.filter(notification =>
                notification.time.includes("minute") ||
                notification.time.includes("hour")
            ).length;


        document.getElementById("sidebarBadge").textContent =
            unread;

        document.getElementById("topBadge").textContent =
            unread;


        document.getElementById("sidebarBadge").style.display =
            unread > 0 ? "flex" : "none";

        document.getElementById("topBadge").style.display =
            unread > 0 ? "flex" : "none";


        document.getElementById("countLabel").textContent =
            `${filtered.length} notification${
                filtered.length !== 1 ? "s" : ""
            }`;


        if (filtered.length === 0) {

            emptyState.classList.remove("hidden");
            return;

        }

        emptyState.classList.add("hidden");


        filtered.forEach(notification => {

            const card =
                document.createElement("div");

            card.className =
                `notification-card ${notification.type} ${
                    notification.unread ? "unread" : ""
                }`;


            card.innerHTML = `

                <div class="notification-icon">
                    ${notification.icon}
                </div>

                <div class="notification-body">

                    <div class="notification-title-row">

                        <div class="notification-title">
                            ${notification.title}
                        </div>

                        ${
                            notification.unread
                            ? `<span class="unread-dot"></span>`
                            : ""
                        }

                    </div>

                    <div class="notification-message">
                        ${notification.message}
                    </div>

                    <div class="notification-time">
                        ${notification.time}
                    </div>

                </div>

                <div class="notification-actions-right">

                    ${
                        notification.unread
                        ? `
                            <button
                                class="read-btn"
                                data-action="read"
                                data-id="${notification.id}"
                                title="Mark as read">
                                ✓
                            </button>
                        `
                        : ""
                    }

                    <button
                        class="delete-btn"
                        data-action="delete"
                        data-id="${notification.id}"
                        title="Delete notification">
                        ×
                    </button>

                </div>

            `;


            notificationList.appendChild(card);

        });

    }


    /* ================= FILTER ================= */

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            currentFilter =
                button.dataset.filter;

            renderNotifications();

        });

    });


    /* ================= READ / DELETE ================= */

    notificationList.addEventListener("click", event => {

        const button =
            event.target.closest("button");

        if (!button) return;

        const id =
            Number(button.dataset.id);

        const action =
            button.dataset.action;


        if (action === "read") {

            notifications =
                notifications.map(notification => {

                    if (notification.id === id) {

                        return {
                            ...notification,
                            unread: false
                        };

                    }

                    return notification;

                });

            saveNotifications();
            renderNotifications();

        }


        if (action === "delete") {

            notifications =
                notifications.filter(
                    notification =>
                        notification.id !== id
                );

            saveNotifications();
            renderNotifications();

        }

    });


    /* ================= MARK ALL READ ================= */

    document
        .getElementById("markAllRead")
        .addEventListener("click", () => {

            notifications =
                notifications.map(notification => ({
                    ...notification,
                    unread: false
                }));

            saveNotifications();
            renderNotifications();

        });


    /* ================= SHOW ALL ================= */

    document
        .getElementById("showAllBtn")
        .addEventListener("click", () => {

            currentFilter = "all";

            filterButtons.forEach(button => {

                button.classList.toggle(
                    "active",
                    button.dataset.filter === "all"
                );

            });

            renderNotifications();

        });


    /* ================= INITIAL ================= */

    renderNotifications();

});