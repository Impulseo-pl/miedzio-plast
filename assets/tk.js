// Hero: przełączanie trzech haseł (jak slajdy we wzorze) - licznik 01/03, kafelki, pasek postępu.
// Bez JS zostaje pierwszy slajd, nic nie znika.
(function () {
  try {
    var hero = document.querySelector('[data-slides]');
    if (!hero) return;
    var slides = JSON.parse(hero.getAttribute('data-slides'));
    var ht = hero.querySelector('.ht'), tag = hero.querySelector('.hero-top .tag'),
        desc = hero.querySelector('.hero-desc p'), cur = hero.querySelector('.hero-count .cur'),
        bar = hero.querySelector('.hero-count .bar i'), thumbs = [].slice.call(hero.querySelectorAll('.thumb'));
    var i = 0, T = 6500, timer = null;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    function pad(n) { return (n < 10 ? '0' : '') + n; }
    function runBar() {
      if (!bar || reduce) return;
      bar.style.transition = 'none'; bar.style.transform = 'scaleX(0)';
      void bar.offsetWidth;
      bar.style.transition = 'transform ' + T + 'ms linear'; bar.style.transform = 'scaleX(1)';
    }
    function go(n) {
      i = (n + slides.length) % slides.length;
      var s = slides[i];
      ht.classList.add('out'); desc.classList.add('out');
      setTimeout(function () {
        ht.textContent = s.t; desc.textContent = s.d; tag.textContent = s.k;
        ht.classList.remove('out'); desc.classList.remove('out');
      }, reduce ? 0 : 380);
      if (cur) cur.textContent = pad(i + 1);
      thumbs.forEach(function (b, k) { b.classList.toggle('on', k === i); b.setAttribute('aria-pressed', k === i ? 'true' : 'false'); });
      runBar();
    }
    function start() { clearInterval(timer); if (!reduce) timer = setInterval(function () { go(i + 1); }, T); }
    thumbs.forEach(function (b, k) { b.addEventListener('click', function () { go(k); start(); }); });
    runBar(); start();
    document.addEventListener('visibilitychange', function () { if (document.hidden) clearInterval(timer); else { runBar(); start(); } });
  } catch (e) {}
})();

// Stopklatka: tło (position:fixed, przycięte clip-path) włączamy dopiero, gdy sekcja jest blisko ekranu.
(function () {
  try {
    var st = document.querySelectorAll('.stopklatka');
    if (!st.length || !('IntersectionObserver' in window)) return;
    document.documentElement.classList.add('js-stk');
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { e.target.classList.toggle('on', e.isIntersecting); });
    }, { rootMargin: '60% 0px 60% 0px' });
    st.forEach(function (el) { io.observe(el); });
  } catch (e) { document.documentElement.classList.remove('js-stk'); }
})();
