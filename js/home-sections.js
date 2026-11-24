/**
 * BUBBLE & BREW – Home 1 Interactive Controller  v2.1
 * Handles scroll reveal animations, fixed navbar state, and drink card interactions.
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
  // 3. "A LITTLE SIP OF HAPPINESS" INTERACTIVE SHOWCASE CONTROLLER
  // ═════════════════════════════════════════════════════════════════════════
  const sipCards = Array.from(document.querySelectorAll('.sip-card'));
  const sipWrap = document.getElementById('sipShowcaseWrap');
  const sipNavPrev = document.getElementById('sipNavPrev');
  const sipNavNext = document.getElementById('sipNavNext');
  const sipToast = document.getElementById('sipCartToast');
  const sipToastMsg = document.getElementById('sipToastMsg');
  let sipToastTimer = null;

  if (sipCards.length > 0) {
    let currentActiveIdx = sipCards.findIndex(c => c.classList.contains('active'));
    if (currentActiveIdx === -1) currentActiveIdx = Math.floor(sipCards.length / 2);

    function setActiveSipCard(newIdx, shouldScroll = false) {
      if (newIdx < 0) newIdx = sipCards.length - 1;
      if (newIdx >= sipCards.length) newIdx = 0;

      sipCards.forEach((card, idx) => {
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

    // Attach hover and click listeners to every card
    sipCards.forEach((card, idx) => {
      // Desktop: hover to highlight
      card.addEventListener('mouseenter', () => {
        if (window.innerWidth > 991 && currentActiveIdx !== idx) {
          setActiveSipCard(idx, false);
        }
      });

      // Touch / click to highlight
      card.addEventListener('click', (e) => {
        // Prevent trigger if clicking on interactive select or button
        if (e.target.closest('select') || e.target.closest('button')) {
          return;
        }
        if (currentActiveIdx !== idx) {
          setActiveSipCard(idx, true);
        }
      });

      // Keyboard accessibility (Enter / Space / Left / Right)
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (!e.target.closest('select') && !e.target.closest('button')) {
            e.preventDefault();
            setActiveSipCard(idx, true);
          }
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          setActiveSipCard(currentActiveIdx + 1, true);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setActiveSipCard(currentActiveIdx - 1, true);
        }
      });

      // Card-internal previous / next arrow buttons
      const cardPrevBtn = card.querySelector('.sip-card-prev');
      const cardNextBtn = card.querySelector('.sip-card-next');

      if (cardPrevBtn) {
        cardPrevBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          setActiveSipCard(currentActiveIdx - 1, true);
        });
      }

      if (cardNextBtn) {
        cardNextBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          setActiveSipCard(currentActiveIdx + 1, true);
        });
      }

      // Dynamic Price Calculator based on custom options
      const sizeSelect = card.querySelector('.sip-opt-size');
      const milkSelect = card.querySelector('.sip-opt-milk');
      const priceDisplay = card.querySelector('[data-role="display-price"]');
      const basePrice = parseInt(card.dataset.basePrice, 10) || 149;

      function updateCardPrice() {
        if (!priceDisplay) return;
        let delta = 0;
        if (sizeSelect) {
          const opt = sizeSelect.selectedOptions[0];
          delta += parseFloat(opt?.dataset.delta || 0);
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

      // Add to Cart Interaction
      const addToCartBtn = card.querySelector('.sip-btn-add-cart');
      if (addToCartBtn) {
        addToCartBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const drinkTitle = card.querySelector('.sip-title-active')?.textContent?.trim() || 'Bubble Tea';
          const selectedSize = sizeSelect?.value || 'Medium';
          const selectedMilk = milkSelect?.value || 'Whole Milk';
          const tempSelect = card.querySelector('.sip-opt-temp');
          const selectedTemp = tempSelect?.value || 'Iced';
          const currentPrice = priceDisplay?.textContent || `₹${basePrice}`;

          // Trigger toast notification
          showSipToast(`Added ${drinkTitle} (${selectedSize}, ${selectedTemp}) to cart!`);

          // Button feedback animation
          const btnSpan = addToCartBtn.querySelector('span');
          if (btnSpan) {
            const originalText = btnSpan.textContent;
            btnSpan.textContent = 'Added';
            addToCartBtn.style.background = '#F5C18F';
            addToCartBtn.style.color = '#603D29';
            setTimeout(() => {
              btnSpan.textContent = originalText;
              addToCartBtn.style.background = '';
              addToCartBtn.style.color = '';
            }, 1800);
          }

          // Trigger global order indicator update if available
          const cartBadges = document.querySelectorAll('.order-indicator, .cart-badge, .nav-cart-count');
          cartBadges.forEach(b => {
            const currentCount = parseInt(b.textContent || '0', 10);
            b.textContent = (currentCount + 1).toString();
            b.style.display = 'inline-flex';
          });
        });
      }
    });

    // Outer side nav arrows
    if (sipNavPrev) {
      sipNavPrev.addEventListener('click', () => setActiveSipCard(currentActiveIdx - 1, true));
    }
    if (sipNavNext) {
      sipNavNext.addEventListener('click', () => setActiveSipCard(currentActiveIdx + 1, true));
    }

    function showSipToast(message) {
      if (!sipToast) return;
      if (sipToastMsg) sipToastMsg.textContent = message;
      sipToast.classList.add('show');
      if (sipToastTimer) clearTimeout(sipToastTimer);
      sipToastTimer = setTimeout(() => {
        sipToast.classList.remove('show');
      }, 3400);
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // 4. ORDER MODAL BACKWARD COMPATIBILITY (For other drink links)
  // ═════════════════════════════════════════════════════════════════════════
  const drinkData = {
    'Brown Sugar Bliss': {
      name: 'Brown Sugar Boba Milk Tea',
      price: 5.80,
      image: 'images/flavour_brown_sugar.jpg',
      origin: 'Slow-cooked Taiwanese Muscovado brown sugar syrup with rich whole milk and warm honey-glazed pearls.'
    },
    'Classic Pearl Milk Tea': {
      name: 'Classic Pearl Milk Tea',
      price: 4.90,
      image: 'images/flavour_classic_pearl.jpg',
      origin: 'High Mountain Sun Moon Lake black tea steeped to perfection with velvety whole cream and soft tapioca.'
    },
    'Strawberry Dream': {
      name: 'Strawberry Bubble Tea',
      price: 5.50,
      image: 'images/flavour_strawberry.jpg',
      origin: 'Freshly puréed seasonal strawberries layered with chilled floral jasmine tea and luscious oat milk.'
    },
    'Matcha Velvet': {
      name: 'Matcha Milk Tea',
      price: 6.20,
      image: 'images/flavour_matcha.jpg',
      origin: 'Ceremonial grade Uji Japanese matcha hand-whisked and paired with silky steamed whole milk and pearls.'
    },
    'Taro Bliss': {
      name: 'Taro Milk Tea',
      price: 5.60,
      image: 'images/flavour_taro.jpg',
      origin: 'Sweet roasted purple taro root purée blended with cream, fragrant tea & honey tapioca pearls.'
    }
  };

  const orderModal = document.getElementById('orderModal');
  const orderModalTitle = document.getElementById('orderModalTitle');
  const orderModalNotes = document.getElementById('orderModalNotes');
  const orderModalPrice = document.getElementById('orderModalPrice');
  const orderModalThumb = document.getElementById('orderModalThumb');
  const modalQtyEl = document.getElementById('modalQty');

  window.openDrinkModal = function(drink) {
    if (!orderModal) return;
    if (orderModalTitle) orderModalTitle.textContent = drink.name;
    if (orderModalNotes) orderModalNotes.textContent = drink.origin;
    if (orderModalPrice) orderModalPrice.textContent = typeof drink.price === 'number' ? `$${drink.price.toFixed(2)}` : drink.price;
    if (orderModalThumb) orderModalThumb.src = drink.image;
    if (modalQtyEl) modalQtyEl.textContent = '1';

    orderModal.classList.add('open');
  };

  // ═════════════════════════════════════════════════════════════════════════
  // 4. SMOOTH SCROLLING FOR IN-PAGE ANCHORS
  // ═════════════════════════════════════════════════════════════════════════
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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
