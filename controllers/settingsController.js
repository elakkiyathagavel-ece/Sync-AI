const dbStore = require("../data/dbStore");

exports.getSettings = async (req, res) => {
    try {
        const email = req.query.email || req.headers["x-user-email"];
        let settings = {
            emailNotifications: true,
            teamInvites: true,
            hackathonAlerts: true,
            showGrowthScore: true,
            profileVisibility: "public"
        };

        if (email) {
            const user = await dbStore.users.findOne({ collegeEmail: email.toLowerCase().trim() });
            if (user && user.settings) {
                settings = { ...settings, ...user.settings };
            }
        }

        res.status(200).json({ success: true, settings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateSettings = async (req, res) => {
    try {
        const { email, settings } = req.body;
        if (email && settings) {
            await dbStore.users.updateOne(
                { collegeEmail: email.toLowerCase().trim() },
                { settings }
            );
        }
        res.status(200).json({ success: true, message: "Settings updated successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
