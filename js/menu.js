/**
 * BUBBLE & BREW – Menu Page Interactive Controller  v1.0
 * Handles category filtering, live drink search, size toggle pricing,
 * cart toasts, and scroll animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ═════════════════════════════════════════════════════════════════════════
  // 1. MENU CATEGORY FILTER & LIVE SEARCH CONTROLLER
  // ═════════════════════════════════════════════════════════════════════════
  const tabButtons = document.querySelectorAll('.menu-tab-btn');
  const menuCards = document.querySelectorAll('.menu-card');
  const searchInput = document.getElementById('menuSearchInput');
  const searchClear = document.getElementById('menuSearchClear');
  const resultsCount = document.getElementById('menuResultsCount');
  const emptyState = document.getElementById('menuEmptyState');
  const resetBtn = document.getElementById('menuResetBtn');

  let activeCategory = 'all';
  let searchQuery = '';

  function applyMenuFilters() {
    let visibleCount = 0;
    const cleanQuery = searchQuery.trim().toLowerCase();

    menuCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category') || '';
      const cardName = (card.getAttribute('data-name') || '').toLowerCase();
      const cardDesc = card.querySelector('.menu-item-desc')?.textContent.toLowerCase() || '';

      const matchesCategory = (activeCategory === 'all' || cardCategory === activeCategory);
      const matchesSearch = (!cleanQuery || cardName.includes(cleanQuery) || cardDesc.includes(cleanQuery));

      if (matchesCategory && matchesSearch) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Update results label
    if (resultsCount) {
      if (visibleCount === menuCards.length) {
        resultsCount.innerHTML = `Showing all <strong>${visibleCount}</strong> handcrafted drinks`;
      } else if (cleanQuery && activeCategory !== 'all') {
        resultsCount.innerHTML = `Showing <strong>${visibleCount}</strong> results for "<em>${searchQuery}</em>" in selected category`;
      } else if (cleanQuery) {
        resultsCount.innerHTML = `Showing <strong>${visibleCount}</strong> results for "<em>${searchQuery}</em>"`;
      } else {
        resultsCount.innerHTML = `Showing <strong>${visibleCount}</strong> handcrafted drinks`;
      }
    }

    // Toggle empty state
    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  // Tab click event
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      activeCategory = btn.getAttribute('data-filter') || 'all';
      applyMenuFilters();
    });
  });

  // Search input events
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (searchClear) {
        searchClear.style.display = searchQuery ? 'flex' : 'none';
      }
      applyMenuFilters();
    });
  }

  // Clear search button
  if (searchClear && searchInput) {
    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      searchClear.style.display = 'none';
      searchInput.focus();
      applyMenuFilters();
    });
  }

  // Reset button in empty state
  if (resetBtn && searchInput) {
    resetBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      if (searchClear) searchClear.style.display = 'none';

      activeCategory = 'all';
      tabButtons.forEach(b => {
        const isAll = b.getAttribute('data-filter') === 'all';
        b.classList.toggle('active', isAll);
        b.setAttribute('aria-selected', isAll ? 'true' : 'false');
      });

      applyMenuFilters();
    });
  }

  // Section 2 Category Cards click triggers category filter in Full Menu
  document.querySelectorAll('[data-filter-target]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetCat = link.getAttribute('data-filter-target');
      if (!targetCat) return;

      const matchingTab = document.querySelector(`.menu-tab-btn[data-filter="${targetCat}"]`);
      if (matchingTab) {
        tabButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        matchingTab.classList.add('active');
        matchingTab.setAttribute('aria-selected', 'true');
        activeCategory = targetCat;
        applyMenuFilters();
      }
    });
  });

  // Also support clicking entire Section 2 category card
  document.querySelectorAll('.menu-cat-card[data-cat]').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return; // Let link handle if clicked
      const targetCat = card.getAttribute('data-cat');
      if (!targetCat) return;

      const fullMenuEl = document.getElementById('fullMenu');
      if (fullMenuEl) {
        fullMenuEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      const matchingTab = document.querySelector(`.menu-tab-btn[data-filter="${targetCat}"]`);
      if (matchingTab) {
        tabButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        matchingTab.classList.add('active');
        matchingTab.setAttribute('aria-selected', 'true');
        activeCategory = targetCat;
        applyMenuFilters();
      }
    });
  });


  // ═════════════════════════════════════════════════════════════════════════
  // 2. SIZE SELECTOR & DYNAMIC PRICING TOGGLE
  // ═════════════════════════════════════════════════════════════════════════
  menuCards.forEach(card => {
    const sizeBtns = card.querySelectorAll('.menu-size-btn');
    const priceDisplay = card.querySelector('[data-role="price-display"]');
    const basePrice = parseInt(card.getAttribute('data-base-price'), 10) || 99;
    const largePrice = parseInt(card.getAttribute('data-large-price'), 10) || (basePrice + 30);

    sizeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        sizeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const size = btn.getAttribute('data-size');
        if (priceDisplay) {
          priceDisplay.textContent = size === 'large' ? `₹${largePrice}` : `₹${basePrice}`;
        }
      });
    });
  });


  // ═════════════════════════════════════════════════════════════════════════
  // 3. TOAST NOTIFICATION FOR ADD TO CART FEEDBACK & CART DRAWER
  // ═════════════════════════════════════════════════════════════════════════
  const cartToast = document.getElementById('menuCartToast');
  const toastMsg = document.getElementById('menuToastMsg');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartEmptyNotice = document.getElementById('cartEmptyNotice');
  const cartTotalVal = document.getElementById('cartTotalVal');
  let toastTimer = null;
  let cartItemCount = 0;
  let cartSubtotal = 0;

  function addItemToCart(name, priceNum, detailText = '') {
    cartItemCount++;
    cartSubtotal += priceNum;

    // Remove empty notice
    if (cartEmptyNotice) cartEmptyNotice.style.display = 'none';

    // Add item element to drawer
    if (cartItemsList) {
      const itemRow = document.createElement('div');
      itemRow.className = 'd-flex align-items-center justify-content-between p-3 border-bottom';
      itemRow.style.borderColor = 'rgba(185, 130, 88, 0.2)';
      itemRow.innerHTML = `
        <div>
          <div style="font-weight: 700; color: var(--hs-heading); font-size: 0.95rem;">${name}</div>
          ${detailText ? `<small style="color: var(--hs-primary); font-size: 0.78rem;">${detailText}</small>` : ''}
        </div>
        <div style="font-weight: 800; color: var(--hs-primary); font-size: 1rem;">&#8377;${priceNum}</div>
      `;
      cartItemsList.appendChild(itemRow);
    }

    // Update total
    if (cartTotalVal) {
      cartTotalVal.innerHTML = `&#8377;${cartSubtotal}`;
    }

    // Increment navbar shopping cart badge
    if (typeof window.bbUpdateCartBadge === 'function') {
      window.bbUpdateCartBadge(cartItemCount);
    }

    // Toast
    showToast(`Added ${name} ${detailText ? `(${detailText})` : ''} ₹${priceNum} to your cart!`);
  }

  function showToast(message) {
    if (!cartToast || !toastMsg) return;
    clearTimeout(toastTimer);
    toastMsg.textContent = message;
    cartToast.classList.add('show');
    toastTimer = setTimeout(() => {
      cartToast.classList.remove('show');
    }, 3200);
  }

  // Full Menu Card Add Buttons
  document.querySelectorAll('.menu-add-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.menu-card');
      const name = card?.getAttribute('data-name') || 'Drink';
      const sizeBtn = card?.querySelector('.menu-size-btn.active');
      const isLarge = sizeBtn?.getAttribute('data-size') === 'large';
      const sizeText = isLarge ? 'Large (700ml)' : 'Regular (500ml)';
      const basePrice = parseInt(card?.getAttribute('data-base-price'), 10) || 99;
      const largePrice = parseInt(card?.getAttribute('data-large-price'), 10) || (basePrice + 30);
      const priceNum = isLarge ? largePrice : basePrice;

      addItemToCart(name, priceNum, sizeText);

      // Pop animation
      btn.style.transform = 'scale(0.92)';
      setTimeout(() => { btn.style.transform = ''; }, 180);
    });
  });

  // Bestsellers Add Buttons
  document.querySelectorAll('.menu-best-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const item = btn.getAttribute('data-item') || 'Bestseller';
      const priceNum = parseInt(btn.getAttribute('data-price'), 10) || 149;
      addItemToCart(item, priceNum, 'Medium (500ml)');

      btn.style.transform = 'scale(0.92)';
      setTimeout(() => { btn.style.transform = ''; }, 180);
    });
  });

  // Seasonal Add Buttons
  document.querySelectorAll('.menu-seasonal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const item = btn.getAttribute('data-item') || 'Seasonal Special';
      const priceNum = parseInt(btn.getAttribute('data-price'), 10) || 169;
      addItemToCart(item, priceNum, 'Seasonal Special');

      btn.style.transform = 'scale(0.92)';
      setTimeout(() => { btn.style.transform = ''; }, 180);
    });
  });


  // ═════════════════════════════════════════════════════════════════════════
  // 4. TOPPINGS STUDIO INTERACTIVE CONTROLLER (Custom Touches)
  // ═════════════════════════════════════════════════════════════════════════
  const toppingCards = document.querySelectorAll('.topping-option-card');
  const toppingsChipsContainer = document.getElementById('toppingsSelectedChips');
  const toppingsTotalPrice = document.getElementById('toppingsTotalPrice');
  const toppingsResetBtn = document.getElementById('toppingsResetBtn');

  const selectedToppings = new Map(); // id -> { name, price }

  function updateToppingsStudioUI() {
    let total = 0;
    toppingsChipsContainer.innerHTML = '';

    if (selectedToppings.size === 0) {
      toppingsChipsContainer.innerHTML = '<span class="toppings-empty-hint">No toppings selected yet. Pick your favourites above!</span>';
    } else {
      selectedToppings.forEach((item, id) => {
        total += item.price;

        const chip = document.createElement('div');
        chip.className = 'toppings-chip-item';
        chip.innerHTML = `
          <span>${item.name} (+₹${item.price})</span>
          <button type="button" class="toppings-chip-remove" data-remove-id="${id}" aria-label="Remove ${item.name}">&times;</button>
        `;
        toppingsChipsContainer.appendChild(chip);
      });

      // Attach remove handlers to chip buttons
      toppingsChipsContainer.querySelectorAll('.toppings-chip-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const removeId = btn.getAttribute('data-remove-id');
          const card = document.querySelector(`.topping-option-card[data-topping-id="${removeId}"]`);
          if (card) {
            card.classList.remove('selected');
            card.setAttribute('aria-pressed', 'false');
          }
          selectedToppings.delete(removeId);
          updateToppingsStudioUI();
        });
      });
    }

    if (toppingsTotalPrice) {
      toppingsTotalPrice.textContent = `+₹${total}`;
    }
  }

  // Topping Option Card Click
  toppingCards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-topping-id');
      const name = card.getAttribute('data-name');
      const price = parseInt(card.getAttribute('data-price'), 10) || 0;

      if (selectedToppings.has(id)) {
        selectedToppings.delete(id);
        card.classList.remove('selected');
        card.setAttribute('aria-pressed', 'false');
      } else {
        selectedToppings.set(id, { name, price });
        card.classList.add('selected');
        card.setAttribute('aria-pressed', 'true');
      }

      updateToppingsStudioUI();
    });

    // Keyboard accessibility
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // Reset Button
  if (toppingsResetBtn) {
    toppingsResetBtn.addEventListener('click', () => {
      selectedToppings.clear();
      toppingCards.forEach(card => {
        card.classList.remove('selected');
        card.setAttribute('aria-pressed', 'false');
      });
      updateToppingsStudioUI();
    });
  }


  // ═════════════════════════════════════════════════════════════════════════
  // 5. PORTION PERFECTION CUP SIZE SHOWCASE CONTROLLER
  // ═════════════════════════════════════════════════════════════════════════
  const cupDisplays = document.querySelectorAll('.size-cup-display');
  const sizeDetailName = document.getElementById('sizeDetailName');
  const sizeDetailTag = document.getElementById('sizeDetailTag');
  const sizeDetailDesc = document.getElementById('sizeDetailDesc');
  const sizeDetailPrice = document.getElementById('sizeDetailPrice');

  function selectCupSize(cup) {
    if (!cup) return;

    cupDisplays.forEach(c => {
      c.classList.remove('size-cup--active');
      c.setAttribute('aria-checked', 'false');
    });

    cup.classList.add('size-cup--active');
    cup.setAttribute('aria-checked', 'true');

    const name = cup.getAttribute('data-name');
    const vol = cup.getAttribute('data-vol');
    const subtitle = cup.getAttribute('data-subtitle');
    const desc = cup.getAttribute('data-desc');
    const price = cup.getAttribute('data-price');

    if (sizeDetailName) {
      sizeDetailName.textContent = `${name} (${vol}) — ${subtitle}`;
    }
    if (sizeDetailTag) {
      sizeDetailTag.textContent = cup.querySelector('.size-pill-tag')?.textContent || 'Selected Size';
    }
    if (sizeDetailDesc) {
      sizeDetailDesc.textContent = desc;
    }
    if (sizeDetailPrice) {
      sizeDetailPrice.innerHTML = price;
    }
  }

  cupDisplays.forEach(cup => {
    cup.addEventListener('click', () => {
      selectCupSize(cup);
    });

    cup.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectCupSize(cup);
      }
    });
  });


  // ═════════════════════════════════════════════════════════════════════════
  // 6. SMOOTH SCROLLING FOR ANCHORS
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
  // 5. SCROLL REVEAL ANIMATIONS (Intersection Observer)
  // ═════════════════════════════════════════════════════════════════════════
  const revealElements = document.querySelectorAll('.hs-reveal');

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
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('hs-visible'));
  }
});
