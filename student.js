const lessons = [
  {
    title: 'Lesson 1 — What is a Computer?',
    description: 'Understand the monitor, keyboard, mouse, system unit, and basic use.'
  },
  {
    title: 'Lesson 2 — Using Mouse and Keyboard',
    description: 'Learn clicking, scrolling, typing, and confidence with simple tasks.'
  },
  {
    title: 'Lesson 3 — Files and Folders',
    description: 'Create, rename, save, and organize files correctly.'
  },
  {
    title: 'Lesson 4 — Internet and Email Basics',
    description: 'Use the browser, search online, and send email safely.'
  },
  {
    title: 'Lesson 5 — Microsoft Word Basics',
    description: 'Write, edit, and save a document for school or work.'
  }
];

const lessonList = document.getElementById('lessonList');
const overallProgress = document.getElementById('overallProgress');
const progressText = document.getElementById('progressText');
const resetProgress = document.getElementById('resetProgress');
const quizForm = document.getElementById('quizForm');
const quizResult = document.getElementById('quizResult');

function getSavedProgress() {
  return JSON.parse(localStorage.getItem('lessonProgress') || '[]');
}

function saveProgress(progress) {
  localStorage.setItem('lessonProgress', JSON.stringify(progress));
}

function renderLessons() {
  const progress = getSavedProgress();
  lessonList.innerHTML = '';

  lessons.forEach((lesson, index) => {
    const checked = progress.includes(index);
    const item = document.createElement('label');
    item.className = 'lesson-item';
    item.innerHTML = `
      <div>
        <h3>${lesson.title}</h3>
        <p>${lesson.description}</p>
      </div>
      <input type="checkbox" ${checked ? 'checked' : ''} data-index="${index}" />
    `;
    lessonList.appendChild(item);
  });

  lessonList.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
      const current = getSavedProgress();
      const index = Number(event.target.dataset.index);
      const next = event.target.checked
        ? Array.from(new Set([...current, index]))
        : current.filter((item) => item !== index);

      saveProgress(next);
      updateProgress();
    });
  });

  updateProgress();
}

function updateProgress() {
  const progress = getSavedProgress();
  const percent = Math.round((progress.length / lessons.length) * 100);
  overallProgress.style.width = `${percent}%`;
  progressText.textContent = `${percent}% completed`;
}

resetProgress.addEventListener('click', () => {
  localStorage.removeItem('lessonProgress');
  localStorage.removeItem('examPassed');
  renderLessons();
  quizResult.textContent = '';
});

quizForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(quizForm);
  const answers = { q1: 'b', q2: 'a', q3: 'c' };
  let score = 0;

  Object.entries(answers).forEach(([key, value]) => {
    if (data.get(key) === value) score += 1;
  });

  const lessonCount = getSavedProgress().length;
  const percent = Math.round((score / Object.keys(answers).length) * 100);

  if (lessonCount < lessons.length) {
    quizResult.innerHTML = 'Please complete all lessons before taking the final exam.';
    return;
  }

  if (percent >= 70) {
    localStorage.setItem('examPassed', 'true');
    localStorage.setItem('studentName', 'Demo Student');
    localStorage.setItem('studentCourse', 'Computer Foundation Level');
    quizResult.innerHTML = `Excellent. You passed with <strong>${percent}%</strong>. Your certificate is ready. <br><br><a href="certificate.html" class="btn btn-primary">Open Certificate</a>`;
  } else {
    localStorage.setItem('examPassed', 'false');
    quizResult.innerHTML = `You scored <strong>${percent}%</strong>. Please review the lessons and try again.`;
  }
});

renderLessons();
