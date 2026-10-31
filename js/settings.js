document.addEventListener("DOMContentLoaded", () => {

    /* ================= ACCESS ================= */

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


    /* ================= STUDENT INFO ================= */

    const studentName =
        studentData.fullName ||
        studentData.name ||
        "Student";

    const studentEmail =
        studentData.collegeEmail ||
        studentData.email ||
        "student@example.com";

    const college =
        studentData.collegeName ||
        studentData.college ||
        "Not provided";

    const department =
        studentData.department ||
        studentData.course ||
        "Not provided";


    document.getElementById("profileName").textContent =
        studentName;

    document.getElementById("profileAvatar").textContent =
        studentName.charAt(0).toUpperCase();

    document.getElementById("largeAvatar").textContent =
        studentName.charAt(0).toUpperCase();

    document.getElementById("accountName").textContent =
        studentName;

    document.getElementById("accountEmail").textContent =
        studentEmail;

    document.getElementById("fullName").value =
        studentName;

    document.getElementById("collegeEmail").value =
        studentEmail;

    document.getElementById("collegeName").value =
        college;

    document.getElementById("department").value =
        department;


    /* ================= SETTINGS STORAGE ================= */

    const defaultSettings = {

        teamAlerts: true,

        hackathonAlerts: true,

        growthAlerts: true,

        teamActivityAlerts: true,

        showGrowthScore: true,

        showLearningStreak: true,

        profileDiscoverability: true,

        showSkillScore: false,

        locationMatching: true,

        domainMatching: true,

        compactNotifications: false

    };


    let settings = JSON.parse(
        localStorage.getItem("syncAI_settings") || "null"
    );


    if (!settings) {

        settings = {
            ...defaultSettings
        };

        saveSettings();

    }


    function saveSettings() {
        localStorage.setItem(
            "syncAI_settings",
            JSON.stringify(settings)
        );

        const email = localStorage.getItem("syncAI_email");
        if (window.syncApi && email) {
            window.syncApi.settings.update(email, settings).catch(e => {
                console.warn("Backend settings sync notice:", e.message);
            });
        }
    }



    /* ================= LOAD SWITCHES ================= */

    const switchIds = Object.keys(defaultSettings);

    switchIds.forEach(id => {

        const element =
            document.getElementById(id);

        if (!element) return;

        element.checked =
            settings[id] !== undefined
                ? settings[id]
                : defaultSettings[id];

    });


    /* ================= UPDATE SWITCH ================= */

    switchIds.forEach(id => {

        const element =
            document.getElementById(id);

        if (!element) return;

        element.addEventListener("change", () => {

            settings[id] =
                element.checked;

            saveSettings();

            showSaveMessage(
                "Settings saved automatically."
            );

        });

    });


    /* ================= SETTINGS MENU ================= */

    const menuItems =
        document.querySelectorAll(
            ".settings-menu-item"
        );

    const panels =
        document.querySelectorAll(
            ".settings-panel"
        );


    menuItems.forEach(item => {

        item.addEventListener("click", () => {

            const section =
                item.dataset.section;


            menuItems.forEach(menu =>
                menu.classList.remove("active")
            );

            item.classList.add("active");


            panels.forEach(panel =>
                panel.classList.remove("active")
            );


            const selectedPanel =
                document.getElementById(section);

            if (selectedPanel) {
                selectedPanel.classList.add("active");
            }

        });

    });


    /* ================= LOCATION INFO ================= */

    const region =
        studentData.region ||
        studentData.preferredRegion ||
        "Not selected";

    const state =
        studentData.state ||
        studentData.preferredState ||
        "Not selected";

    const district =
        studentData.district ||
        studentData.preferredDistrict ||
        "Not selected";


    document.getElementById("userRegion").textContent =
        region;

    document.getElementById("userState").textContent =
        state;

    document.getElementById("userDistrict").textContent =
        district;


    /* ================= SAVE BUTTON ================= */

    document
        .getElementById("saveSettings")
        .addEventListener("click", () => {

            switchIds.forEach(id => {

                const element =
                    document.getElementById(id);

                if (element) {
                    settings[id] =
                        element.checked;
                }

            });


            saveSettings();

            showSaveMessage(
                "✓ Changes saved successfully."
            );

        });


    function showSaveMessage(message) {

        const messageElement =
            document.getElementById("saveMessage");

        messageElement.textContent =
            message;

        setTimeout(() => {

            messageElement.textContent =
                "Changes are saved automatically.";

        }, 2500);

    }


});