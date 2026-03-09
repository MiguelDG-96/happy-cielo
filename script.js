const matrixCanvas = document.getElementById('matrixCanvas');
const matrixCtx = matrixCanvas.getContext('2d');
const starCanvas = document.getElementById('starCanvas');
const starCtx = starCanvas.getContext('2d');

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
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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
    const bookPage = document.querySelector('.book-page');
    const manosAnimated = document.getElementById('manos-animated');
    const singlePhoto = document.getElementById('single-photo');
    const singleMsg = document.getElementById('single-message');

    const photos = [
        'fotos/cielo.jpeg',
        'fotos/cielo-2.jpeg',
        'fotos/cielo-3.jpeg',
        'fotos/cielo-peluche.jpeg'
    ];

    const messages = [
        "Para la niña más hermosa del mundo ❤",
        "Tu sonrisa ilumina cada uno de mis días ✨",
        "Cielo Sarahi, eres mi persona favorita 🌹",
        "Gracias por ser parte de mi vida, te quiero ❤"
    ];

    let currentPage = 0;

    notebookContainer.classList.remove('hidden');
    notebookContainer.style.pointerEvents = "auto";

    notebookClosed.onclick = async () => {
        notebookClosed.classList.add('hidden');
        book3D.classList.remove('hidden');
        showPageData(0);
    };

    book3D.onclick = async () => {
        if (currentPage < photos.length - 1) {
            // Flip Animation with Hands
            manosAnimated.classList.remove('hidden');
            await sleep(50);
            manosAnimated.classList.add('flipping-action');
            
            await sleep(200);
            bookPage.classList.add('flipping');
            
            await sleep(800);
            currentPage++;
            showPageData(currentPage);
            bookPage.classList.remove('flipping');
            manosAnimated.classList.remove('flipping-action');
            
            await sleep(800);
            manosAnimated.classList.add('hidden');
        } else {
            // End Sequence
            book3D.classList.add('hidden');
            notebookClosed.classList.remove('hidden');
            await sleep(2000);
            notebookContainer.classList.add('hidden');
            startHeartPhotosPhase();
        }
    };

    function showPageData(index) {
        singlePhoto.src = photos[index];
        singleMsg.innerText = messages[index];
    }
}

async function startHeartPhotosPhase() {
    const container = document.getElementById('heart-photos-container');
    container.classList.remove('hidden');
    
    const photos = [
        'fotos/cielo.jpeg',
        'fotos/cielo-2.jpeg',
        'fotos/cielo-3.jpeg',
        'fotos/cielo-peluche.jpeg'
    ];

    // Heart shape points (approximate)
    const points = [];
    for (let t = 0; t <= Math.PI * 2; t += 0.3) {
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        points.push({ x: x * 15 + window.innerWidth / 2, y: y * 15 + window.innerHeight / 2 });
    }

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    for (let i = 0; i < points.length; i++) {
        const img = document.createElement('img');
        img.src = photos[i % photos.length];
        img.className = 'heart-photo';
        img.style.left = (points[i].x - 50) + 'px';
        img.style.top = (points[i].y - 50) + 'px';
        container.appendChild(img);
        
        await sleep(150);
        img.classList.add('visible');
    }

    await sleep(2000);
    // Final touch: maybe a message appears in the center
    const finalMsg = document.createElement('div');
    finalMsg.innerHTML = "FELIZ CUMPLEAÑOS CIELO";
    finalMsg.style.cssText = "position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); font-size:3rem; color:white; text-shadow: 0 0 20px #ff00ff; font-family:'Orbitron'; z-index:20; white-space:nowrap; opacity:0; transition:opacity 2s;";
    container.appendChild(finalMsg);
    setTimeout(() => finalMsg.style.opacity = "1", 100);
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
