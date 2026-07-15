document.addEventListener('DOMContentLoaded', function () {
  fetch('header.html')
    .then(function (r) { return r.text(); })
    .then(function (data) {
      document.getElementById('header-placeholder').innerHTML = data;
      initHeader();
    });

  fetch('footer.html')
    .then(function (r) { return r.text(); })
    .then(function (data) {
      document.getElementById('footer-placeholder').innerHTML = data;
    });
});

function initHeader() {
  var header = document.getElementById('site-header');
  var scrollTop = document.getElementById('scrollTop');
  window.addEventListener('scroll', function () {
    if (header) {
      if (window.scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    if (scrollTop) {
      if (window.scrollY > 400) {
        scrollTop.classList.add('visible');
      } else {
        scrollTop.classList.remove('visible');
      }
    }
  }, { passive: true });

  var hamburger = document.getElementById('hamburger');
  var mainNav = document.getElementById('main-nav');
  if (hamburger && mainNav) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      mainNav.classList.toggle('open');
    });
  }

  document.querySelectorAll('.has-dropdown > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        this.parentElement.classList.toggle('open');
      }
    });
  });

  document.querySelectorAll('.nav-list a:not(.has-dropdown > a)').forEach(function (link) {
    link.addEventListener('click', function () {
      if (mainNav) mainNav.classList.remove('open');
      if (hamburger) hamburger.classList.remove('active');
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (mainNav) mainNav.classList.remove('open');
      if (hamburger) hamburger.classList.remove('active');
    }
  });
}
