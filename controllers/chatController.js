const dbStore = require("../data/dbStore");

const defaultConversations = [
    {
        id: "ai-assistant",
        name: "SYNC AI Copilot",
        role: "AI Hackathon Mentor",
        initial: "AI",
        lastMessage: "I'm here to help you brainstorm ideas, review architectures, and find teammates!",
        time: "Online"
    },
    {
        id: "arun",
        name: "Arun Kumar",
        role: "Team Member • CodeCrafters",
        initial: "A",
        lastMessage: "Let's discuss the frontend flow.",
        time: "10:42 AM"
    },
    {
        id: "meena",
        name: "Meena Priya",
        role: "Team Member • CodeCrafters",
        initial: "M",
        lastMessage: "I can handle the UI design.",
        time: "Yesterday"
    },
    {
        id: "rahul",
        name: "Rahul S",
        role: "Team Leader • CodeCrafters",
        initial: "R",
        lastMessage: "Hackathon registration is ready.",
        time: "Mon"
    }
];

const cannedAIPrompts = {
    ideas: "Here are 3 high-impact project ideas for your hackathon:\n1. **SmartCode AI**: Automated peer review with real-time security vulnerability detection.\n2. **EcoTrack IoT**: Microcontroller telemetry predicting energy anomalies.\n3. **DeFi Creds**: Verifiable digital student portfolios anchored on Ethereum L2.",
    teammates: "To recruit top teammates: highlight your verified skill score, specify clear roles (e.g. Frontend Specialist), and mention the target hackathon deadline on Team Matching.",
    pitch: "Judges love: 1) Clear problem definition (30s), 2) Live working demo (90s), 3) Technical architecture & scalability (45s), and 4) Team Q&A (45s). Keep it crisp!",
    default: "I'm your SYNC AI Copilot! You can ask me for hackathon project ideas, architecture recommendations, tech stack advice, or pitch tips."
};

exports.getConversations = async (req, res) => {
    res.status(200).json({
        success: true,
        conversations: defaultConversations
    });
};

exports.getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const messages = await dbStore.messages.findByConversation(conversationId);

        res.status(200).json({
            success: true,
            conversationId,
            messages
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.sendMessage = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const { text, senderName, senderId } = req.body;

        if (!text) {
            return res.status(400).json({ success: false, message: "Message text is required." });
        }

        const newMsg = await dbStore.messages.create({
            conversationId,
            senderId: senderId || "user",
            senderName: senderName || "Student",
            text
        });

        // If chatting with AI, generate response
        let aiReply = null;
        if (conversationId === "ai-assistant") {
            const lower = text.toLowerCase();
            let replyText = cannedAIPrompts.default;
            if (lower.includes("idea") || lower.includes("project") || lower.includes("build")) {
                replyText = cannedAIPrompts.ideas;
            } else if (lower.includes("team") || lower.includes("find") || lower.includes("member")) {
                replyText = cannedAIPrompts.teammates;
            } else if (lower.includes("pitch") || lower.includes("presentation") || lower.includes("judge")) {
                replyText = cannedAIPrompts.pitch;
            }

            aiReply = await dbStore.messages.create({
                conversationId,
                senderId: "ai",
                senderName: "SYNC AI Copilot",
                text: replyText
            });
        }

        res.status(201).json({
            success: true,
            message: newMsg,
            aiReply
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
