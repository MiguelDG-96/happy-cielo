const matrixCanvas = document.getElementById('matrixCanvas');
const matrixCtx = matrixCanvas.getContext('2d');
const starCanvas = document.getElementById('starCanvas');
const starCtx = starCanvas.getContext('2d');

// Global Data Configuration
const photos = [
    'fotos/cielo.jpeg',
    'fotos/cielo-2.jpeg',
    'fotos/cielo-3.jpeg',
    'fotos/cielo-peluche.jpeg'
];

const albumMessages = [
    "Happy Birthday Cielo ❤",
    "Eres la persona más especial ✨",
    "Cada momento contigo es único 🌹",
    "Te quiero muchísimo Cielo Sarahi ❤"
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Matrix Background Implementation
function initMatrix() {
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;

    const chars = "HAPPYBIRTHDAY0123456789";
    const fontSize = 16;
    const columns = matrixCanvas.width / fontSize;
    const drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }

    function draw() {
        matrixCtx.fillStyle = 'rgba(5, 5, 5, 0.05)';
        matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

        matrixCtx.fillStyle = '#ff00ff';
        matrixCtx.font = fontSize + 'px Orbitron';

        for (let i = 0; i < drops.length; i++) {
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            matrixCtx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
        requestAnimationFrame(draw);
    }
    draw();
}

// Starfield Implementation
function initStars() {
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
    
    const stars = [];
    const starCount = 400;

    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * starCanvas.width,
            y: Math.random() * starCanvas.height,
            size: Math.random() * 1.5,
            opacity: Math.random(),
            speed: 0.005 + Math.random() * 0.02
        });
    }

    function drawStars() {
        starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
        starCtx.fillStyle = 'white';

        stars.forEach(star => {
            star.opacity += star.speed;
            if (star.opacity > 1 || star.opacity < 0) {
                star.speed = -star.speed;
            }
            starCtx.globalAlpha = Math.max(0, star.opacity);
            starCtx.beginPath();
            starCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            starCtx.fill();
        });
        requestAnimationFrame(drawStars);
    }
    drawStars();
}

// Message Sequence Implementation
async function runSequence() {
    const messages = [
        document.getElementById('msg-1'),
        document.getElementById('msg-2'),
        document.getElementById('msg-3'),
        document.getElementById('msg-4'),
        document.getElementById('msg-5')
    ];
    
    const gifContainer = document.getElementById('gif-container');

    for (let i = 0; i < messages.length; i++) {
        messages[i].classList.add('visible');
        await sleep(3500); // Wait for visibility duration

        // Hide current message before the next one or before transition
        messages[i].classList.remove('visible');
        await sleep(1000); // Wait for transition out
    }

    // Phase Transition: Matrix -> Universe
    matrixCanvas.classList.add('faded');
    starCanvas.classList.add('visible');
    
    await sleep(1000);
    document.getElementById('message-sequence').classList.add('hidden'); // Clean up DOM area
    
    await sleep(1000);
    
    // Show GIF
    gifContainer.classList.remove('hidden');
    setTimeout(() => {
        gifContainer.classList.add('visible');
    }, 100);

    await sleep(5000); // GIF duration
    
    // Transition to Notebook Phase
    gifContainer.classList.remove('visible');
    await sleep(2000);
    gifContainer.classList.add('hidden');
    
    startNotebookPhase();
}

