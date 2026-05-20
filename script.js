// -----------------------------------------
// Project Database
// -----------------------------------------
const projectsData = {
  griffinx: {
    title: "GriffinX: Your Local AI Assistant",
    subtitle: "Voice-controlled offline helper",
    category: "Local AI & Systems",
    stack: "Python, PySide6 (Qt), Faster-Whisper, llama.cpp (Qwen3), Piper TTS, SQLite",
    desc: "GriffinX is a local-first, voice-controlled Windows desktop assistant. By utilizing quantized model files loaded locally, it transcribes speech, processes intents, triggers script or keyboard executions, and responds verbally without sending any user data to the cloud. It features a sleek golden-brown dashboard, resource monitor gauges, and a neon floating ball overlay.",
    features: [
      "Push-to-talk hotkey trigger (Ctrl+CapsLock) with CapsLock state override",
      "Faster-Whisper STT with transcription prompts for command vocabulary biasing",
      "llama.cpp local GGUF execution for Qwen3-4B with think-block stripping",
      "Piper Neural Text-to-Speech for async speech output",
      "Intent caching via SequenceMatcher (80% similarity threshold) for sub-second execution",
      "Database persistence for logs, intents, and custom hotkey-bound macros"
    ],
    link: "https://github.com/Felix-au/GriffinX-Your-Local-AI-Assistant",
    img: "assets/griffinx.jpg"
  },
  janginti: {
    title: "JanGinti: Crowd Pulse Estimator",
    subtitle: "CSRNet estimation & flow simulator",
    category: "AI & ML, Web App",
    stack: "CSRNet (PyTorch), FastAPI, Vite, HTML Canvas, Python",
    desc: "JanGinti is a deep-learning crowd counting system built on the CSRNet architecture. It resolves bias toward Western features by incorporating a custom-scraped Indian crowd dataset (Part C). In addition to predictions, it features a FastAPI server and an interactive web simulator representing railway scenarios with paths, boundaries, and routing rules.",
    features: [
      "Two-phase training on ShanghaiTech A+B and custom Indian crowd Part C (770 images)",
      "Outperforms original paper's benchmarks (63.31 vs 68.2 MAE Part A | 8.37 vs 10.6 MAE Part B)",
      "FastAPI backend endpoint with normalization and downsampling",
      "Interactive canvas-based crowd flow path simulator with rules engine",
      "Per-image evaluation suite generating loss curves and scatter metrics"
    ],
    link: "https://github.com/Felix-au/JanGinti-Counting-the-Pulse-of-the-Crowd",
    img: "assets/janginti.png"
  },
  deskx: {
    title: "DeskX: Wallpaper Engine",
    subtitle: "Electron active wallpaper manager",
    category: "Windows Core & UI",
    stack: "Electron 34, HTML5/CSS3, JavaScript, Win32 Koffi FFI",
    desc: "DeskX is a native Windows application that allows setting local images, GIFs, videos, and dynamic HTML pages as active desktop wallpapers. It utilizes low-level FFI bindings to hook into Windows layout handles, ensuring widgets sit beneath desktop icons while supporting per-monitor spans.",
    features: [
      "Spanning and per-monitor independent layout configurations",
      "3-layer widget overlay with drag-and-drop placements",
      "Win32 Koffi FFI hooks for Z-order layout levels and click-through options",
      "Full monitor configuration caching and hot-swapping"
    ],
    link: "https://github.com/Felix-au/DeskX-Wallpaper-Engine",
    img: "fallback"
  },
  codemate: {
    title: "CodeMate: Clipboard Debugger",
    subtitle: "AI debugging clipboard monitor",
    category: "Local AI & Desktop",
    stack: "Python, PySide6, Jupyter, Qwen2.5-Coder-1.5B (QLoRA), Gemini API",
    desc: "CodeMate is a local programming helper that sits in the Windows tray. It detects clipboard copies, and when code is detected, generates a PySide6 overlay showing explanations or debug tips using a fine-tuned local Qwen2.5-Coder.",
    features: [
      "Fuzzy clipboard code syntax detection",
      "QLoRA fine-tuned explanation model (1.5B parameters)",
      "PySide6 overlay with click-to-collapse animations",
      "Automatic cloud API fallback if local model is offline"
    ],
    link: "https://github.com/Felix-au/CodeMate-Your-Coding-Companion",
    img: "fallback"
  },
  sonixx: {
    title: "Sonixx: Virtual Audio Mixer",
    subtitle: "High-performance WASAPI router",
    category: "Systems & Audio",
    stack: "Python, PySide6, WASAPI, Pycaw",
    desc: "Sonixx is a Windows audio routing utility. It captures real-time audio streams from physical devices and running applications using Windows Core Audio APIs, mixes them, and outputs to virtual devices (like VB-Cable) for clean broadcasts.",
    features: [
      "Per-application volume mixing hooks",
      "Real-time WASAPI audio device loopback capture",
      "Pycaw integrations for core device configuration",
      "PySide6 mixer UI panel"
    ],
    link: "https://github.com/Felix-au/Sonixx",
    img: "fallback"
  },
  sahara: {
    title: "Sahara Homestay Portal",
    subtitle: "MERN Stack living booking system",
    category: "Full Stack Web",
    stack: "React (Vite), Node.js, Express, MongoDB Atlas, Tailwind CSS, Framer Motion",
    desc: "Sahara Homestay is a MERN stack web app designed for premium lodging management. It features a complete administrative console to edit testimonials, gallery layouts, client rosters, and room pricing parameters.",
    features: [
      "Dynamic CMS editor updating pages in real-time without re-deployments",
      "ImgBB API uploader integration for images",
      "Booking panel log with interactive Confirm/Cancel status actions",
      "Instant booking leads via WhatsApp API hooks",
      "Framer Motion glassmorphism styling elements"
    ],
    link: "https://github.com/Felix-au/Sahara-Homestay-Client-Website",
    img: "assets/sahara.png"
  },
  scheduler: {
    title: "University Class Scheduler",
    subtitle: "Constraint-aware timetable compiler",
    category: "Web App & Algorithms",
    stack: "React 19, Vite 8, JavaScript, CSS Grid",
    desc: "A constraint-aware academic timetable compiler. It uses a Greedy Constraint Satisfaction (CSP) algorithm to map rooms, faculty schedules, section cohorts, and courses into non-overlapping weekly tables under 5 seconds.",
    features: [
      "Greedy Constraint Satisfaction (CSP) scheduling engine",
      "Interactive timetable view with section filter locks",
      "Collision tracking dashboard for manual corrections",
      "Local state configuration persistence"
    ],
    link: "https://github.com/Felix-au/University-Class-Scheduler",
    img: "fallback"
  },
  nfadfa: {
    title: "NFA to DFA Web Visualizer",
    subtitle: "State automata graph builder",
    category: "Web App & Algorithms",
    stack: "Vite, JavaScript, HTML Canvas, CSS",
    desc: "An educational web tool demonstrating state machine transitions and automata reduction steps. It provides interactive canvas nodes where users can edit graphs and watch subset construction in real-time.",
    features: [
      "Interactive node builder with custom label bounds",
      "Step-by-step subset construction simulation",
      "Custom canvas graph layout calculations",
      "State transition matrix grid generation"
    ],
    link: "https://github.com/Felix-au/NFA-to-DFA-Visualizer",
    img: "fallback"
  }
};

