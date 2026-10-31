const dbStore = require("../data/dbStore");

// GET QUESTIONS
exports.getQuestions = async (req, res) => {
    try {
        const questions = await dbStore.questions.find();
        // Return questions without revealing correct answer index to client for security
        const safeQuestions = questions.map(q => ({
            id: q.id,
            category: q.category,
            question: q.question,
            options: q.options
        }));

        res.status(200).json({
            success: true,
            total: safeQuestions.length,
            questions: safeQuestions
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// SUBMIT ASSESSMENT
exports.submitAssessment = async (req, res) => {
    try {
        const { email, answers } = req.body;
        const normalizedEmail = (email || "").toLowerCase().trim();

        const questions = await dbStore.questions.find();

        const scores = {
            "Coding": 0,
            "Problem Solving": 0,
            "Logical Reasoning": 0,
            "Communication": 0,
            "Teamwork": 0
        };

        const totals = {
            "Coding": 0,
            "Problem Solving": 0,
            "Logical Reasoning": 0,
            "Communication": 0,
            "Teamwork": 0
        };

        questions.forEach((q, index) => {
            totals[q.category] = (totals[q.category] || 0) + 1;
            const studentAns = answers ? answers[index] : undefined;
            if (studentAns !== undefined && Number(studentAns) === q.answer) {
                scores[q.category] = (scores[q.category] || 0) + 1;
            }
        });

        const totalCorrect = Object.values(scores).reduce((a, b) => a + b, 0);
        const overallScore = Math.round((totalCorrect / questions.length) * 100);

        const assessmentResult = {
            overallScore,
            correctAnswers: totalCorrect,
            totalQuestions: questions.length,
            categoryScores: scores,
            categoryTotals: totals,
            completed: true,
            completedAt: new Date().toISOString()
        };

        if (normalizedEmail) {
            await dbStore.users.updateOne(
                { collegeEmail: normalizedEmail },
                {
                    assessmentCompleted: true,
                    verifiedSkillScore: overallScore,
                    assessmentCompletedAt: assessmentResult.completedAt,
                    assessmentResult: assessmentResult,
                    xpPoints: 250 // XP award for assessment
                }
            );
        }

        res.status(200).json({
            success: true,
            message: "Assessment scored successfully!",
            assessmentResult,
            nextPage: "assessment-result.html"
        });

    } catch (error) {
        console.error("Submit assessment error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
