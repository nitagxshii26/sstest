const items = ['🍎', '🍌', '🚗', '🍎', '🐶', '🍎', '⚽', '🍎', '🧸', '🍎'];
let applesFound = 0;
const totalApples = 5;

const gameBoard = document.getElementById('game-board');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const successMessage = document.getElementById('success-message');
const restartBtn = document.getElementById('restart-btn');
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

function initGame() {
    applesFound = 0;
    updateProgress();
    successMessage.classList.add('hidden');
    gameBoard.innerHTML = '';
    
    // Shuffle items to make it fun
    const shuffledItems = [...items].sort(() => Math.random() - 0.5);

    shuffledItems.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('game-item');
        div.textContent = item;
        
        div.addEventListener('click', () => {
            if (item === '🍎') {
                div.classList.add('clicked');
                div.style.background = '#98fb98'; // green for correct
                applesFound++;
                updateProgress();
                checkWin();
            } else {
                // Shake effect for wrong item
                div.style.transform = 'translateX(-10px)';
                setTimeout(() => div.style.transform = 'translateX(10px)', 100);
                setTimeout(() => div.style.transform = 'translateX(-10px)', 200);
                setTimeout(() => div.style.transform = 'translateX(0)', 300);
                div.style.background = '#ffcccb'; // light red for wrong
                setTimeout(() => div.style.background = 'white', 400);
            }
        });

        gameBoard.appendChild(div);
    });
}

function updateProgress() {
    const percentage = (applesFound / totalApples) * 100;
    progressBar.style.width = percentage + '%';
    progressText.textContent = `${applesFound} / ${totalApples} Apples Found`;
}

function checkWin() {
    if (applesFound === totalApples) {
        setTimeout(() => {
            successMessage.classList.remove('hidden');
        }, 500);
    }
}

restartBtn.addEventListener('click', initGame);

// Start the game when the page loads
initGame();