function startNotebookPhase() {
    const notebookContainer = document.getElementById('notebook-container');
    const notebookClosed = document.getElementById('notebook-closed');
    const book3D = document.getElementById('book-3d');
    const pagesContainer = document.querySelector('.book-pages-container');
    const manosSwipe = document.getElementById('manos-swipe');
    const topMsgBox = document.getElementById('top-message-box');
    const topMsgText = document.getElementById('top-message-text');
    const photoLeft = document.getElementById('photo-left');
    const photoRight = document.getElementById('photo-right');

    let currentPage = 0;
    let isAnimating = false;

    notebookContainer.classList.remove('hidden');
    notebookContainer.style.pointerEvents = "auto";

    notebookClosed.onclick = async () => {
        notebookClosed.classList.add('hidden');
        book3D.classList.remove('hidden');
        topMsgBox.classList.remove('hidden');
        
        await sleep(100);
        topMsgBox.classList.add('visible');
        showPagePair(0);
    };

    book3D.onclick = async () => {
        if (isAnimating) return;

        if (currentPage < Math.ceil(photos.length / 2) - 1) {
            isAnimating = true;
            // Swipe Animation Logic
            manosSwipe.classList.remove('hidden');
            manosSwipe.classList.remove('exit');
            
            await sleep(50);
            manosSwipe.classList.add('swiping');
            
            await sleep(600);
            pagesContainer.classList.add('fading');
            
            await sleep(400);
            currentPage++;
            showPagePair(currentPage);
            manosSwipe.classList.add('exit');
            manosSwipe.classList.remove('swiping');
            
            await sleep(300);
            pagesContainer.classList.remove('fading');
            
            await sleep(500);
            manosSwipe.classList.add('hidden');
            isAnimating = false;
        } else {
            // Close Sequence
            isAnimating = true;
            topMsgBox.classList.remove('visible');
            book3D.classList.add('hidden');
            notebookClosed.classList.remove('hidden');
            await sleep(1000);
            notebookContainer.classList.add('hidden');
            startHeartPhotosPhase();
            isAnimating = false;
        }
    };

    function showPagePair(index) {
        topMsgText.innerText = albumMessages[index % albumMessages.length] || "";
        photoLeft.src = photos[index * 2] || "";
        photoRight.src = photos[index * 2 + 1] || "";
    }
}

async function startHeartPhotosPhase() {
    const container = document.getElementById('heart-photos-container');
    container.classList.remove('hidden');

    // Heart shape points (approximate)
    const points = [];
    const scaleFactor = window.innerWidth < 768 ? 10 : 15; // smaller for mobile

    for (let t = 0; t <= Math.PI * 2; t += 0.3) {
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        points.push({ x: x * scaleFactor + window.innerWidth / 2, y: y * scaleFactor + window.innerHeight / 2 });
    }

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    for (let i = 0; i < points.length; i++) {
        const img = document.createElement('img');
        img.src = photos[i % photos.length];
        img.className = 'heart-photo';
        img.style.left = (points[i].x - (window.innerWidth < 768 ? 30 : 50)) + 'px';
        img.style.top = (points[i].y - (window.innerWidth < 768 ? 30 : 50)) + 'px';
        container.appendChild(img);
        
        await sleep(150);
        img.classList.add('visible');
    }

    await sleep(2000);
    // Final touch: maybe a message appears in the center
    const finalMsg = document.createElement('div');
    finalMsg.innerHTML = "FELIZ CUMPLEAÑOS CIELO SARAÍ";
    finalMsg.className = "final-birthday-message";
    container.appendChild(finalMsg);
    
    setTimeout(() => {
        finalMsg.style.opacity = "1";
        triggerConfettiSequence();
    }, 100);
}

function triggerConfettiSequence() {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // "Poppers" from corners
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
    }, 250);

    // Initial big bursts
    const fire = (particleCount, opts) => {
        confetti({
            ...opts,
            particleCount,
            origin: { y: 0.7 }
        });
    };

    fire(200, {
        spread: 26,
        startVelocity: 55,
    });
    fire(200, {
        spread: 60,
    });
    fire(200, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
    });
    fire(200, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
    });
    fire(200, {
        spread: 120,
        startVelocity: 45,
    });
}

// Window resize handler
window.addEventListener('resize', () => {
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
});

// Initialization
window.onload = () => {
    initMatrix();
    initStars();
    setTimeout(runSequence, 1000);
};
