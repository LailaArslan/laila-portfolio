/* ============================================================
   Laila Arslan — portfolio interactions
   Scroll-reveal: elements with .reveal fade/slide in on scroll.
   Progressive enhancement — content is fully visible without JS.
   ============================================================ */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return; // leave everything visible, no motion

  document.documentElement.classList.add("anim");

  var els = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  var raf = 0;

  function check() {
    var h = window.innerHeight;
    for (var i = 0; i < els.length; i++) {
      var e = els[i];
      if (!e.classList.contains("in") && e.getBoundingClientRect().top < h * 0.9) {
        e.classList.add("in");
      }
    }
  }

  function onScroll() {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(check);
  }

  function start() {
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();

/* ============================================================
   Mobile navigation — hamburger toggle.
   Runs regardless of motion preference.
   ============================================================ */
(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-links");
  if (!toggle || !menu) return;

  function setOpen(open) {
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  toggle.addEventListener("click", function () {
    setOpen(!menu.classList.contains("open"));
  });

  // Close after tapping a link.
  menu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") setOpen(false);
  });

  // Close on Escape.
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setOpen(false);
  });

  // Reset when resizing back up to desktop.
  window.addEventListener("resize", function () {
    if (window.innerWidth > 680) setOpen(false);
  });
})();

/* ============================================================
   Back-to-top button — appears after scrolling, smooth-scrolls up.
   ============================================================ */
(function () {
  "use strict";

  var btn = document.querySelector(".to-top");
  if (!btn) return;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function onScroll() {
    btn.classList.toggle("show", window.scrollY > 600);
  }

  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
