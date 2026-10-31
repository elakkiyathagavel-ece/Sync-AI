/* ==========================================================
   SYNC AI - COMPREHENSIVE CLIENT API CLIENT
   Connects all frontend pages to the SYNC AI backend
   ========================================================== */

const API_BASE_URL = "http://localhost:5000/api";

async function apiRequest(endpoint, options = {}) {
    const userEmail = localStorage.getItem("syncAI_email") || "";
    const headers = {
        "Content-Type": "application/json",
        "x-user-email": userEmail,
        ...(options.headers || {})
    };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || `API error (${response.status})`);
        }

        return data;
    } catch (error) {
        console.warn(`SYNC AI API Notice (${endpoint}):`, error.message);
        throw error;
    }
}

const syncApi = {
    // AUTHENTICATION
    auth: {
        async signup(userData) {
            return await apiRequest("/auth/signup", {
                method: "POST",
                body: JSON.stringify(userData)
            });
        },

        async login(credentials) {
            return await apiRequest("/auth/login", {
                method: "POST",
                body: JSON.stringify(credentials)
            });
        },

        async verifyOtp(payload) {
            return await apiRequest("/auth/verify-otp", {
                method: "POST",
                body: JSON.stringify(payload)
            });
        },

        async resendOtp(email) {
            return await apiRequest("/auth/resend-otp", {
                method: "POST",
                body: JSON.stringify({ email })
            });
        },

        async getMe(email) {
            return await apiRequest(`/auth/me?email=${encodeURIComponent(email)}`);
        }
    },

    // PROFILE (ONE TIME CREATION & PERSISTENCE)
    profile: {
        async save(profileData) {
            return await apiRequest("/profile", {
                method: "POST",
                body: JSON.stringify(profileData)
            });
        },

        async get(email) {
            return await apiRequest(`/profile?email=${encodeURIComponent(email)}`);
        },

        async updateSkills(email, skills) {
            return await apiRequest("/profile/skills", {
                method: "PUT",
                body: JSON.stringify({ email, skills })
            });
        }
    },

    // ASSESSMENT
    assessment: {
        async getQuestions() {
            return await apiRequest("/assessment/questions");
        },

        async submit(email, answers) {
            return await apiRequest("/assessment/submit", {
                method: "POST",
                body: JSON.stringify({ email, answers })
            });
        }
    },

    // HACKATHONS
    hackathons: {
        async getAll(params = {}) {
            const query = new URLSearchParams(params).toString();
            return await apiRequest(`/hackathons?${query}`);
        },

        async bookmark(id, email) {
            return await apiRequest(`/hackathons/${id}/bookmark`, {
                method: "POST",
                body: JSON.stringify({ email })
            });
        },

        async register(id, data) {
            return await apiRequest(`/hackathons/${id}/register`, {
                method: "POST",
                body: JSON.stringify(data)
            });
        }
    },

    // TEAMS & AI MATCHING
    teams: {
        async getAll(params = {}) {
            const query = new URLSearchParams(params).toString();
            return await apiRequest(`/teams?${query}`);
        },

        async create(teamData) {
            return await apiRequest("/teams", {
                method: "POST",
                body: JSON.stringify(teamData)
            });
        },

        async match(payload) {
            return await apiRequest("/teams/match", {
                method: "POST",
                body: JSON.stringify(payload)
            });
        },

        async apply(id, data) {
            return await apiRequest(`/teams/${id}/apply`, {
                method: "POST",
                body: JSON.stringify(data)
            });
        },

        async getMyTeams(email) {
            return await apiRequest(`/teams/my-teams?email=${encodeURIComponent(email || "")}`);
        }
    },

    // CHAT & AI COPILOT
    chat: {
        async getConversations() {
            return await apiRequest("/chat/conversations");
        },

        async getMessages(conversationId) {
            return await apiRequest(`/chat/${conversationId}/messages`);
        },

        async sendMessage(conversationId, messageData) {
            return await apiRequest(`/chat/${conversationId}/messages`, {
                method: "POST",
                body: JSON.stringify(messageData)
            });
        }
    },

    // GROWTH & PROGRESS
    growth: {
        async getStats(email) {
            return await apiRequest(`/growth/stats?email=${encodeURIComponent(email || "")}`);
        }
    },

    // NOTIFICATIONS
    notifications: {
        async getAll() {
            return await apiRequest("/notifications");
        },

        async markRead(id) {
            return await apiRequest(`/notifications/${id}/read`, {
                method: "PUT"
            });
        }
    },

    // SETTINGS
    settings: {
        async get(email) {
            return await apiRequest(`/settings?email=${encodeURIComponent(email || "")}`);
        },

        async update(email, settings) {
            return await apiRequest("/settings", {
                method: "PUT",
                body: JSON.stringify({ email, settings })
            });
        }
    },

    // AI RECOMMENDATIONS
    ai: {
        async getRecommendations(email) {
            return await apiRequest(`/ai/recommendations?email=${encodeURIComponent(email || "")}`);
        }
    }
};

// Global export
window.syncApi = syncApi;
window.apiRequest = apiRequest;