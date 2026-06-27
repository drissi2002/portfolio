/* ═══════════════════════════════════════════
   HOUCEMEDDINE DRISSI — Portfolio Scripts
═══════════════════════════════════════════ */

/* ─── AOS init ─── */
AOS.init({
  duration: 700,
  easing: 'ease-out-cubic',
  once: true,
  offset: 60
});

/* ─── GSAP + ScrollTrigger register ─── */
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── Navbar scroll behavior ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ─── Mobile menu ─── */
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  const icon = menuToggle.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
});
document.querySelectorAll('.mobile-menu-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    const icon = menuToggle.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-times');
  });
});

/* ─── Typed.js ─── */
if (typeof Typed !== 'undefined') {
  new Typed('#typed-role', {
    strings: [
      'enterprise Java backends.',
      'Spring Boot microservices.',
      'Angular & React frontends.',
      'secure banking platforms.',
      'scalable fintech systems.',
    ],
    typeSpeed: 55,
    backSpeed: 30,
    backDelay: 2200,
    loop: true,
    smartBackspace: true
  });
}

/* ─── Particle Canvas ─── */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [];
  const COUNT = window.innerWidth < 768 ? 30 : 60;

  function resize() {
    W = canvas.width  = canvas.parentElement.offsetWidth;
    H = canvas.height = canvas.parentElement.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COLORS = ['#6366F1', '#06B6D4', '#8B5CF6', '#3B82F6'];

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.r  = Math.random() * 1.8 + 0.5;
      this.alpha = Math.random() * 0.5 + 0.1;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < COUNT; i++) particles.push(new Particle());

  // Draw connection lines
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120) {
          ctx.save();
          ctx.globalAlpha = (1 - dist / 120) * 0.12;
          ctx.strokeStyle = '#6366F1';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(loop);
  }
  loop();
})();

/* ─── Animated Counters ─── */
function animateCounter(el, target, duration = 1800) {
  let start = null;
  const isLarge = target >= 1000;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = isLarge ? current.toLocaleString() : current;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = isLarge ? target.toLocaleString() : target;
  };
  requestAnimationFrame(step);
}

// Observe stat numbers
const statObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      entry.target.dataset.animated = 'true';
      const target = parseInt(entry.target.dataset.target, 10);
      animateCounter(entry.target, target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => statObs.observe(el));

/* ─── Skill Bar Animations ─── */
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.skill-bar-fill');
      fills.forEach(fill => {
        const w = fill.dataset.width;
        setTimeout(() => {
          fill.style.width = w + '%';
        }, 200);
      });
      skillObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.bento-card').forEach(card => skillObs.observe(card));

/* ─── Lang bar animate on scroll ─── */
const langObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.lang-bar-fill');
      fills.forEach(fill => {
        const target = fill.style.width;
        fill.style.width = '0%';
        setTimeout(() => { fill.style.transition = 'width 1.4s cubic-bezier(0.4,0,0.2,1)'; fill.style.width = target; }, 300);
      });
      langObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.lang-bar-track').forEach(el => langObs.observe(el.parentElement.parentElement));

/* ─── Contact form → mailto ─── */
function sendEmail() {
  const name    = document.getElementById('cf-name').value.trim();
  const email   = document.getElementById('cf-email').value.trim();
  const subject = document.getElementById('cf-subject').value.trim();
  const message = document.getElementById('cf-message').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in your name, email, and message.');
    return;
  }

  const body = `Hi Houcemeddine,\n\nMy name is ${name} (${email}).\n\n${message}`;
  const mailto = `mailto:houssemmedine.drissi@enicar.ucar.tn?subject=${encodeURIComponent(subject || 'Portfolio Contact')}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;

  document.getElementById('form-success').classList.remove('hidden');
  setTimeout(() => document.getElementById('form-success').classList.add('hidden'), 4000);
}

/* ─── GSAP Hero entrance ─── */
if (typeof gsap !== 'undefined') {
  gsap.from('.orb', {
    scale: 0,
    opacity: 0,
    duration: 2,
    ease: 'power2.out',
    stagger: 0.3
  });
}

/* ─── Cursor glow effect (desktop) ─── */
if (window.matchMedia('(pointer: fine)').matches) {
  const glow = document.createElement('div');
  glow.id = 'cursor-glow';
  glow.style.cssText = `
    position: fixed;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 1;
    transform: translate(-50%, -50%);
    transition: transform 0.1s linear;
    will-change: transform;
  `;
  document.body.appendChild(glow);

  let mx = 0, my = 0;
  window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    glow.style.left = mx + 'px';
    glow.style.top  = my + 'px';
  });
}

/* ─── Smooth active nav highlight on scroll ─── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const navObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('text-white');
        link.classList.add('text-slate-400');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('text-white');
          link.classList.remove('text-slate-400');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObs.observe(s));

/* ─── Card tilt effect ─── */
document.querySelectorAll('.exp-card, .project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const tiltX = ((y - cy) / cy) * 4;
    const tiltY = ((cx - x) / cx) * 4;
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
