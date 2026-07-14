/* === HERO SLIDER === */
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let current = 0;
let autoPlay;

function goToSlide(n) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (n + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}

function startAutoPlay() {
  autoPlay = setInterval(() => goToSlide(current + 1), 4500);
}

function resetAutoPlay() {
  clearInterval(autoPlay);
  startAutoPlay();
}

prevBtn?.addEventListener('click', () => { goToSlide(current - 1); resetAutoPlay(); });
nextBtn?.addEventListener('click', () => { goToSlide(current + 1); resetAutoPlay(); });

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    goToSlide(parseInt(dot.dataset.index));
    resetAutoPlay();
  });
});

startAutoPlay();

/* === STICKY HEADER === */
const header = document.getElementById('site-header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Scroll to top button
  const scrollTop = document.getElementById('scrollTop');
  if (window.scrollY > 400) {
    scrollTop?.classList.add('visible');
  } else {
    scrollTop?.classList.remove('visible');
  }
}, { passive: true });

/* === HAMBURGER MENU === */
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('main-nav');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mainNav.classList.toggle('open');
});

// Mobile dropdown toggle
document.querySelectorAll('.has-dropdown > a').forEach(link => {
  link.addEventListener('click', function(e) {
    if (window.innerWidth <= 900) {
      e.preventDefault();
      this.parentElement.classList.toggle('open');
    }
  });
});

// Close nav on link click
document.querySelectorAll('.nav-list a:not(.has-dropdown > a)').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

/* === SCROLL TO TOP === */
document.getElementById('scrollTop')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* === COUNTER ANIMATION === */
function animateCounter(el) {
  const targetStr = el.dataset.count;
  const isFloat = targetStr.includes('.');
  const target = isFloat ? parseFloat(targetStr) : parseInt(targetStr);
  const duration = 2000;
  const steps = duration / 16;
  const step = target / steps;
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    if (isFloat) {
      el.textContent = current.toFixed(1);
    } else {
      el.textContent = Math.floor(current).toLocaleString('en-IN');
    }
  }, 16);
}

/* === INTERSECTION OBSERVER === */
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

// Fade in animations
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100);
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.program-card, .impact-card, .gi-card, .about-content, .video-content, .stat-item').forEach(el => {
  el.classList.add('fade-in-up');
  fadeObserver.observe(el);
});

// Counter observer
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

/* === NEWSLETTER FORM === */
document.getElementById('newsletterForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('emailInput').value;
  if (email) {
    const btn = this.querySelector('.btn-send');
    const original = btn.textContent;
    btn.textContent = '✅ Subscribed!';
    btn.style.background = '#10b981';
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      this.reset();
    }, 3000);
  }
});

/* === SMOOTH ACTIVE NAV HIGHLIGHTING === */
const navLinks = document.querySelectorAll('.nav-list > li > a');
const sections = document.querySelectorAll('section[id]');

const sectionObserver = new IntersectionObserver((entries) => {
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
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));

/* === KEYBOARD ACCESSIBILITY === */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    mainNav.classList.remove('open');
    hamburger.classList.remove('active');
  }
});
