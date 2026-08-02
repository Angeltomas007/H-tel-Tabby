/* Hotel Tabby — site interactions (no dependencies) */
(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var stickyBar = document.querySelector(".sticky-bar");
  var scrollThreshold = 40;

  function onScroll() {
    var scrolled = window.scrollY > scrollThreshold;
    if (header) header.classList.toggle("is-scrolled", scrolled);
    if (stickyBar) stickyBar.classList.toggle("is-visible", window.scrollY > 520);
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Safari's back/forward cache can resurrect a fully frozen copy of this
     page — old DOM, old scroll-linked classes, old JS still running from
     whenever the tab was first opened, even after this file has since been
     updated on the server. Re-running onScroll() is not enough to fix that
     (it only fixes symptoms, not stale code), so force a real reload
     whenever the page is restored from bfcache. This guarantees every tab
     is always running current code after a single fresh load. */
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) {
      window.location.reload();
    } else {
      onScroll();
    }
  });

  /* Mobile nav drawer */
  var navToggle = document.querySelector(".nav-toggle");
  var navClose = document.querySelector(".mobile-nav-close");
  var mobileNav = document.querySelector(".mobile-nav");

  function openNav() {
    if (!mobileNav) return;
    mobileNav.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeNav() {
    if (!mobileNav) return;
    mobileNav.classList.remove("is-open");
    document.body.style.overflow = "";
  }
  if (navToggle) navToggle.addEventListener("click", openNav);
  if (navClose) navClose.addEventListener("click", closeNav);
  if (mobileNav) {
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
  }

  /* Floating WhatsApp / contact panel */
  var floating = document.querySelector(".floating-contact");
  var floatingBtn = document.querySelector(".floating-contact-btn");
  if (floatingBtn && floating) {
    floatingBtn.addEventListener("click", function () {
      floating.classList.toggle("is-open");
    });
    document.addEventListener("click", function (e) {
      if (!floating.contains(e.target)) floating.classList.remove("is-open");
    });
  }

  /* Guests dropdown (simple increment/decrement, no external lib) */
  var guestRenderers = [];
  document.querySelectorAll("[data-guest-control]").forEach(function (wrap) {
    var display = wrap.querySelector("[data-guest-count]");
    var input = wrap.querySelector("input[type=hidden]");
    var count = parseInt((input && input.value) || "2", 10);
    function render() {
      if (display) {
        display.textContent = window.TabbyI18n
          ? window.TabbyI18n.guestsLabel(count)
          : count + (count === 1 ? " ospite" : " ospiti");
      }
      if (input) input.value = String(count);
    }
    wrap.querySelectorAll("[data-guest-inc]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        count = Math.min(8, count + 1);
        render();
      });
    });
    wrap.querySelectorAll("[data-guest-dec]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        count = Math.max(1, count - 1);
        render();
      });
    });
    render();
    guestRenderers.push(render);
  });
  document.addEventListener("tabby:langchange", function () {
    guestRenderers.forEach(function (render) {
      render();
    });
  });

  /* Default + min dates on all booking date inputs (today / tomorrow) */
  var todayStr = new Date().toISOString().slice(0, 10);
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var tomorrowStr = tomorrow.toISOString().slice(0, 10);

  document.querySelectorAll('input[data-checkin]').forEach(function (el) {
    el.min = todayStr;
    if (!el.value) el.value = todayStr;
  });
  document.querySelectorAll('input[data-checkout]').forEach(function (el) {
    el.min = tomorrowStr;
    if (!el.value) el.value = tomorrowStr;
  });

  /* Booking forms: intercept submit, build a mailto/WhatsApp-friendly summary.
     NOTE: wire this to the real booking-engine endpoint (e.g. Booking Experts,
     SiteMinder, Simple Booking) — this placeholder just confirms the flow. */
  document.querySelectorAll("[data-booking-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var checkin = form.querySelector('[data-checkin]');
      var checkout = form.querySelector('[data-checkout]');
      var guestsInput = form.querySelector('input[type=hidden]');
      var params = new URLSearchParams({
        checkin: (checkin && checkin.value) || "",
        checkout: (checkout && checkout.value) || "",
        guests: (guestsInput && guestsInput.value) || "2",
      });
      window.location.href = "contatti.html?" + params.toString() + "#richiesta";
    });
  });

  /* Reveal-on-scroll */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* Mark active nav link */
  var path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-desktop a, .mobile-nav a").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      link.classList.add("is-active");
    }
  });

  /* Cookie / privacy notice banner (informational only — the site sets no
     profiling or third-party cookies, see cookie-policy.html) */
  var cookieNotice = document.getElementById("cookie-notice");
  if (cookieNotice) {
    var CONSENT_KEY = "tabby-cookie-notice-dismissed";
    try {
      if (!localStorage.getItem(CONSENT_KEY)) {
        setTimeout(function () {
          cookieNotice.classList.add("is-visible");
        }, 600);
      }
    } catch (e) {
      /* localStorage unavailable (private mode) — show every visit */
      setTimeout(function () {
        cookieNotice.classList.add("is-visible");
      }, 600);
    }
    var acceptBtn = cookieNotice.querySelector("[data-cookie-accept]");
    if (acceptBtn) {
      acceptBtn.addEventListener("click", function () {
        cookieNotice.classList.remove("is-visible");
        try {
          localStorage.setItem(CONSENT_KEY, "1");
        } catch (e) {
          /* ignore */
        }
      });
    }
  }
})();
