const matrixCanvas = document.getElementById("matrixCanvas");
const matrixCtx = matrixCanvas.getContext("2d");
const starCanvas = document.getElementById("starCanvas");
const starCtx = starCanvas.getContext("2d");

// Global Data Configuration
const photos = [
  "fotos/hola-1.jpeg",
  "fotos/hola-2.jpeg",
  "fotos/cafe.jpeg",
  "fotos/cielo-7.jpeg",
  "fotos/cielo-aventuras.jpeg",
  "fotos/cielo.jpeg",
  "fotos/cielo-2.jpeg",
  "fotos/cielo-peluche.jpeg",
  "fotos/cielo-4.jpeg",
  "fotos/cielo-8.jpeg",
  "fotos/cielo-9.jpeg",
  "fotos/cielo-10.jpeg",
  "fotos/cielo-11.jpeg",
];

const albumMessages = ["Happy Birthday Cielo ❤"];
const photoCaptions = [
  "Nuestro primer ¡Hola!",
  "Mensajes por las madrugadas",
  "Recuerdos inolvidables contigo",
  "Cada momento es divertido a tu lado",
  "Tiempos compartidos",
  "Contigo todo es mejor",
  "Belleza de mujer",
  "Eres un regalo en mi vida",
  "Agradecido con Dios por ponerte en mi camino",
  "Para mi eres perfecta",
  "Como un espejo de mi alma",
  "Te llevo en mi corazón",
  "Mi cielo, mi vida y mi todo",
  "Para mi eres el amor de mi vida, quiero que sepas que te amo con todo mi corazón y que siempre estaré aquí para ti, apoyándote en cada paso del camino. Eres mi compañera, mi amiga y mi todo. ¡Feliz cumpleaños, mi cielo Saraí! ❤",
];
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
    matrixCtx.fillStyle = "rgba(5, 5, 5, 0.05)";
    matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

    matrixCtx.fillStyle = "#ff00ff";
    matrixCtx.font = fontSize + "px Orbitron";

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
      speed: 0.005 + Math.random() * 0.02,
    });
  }

  function drawStars() {
    starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    starCtx.fillStyle = "white";

    stars.forEach((star) => {
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
    document.getElementById("msg-1"),
    document.getElementById("msg-2"),
    document.getElementById("msg-3"),
    document.getElementById("msg-4"),
    document.getElementById("msg-5"),
  ];

  const gifContainer = document.getElementById("gif-container");

  for (let i = 0; i < messages.length; i++) {
    messages[i].classList.add("visible");
    await sleep(3500); // Wait for visibility duration

    // Hide current message before the next one or before transition
    messages[i].classList.remove("visible");
    await sleep(1000); // Wait for transition out
  }

  // Phase Transition: Matrix -> Universe
  matrixCanvas.classList.add("faded");
  starCanvas.classList.add("visible");

  await sleep(1000);
  document.getElementById("message-sequence").classList.add("hidden"); // Clean up DOM area

  await sleep(1000);

  // Show GIF
  gifContainer.classList.remove("hidden");
  setTimeout(() => {
    gifContainer.classList.add("visible");
  }, 100);

  await sleep(5000); // GIF duration

  // Transition to Notebook Phase
  gifContainer.classList.remove("visible");
  await sleep(2000);
  gifContainer.classList.add("hidden");

  startNotebookPhase();
}

function startNotebookPhase() {
  const notebookContainer = document.getElementById("notebook-container");
  const notebookClosed = document.getElementById("notebook-closed");
  const book3D = document.getElementById("book-3d");
  const pagesContainer = document.querySelector(".book-pages-container");
  const topMsgBox = document.getElementById("top-message-box");
  const topMsgText = document.getElementById("top-message-text");
  const photoLeft = document.getElementById("photo-left");
  const photoRight = document.getElementById("photo-right");

  let currentPage = 0;
  let isAnimating = false;

  notebookContainer.classList.remove("hidden");
  notebookContainer.style.pointerEvents = "auto";

  notebookClosed.onclick = async () => {
    notebookClosed.classList.add("hidden");
    book3D.classList.remove("hidden");
    topMsgBox.classList.remove("hidden");

    await sleep(100);
    topMsgBox.classList.add("visible");
    showPagePair(0);
  };

  book3D.onclick = async () => {
    if (isAnimating) return;

    if (currentPage < Math.ceil(photos.length / 2) - 1) {
      isAnimating = true;

      pagesContainer.classList.add("page-turning");
      await sleep(350);

      currentPage++;
      showPagePair(currentPage);

      await sleep(450);
      pagesContainer.classList.remove("page-turning");
      isAnimating = false;
    } else {
      // Close Sequence
      isAnimating = true;
      topMsgBox.classList.remove("visible");
      book3D.classList.add("hidden");
      notebookClosed.classList.remove("hidden");
      await sleep(1000);
      notebookContainer.classList.add("hidden");
      startHeartPhotosPhase();
      isAnimating = false;
    }
  };

  function showPagePair(index) {
    const totalPages = Math.ceil(photos.length / 2);
    const isLastPage = index === totalPages - 1;

    topMsgText.innerText = albumMessages[index % albumMessages.length] || "";

    const finalPageText = document.getElementById("final-page-text");

    if (isLastPage) {
      // Hide photos and show centered text
      document.getElementById("decor-left").style.display = "none";
      document.getElementById("decor-right").style.display = "none";
      finalPageText.classList.remove("hidden");
    } else {
      // Show photos normally
      document.getElementById("decor-left").style.display = "flex";
      document.getElementById("decor-right").style.display = "flex";
      finalPageText.classList.add("hidden");

      const skeletonLeft = document.querySelector("#decor-left .skeleton");
      const captionLeft = document.getElementById("caption-left");
      const skeletonRight = document.querySelector("#decor-right .skeleton");
      const captionRight = document.getElementById("caption-right");

      skeletonLeft.style.display = "block";
      skeletonRight.style.display = "block";
      photoLeft.style.display = "none";
      photoRight.style.display = "none";

      captionLeft.innerText = photoCaptions[index * 2] || "";
      captionRight.innerText = photoCaptions[index * 2 + 1] || "";

      photoLeft.onload = () => {
        skeletonLeft.style.display = "none";
        photoLeft.style.display = "block";
      };
      photoLeft.onerror = () => {
        skeletonLeft.style.animation = "none";
        skeletonLeft.style.background = "#555";
      };

      photoRight.onload = () => {
        skeletonRight.style.display = "none";
        photoRight.style.display = "block";
      };
      photoRight.onerror = () => {
        skeletonRight.style.animation = "none";
        skeletonRight.style.background = "#555";
      };

      photoLeft.src = photos[index * 2] || "";
      photoRight.src = photos[index * 2 + 1] || "";
    }

    injectDecorativeHearts(document.getElementById("decor-left"));
    injectDecorativeHearts(document.getElementById("decor-right"));
  }

  function injectDecorativeHearts(container) {
    const img = container.querySelector("img");
    const skeleton = container.querySelector(".skeleton");
    const caption = container.querySelector(".photo-caption");
    container.innerHTML = "";
    if (skeleton) container.appendChild(skeleton);
    if (img) container.appendChild(img);
    if (caption) container.appendChild(caption);

    const heartCount = 3 + Math.floor(Math.random() * 3); // 3-5 hearts
    const pairsCount = Math.floor(Math.random() * 2); // 0-1 pairs

    for (let i = 0; i < heartCount; i++) {
      const isPair = i < pairsCount * 2;
      const heart = document.createElement("div");
      heart.className = "decor-heart";
      heart.innerHTML = "❤";

      let x, y;
      if (isPair && i % 2 !== 0) {
        // Place near the previous heart
        const prevHeart = container.lastChild;
        const prevX = parseFloat(prevHeart.style.left);
        const prevY = parseFloat(prevHeart.style.top);
        x = prevX + (Math.random() * 10 - 5); // very close
        y = prevY + (Math.random() * 10 - 5);
        heart.style.fontSize =
          parseFloat(prevHeart.style.fontSize) * 0.8 + "rem";
        heart.style.transform = `rotate(${Math.random() * 40 - 20}deg)`;
      } else {
        // Random position avoiding central image area mostly
        x = Math.random() * 90;
        y = Math.random() * 90;
        heart.style.fontSize = 0.8 + Math.random() * 1.5 + "rem";
        heart.style.transform = `rotate(${Math.random() * 360}deg)`;
      }

      heart.style.left = x + "%";
      heart.style.top = y + "%";
      heart.style.animationDelay = Math.random() * 2 + "s";
      heart.style.opacity = 0.6 + Math.random() * 0.4;

      container.appendChild(heart);
    }
  }
}

async function startHeartPhotosPhase() {
  const container = document.getElementById("heart-photos-container");
  container.classList.remove("hidden");

  // Heart shape points (approximate)
  const points = [];
  const scaleFactor = window.innerWidth < 768 ? 10 : 15; // smaller for mobile

  for (let t = 0; t <= Math.PI * 2; t += 0.3) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t)
    );
    points.push({
      x: x * scaleFactor + window.innerWidth / 2,
      y: y * scaleFactor + window.innerHeight / 2,
    });
  }

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  for (let i = 0; i < points.length; i++) {
    const img = document.createElement("img");
    img.src = photos[i % photos.length];
    img.className = "heart-photo";
    img.style.left = points[i].x - (window.innerWidth < 768 ? 30 : 50) + "px";
    img.style.top = points[i].y - (window.innerWidth < 768 ? 30 : 50) + "px";
    container.appendChild(img);

    await sleep(150);
    img.classList.add("visible");
  }

  await sleep(2002);
  let finalMsg = document.getElementById("final-message");
  if (!finalMsg) {
    finalMsg = document.createElement("div");
    finalMsg.id = "final-message";
    finalMsg.className = "final-birthday-message";
    document.body.appendChild(finalMsg);
  }

  finalMsg.innerText = "FELIZ CUMPLEAÑOS CIELO SARAÍ";
  finalMsg.style.display = "block";
  finalMsg.classList.add("visible");
  finalMsg.style.zIndex = "2000";

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      triggerConfettiSequence();
      setTimeout(() => {
        showPlayOverlay("Volver a reproducir");
      }, 13000);
    });
  });
}

