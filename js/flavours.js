/**
 * BUBBLE & BREW – Our Flavor Page Controller  v1.0
 * Handles interactive mood selection, scroll reveal animations, and smooth anchors.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ═════════════════════════════════════════════════════════════════════════
  // 1. INTERACTIVE SIGNATURE SHOWCASE CONTROLLER (Inspired by Reference UI)
  // ═════════════════════════════════════════════════════════════════════════
  const sigCards = Array.from(document.querySelectorAll('.flavor-sig-card'));
  const sigWrap = document.getElementById('flavorSigWrap');
  const sigNavPrev = document.getElementById('flavorSigPrev');
  const sigNavNext = document.getElementById('flavorSigNext');
  const sigToast = document.getElementById('flavorCartToast');
  const sigToastMsg = document.getElementById('flavorToastMsg');
  let sigToastTimer = null;

  if (sigCards.length > 0) {
    let currentActiveIdx = sigCards.findIndex(c => c.classList.contains('active'));
    if (currentActiveIdx === -1) currentActiveIdx = 2; // Default to Matcha Velvet (Card 3)

    function setActiveFlavorCard(newIdx, shouldScroll = false) {
      if (newIdx < 0) newIdx = sigCards.length - 1;
      if (newIdx >= sigCards.length) newIdx = 0;

      sigCards.forEach((card, idx) => {
        if (idx === newIdx) {
          card.classList.add('active');
          card.setAttribute('aria-expanded', 'true');
          if (shouldScroll && window.innerWidth <= 991) {
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          }
        } else {
          card.classList.remove('active');
          card.setAttribute('aria-expanded', 'false');
        }
      });

      currentActiveIdx = newIdx;
    }

    // Attach listeners to every card
    sigCards.forEach((card, idx) => {
      // Desktop: hover to highlight
      card.addEventListener('mouseenter', () => {
        if (window.innerWidth > 991 && currentActiveIdx !== idx) {
          setActiveFlavorCard(idx, false);
        }
      });

      // Touch / click to highlight
      card.addEventListener('click', (e) => {
        if (e.target.closest('select') || e.target.closest('button')) return;
        if (currentActiveIdx !== idx) {
          setActiveFlavorCard(idx, true);
        }
      });

      // Keyboard accessibility
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (!e.target.closest('select') && !e.target.closest('button')) {
            e.preventDefault();
            setActiveFlavorCard(idx, true);
          }
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          setActiveFlavorCard(currentActiveIdx + 1, true);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setActiveFlavorCard(currentActiveIdx - 1, true);
        }
      });

      // Card-internal previous / next arrow chevrons
      const cardPrevBtn = card.querySelector('.flavor-sig-card-prev');
      const cardNextBtn = card.querySelector('.flavor-sig-card-next');

      if (cardPrevBtn) {
        cardPrevBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          setActiveFlavorCard(currentActiveIdx - 1, true);
        });
      }

      if (cardNextBtn) {
        cardNextBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          setActiveFlavorCard(currentActiveIdx + 1, true);
        });
      }

      // Dynamic Price Calculator based on custom options
      const sizeSelect = card.querySelector('.flavor-opt-size');
      const milkSelect = card.querySelector('.flavor-opt-milk');
      const priceDisplay = card.querySelector('[data-role="display-price"]');
      const basePrice = parseInt(card.dataset.basePrice, 10) || 159;

      function updateCardPrice() {
        if (!priceDisplay) return;
        let delta = 0;
        if (sizeSelect) {
          const opt = sizeSelect.selectedOptions[0];
          delta += parseInt(opt?.dataset.delta || 0, 10);
        }
        if (milkSelect && (milkSelect.value === 'Oat Milk' || milkSelect.value === 'Almond Milk')) {
          delta += 30;
        } else if (milkSelect && milkSelect.value === 'Soy Milk') {
          delta += 25;
        }
        const totalPrice = Math.round(basePrice + delta);
        priceDisplay.textContent = `₹${totalPrice}`;
      }

      if (sizeSelect) sizeSelect.addEventListener('change', updateCardPrice);
      if (milkSelect) milkSelect.addEventListener('change', updateCardPrice);

      // "ADD TO BASKET" Interaction
      const addToBasketBtn = card.querySelector('.flavor-sig-btn-add');
      if (addToBasketBtn) {
        addToBasketBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const drinkTitle = card.querySelector('.flavor-sig-title-active')?.textContent.trim() || 'Signature Drink';
          const chosenSize = sizeSelect?.value || 'Medium';
          const currentPrice = priceDisplay?.textContent || `₹${basePrice}`;

          // Trigger Toast feedback
          if (sigToast && sigToastMsg) {
            clearTimeout(sigToastTimer);
            sigToastMsg.textContent = `Added ${drinkTitle} (${chosenSize}) ${currentPrice} to Basket!`;
            sigToast.classList.add('show');
            sigToastTimer = setTimeout(() => {
              sigToast.classList.remove('show');
            }, 3200);
          }

          // Subtle button pop animation
          addToBasketBtn.style.transform = 'scale(0.96)';
          setTimeout(() => { addToBasketBtn.style.transform = ''; }, 180);
        });
      }
    });

    // Outer track navigation buttons (Mobile / Tablet Carousel)
    if (sigNavPrev) {
      sigNavPrev.addEventListener('click', () => {
        setActiveFlavorCard(currentActiveIdx - 1, true);
      });
    }

    if (sigNavNext) {
      sigNavNext.addEventListener('click', () => {
        setActiveFlavorCard(currentActiveIdx + 1, true);
      });
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // 2. INTERACTIVE MOOD SELECTOR
  // ═════════════════════════════════════════════════════════════════════════
  const moodCards = document.querySelectorAll('.mood-card');
  const liveHeadline = document.getElementById('moodLiveHeadline');
  const liveSub = document.getElementById('moodLiveSub');
  const liveBadge = document.getElementById('moodLiveBadge');

  const MOOD_DATA = {
    comfort: {
      badge: 'RECOMMENDED PAIRING FOR COMFORT',
      headline: 'Classic Brown Sugar Milk Tea with Warm Tapioca Pearls',
      desc: 'Rich caramel sweetness and creamy whole milk perfectly balance authentic slow-cooked boba for a deep, comforting embrace in every sip.'
    },
    fresh: {
      badge: 'RECOMMENDED PAIRING FOR REFRESHMENT',
      headline: 'Mango Passion Fruit Green Tea with Coconut Jelly',
      desc: 'Zesty tropical fruit essences infused into fragrant jasmine green tea, poured over ice with crisp coconut jelly for an instant burst of vitality.'
    },
    sweet: {
      badge: 'RECOMMENDED PAIRING FOR INDULGENCE',
      headline: 'Caramel Crème Brûlée Boba Milk Tea',
      desc: 'Torched brown sugar crust over silky crème brûlée custard, layered with rich Taiwanese milk tea and soft, chewy tapioca pearls.'
    },
    explorer: {
      badge: 'RECOMMENDED PAIRING FOR ADVENTURE',
      headline: 'Uji Matcha Strawberry Cloud with Velvety Cheese Foam',
      desc: 'Ceremonial Japanese matcha layered over sweet macerated strawberries and crowned with sea-salt cheese foam for a thrilling multi-layered taste journey.'
    }
  };

  function selectMood(moodKey) {
    if (!MOOD_DATA[moodKey]) return;

    moodCards.forEach(card => {
      const isMatch = card.getAttribute('data-mood') === moodKey;
      card.classList.toggle('active', isMatch);
      card.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });

    if (liveHeadline && liveSub && liveBadge) {
      liveHeadline.style.opacity = '0';
      liveSub.style.opacity = '0';
      setTimeout(() => {
        liveBadge.textContent = MOOD_DATA[moodKey].badge;
        liveHeadline.textContent = MOOD_DATA[moodKey].headline;
        liveSub.textContent = MOOD_DATA[moodKey].desc;
        liveHeadline.style.opacity = '1';
        liveSub.style.opacity = '1';
      }, 150);
    }
  }

  moodCards.forEach(card => {
    card.addEventListener('click', () => {
      const mood = card.getAttribute('data-mood');
      selectMood(mood);
    });

    // Keyboard accessibility (Enter / Space)
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const mood = card.getAttribute('data-mood');
        selectMood(mood);
      }
    });
  });

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
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('hs-visible'));
  }

  // ═════════════════════════════════════════════════════════════════════════
  // 3. SMOOTH SCROLLING FOR IN-PAGE ANCHORS
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

  // ═════════════════════════════════════════════════════════════════════════
  // 4. CART DRAWER CLOSE HANDLERS
  // ═════════════════════════════════════════════════════════════════════════
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartDrawerOverlay');
  const cartCloseBtn = document.getElementById('cartDrawerClose');

  function closeCart() {
    if (cartOverlay) cartOverlay.classList.remove('open');
    if (cartDrawer) cartDrawer.classList.remove('open');
  }

  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
});
