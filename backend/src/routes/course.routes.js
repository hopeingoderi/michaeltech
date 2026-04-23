import express from "express";
const router = express.Router();
const courses = [
  {
    id: 1,
    title: "Level 1: Computer Basics",
    lessons: [
      "Introduction to computers",
      "Keyboard and mouse basics",
      "Files and folders",
      "Operating system basics",
    ],
  },
  {
    id: 2,
    title: "Level 2: Office & Internet",
    lessons: [
      "Email and attachments",
      "Word fundamentals",
      "Excel basics",
      "Online safety",
    ],
  },
  {
    id: 3,
    title: "Level 3: Job & Professional Skills",
    lessons: [
      "Professional email writing",
      "CV and application basics",
      "Presentation and reporting",
      "Workplace productivity",
    ],
  },
];
router.get("/", (_req, res) => res.json(courses));
router.get("/:id", (req, res) => {
  const course = courses.find((item) => item.id === Number(req.params.id));
  if (!course) return res.status(404).json({ message: "Course not found." });
  res.json(course);
});
export default router;
