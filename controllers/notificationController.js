const dbStore = require("../data/dbStore");

exports.getNotifications = async (req, res) => {
    try {
        const notifications = await dbStore.notifications.find();
        res.status(200).json({
            success: true,
            total: notifications.length,
            unread: notifications.filter(n => !n.read).length,
            notifications
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        await dbStore.notifications.markRead(id);
        res.status(200).json({ success: true, message: "Notifications marked as read." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
