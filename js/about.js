/**
 * BUBBLE & BREW – About Us Page Controller  v1.0
 * Handles scroll reveal animations, navbar scroll state, and interactive timeline.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ═════════════════════════════════════════════════════════════════════════
  // 1. FIXED NAVBAR SCROLL STATE
  // ═════════════════════════════════════════════════════════════════════════
  const navContainer = document.getElementById('navbar-container');

  function handleNavbarScroll() {
    if (!navContainer) return;
    if (window.scrollY > 40) {
      navContainer.classList.add('scrolled');
    } else {
      navContainer.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // ═════════════════════════════════════════════════════════════════════════
  // 2. SCROLL REVEAL ANIMATIONS (Intersection Observer)
  // ═════════════════════════════════════════════════════════════════════════
  const revealElements = document.querySelectorAll('.hs-reveal, .hs-reveal-left, .hs-reveal-right');

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('hs-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('hs-visible'));
  }

  // ═════════════════════════════════════════════════════════════════════════
  // 3. INTERACTIVE TIMELINE SCROLL PROGRESS
  // ═════════════════════════════════════════════════════════════════════════
  const timelineSection = document.getElementById('journeySection');
  const timelineProgress = document.getElementById('timelineProgress');

  function updateTimelineProgress() {
    if (!timelineSection || !timelineProgress) return;
    const rect = timelineSection.getBoundingClientRect();
    const windowH = window.innerHeight;

    if (rect.top < windowH && rect.bottom > 0) {
      const totalH = rect.height;
      const visibleScrolled = windowH - rect.top;
      const percentage = Math.min(Math.max((visibleScrolled / totalH) * 100, 15), 100);
      timelineProgress.style.width = `${percentage}%`;
    }
  }

  window.addEventListener('scroll', updateTimelineProgress, { passive: true });
  updateTimelineProgress();

  // ═════════════════════════════════════════════════════════════════════════
  // 4. FROM LEAF TO HAPPINESS — VERTICAL BREWING JOURNEY INTERACTION
  // ═════════════════════════════════════════════════════════════════════════
  const brewingSection = document.getElementById('artSection');
  const brewingTimeline = document.getElementById('brewingTimeline');
  const brewingProgressBar = document.getElementById('brewingProgressBar');
  const brewingSteps = document.querySelectorAll('.brewing-step');
  const brewingVideo = document.getElementById('brewingVideo');

  // Ensure continuous looping video playback without restarts
  if (brewingVideo) {
    const playPromise = brewingVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy prevented immediate playback; try on first interaction
        const startVideoOnInteraction = () => {
          brewingVideo.play().catch(() => {});
          window.removeEventListener('click', startVideoOnInteraction);
          window.removeEventListener('scroll', startVideoOnInteraction);
          window.removeEventListener('touchstart', startVideoOnInteraction);
        };
        window.addEventListener('click', startVideoOnInteraction, { once: true, passive: true });
        window.addEventListener('scroll', startVideoOnInteraction, { once: true, passive: true });
        window.addEventListener('touchstart', startVideoOnInteraction, { once: true, passive: true });
      });
    }
  }

  // Update progress bar and highlight active step on scroll
  function updateBrewingJourney() {
    if (!brewingSection || !brewingTimeline || brewingSteps.length === 0) return;

    const timelineRect = brewingTimeline.getBoundingClientRect();
    const windowH = window.innerHeight;

    // Timeline progress bar calculation
    if (timelineRect.top < windowH * 0.75 && timelineRect.bottom > windowH * 0.25) {
      const totalH = timelineRect.height;
      const scrolled = (windowH * 0.6) - timelineRect.top;
      const progressPercent = Math.min(Math.max((scrolled / totalH) * 100, 10), 100);
      if (brewingProgressBar) {
        brewingProgressBar.style.height = `${progressPercent}%`;
      }
    }

    // Determine which step is currently most central/in-view
    let currentActiveIdx = 0;
    const centerY = windowH * 0.5;
    let minDistance = Infinity;

    brewingSteps.forEach((step, idx) => {
      const stepRect = step.getBoundingClientRect();
      const stepCenter = stepRect.top + (stepRect.height / 2);
      const distance = Math.abs(stepCenter - centerY);

      if (distance < minDistance) {
        minDistance = distance;
        currentActiveIdx = idx;
      }
    });

    // Apply active class to the current step while keeping all steps visible
    brewingSteps.forEach((step, idx) => {
      if (idx === currentActiveIdx) {
        step.classList.add('brewing-step--active');
      } else {
        step.classList.remove('brewing-step--active');
      }
    });
  }

  window.addEventListener('scroll', updateBrewingJourney, { passive: true });
  updateBrewingJourney();

  // Allow clicking / hovering any step to immediately focus it
  brewingSteps.forEach((step, idx) => {
    step.addEventListener('mouseenter', () => {
      brewingSteps.forEach(s => s.classList.remove('brewing-step--active'));
      step.classList.add('brewing-step--active');
      if (brewingProgressBar) {
        const pct = ((idx + 1) / brewingSteps.length) * 100;
        brewingProgressBar.style.height = `${pct}%`;
      }
    });

    step.addEventListener('click', () => {
      brewingSteps.forEach(s => s.classList.remove('brewing-step--active'));
      step.classList.add('brewing-step--active');
      if (brewingProgressBar) {
        const pct = ((idx + 1) / brewingSteps.length) * 100;
        brewingProgressBar.style.height = `${pct}%`;
      }
    });
  });

  // ═════════════════════════════════════════════════════════════════════════
  // 5. SMOOTH SCROLLING FOR IN-PAGE ANCHORS
  // ═════════════════════════════════════════════════════════════════════════
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#home') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
