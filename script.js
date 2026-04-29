const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const container = document.getElementById('container');
const successContainer = document.getElementById('success-container');
const bgHeartsContainer = document.getElementById('background-hearts');

// Create floating hearts for background
function createBackgroundHearts() {
    const symbols = ['❤️', '💖', '💕', '💗', '💓'];
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 5 + 5 + 's';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        
        bgHeartsContainer.appendChild(heart);
    }
}
createBackgroundHearts();


let noBtnX = 0;
let noBtnY = 0;

function moveNoBtn() {
    const noBtnRect = noBtn.getBoundingClientRect();
    
    // Calculate boundaries to keep button within window
    const maxPosX = window.innerWidth / 2 - noBtnRect.width; 
    const maxPosY = window.innerHeight / 2 - noBtnRect.height;
    
    // Generate random values within boundaries (can be negative or positive)
    const randomX = (Math.random() * maxPosX * 2) - maxPosX;
    const randomY = (Math.random() * maxPosY * 2) - maxPosY;
    
    noBtnX = randomX;
    noBtnY = randomY;
    
    noBtn.style.transform = `translate(${noBtnX}px, ${noBtnY}px)`;
}

// Make the No button slide away on hover or touch
noBtn.addEventListener('mouseover', moveNoBtn);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent default touch behavior
    moveNoBtn();
});

// Just in case they manage to click it (mobile fallback)
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoBtn();
});

// Check if they already said yes!
if (localStorage.getItem('proposalAccepted') === 'true') {
    container.classList.add('hidden');
    successContainer.classList.remove('hidden');
    createConfetti();
}

// Yes button clicked
yesBtn.addEventListener('click', () => {
    container.classList.add('hidden');
    successContainer.classList.remove('hidden');
    // Save state so it stays on this page on refresh
    localStorage.setItem('proposalAccepted', 'true');
    createConfetti();
});

// Confetti effect
function createConfetti() {
    const colors = ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Randomize
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        confetti.style.opacity = Math.random();
        
        // Different shapes
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '0';
        }
        
        document.body.appendChild(confetti);
    }
}
