const dbStore = require("../data/dbStore");

exports.getHackathons = async (req, res) => {
    try {
        const { domain, mode, search } = req.query;
        let hackathons = await dbStore.hackathons.find();

        if (domain && domain !== "all") {
            hackathons = hackathons.filter(h =>
                h.domain.toLowerCase().includes(domain.toLowerCase())
            );
        }

        if (mode && mode !== "all") {
            hackathons = hackathons.filter(h =>
                h.mode.toLowerCase() === mode.toLowerCase()
            );
        }

        if (search) {
            const q = search.toLowerCase();
            hackathons = hackathons.filter(h =>
                h.title.toLowerCase().includes(q) ||
                h.organizer.toLowerCase().includes(q) ||
                h.domain.toLowerCase().includes(q) ||
                (h.tags && h.tags.some(t => t.toLowerCase().includes(q)))
            );
        }

        res.status(200).json({
            success: true,
            total: hackathons.length,
            hackathons
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.bookmarkHackathon = async (req, res) => {
    try {
        const { id } = req.params;
        const { email } = req.body;
        const hackathon = await dbStore.hackathons.findById(id);

        if (!hackathon) {
            return res.status(404).json({ success: false, message: "Hackathon not found." });
        }

        const bookmarkedBy = hackathon.bookmarkedBy || [];
        const index = bookmarkedBy.indexOf(email);
        let bookmarked = false;

        if (index === -1) {
            bookmarkedBy.push(email);
            bookmarked = true;
        } else {
            bookmarkedBy.splice(index, 1);
            bookmarked = false;
        }

        await dbStore.hackathons.updateOne({ id }, { bookmarkedBy });

        res.status(200).json({
            success: true,
            bookmarked,
            message: bookmarked ? "Hackathon saved to bookmarks!" : "Bookmark removed."
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.registerHackathon = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, teamName } = req.body;
        const hackathon = await dbStore.hackathons.findById(id);

        if (!hackathon) {
            return res.status(404).json({ success: false, message: "Hackathon not found." });
        }

        const registeredUsers = hackathon.registeredUsers || [];
        if (!registeredUsers.includes(email)) {
            registeredUsers.push(email);
            await dbStore.hackathons.updateOne({ id }, { registeredUsers });
        }

        res.status(200).json({
            success: true,
            message: `Successfully registered for ${hackathon.title}! Best of luck!`,
            registration: {
                hackathonId: id,
                hackathonTitle: hackathon.title,
                registeredAt: new Date().toISOString()
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
