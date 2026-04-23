import express from "express";
const router = express.Router();
router.get("/dashboard/:studentId", (req, res) =>
  res.json({
    studentId: Number(req.params.studentId),
    currentLevel: "Level 1",
    progress: 75,
    lessonsCompleted: 3,
    totalLessons: 4,
    certificateUnlocked: false,
  }),
);
router.post("/exam/submit", (req, res) => {
  const { answers = [] } = req.body;
  const score = answers.filter(Boolean).length;
  const passed = score >= 2;
  res.json({
    score,
    total: 3,
    passed,
    message: passed
      ? "Congratulations. Certificate unlocked."
      : "Exam not passed yet. Please review the lessons and try again.",
  });
});
export default router;
