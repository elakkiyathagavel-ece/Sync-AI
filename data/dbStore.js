const fs = require("fs");
const path = require("path");
const { getIsConnected } = require("../config/db");
const User = require("../models/User");
const Hackathon = require("../models/Hackathon");
const Team = require("../models/Team");
const Message = require("../models/Message");
const Notification = require("../models/Notification");
const {
    defaultQuestions,
    defaultHackathons,
    defaultTeams,
    defaultNotifications
} = require("./seedData");

const DB_FILE = path.join(__dirname, "syncai_db.json");

// Helper to read JSON file
const readJSON = () => {
    try {
        if (!fs.existsSync(DB_FILE)) {
            const initialData = {
                users: [],
                hackathons: defaultHackathons,
                teams: defaultTeams,
                questions: defaultQuestions,
                notifications: defaultNotifications,
                messages: []
            };
            fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), "utf8");
            return initialData;
        }
        const data = fs.readFileSync(DB_FILE, "utf8");
        return JSON.parse(data);
    } catch (e) {
        console.error("Error reading JSON database:", e);
        return {
            users: [],
            hackathons: defaultHackathons,
            teams: defaultTeams,
            questions: defaultQuestions,
            notifications: defaultNotifications,
            messages: []
        };
    }
};

// Helper to write JSON file
const writeJSON = (data) => {
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
    } catch (e) {
        console.error("Error writing JSON database:", e);
    }
};

// Ensure JSON file is seeded
readJSON();

const dbStore = {
    // USERS
    users: {
        async findOne(query) {
            if (getIsConnected()) {
                try {
                    return await User.findOne(query);
                } catch (e) {
                    console.warn("Mongo findOne fallback:", e.message);
                }
            }
            const data = readJSON();
            return data.users.find(u => {
                for (const key of Object.keys(query)) {
                    if (u[key] !== query[key]) return false;
                }
                return true;
            }) || null;
        },

        async findById(id) {
            if (getIsConnected()) {
                try {
                    return await User.findById(id);
                } catch (e) {
                    console.warn("Mongo findById fallback:", e.message);
                }
            }
            const data = readJSON();
            return data.users.find(u => u._id === id || u.id === id) || null;
        },

        async create(userData) {
            if (getIsConnected()) {
                try {
                    return await User.create(userData);
                } catch (e) {
                    console.warn("Mongo create fallback:", e.message);
                }
            }
            const data = readJSON();
            const newUser = {
                _id: "user_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
                ...userData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            data.users.push(newUser);
            writeJSON(data);
            return newUser;
        },

        async updateOne(query, updateData) {
            if (getIsConnected()) {
                try {
                    return await User.findOneAndUpdate(query, updateData, { new: true });
                } catch (e) {
                    console.warn("Mongo update fallback:", e.message);
                }
            }
            const data = readJSON();
            const index = data.users.findIndex(u => {
                for (const key of Object.keys(query)) {
                    if (u[key] !== query[key]) return false;
                }
                return true;
            });
            if (index !== -1) {
                // If updateData has $set or direct fields
                const changes = updateData.$set ? updateData.$set : updateData;
                data.users[index] = {
                    ...data.users[index],
                    ...changes,
                    updatedAt: new Date().toISOString()
                };
                writeJSON(data);
                return data.users[index];
            }
            return null;
        }
    },

    // HACKATHONS
    hackathons: {
        async find(filter = {}) {
            if (getIsConnected()) {
                try {
                    const list = await Hackathon.find(filter);
                    if (list && list.length > 0) return list;
                } catch (e) {
                    console.warn("Mongo hackathons find fallback:", e.message);
                }
            }
            const data = readJSON();
            if (!data.hackathons || data.hackathons.length === 0) {
                data.hackathons = defaultHackathons;
                writeJSON(data);
            }
            let result = data.hackathons;
            if (filter.domain) {
                result = result.filter(h => h.domain.toLowerCase().includes(filter.domain.toLowerCase()));
            }
            if (filter.mode) {
                result = result.filter(h => h.mode.toLowerCase() === filter.mode.toLowerCase());
            }
            return result;
        },

        async findById(id) {
            if (getIsConnected()) {
                try {
                    const item = await Hackathon.findOne({ id });
                    if (item) return item;
                } catch (e) {}
            }
            const data = readJSON();
            return (data.hackathons || []).find(h => h.id === id) || null;
        },

        async updateOne(query, updateData) {
            const data = readJSON();
            const index = (data.hackathons || []).findIndex(h => h.id === query.id);
            if (index !== -1) {
                const changes = updateData.$set ? updateData.$set : updateData;
                data.hackathons[index] = { ...data.hackathons[index], ...changes };
                writeJSON(data);
                return data.hackathons[index];
            }
            return null;
        }
    },

    // TEAMS
    teams: {
        async find(filter = {}) {
            if (getIsConnected()) {
                try {
                    const list = await Team.find(filter);
                    if (list && list.length > 0) return list;
                } catch (e) {
                    console.warn("Mongo teams find fallback:", e.message);
                }
            }
            const data = readJSON();
            if (!data.teams || data.teams.length === 0) {
                data.teams = defaultTeams;
                writeJSON(data);
            }
            return data.teams;
        },

        async create(teamData) {
            if (getIsConnected()) {
                try {
                    return await Team.create(teamData);
                } catch (e) {}
            }
            const data = readJSON();
            const newTeam = {
                id: "team-" + Date.now(),
                ...teamData,
                createdAt: new Date().toISOString()
            };
            data.teams = data.teams || [];
            data.teams.push(newTeam);
            writeJSON(data);
            return newTeam;
        },

        async updateOne(query, updateData) {
            const data = readJSON();
            const index = (data.teams || []).findIndex(t => t.id === query.id);
            if (index !== -1) {
                const changes = updateData.$set ? updateData.$set : updateData;
                data.teams[index] = { ...data.teams[index], ...changes };
                writeJSON(data);
                return data.teams[index];
            }
            return null;
        }
    },

    // QUESTIONS
    questions: {
        async find() {
            const data = readJSON();
            return data.questions && data.questions.length > 0 ? data.questions : defaultQuestions;
        }
    },

    // NOTIFICATIONS
    notifications: {
        async find(filter = {}) {
            const data = readJSON();
            return data.notifications && data.notifications.length > 0 ? data.notifications : defaultNotifications;
        },
        async markRead(id) {
            const data = readJSON();
            data.notifications = (data.notifications || []).map(n => {
                if (n.id === id || id === "all") {
                    return { ...n, read: true };
                }
                return n;
            });
            writeJSON(data);
            return true;
        }
    },

    // MESSAGES
    messages: {
        async findByConversation(conversationId) {
            const data = readJSON();
            return (data.messages || []).filter(m => m.conversationId === conversationId);
        },
        async create(messageData) {
            const data = readJSON();
            data.messages = data.messages || [];
            const newMsg = {
                id: "msg_" + Date.now(),
                ...messageData,
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                createdAt: new Date().toISOString()
            };
            data.messages.push(newMsg);
            writeJSON(data);
            return newMsg;
        }
    }
};

module.exports = dbStore;
