const defaultQuestions = [
    {
        id: 1,
        category: "Coding",
        question: "What is the time complexity of searching in a balanced Binary Search Tree (BST)?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
        answer: 2
    },
    {
        id: 2,
        category: "Coding",
        question: "Which keyword in JavaScript is used to declare a block-scoped variable that cannot be reassigned?",
        options: ["var", "let", "const", "static"],
        answer: 2
    },
    {
        id: 3,
        category: "Coding",
        question: "In RESTful API design, which HTTP method is typically used to update an existing resource partially?",
        options: ["POST", "PUT", "PATCH", "GET"],
        answer: 2
    },
    {
        id: 4,
        category: "Problem Solving",
        question: "You have an array with integers from 1 to N with one number missing. What is the optimal approach to find the missing number?",
        options: [
            "Sort the array and check each element",
            "Use the formula N*(N+1)/2 and subtract the sum of array elements",
            "Use nested loops to check each number from 1 to N",
            "Convert array to string and search"
        ],
        answer: 1
    },
    {
        id: 5,
        category: "Problem Solving",
        question: "How would you optimize a database query that is running slowly on a frequently searched user email column?",
        options: [
            "Add a database index on the email column",
            "Split the table into two tables",
            "Restart the database server frequently",
            "Cache the entire database in RAM"
        ],
        answer: 0
    },
    {
        id: 6,
        category: "Problem Solving",
        question: "When designing a rate limiter for an API, which data structure or algorithm is most commonly preferred?",
        options: ["Token Bucket / Leaky Bucket", "Binary Search Tree", "Bubble Sort", "Dijkstra Algorithm"],
        answer: 0
    },
    {
        id: 7,
        category: "Logical Reasoning",
        question: "If all developers code and some coders love coffee, which statement is definitely true?",
        options: [
            "All coffee lovers are developers",
            "Some developers love coffee",
            "All developers love coffee",
            "No coder dislikes coffee"
        ],
        answer: 1
    },
    {
        id: 8,
        category: "Logical Reasoning",
        question: "Find the next number in sequence: 3, 7, 15, 31, 63, ...",
        options: ["95", "127", "125", "120"],
        answer: 1
    },
    {
        id: 9,
        category: "Logical Reasoning",
        question: "A project has 3 dependent tasks: Task A takes 2 days, Task B requires Task A and takes 3 days, Task C is independent and takes 4 days. Minimum days to complete all tasks is:",
        options: ["5 days", "7 days", "9 days", "4 days"],
        answer: 0
    },
    {
        id: 10,
        category: "Communication",
        question: "During a hackathon presentation, a judge asks a technical question you don't know the exact answer to. What is the best response?",
        options: [
            "Make up an answer confidently and move on",
            "Ignore the question and talk about another feature",
            "Acknowledge the question honestly, state what you do know, and explain how you would solve it",
            "Tell the judge the question is not relevant to your demo"
        ],
        answer: 2
    },
    {
        id: 11,
        category: "Communication",
        question: "How should you document an API endpoint for other developers in your team?",
        options: [
            "Just explain it verbally once",
            "Write clear parameter types, request body examples, status codes, and error responses",
            "Write the endpoint name without descriptions",
            "Leave it for them to read the raw code"
        ],
        answer: 1
    },
    {
        id: 12,
        category: "Communication",
        question: "Your teammate misunderstood your git merge instructions, causing a merge conflict. How do you address this?",
        options: [
            "Blame them publicly in the team group chat",
            "Pair up to resolve the conflict together and agree on a clean git branching workflow",
            "Refuse to work with them",
            "Delete their branch immediately without notice"
        ],
        answer: 1
    },
    {
        id: 13,
        category: "Teamwork",
        question: "With 3 hours left before the hackathon submission deadline, your team realizes one non-essential feature is broken. What should you do?",
        options: [
            "Keep debugging that feature until the last minute",
            "Triage: disable the broken feature, polish the core working MVP, and prepare the demo pitch",
            "Abandon the project completely",
            "Argue about whose fault the bug is"
        ],
        answer: 1
    },
    {
        id: 14,
        category: "Teamwork",
        question: "In an agile hackathon team, how should tasks be divided among members?",
        options: [
            "The team leader does everything alone",
            "Tasks are distributed based on individual strengths and agreed milestones with regular sync-ups",
            "Everyone works on the exact same file simultaneously",
            "Wait until the last day to assign tasks"
        ],
        answer: 1
    },
    {
        id: 15,
        category: "Teamwork",
        question: "A teammate feels overwhelmed with their backend tasks. What is the ideal teamwork response?",
        options: [
            "Offer to take on or pair with them on challenging endpoints to balance the workload",
            "Tell them to work faster",
            "Complain to the event mentors",
            "Ignore them and focus only on your personal part"
        ],
        answer: 0
    }
];