// -----------------------------------------
// DOM Elements
// -----------------------------------------
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');
const header = document.querySelector('.main-header');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const projectsGrid = document.getElementById('projects-grid');
const typewriterElement = document.getElementById('typewriter');
const modal = document.getElementById('project-modal');
const modalClose = document.querySelector('.modal-close');
const modalBody = document.getElementById('modal-body');
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');

// -----------------------------------------
// Navigation & Mobile Menu
// -----------------------------------------
mobileToggle.addEventListener('click', () => {
  mobileToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu on nav link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileToggle.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Header scroll styling
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Active section indicator
const observerOptions = {
  root: null,
  rootMargin: '-50% 0px -50% 0px', // Trigger when section is in middle of viewport
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => {
  observer.observe(section);
});

// -----------------------------------------
// Typewriter Effect
// -----------------------------------------
const roles = [
  "Local AI Systems.",
  "Windows Utility Software.",
  "Full-Stack Web Apps.",
  "Performance-First Code."
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 50;
  } else {
    typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 100;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    typeSpeed = 2000; // Pause at end of word
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeSpeed = 500; // Pause before typing next word
  }

  setTimeout(typeEffect, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(typeEffect, 1000);
});

// -----------------------------------------
// Project Filter Logic
// -----------------------------------------
filterBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    // Set active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filterValue = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const categories = card.getAttribute('data-category').split(' ');
      
      // Animate filter change
      card.style.opacity = '0';
      card.style.transform = 'scale(0.95)';
      
      setTimeout(() => {
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.classList.remove('hidden');
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        } else {
          card.classList.add('hidden');
        }
      }, 300);
    });
  });
});