function showPlayOverlay(label = "Reproducir") {
  const overlay = document.getElementById("play-overlay");
  const button = document.getElementById("play-button");
  const audio = document.getElementById("bg-audio");
  if (!overlay || !button) return;
  button.textContent = label;
  overlay.classList.remove("hidden");
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
}

function hidePlayOverlay() {
  const overlay = document.getElementById("play-overlay");
  if (!overlay) return;
  overlay.classList.add("hidden");
}

function resetExperience() {
  const container = document.getElementById("heart-photos-container");
  const messageSequence = document.getElementById("message-sequence");
  const notebookContainer = document.getElementById("notebook-container");
  const notebookClosed = document.getElementById("notebook-closed");
  const book3D = document.getElementById("book-3d");
  const topMsgBox = document.getElementById("top-message-box");

  container.innerHTML = "";
  container.classList.add("hidden");
  const finalMsg = document.getElementById("final-message");
  if (finalMsg) {
    finalMsg.classList.remove("visible");
    finalMsg.innerText = "";
  }
  messageSequence.classList.remove("hidden");
  messageSequence.querySelectorAll(".message").forEach((msg) => {
    msg.classList.remove("visible");
  });
  notebookContainer.classList.add("hidden");
  book3D.classList.add("hidden");
  topMsgBox.classList.add("hidden");
  notebookClosed.classList.remove("hidden");
}

async function startExperience() {
  const audio = document.getElementById("bg-audio");
  hidePlayOverlay();
  resetExperience();
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }
  runSequence();
}

function triggerConfettiSequence() {
  const duration = 15 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  const randomInRange = (min, max) => Math.random() * (max - min) + min;

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // "Poppers" from corners
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 250);

  // Initial big bursts
  const fire = (particleCount, opts) => {
    confetti({
      ...opts,
      particleCount,
      origin: { y: 0.7 },
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
    scalar: 0.8,
  });
  fire(200, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(200, {
    spread: 120,
    startVelocity: 45,
  });
}

// Window resize handler
window.addEventListener("resize", () => {
  matrixCanvas.width = window.innerWidth;
  matrixCanvas.height = window.innerHeight;
  starCanvas.width = window.innerWidth;
  starCanvas.height = window.innerHeight;
});

// Initialization
window.onload = () => {
  initMatrix();
  initStars();
  const button = document.getElementById("play-button");
  if (button) {
    button.addEventListener("click", startExperience);
  }
  showPlayOverlay("PLAY ▶️");
};
