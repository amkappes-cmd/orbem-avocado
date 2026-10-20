/* Genus Echo avocado page: navigation and progressive enhancement. */
(function () {
  'use strict';
  var nav = document.getElementById('nav');
  var sticky = document.getElementById('stickyCta');
  var hero = document.querySelector('.hero');
  var contact = document.getElementById('contact');
  var scheduled = false;
  function updateNavigation() {
    var y = window.scrollY;
    nav.classList.toggle('scrolled', y > 40);
    var show = y > hero.offsetHeight * 0.85 && contact.getBoundingClientRect().top > window.innerHeight;
    sticky.classList.toggle('show', show);
    sticky.inert = !show;
    scheduled = false;
  }
  window.addEventListener('scroll', function () {
    if (!scheduled) { scheduled = true; window.requestAnimationFrame(updateNavigation); }
  }, { passive: true });
  window.addEventListener('resize', updateNavigation);
  updateNavigation();

  // Content stays visible when JavaScript or observers are unavailable.
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(function (element) {
      observer.observe(element);
    });
    document.documentElement.classList.add('reveal-enabled');
  }
})();