// -----------------------------------------
// Modal Operations
// -----------------------------------------
function openModal(projectId) {
  const data = projectsData[projectId];
  if (!data) return;

  // Build features list html
  const featuresHTML = data.features.map(f => `<li>${f}</li>`).join('');

  // Fallback image rendering
  let imgHTML = '';
  if (data.img === 'fallback') {
    imgHTML = `
      <div class="fallback-card-img" style="background: linear-gradient(135deg, #10121b, #1d2133); height: 100%; display: flex; align-items: center; justify-content: center;">
        <span style="font-size: 2.5rem; font-weight: 700; color: #fff; font-family: var(--font-display); opacity: 0.8;">${data.title.split(':')[0]}</span>
      </div>
    `;
  } else {
    imgHTML = `<img src="${data.img}" alt="${data.title}" class="modal-img">`;
  }

  // Inject modal content
  modalBody.innerHTML = `
    <div class="modal-header">
      <div class="project-tags">
        <span class="badge badge-sys">${data.category}</span>
      </div>
      <h3 class="modal-title">${data.title}</h3>
      <p style="color: var(--accent-gold); font-weight: 500; font-family: var(--font-display);">${data.subtitle}</p>
    </div>

    <div class="modal-img-wrapper">
      ${imgHTML}
    </div>

    <div class="modal-details-grid">
      <div class="modal-description">
        <h4>Overview</h4>
        <p>${data.desc}</p>
      </div>

      <div class="modal-meta">
        <h4>Specs</h4>
        <div class="modal-meta-box">
          <div class="meta-item">
            <h5>Core Tech</h5>
            <span>${data.stack.split(',')[0]}</span>
          </div>
          <div class="meta-item">
            <h5>Scope</h5>
            <span>Personal Project</span>
          </div>
          <div class="meta-item">
            <h5>License</h5>
            <span>MIT</span>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-features">
      <h4>Key Highlights</h4>
      <ul class="features-list">
        ${featuresHTML}
      </ul>
    </div>

    <div class="modal-actions">
      <a href="${data.link}" target="_blank" rel="noopener" class="btn btn-primary">View Source Code</a>
      <button class="btn btn-secondary" onclick="closeModal()">Close</button>
    </div>
  `;

  // Display modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Stop background scrolling
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = 'auto'; // Enable scrolling
}

// Bind click events to project cards
projectCards.forEach(card => {
  card.addEventListener('click', () => {
    const projectId = card.getAttribute('data-id');
    openModal(projectId);
  });
});

// Close modal on click handlers
modalClose.addEventListener('click', closeModal);
modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});

// Expose closeModal globally
window.closeModal = closeModal;

// -----------------------------------------
// Contact Form Handler (Web3Forms API Integration)
// -----------------------------------------
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('form-name').value;
  const feedbackEl = formFeedback;

  // Visual submit state
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  // Serialize Form Data
  const formData = new FormData(contactForm);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  // Send request to Web3Forms API
  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: json
  })
  .then(async (response) => {
    let res = await response.json();
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
    feedbackEl.classList.remove('hidden', 'success', 'error');

    if (response.status === 200) {
      feedbackEl.classList.add('success');
      feedbackEl.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
      contactForm.reset();
    } else {
      feedbackEl.classList.add('error');
      feedbackEl.textContent = res.message || "Something went wrong. Please check your access key.";
    }
  })
  .catch(error => {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
    feedbackEl.classList.remove('hidden', 'success', 'error');
    feedbackEl.classList.add('error');
    feedbackEl.textContent = "Network error. Please verify your connection and try again.";
  })
  .finally(() => {
    // Auto-hide feedback after 6 seconds
    setTimeout(() => {
      feedbackEl.classList.add('hidden');
    }, 6000);
  });
});
