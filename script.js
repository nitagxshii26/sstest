// ---- Theme Toggle Logic ----
const themeToggle = document.getElementById('theme-toggle');

// Initialize theme based on current body class
function updateThemeIcon() {
    if (themeToggle) {
        themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    }
}

if (themeToggle) {
    updateThemeIcon();
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        updateThemeIcon();
        // Optional: save to localStorage here if desired
    });
}

// ---- Quiz Logic ----
const questions = [
    {
        question: "What does AI stand for?",
        options: ["Automated Internet", "Artificial Intelligence", "Algorithmic Integration", "Applied Information"],
        answer: 1
    },
    {
        question: "Which of the following is an example of an AI application?",
        options: ["A simple calculator", "A mechanical clock", "Social media recommendation algorithms", "A static HTML website"],
        answer: 2
    },
    {
        question: "How does Machine Learning differ from traditional programming?",
        options: ["It uses older programming languages", "It requires explicit rules for every scenario", "It learns patterns from data without being explicitly programmed", "It cannot be used on modern computers"],
        answer: 2
    },
    {
        question: "If an algorithm learns by getting 'rewards' for correct actions, what type of ML is it?",
        options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Manual Learning"],
        answer: 2
    },
    {
        question: "Why is Machine Learning necessary for tasks like image recognition?",
        options: ["Because it's impossible to write explicit rules for every possible variation of an image", "Because computers cannot process images otherwise", "Because it is cheaper to write", "Because images don't contain data"],
        answer: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;
let hasAnswered = false;

const questionTitle = document.getElementById('question-title');
const optionsContainer = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const quizContainer = document.getElementById('quiz-container');
const questionBlock = document.getElementById('question-block');
const quizResult = document.getElementById('quiz-result');
const scoreDisplay = document.getElementById('score-display');
const scoreMessage = document.getElementById('score-message');
const restartBtn = document.getElementById('restart-quiz');

function loadQuestion() {
    if (!questionTitle) return; // Not on the quiz page

    hasAnswered = false;
    nextBtn.classList.add('hidden');
    
    const q = questions[currentQuestionIndex];
    questionTitle.textContent = `${currentQuestionIndex + 1}. ${q.question}`;
    
    optionsContainer.innerHTML = '';
    q.options.forEach((opt, index) => {
        const btn = document.createElement('div');
        btn.classList.add('quiz-option');
        btn.textContent = opt;
        btn.addEventListener('click', () => selectOption(index, btn));
        optionsContainer.appendChild(btn);
    });
}

function selectOption(selectedIndex, btnElement) {
    if (hasAnswered) return;
    hasAnswered = true;

    const q = questions[currentQuestionIndex];
    const options = optionsContainer.children;

    if (selectedIndex === q.answer) {
        btnElement.classList.add('correct');
        score++;
        
        // Trigger confetti pop
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    } else {
        btnElement.classList.add('incorrect');
        btnElement.textContent += ' 😢 BOOO!';
        options[q.answer].classList.add('correct'); // Show the right answer
    }

    nextBtn.classList.remove('hidden');
}

function showResults() {
    questionBlock.classList.add('hidden');
    quizResult.classList.remove('hidden');
    scoreDisplay.textContent = `${score}/${questions.length}`;
    
    if (score === questions.length) {
        scoreMessage.textContent = "Perfect! You're an AI expert! 🏆";
    } else if (score >= questions.length / 2) {
        scoreMessage.textContent = "Great job! You know your stuff. 🚀";
    } else {
        scoreMessage.textContent = "Good try! Review the materials and try again. 📖";
    }
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    });
}

if (restartBtn) {
    restartBtn.addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        questionBlock.classList.remove('hidden');
        quizResult.classList.add('hidden');
        loadQuestion();
    });
}

// Initialize quiz if on the quiz page
if (document.getElementById('quiz-container')) {
    loadQuestion();
}