const defaultHackathons = [
    {
        id: "ai-future",
        title: "AI Future Builders 2026",
        organizer: "Student Innovation Network",
        domain: "AI / Machine Learning",
        mode: "Online",
        location: "Virtual (Pan-India)",
        prize: "₹1,00,000",
        deadline: "7 Days Left",
        daysRemaining: 7,
        dates: "Nov 15 - Nov 17, 2026",
        description: "Build transformative Generative AI applications that solve real-world problems in education, healthcare, and sustainable tech.",
        tags: ["LLMs", "Computer Vision", "Python", "FastAPI"],
        registrationOpen: true
    },
    {
        id: "web-build",
        title: "Web3 & Decentralized Sprint",
        organizer: "Polygon & EthIndia Guild",
        domain: "Web Development",
        mode: "Hybrid",
        location: "Bengaluru, Karnataka",
        prize: "₹2,50,000",
        deadline: "12 Days Left",
        daysRemaining: 12,
        dates: "Nov 20 - Nov 22, 2026",
        description: "Create scalable dApps, DeFi tools, and zero-knowledge identity protocols with high UI/UX polish.",
        tags: ["React", "Solidity", "Node.js", "Ethers.js"],
        registrationOpen: true
    },
    {
        id: "cloud-native",
        title: "Cloud Native Scalability Challenge",
        organizer: "Google Developer Groups & AWS Club",
        domain: "Cloud Computing",
        mode: "Online",
        location: "Online",
        prize: "₹75,000",
        deadline: "3 Days Left",
        daysRemaining: 3,
        dates: "Nov 08 - Nov 10, 2026",
        description: "Design fault-tolerant microservice architectures deployed on Kubernetes and serverless platforms.",
        tags: ["Docker", "Kubernetes", "Go", "GCP"],
        registrationOpen: true
    },
    {
        id: "cyber-shield",
        title: "Cyber Shield National Hackathon",
        organizer: "National Cybersecurity Alliance",
        domain: "Cybersecurity",
        mode: "Hybrid",
        location: "Chennai, Tamil Nadu",
        prize: "₹1,50,000",
        deadline: "15 Days Left",
        daysRemaining: 15,
        dates: "Nov 28 - Nov 30, 2026",
        description: "Defensive security, automated vulnerability analysis, and cryptographic authentication tooling.",
        tags: ["Rust", "Python", "Security", "Network"],
        registrationOpen: true
    },
    {
        id: "fullstack-arena",
        title: "Full Stack Arena 2026",
        organizer: "T-Hub Innovations",
        domain: "Full Stack Development",
        mode: "In-person",
        location: "Hyderabad, Telangana",
        prize: "₹1,20,000",
        deadline: "9 Days Left",
        daysRemaining: 9,
        dates: "Nov 18 - Nov 19, 2026",
        description: "48-hour sprint building full-stack enterprise collaboration tools with real-time sync.",
        tags: ["MERN Stack", "WebSockets", "TailwindCSS", "PostgreSQL"],
        registrationOpen: true
    },
    {
        id: "sih-2026",
        title: "Smart India Hackathon (SIH 2026 Prep)",
        organizer: "Ministry of Education & AICTE",
        domain: "Open Innovation",
        mode: "Hybrid",
        location: "New Delhi & Regional Centers",
        prize: "₹5,00,000",
        deadline: "20 Days Left",
        daysRemaining: 20,
        dates: "Dec 05 - Dec 07, 2026",
        description: "Nationwide initiative providing students a platform to solve pressing problems of ministries, departments, and industries.",
        tags: ["Smart City", "Agriculture", "AI", "GovTech"],
        registrationOpen: true
    }
];

