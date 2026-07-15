/* === HERO SLIDER === */
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let current = 0;
let autoPlay;

function goToSlide(n) {
  if (slides.length === 0) return;
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (n + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}

function startAutoPlay() {
  if (slides.length === 0) return;
  autoPlay = setInterval(() => goToSlide(current + 1), 4500);
}

function resetAutoPlay() {
  clearInterval(autoPlay);
  startAutoPlay();
}

if (slides.length > 0) {
  prevBtn?.addEventListener('click', () => { goToSlide(current - 1); resetAutoPlay(); });
  nextBtn?.addEventListener('click', () => { goToSlide(current + 1); resetAutoPlay(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goToSlide(parseInt(dot.dataset.index));
      resetAutoPlay();
    });
  });

  startAutoPlay();
}

/* === TOUCH SWIPE FOR HERO SLIDER === */
const heroSlider = document.getElementById('heroSlider');
let touchStartX = 0;
let touchEndX = 0;

if (heroSlider) {
  heroSlider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  heroSlider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToSlide(current + 1);
      else goToSlide(current - 1);
      resetAutoPlay();
    }
  }, { passive: true });
}

/* === GALLERY SLIDER === */
const galleryTrack = document.getElementById('galleryTrack');
const gallerySlides = document.querySelectorAll('.gallery-slide');
const galleryPrev = document.getElementById('galleryPrev');
const galleryNext = document.getElementById('galleryNext');
const galleryDots = document.getElementById('galleryDots');
let slidesPerView = window.innerWidth <= 600 ? 1 : 2;
let totalGroups = Math.ceil(gallerySlides.length / slidesPerView);
let galleryGroup = 0;
let galleryAutoPlay;

function rebuildGallery() {
  slidesPerView = window.innerWidth <= 600 ? 1 : 2;
  totalGroups = Math.ceil(gallerySlides.length / slidesPerView);
  galleryGroup = Math.min(galleryGroup, totalGroups - 1);
  galleryDots.innerHTML = '';
  for (let i = 0; i < totalGroups; i++) {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === galleryGroup ? ' active' : '');
    dot.setAttribute('aria-label', `Go to group ${i + 1}`);
    dot.addEventListener('click', () => { goToGalleryGroup(i); resetGalleryAuto(); });
    galleryDots.appendChild(dot);
  }
  goToGalleryGroup(galleryGroup);
}

function goToGalleryGroup(n) {
  galleryGroup = ((n % totalGroups) + totalGroups) % totalGroups;
  const offset = galleryGroup * (100 / slidesPerView);
  galleryTrack.style.transform = `translateX(-${offset}%)`;
  galleryDots.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === galleryGroup);
  });
}

function startGalleryAuto() {
  galleryAutoPlay = setInterval(() => goToGalleryGroup(galleryGroup + 1), 3000);
}

function resetGalleryAuto() {
  clearInterval(galleryAutoPlay);
  startGalleryAuto();
}

if (gallerySlides.length > 0) {
  rebuildGallery();
  galleryNext.addEventListener('click', () => { goToGalleryGroup(galleryGroup + 1); resetGalleryAuto(); });
  galleryPrev.addEventListener('click', () => { goToGalleryGroup(galleryGroup - 1); resetGalleryAuto(); });
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(rebuildGallery, 200);
  });
  startGalleryAuto();
}

/* === RESPONSIVE HERO IMAGES === */
function swapHeroImages() {
  const isMobile = window.innerWidth <= 768;
  document.querySelectorAll('.slide').forEach(slide => {
    if (isMobile) {
      if (!slide.dataset.deskBg) slide.dataset.deskBg = slide.style.backgroundImage;
      slide.style.backgroundImage = slide.dataset.deskBg.replace(/(\d+)\.png/, '$1-mobile.png');
    } else if (slide.dataset.deskBg) {
      slide.style.backgroundImage = slide.dataset.deskBg;
    }
  });
}
swapHeroImages();
let heroResizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(heroResizeTimer);
  heroResizeTimer = setTimeout(swapHeroImages, 200);
});

/* === LIGHTBOX === */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

gallerySlides.forEach(slide => {
  slide.addEventListener('click', () => {
    const img = slide.querySelector('img');
    lightboxImg.src = img.src;
    lightbox.classList.add('active');
  });
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
    lightbox.classList.remove('active');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') lightbox.classList.remove('active');
});

/* === STICKY HEADER === */
const header = document.getElementById('site-header');

if (header) {
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
}

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

if (navLinks.length === 0 || sections.length === 0) {
  // nav not yet loaded (dynamically included) — skip
} else {
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
}

/* === KEYBOARD ACCESSIBILITY === */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    mainNav?.classList.remove('open');
    hamburger?.classList.remove('active');
  }
});
