document.addEventListener("DOMContentLoaded", () => {

    /* ================= ACCESS CHECK ================= */

    const student = JSON.parse(
        localStorage.getItem("syncAI_student") || "null"
    );

    if (!student) {
        window.location.href = "login.html";
        return;
    }

    if (
        !student.emailVerified ||
        !student.assessmentCompleted ||
        localStorage.getItem("syncAI_profileCompleted") !== "true"
    ) {
        window.location.href = "assessment-intro.html";
        return;
    }


    /* ================= STUDENT ================= */

    const studentName =
        student.fullName ||
        student.name ||
        "Student";

    const initial =
        studentName.trim().charAt(0).toUpperCase();

    document.getElementById("sidebarName").textContent =
        studentName;

    document.getElementById("sidebarAvatar").textContent =
        initial;

    document.getElementById("headerAvatar").textContent =
        initial;


    /* ================= DEMO CONVERSATIONS ================= */

    const conversations = [
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


    /* ================= DEFAULT MESSAGES ================= */

    const defaultMessages = {

        arun: [
            {
                sender: "received",
                text: "Hi! Are you joining the Web Development team?",
                time: "10:35 AM"
            },
            {
                sender: "sent",
                text: "Yes, I am interested in the team.",
                time: "10:37 AM"
            },
            {
                sender: "received",
                text: "Great! Let's discuss the frontend flow.",
                time: "10:42 AM"
            }
        ],

        meena: [
            {
                sender: "received",
                text: "Hi! I am working on the UI part.",
                time: "Yesterday"
            },
            {
                sender: "sent",
                text: "Nice. I can help with the frontend implementation.",
                time: "Yesterday"
            }
        ],

        rahul: [
            {
                sender: "received",
                text: "The team has enough members now.",
                time: "Mon"
            },
            {
                sender: "received",
                text: "Hackathon registration is ready.",
                time: "Mon"
            }
        ]

    };


    /* ================= STORAGE ================= */

    let storedMessages = JSON.parse(
        localStorage.getItem("syncAI_chatMessages") || "{}"
    );

    let selectedConversation = "arun";


    /* ================= ELEMENTS ================= */

    const conversationList =
        document.getElementById("conversationList");

    const messagesArea =
        document.getElementById("messagesArea");

    const messageInput =
        document.getElementById("messageInput");

    const sendButton =
        document.getElementById("sendButton");

    const searchInput =
        document.getElementById("searchInput");


    /* ================= RENDER CONVERSATIONS ================= */

    function renderConversations(filter = "") {

        conversationList.innerHTML = "";

        const search =
            filter.trim().toLowerCase();

        const filtered =
            conversations.filter(conversation =>
                conversation.name
                    .toLowerCase()
                    .includes(search)
            );

        document.getElementById(
            "conversationCount"
        ).textContent =
            conversations.length +
            " conversations";


        if (filtered.length === 0) {

            conversationList.innerHTML = `
                <div class="empty-chat">
                    <div class="empty-chat-icon">⌕</div>
                    <h3>No teammate found</h3>
                    <p>
                        Try searching with another name.
                    </p>
                </div>
            `;

            return;
        }


        filtered.forEach(conversation => {

            const item =
                document.createElement("div");

            item.className =
                "conversation-item" +
                (
                    conversation.id === selectedConversation
                        ? " active"
                        : ""
                );


            item.innerHTML = `
                <div class="conversation-avatar">
                    ${conversation.initial}
                </div>

                <div class="conversation-details">

                    <div class="conversation-top">

                        <strong>
                            ${escapeHTML(conversation.name)}
                        </strong>

                        <span>
                            ${escapeHTML(conversation.time)}
                        </span>

                    </div>

                    <p>
                        ${escapeHTML(conversation.lastMessage)}
                    </p>

                </div>
            `;


            item.addEventListener(
                "click",
                () => selectConversation(conversation.id)
            );


            conversationList.appendChild(item);

        });

    }


    /* ================= SELECT CONVERSATION ================= */

    function selectConversation(id) {

        selectedConversation = id;

        const conversation =
            conversations.find(
                item => item.id === id
            );

        if (!conversation) return;


        document.getElementById(
            "chatUserName"
        ).textContent =
            conversation.name;


        document.getElementById(
            "chatUserStatus"
        ).textContent =
            conversation.role;


        document.getElementById(
            "chatAvatar"
        ).textContent =
            conversation.initial;


        renderConversations(
            searchInput.value
        );

        renderMessages();

        messageInput.focus();

    }


    /* ================= RENDER MESSAGES ================= */

    function renderMessages() {

        messagesArea.innerHTML = "";


        const messages =
            storedMessages[selectedConversation] ||
            defaultMessages[selectedConversation] ||
            [];


        if (messages.length === 0) {

            messagesArea.innerHTML = `
                <div class="empty-chat">
                    <div class="empty-chat-icon">▱</div>

                    <h3>Start a conversation</h3>

                    <p>
                        Send a message to your teammate
                        and start collaborating.
                    </p>
                </div>
            `;

            return;
        }


        messages.forEach(message => {

            const row =
                document.createElement("div");

            row.className =
                "message-row " +
                message.sender;


            const content =
                document.createElement("div");

            content.className =
                "message-content";


            const bubble =
                document.createElement("div");

            bubble.className =
                "message-bubble";

            bubble.textContent =
                message.text;


            const time =
                document.createElement("span");

            time.className =
                "message-time";

            time.textContent =
                message.time;


            content.appendChild(bubble);
            content.appendChild(time);

            row.appendChild(content);

            messagesArea.appendChild(row);

        });


        messagesArea.scrollTop =
            messagesArea.scrollHeight;

    }


    /* ================= SEND MESSAGE ================= */

    function sendMessage() {

        const text =
            messageInput.value.trim();

        if (!text) return;


        if (!storedMessages[selectedConversation]) {

            storedMessages[selectedConversation] =
                [
                    ...(defaultMessages[selectedConversation] || [])
                ];
        }


        const now =
            new Date();


        const time =
            now.toLocaleTimeString(
                "en-IN",
                {
                    hour: "numeric",
                    minute: "2-digit"
                }
            );


        storedMessages[selectedConversation].push({

            sender: "sent",

            text: text,

            time: time

        });


        localStorage.setItem(
            "syncAI_chatMessages",
            JSON.stringify(storedMessages)
        );

        // Sync with backend API
        if (window.syncApi && window.syncApi.chat) {
            window.syncApi.chat.sendMessage(selectedConversation, {
                text,
                senderName: studentName,
                senderId: student.collegeEmail || "user"
            }).then(res => {
                if (res && res.aiReply) {
                    storedMessages[selectedConversation].push({
                        sender: "received",
                        text: res.aiReply.text,
                        time: res.aiReply.time || "Just now"
                    });
                    localStorage.setItem(
                        "syncAI_chatMessages",
                        JSON.stringify(storedMessages)
                    );
                    renderMessages();
                }
            }).catch(e => console.warn("Backend chat notice:", e.message));
        }

        const conversation =
            conversations.find(
                item => item.id === selectedConversation
            );

        if (conversation) {
            conversation.lastMessage = text;
            conversation.time = time;
        }

        messageInput.value = "";
        renderMessages();
        renderConversations(searchInput.value);
        messageInput.focus();
    }



    /* ================= SEARCH ================= */

    searchInput.addEventListener(
        "input",
        () => {

            renderConversations(
                searchInput.value
            );

        }
    );


    /* ================= SEND BUTTON ================= */

    sendButton.addEventListener(
        "click",
        sendMessage
    );


    /* ================= ENTER KEY ================= */

    messageInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                sendMessage();

            }

        }
    );


    /* ================= TEAM INFO ================= */

    document.getElementById(
        "teamInfoBtn"
    ).addEventListener(
        "click",
        () => {

            const conversation =
                conversations.find(
                    item =>
                        item.id === selectedConversation
                );

            if (!conversation) return;

            alert(
                "Team: CodeCrafters\n\n" +
                "Hackathon Team\n" +
                "Location: Coimbatore, Tamil Nadu\n" +
                "Domain: Web Development\n\n" +
                "Members can communicate here after team acceptance."
            );

        }
    );


    /* ================= INITIAL LOAD ================= */

    renderConversations();

    selectConversation("arun");

});


/* ================= SECURITY HELPER ================= */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}