const defaultTeams = [
    {
        id: "team-codecrafters",
        name: "CodeCrafters",
        hackathon: "AI Future Builders 2026",
        domain: "AI / Machine Learning",
        leader: {
            name: "Rahul S",
            email: "rahul.s@college.edu",
            role: "Team Leader"
        },
        membersCount: 3,
        maxMembers: 4,
        requiredSkills: ["Frontend (React)", "UI/UX", "API Integration"],
        members: [
            { name: "Rahul S", role: "AI / Backend", avatar: "R" },
            { name: "Arun Kumar", role: "Data Engineering", avatar: "A" },
            { name: "Meena Priya", role: "UI Design", avatar: "M" }
        ],
        compatibilityScore: 96,
        description: "Building an AI-driven automated peer code reviewer with AST analysis and smart suggestions.",
        region: "South India",
        openRoles: ["Frontend Developer"]
    },
    {
        id: "team-chaindevs",
        name: "ChainDevs",
        hackathon: "Web3 & Decentralized Sprint",
        domain: "Web Development",
        leader: {
            name: "Pooja Sharma",
            email: "pooja.sharma@college.edu",
            role: "Smart Contract Dev"
        },
        membersCount: 2,
        maxMembers: 4,
        requiredSkills: ["JavaScript", "React", "Web3.js"],
        members: [
            { name: "Pooja Sharma", role: "Smart Contract Dev", avatar: "P" },
            { name: "Karthik V", role: "Backend Engineer", avatar: "K" }
        ],
        compatibilityScore: 91,
        description: "Building a decentralized micro-credential and skill verification ledger for students.",
        region: "South India",
        openRoles: ["Frontend Dev", "Fullstack Dev"]
    },
    {
        id: "team-cloudknights",
        name: "CloudKnights",
        hackathon: "Cloud Native Scalability Challenge",
        domain: "Cloud Computing",
        leader: {
            name: "Ananya Roy",
            email: "ananya.roy@college.edu",
            role: "DevOps / Lead"
        },
        membersCount: 2,
        maxMembers: 3,
        requiredSkills: ["Python", "FastAPI", "Docker", "Frontend"],
        members: [
            { name: "Ananya Roy", role: "DevOps & Cloud", avatar: "A" },
            { name: "Deepak N", role: "Systems Architect", avatar: "D" }
        ],
        compatibilityScore: 88,
        description: "Building real-time serverless log monitoring and anomaly alerting service with Telegram bots.",
        region: "South India",
        openRoles: ["Frontend & UI"]
    }
];

const defaultNotifications = [
    {
        id: "notif-1",
        title: "Welcome to SYNC AI!",
        message: "Your SYNC AI journey has begun. Discover curated hackathons and find your dream team.",
        time: "Just now",
        type: "system",
        read: false
    },
    {
        id: "notif-2",
        title: "New Team Match Available",
        message: "Team CodeCrafters matches 96% with your profile in AI Future Builders 2026.",
        time: "10 mins ago",
        type: "team",
        read: false
    },
    {
        id: "notif-3",
        title: "Hackathon Registration Opening",
        message: "AI Future Builders 2026 registrations close in 7 days. Ensure your team is finalized.",
        time: "1 hour ago",
        type: "hackathon",
        read: false
    }
];

module.exports = {
    defaultQuestions,
    defaultHackathons,
    defaultTeams,
    defaultNotifications
};
