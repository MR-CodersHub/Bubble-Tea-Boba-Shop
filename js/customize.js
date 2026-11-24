/**
 * BUBBLE & BREW – Customize Studio Configurator Controller v3.5
 * Features:
 * - Centralized Product Data Object (reusing exact image paths everywhere)
 * - Dynamic Category Navigation & View Switching
 * - Compact Selected-Items Panel (only selected items with thumbnails)
 * - "YOUR CUSTOM CREATION" Final Product Card (with ingredient strip & expandable breakdown)
 * - Single/Multi-Select Rules & Live Pricing Calculation
 * - "Surprise Me", Reset, and Mobile Drawer Controls
 * - Strict ban on emoji icons (SVGs used throughout)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ═════════════════════════════════════════════════════════════════════════
  // 1. CENTRALIZED PRODUCT DATA CATALOG
  // ═════════════════════════════════════════════════════════════════════════

  const PRODUCTS = {
    // ── Bases ──────────────────────────────────────────────────────────────
    'classic-black': {
      id: 'classic-black',
      name: 'Classic Black Tea',
      category: 'base',
      categoryLabel: 'Tea Base',
      image: 'https://images.pexels.com/photos/1493080/pexels-photo-1493080.jpeg?cs=srgb&dl=pexels-1493080.jpg&fm=jpg',
      price: 99,
      desc: 'Rich, smooth and full of bold traditional Ceylon tea aroma.'
    },
    'green-tea': {
      id: 'green-tea',
      name: 'Green Tea',
      category: 'base',
      categoryLabel: 'Tea Base',
      image: 'https://images.pexels.com/photos/6870854/pexels-photo-6870854.jpeg?cs=srgb&dl=pexels-6870854.jpg&fm=jpg',
      price: 99,
      desc: 'Light, floral, refreshing and naturally delicate steamed tea.'
    },
    'matcha': {
      id: 'matcha',
      name: 'Matcha',
      category: 'base',
      categoryLabel: 'Tea Base',
      image: 'https://images.pexels.com/photos/31599066/pexels-photo-31599066.jpeg?cs=srgb&dl=pexels-31599066.jpg&fm=jpg',
      price: 119,
      desc: 'Ceremonial Japanese stone-ground green tea — velvety and earthy.'
    },
    'taro': {
      id: 'taro',
      name: 'Taro',
      category: 'base',
      categoryLabel: 'Tea Base',
      image: 'https://images.pexels.com/photos/35727299/pexels-photo-35727299.jpeg?cs=srgb&dl=pexels-alberto-lara-25433440-35727299.jpg&fm=jpg',
      price: 109,
      desc: 'Smooth, sweet, nutty and comforting purple root infusion.'
    },
    'oolong-tea': {
      id: 'oolong-tea',
      name: 'Oolong Tea',
      category: 'base',
      categoryLabel: 'Tea Base',
      image: 'https://images.pexels.com/photos/12390582/pexels-photo-12390582.jpeg?cs=srgb&dl=pexels-12390582.jpg&fm=jpg',
      price: 109,
      desc: 'Toasty, aromatic Taiwanese tea with a smooth honey finish.'
    },

    // ── Flavours ───────────────────────────────────────────────────────────
    'brown-sugar': {
      id: 'brown-sugar',
      name: 'Brown Sugar',
      category: 'flavour',
      categoryLabel: 'Flavour',
      image: 'https://images.pexels.com/photos/6412828/pexels-photo-6412828.jpeg?cs=srgb&dl=pexels-rdne-6412828.jpg&fm=jpg',
      price: 30,
      desc: 'Warm caramelized tiger syrup drizzle swirl.'
    },
    'strawberry': {
      id: 'strawberry',
      name: 'Strawberry',
      category: 'flavour',
      categoryLabel: 'Flavour',
      image: 'https://images.pexels.com/photos/29653637/pexels-photo-29653637.jpeg?cs=srgb&dl=pexels-eden-fc-620771246-29653637.jpg&fm=jpg',
      price: 25,
      desc: 'Sweet tart crushed fresh berry fruit infusion.'
    },
    'mango': {
      id: 'mango',
      name: 'Mango',
      category: 'flavour',
      categoryLabel: 'Flavour',
      image: 'https://images.pexels.com/photos/33212344/pexels-photo-33212344.jpeg?cs=srgb&dl=pexels-lol-bubble-tea-2154418419-33212344.jpg&fm=jpg',
      price: 25,
      desc: 'Luscious tropical alphonso mango nectar.'
    },
    'peach': {
      id: 'peach',
      name: 'Peach',
      category: 'flavour',
      categoryLabel: 'Flavour',
      image: 'https://images.pexels.com/photos/19996404/pexels-photo-19996404.jpeg?cs=srgb&dl=pexels-berlinerlights-19996404.jpg&fm=jpg',
      price: 25,
      desc: 'Delicate aromatic floral white peach nectar.'
    },
    'vanilla': {
      id: 'vanilla',
      name: 'Vanilla',
      category: 'flavour',
      categoryLabel: 'Flavour',
      image: 'https://images.pexels.com/photos/9271564/pexels-photo-9271564.jpeg?cs=srgb&dl=pexels-amar-9271564.jpg&fm=jpg',
      price: 20,
      desc: 'Velvety Madagascar vanilla bean essence.'
    },
    'honey': {
      id: 'honey',
      name: 'Honey',
      category: 'flavour',
      categoryLabel: 'Flavour',
      image: 'https://images.pexels.com/photos/6412836/pexels-photo-6412836.jpeg?cs=srgb&dl=pexels-rdne-6412836.jpg&fm=jpg',
      price: 20,
      desc: 'Raw golden wildflower blossom nectar.'
    },
    'caramel': {
      id: 'caramel',
      name: 'Caramel',
      category: 'flavour',
      categoryLabel: 'Flavour',
      image: 'https://images.pexels.com/photos/11160112/pexels-photo-11160112.jpeg?cs=srgb&dl=pexels-shameel-mukkath-3421394-11160112.jpg&fm=jpg',
      price: 25,
      desc: 'Deep buttery slow-cooked toffee sweetness.'
    },
    'matcha-infusion': {
      id: 'matcha-infusion',
      name: 'Matcha Swirl',
      category: 'flavour',
      categoryLabel: 'Flavour',
      image: 'https://images.pexels.com/photos/35727299/pexels-photo-35727299.jpeg?cs=srgb&dl=pexels-alberto-lara-25433440-35727299.jpg&fm=jpg',
      price: 30,
      desc: 'Vibrant green tea syrup infusion.'
    },

    // ── Toppings ───────────────────────────────────────────────────────────
    'tapioca': {
      id: 'tapioca',
      name: 'Classic Tapioca Pearls',
      category: 'toppings',
      categoryLabel: 'Topping',
      image: 'https://i.pinimg.com/736x/52/e7/f8/52e7f80719494a1bc17b0512760e4b25.jpg',
      price: 25,
      desc: 'Slow-cooked chewy brown sugar boba pearls.'
    },
    'brown-sugar-pearls': {
      id: 'brown-sugar-pearls',
      name: 'Brown Sugar Pearls',
      category: 'toppings',
      categoryLabel: 'Topping',
      image: 'https://images.pexels.com/photos/12666754/pexels-photo-12666754.jpeg?cs=srgb&dl=pexels-telly-mina-262052395-12666754.jpg&fm=jpg',
      price: 30,
      desc: 'Glazed warm boba steeped in dark caramelized syrup.'
    },
    'mango-popping': {
      id: 'mango-popping',
      name: 'Mango Popping Boba',
      category: 'toppings',
      categoryLabel: 'Topping',
      image: 'https://images.pexels.com/photos/33212344/pexels-photo-33212344.jpeg?cs=srgb&dl=pexels-lol-bubble-tea-2154418419-33212344.jpg&fm=jpg',
      price: 35,
      desc: 'Bursting spheres filled with tropical mango juice.'
    },
    'strawberry-popping': {
      id: 'strawberry-popping',
      name: 'Strawberry Popping Boba',
      category: 'toppings',
      categoryLabel: 'Topping',
      image: 'https://images.pexels.com/photos/6413622/pexels-photo-6413622.jpeg?cs=srgb&dl=pexels-rdne-6413622.jpg&fm=jpg',
      price: 35,
      desc: 'Sweet and tangy berry juice explosion spheres.'
    },
    'fruit-jelly': {
      id: 'fruit-jelly',
      name: 'Fruit Jelly',
      category: 'toppings',
      categoryLabel: 'Topping',
      image: 'https://images.pexels.com/photos/32658856/pexels-photo-32658856.jpeg?cs=srgb&dl=pexels-soc-nang-d-ng-2150345854-32658856.jpg&fm=jpg',
      price: 25,
      desc: 'Chewy rainbow fruit cubes made from coconut.'
    },
    'coconut-jelly': {
      id: 'coconut-jelly',
      name: 'Coconut Jelly',
      category: 'toppings',
      categoryLabel: 'Topping',
      image: 'https://images.pexels.com/photos/12940112/pexels-photo-12940112.jpeg?cs=srgb&dl=pexels-mavimiro-12940112.jpg&fm=jpg',
      price: 25,
      desc: 'Crisp, translucent, refreshing nata de coco.'
    },
    'cream-foam': {
      id: 'cream-foam',
      name: 'Cream Foam',
      category: 'toppings',
      categoryLabel: 'Topping',
      image: 'https://images.pexels.com/photos/35727299/pexels-photo-35727299.jpeg?cs=srgb&dl=pexels-alberto-lara-25433440-35727299.jpg&fm=jpg',
      price: 35,
      desc: 'Velvety salted cream cloud crown.'
    },
    'whipped-cream': {
      id: 'whipped-cream',
      name: 'Whipped Cream',
      category: 'toppings',
      categoryLabel: 'Topping',
      image: 'https://images.pexels.com/photos/19996404/pexels-photo-19996404.jpeg?cs=srgb&dl=pexels-berlinerlights-19996404.jpg&fm=jpg',
      price: 30,
      desc: 'Fluffy airy vanilla cream swirl.'
    },

    // ── Milk ───────────────────────────────────────────────────────────────
    'whole-milk': {
      id: 'whole-milk',
      name: 'Whole Milk',
      category: 'milk',
      categoryLabel: 'Milk',
      image: 'https://images.pexels.com/photos/6412836/pexels-photo-6412836.jpeg?cs=srgb&dl=pexels-rdne-6412836.jpg&fm=jpg',
      price: 0,
      desc: 'Classic creamy farm-fresh dairy milk.'
    },
    'oat-milk': {
      id: 'oat-milk',
      name: 'Oat Milk',
      category: 'milk',
      categoryLabel: 'Milk',
      image: 'https://images.pexels.com/photos/9271564/pexels-photo-9271564.jpeg?cs=srgb&dl=pexels-amar-9271564.jpg&fm=jpg',
      price: 20,
      desc: 'Naturally sweet, silky barista plant milk.'
    },
    'almond-milk': {
      id: 'almond-milk',
      name: 'Almond Milk',
      category: 'milk',
      categoryLabel: 'Milk',
      image: 'https://images.pexels.com/photos/6412836/pexels-photo-6412836.jpeg?cs=srgb&dl=pexels-rdne-6412836.jpg&fm=jpg',
      price: 20,
      desc: 'Light, subtly nutty and aromatic almond milk.'
    },
    'coconut-milk': {
      id: 'coconut-milk',
      name: 'Coconut Milk',
      category: 'milk',
      categoryLabel: 'Milk',
      image: 'https://images.pexels.com/photos/35727301/pexels-photo-35727301.jpeg?cs=srgb&dl=pexels-alberto-lara-25433440-35727301.jpg&fm=jpg',
      price: 20,
      desc: 'Rich tropical body and soothing coconut fragrance.'
    },
    'no-milk': {
      id: 'no-milk',
      name: 'No Milk',
      category: 'milk',
      categoryLabel: 'Milk',
      image: 'https://images.pexels.com/photos/1493080/pexels-photo-1493080.jpeg?cs=srgb&dl=pexels-1493080.jpg&fm=jpg',
      price: 0,
      desc: 'Pure clear brewed iced tea without dairy.'
    },

    // ── Size ───────────────────────────────────────────────────────────────
    'small': {
      id: 'small',
      name: 'Small',
      vol: '250 ml',
      category: 'size',
      categoryLabel: 'Portion',
      image: 'https://images.pexels.com/photos/27126830/pexels-photo-27126830.jpeg?cs=srgb&dl=pexels-imvitordiniz-27126830.jpg&fm=jpg',
      price: 0,
      desc: 'Quick afternoon treat or flavour tasting.'
    },
    'medium': {
      id: 'medium',
      name: 'Medium',
      vol: '350 ml',
      category: 'size',
      categoryLabel: 'Portion',
      image: 'https://images.pexels.com/photos/12666754/pexels-photo-12666754.jpeg?cs=srgb&dl=pexels-telly-mina-262052395-12666754.jpg&fm=jpg',
      price: 30,
      desc: 'Everyday classic balance — our most loved pour!'
    },
    'large': {
      id: 'large',
      name: 'Large',
      vol: '500 ml',
      category: 'size',
      categoryLabel: 'Portion',
      image: 'https://images.pexels.com/photos/33212329/pexels-photo-33212329.jpeg?cs=srgb&dl=pexels-lol-bubble-tea-2154418419-33212329.jpg&fm=jpg',
      price: 60,
      desc: 'Generous sharing portion for long work or chill sessions.'
    },

    // ── Sweetness ──────────────────────────────────────────────────────────
    'sweet-0': {
      id: 'sweet-0',
      name: '0% No Sugar',
      val: 0,
      category: 'sweetness',
      categoryLabel: 'Sweetness',
      image: 'https://images.pexels.com/photos/1493080/pexels-photo-1493080.jpeg?cs=srgb&dl=pexels-1493080.jpg&fm=jpg',
      price: 0,
      desc: 'Pure tea character with zero added sweetness.'
    },
    'sweet-25': {
      id: 'sweet-25',
      name: '25% Light Sweet',
      val: 1,
      category: 'sweetness',
      categoryLabel: 'Sweetness',
      image: 'https://images.pexels.com/photos/1493080/pexels-photo-1493080.jpeg?cs=srgb&dl=pexels-1493080.jpg&fm=jpg',
      price: 0,
      desc: 'A subtle touch of sugar that lets tea notes shine.'
    },
    'sweet-50': {
      id: 'sweet-50',
      name: '50% Balanced Sweet',
      val: 2,
      category: 'sweetness',
      categoryLabel: 'Sweetness',
      image: 'https://images.pexels.com/photos/1493080/pexels-photo-1493080.jpeg?cs=srgb&dl=pexels-1493080.jpg&fm=jpg',
      price: 0,
      desc: 'Harmonious balance between tea bitterness and sweetness.'
    },
    'sweet-75': {
      id: 'sweet-75',
      name: '75% Extra Sweet',
      val: 3,
      category: 'sweetness',
      categoryLabel: 'Sweetness',
      image: 'https://images.pexels.com/photos/1493080/pexels-photo-1493080.jpeg?cs=srgb&dl=pexels-1493080.jpg&fm=jpg',
      price: 0,
      desc: 'Classic boba-shop indulgence with full dessert sweetness.'
    },
    'sweet-100': {
      id: 'sweet-100',
      name: '100% Full Sweet',
      val: 4,
      category: 'sweetness',
      categoryLabel: 'Sweetness',
      image: 'https://images.pexels.com/photos/1493080/pexels-photo-1493080.jpeg?cs=srgb&dl=pexels-1493080.jpg&fm=jpg',
      price: 0,
      desc: 'Maximum sweetness for a rich, luscious treat.'
    }
  };

  // Recipe configuration state
  const DEFAULT_RECIPE = {
    base: 'classic-black',
    flavour: 'brown-sugar',
    toppings: new Set(['tapioca']),
    milk: 'whole-milk',
    size: 'medium',
    sweetness: 'sweet-75'
  };

  let selectedRecipe = {
    base: DEFAULT_RECIPE.base,
    flavour: DEFAULT_RECIPE.flavour,
    toppings: new Set(DEFAULT_RECIPE.toppings),
    milk: DEFAULT_RECIPE.milk,
    size: DEFAULT_RECIPE.size,
    sweetness: DEFAULT_RECIPE.sweetness
  };

  // ═════════════════════════════════════════════════════════════════════════
  // 2. DOM CACHE
  // ═════════════════════════════════════════════════════════════════════════

  const categoryTabs = Array.from(document.querySelectorAll('.category-nav-tab'));
  const dynamicViewArea = document.getElementById('dynamicViewArea');

  // Selected-Items Panel elements (Right side)
  const builderSelectedPanel = document.getElementById('builderSelectedPanel');
  const selectedItemsContainer = document.getElementById('selectedItemsContainer');
  const selectedPriceAmount = document.getElementById('selectedPriceAmount');
  const btnClearSelections = document.getElementById('btnClearSelections');
  const btnCloseMobileSummary = document.getElementById('btnCloseMobileSummary');

  // Product Creation Section elements (Below workspace)
  const creationCardWrapper = document.getElementById('creationCardWrapper');

  // Mobile Action Bar
  const mobileBarTotal = document.getElementById('mobileBarTotal');
  const mobileSelectionsCount = document.getElementById('mobileSelectionsCount');
  const btnOpenMobileSummary = document.getElementById('btnOpenMobileSummary');
  const btnMobileAddToCart = document.getElementById('btnMobileAddToCart');

  // Confirmation Modal
  const cartModalBackdrop = document.getElementById('cartModalBackdrop');
  const btnCloseCartModal = document.getElementById('btnCloseCartModal');
  const btnKeepCustomizing = document.getElementById('btnKeepCustomizing');
  const modalDrinkName = document.getElementById('modalDrinkName');
  const modalRecipeContent = document.getElementById('modalRecipeContent');
  const modalGrandTotal = document.getElementById('modalGrandTotal');

  // Banner Actions & Toast
  const btnSurpriseMe = document.getElementById('btnSurpriseMe');
  const btnResetBuilder = document.getElementById('btnResetBuilder');
  const surpriseToast = document.getElementById('surpriseToast');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer = null;

  // Active category tracking
  let activeCategory = 'base';

  // ═════════════════════════════════════════════════════════════════════════
  // 3. COMPUTATIONS & DRINK NAMING
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Generates drink name according to selected base & flavour
   */
  function computeDrinkName() {
    const baseObj = PRODUCTS[selectedRecipe.base];
    const flavObj = PRODUCTS[selectedRecipe.flavour];

    if (!baseObj && !flavObj) return 'Custom Crafted Boba';
    if (!baseObj) return `${flavObj.name} Special`;
    if (!flavObj) return `${baseObj.name} Brew`;

    if (baseObj.id === 'taro') {
      return flavObj.id === 'brown-sugar' ? 'Brown Sugar Taro Bliss' : `${flavObj.name} Taro Tea`;
    }
    if (baseObj.id === 'matcha') {
      return flavObj.id === 'strawberry' ? 'Strawberry Matcha Latte' : `${flavObj.name} Matcha Velvet`;
    }
    if (selectedRecipe.milk === 'no-milk') {
      return `${flavObj.name} Iced ${baseObj.name}`;
    }
    return `${flavObj.name} ${baseObj.name}`;
  }

  /**
   * Resolves the primary large image representing the final customized drink
   */
  function resolveHeroDrinkImage() {
    const baseId = selectedRecipe.base;
    const flavId = selectedRecipe.flavour;

    if (baseId === 'taro') return 'images/menu_drink_taro_pearl.jpg';
    if (baseId === 'matcha' && flavId !== 'strawberry') return 'images/menu_drink_matcha_latte.jpg';

    const flavourImages = {
      'brown-sugar': 'images/custom_drink_boba.jpg',
      'strawberry': 'images/menu_drink_sig_strawberry_cloud.jpg',
      'mango': 'images/menu_drink_fruit_mango.jpg',
      'peach': 'images/menu_drink_fruit_peach.jpg',
      'vanilla': 'images/menu_drink_vanilla_cream.jpg',
      'honey': 'images/menu_drink_honey_milktea.jpg',
      'caramel': 'images/menu_drink_caramel_pearl.jpg',
      'matcha-infusion': 'images/menu_drink_matcha_latte.jpg'
    };

    if (flavourImages[flavId]) return flavourImages[flavId];
    if (baseId && PRODUCTS[baseId]) return PRODUCTS[baseId].image;
    return 'images/menu_drink_sig_brown_sugar_bliss.jpg';
  }

  /**
   * Centralized price calculation:
   * Base Tea price (counted once) + Size adjustment + Flavour + Milk + Toppings
   */
  function calculatePricing() {
    const baseObj = PRODUCTS[selectedRecipe.base];
    const flavObj = PRODUCTS[selectedRecipe.flavour];
    const milkObj = PRODUCTS[selectedRecipe.milk];
    const sizeObj = PRODUCTS[selectedRecipe.size];

    const basePrice = baseObj ? baseObj.price : 0;
    const sizeAdjustment = sizeObj ? sizeObj.price : 0;
    const flavourPrice = flavObj ? flavObj.price : 0;
    const milkPrice = milkObj ? milkObj.price : 0;

    let toppingsTotal = 0;
    const toppingsBreakdown = [];
    selectedRecipe.toppings.forEach((topId) => {
      const topObj = PRODUCTS[topId];
      if (topObj) {
        toppingsTotal += topObj.price;
        toppingsBreakdown.push({ name: topObj.name, price: topObj.price });
      }
    });

    const grandTotal = basePrice + sizeAdjustment + flavourPrice + milkPrice + toppingsTotal;

    return {
      basePrice,
      sizeAdjustment,
      flavourPrice,
      milkPrice,
      toppingsTotal,
      toppingsBreakdown,
      grandTotal
    };
  }

  function showToast(msg) {
    if (!surpriseToast || !toastMessage) return;
    toastMessage.textContent = msg;
    surpriseToast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      surpriseToast.classList.remove('show');
    }, 3200);
  }

  // ═════════════════════════════════════════════════════════════════════════
  // 4. RENDERING: CATEGORY VIEWS (LEFT WORKSPACE)
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Builds the interactive HTML for each category view from centralized data
   */
  function buildDynamicViewsHTML() {
    if (!dynamicViewArea) return;

    const categories = [
      { id: 'base', title: '1. START WITH YOUR TEA', hint: 'Select one freshly steeped tea foundation.' },
      { id: 'flavour', title: '2. PICK YOUR FLAVOUR', hint: 'Select one signature flavour infusion.' },
      { id: 'toppings', title: '3. ADD A LITTLE EXTRA MAGIC', hint: 'Select as many delicious toppings as you crave.' },
      { id: 'milk', title: '4. MAKE IT CREAMY', hint: 'Select one dairy or plant milk option.' },
      { id: 'size', title: '5. FIND YOUR PERFECT POUR', hint: 'Select your preferred cup size portion.' },
      { id: 'sweetness', title: '6. YOUR SWEET SPOT', hint: 'Calibrate your exact sugar percentage.' }
    ];

    let html = '';

    categories.forEach((cat) => {
      const isActive = cat.id === activeCategory;
      html += `
        <div class="builder-category-view ${isActive ? 'active' : ''}" id="view-${cat.id}" role="tabpanel" aria-labelledby="tab-${cat.id}">
          <div class="category-view-header">
            <div class="category-title-wrap">
              <span class="category-badge">STEP ${cat.title.slice(0, 2)}</span>
              <h2 class="category-heading">${cat.title.slice(3)}</h2>
            </div>
            <p class="category-instruction">${cat.hint}</p>
          </div>
      `;

      if (cat.id === 'sweetness') {
        // Render Sweetness Slider & Step Buttons
        const currentSweetObj = PRODUCTS[selectedRecipe.sweetness] || PRODUCTS['sweet-75'];
        html += `
          <div class="sweetness-interactive-box">
            <div class="sweetness-header-display">
              <div class="sweetness-indicator">
                <span class="sweetness-level-name" id="viewSweetnessName">${currentSweetObj.name.replace(/^[0-9]+%\s*/, '')}</span>
                <span class="sweetness-level-val" id="viewSweetnessPercent">${currentSweetObj.name.match(/^[0-9]+%/)[0]}</span>
              </div>
              <span class="sweetness-badge-tag">CUSTOM CALIBRATED</span>
            </div>
            <input type="range" min="0" max="4" step="1" value="${currentSweetObj.val}" id="builderSweetSlider" class="builder-range-slider" aria-label="Sweetness slider">
            <div class="sweetness-slider-labels">
              <button type="button" class="sweetness-step-btn ${currentSweetObj.val === 0 ? 'active' : ''}" data-step="0">0%<small>No Sugar</small></button>
              <button type="button" class="sweetness-step-btn ${currentSweetObj.val === 1 ? 'active' : ''}" data-step="1">25%<small>Light</small></button>
              <button type="button" class="sweetness-step-btn ${currentSweetObj.val === 2 ? 'active' : ''}" data-step="2">50%<small>Balanced</small></button>
              <button type="button" class="sweetness-step-btn ${currentSweetObj.val === 3 ? 'active' : ''}" data-step="3">75%<small>Extra</small></button>
              <button type="button" class="sweetness-step-btn ${currentSweetObj.val === 4 ? 'active' : ''}" data-step="4">100%<small>Very Sweet</small></button>
            </div>
          </div>
        `;
      } else {
        // Render Option Cards Grid
        html += `<div class="options-cards-grid grid-${cat.id}">`;

        // Filter products belonging to this category
        const catProducts = Object.values(PRODUCTS).filter((p) => p.category === cat.id);

        catProducts.forEach((prod) => {
          let isSelected = false;
          if (cat.id === 'toppings') {
            isSelected = selectedRecipe.toppings.has(prod.id);
          } else {
            isSelected = selectedRecipe[cat.id] === prod.id;
          }

          // Price badge display
          let priceText = 'Included';
          if (cat.id === 'base') {
            priceText = `&#8377;${prod.price} Base`;
          } else if (prod.price > 0) {
            priceText = `+&#8377;${prod.price}`;
          }

          html += `
            <div class="builder-option-card ${isSelected ? 'selected' : ''}" 
                 data-category="${cat.id}" 
                 data-id="${prod.id}" 
                 tabindex="0" 
                 role="button" 
                 aria-pressed="${isSelected ? 'true' : 'false'}">
              <div class="card-thumb-wrap">
                <img src="${prod.image}" alt="${prod.name}" class="card-thumb-img" loading="lazy">
                <div class="card-select-badge" aria-hidden="true"><svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
              </div>
              <div class="card-details">
                <h3 class="card-title">${prod.name}</h3>
                <span class="card-price-tag">${priceText}</span>
                <span class="card-action-btn ${isSelected ? 'selected' : ''}">${isSelected ? 'Added' : '+ Add'}</span>
              </div>
            </div>
          `;
        });

        html += `</div>`; // .options-cards-grid
      }

      html += `</div>`; // .builder-category-view
    });

    dynamicViewArea.innerHTML = html;
    bindCategoryViewEvents();
  }

  /**
   * Attaches click & keydown handlers to dynamically created cards & slider
   */
  function bindCategoryViewEvents() {
    const cards = dynamicViewArea.querySelectorAll('.builder-option-card');
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        const cat = card.dataset.category;
        const id = card.dataset.id;
        handleSelection(cat, id);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });

    const sweetSlider = dynamicViewArea.querySelector('#builderSweetSlider');
    const sweetStepBtns = dynamicViewArea.querySelectorAll('.sweetness-step-btn');

    if (sweetSlider) {
      sweetSlider.addEventListener('input', (e) => {
        handleSweetnessChange(Number(e.target.value));
      });
    }

    sweetStepBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const step = Number(btn.dataset.step);
        handleSweetnessChange(step);
      });
    });
  }

  function handleSelection(cat, id) {
    if (!cat || !id) return;

    if (cat === 'toppings') {
      // Multi-select toggle
      if (selectedRecipe.toppings.has(id)) {
        selectedRecipe.toppings.delete(id);
      } else {
        selectedRecipe.toppings.add(id);
      }
    } else {
      // Single-select
      selectedRecipe[cat] = id;
    }

    renderAll();
  }

  function handleSweetnessChange(stepIdx) {
    const sweetMap = ['sweet-0', 'sweet-25', 'sweet-50', 'sweet-75', 'sweet-100'];
    const selectedSweetId = sweetMap[stepIdx] || 'sweet-75';
    selectedRecipe.sweetness = selectedSweetId;
    renderAll();
  }

  // ═════════════════════════════════════════════════════════════════════════
  // 5. RENDERING: RIGHT-SIDE COMPACT SELECTED-ITEMS PANEL
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Renders ONLY the currently selected options in the right-side summary.
   * Concise, clean, no long descriptions, with thumbnail & remove icon.
   */
  function renderSelectedItemsPanel() {
    if (!selectedItemsContainer) return;

    // Collect list of selected product objects
    const selectedList = [];

    if (selectedRecipe.base && PRODUCTS[selectedRecipe.base]) {
      selectedList.push({ ...PRODUCTS[selectedRecipe.base], canRemove: true, catKey: 'base' });
    }
    if (selectedRecipe.flavour && PRODUCTS[selectedRecipe.flavour]) {
      selectedList.push({ ...PRODUCTS[selectedRecipe.flavour], canRemove: true, catKey: 'flavour' });
    }
    if (selectedRecipe.milk && PRODUCTS[selectedRecipe.milk]) {
      selectedList.push({ ...PRODUCTS[selectedRecipe.milk], canRemove: false, catKey: 'milk' });
    }
    if (selectedRecipe.size && PRODUCTS[selectedRecipe.size]) {
      selectedList.push({ ...PRODUCTS[selectedRecipe.size], canRemove: false, catKey: 'size' });
    }
    if (selectedRecipe.sweetness && PRODUCTS[selectedRecipe.sweetness]) {
      selectedList.push({ ...PRODUCTS[selectedRecipe.sweetness], canRemove: false, catKey: 'sweetness' });
    }

    selectedRecipe.toppings.forEach((topId) => {
      if (PRODUCTS[topId]) {
        selectedList.push({ ...PRODUCTS[topId], canRemove: true, catKey: 'toppings', topId });
      }
    });

    if (selectedList.length === 0) {
      selectedItemsContainer.innerHTML = `
        <div class="selected-empty-state">
          <svg class="selected-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 8v4M12 16h.01"/>
          </svg>
          <p>No ingredients selected yet.<br>Choose from the left to start brewing!</p>
        </div>
      `;
    } else {
      let itemsHTML = '';
      selectedList.forEach((item) => {
        let priceTag = 'Included';
        if (item.category === 'base') {
          priceTag = `&#8377;${item.price} Base`;
        } else if (item.price > 0) {
          priceTag = `+&#8377;${item.price}`;
        }

        const removeBtnHTML = item.canRemove
          ? `<button type="button" class="selected-item-remove-btn" data-cat="${item.catKey}" data-id="${item.id}" title="Remove ${item.name}" aria-label="Remove ${item.name}">&times;</button>`
          : `<span style="width:22px; height:22px;"></span>`;

        itemsHTML += `
          <div class="selected-item-row" data-id="${item.id}">
            <div class="selected-item-thumb">
              <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="selected-item-info">
              <span class="selected-item-category">${item.categoryLabel}</span>
              <strong class="selected-item-name">${item.name}</strong>
              <span class="selected-item-price">${priceTag}</span>
            </div>
            ${removeBtnHTML}
          </div>
        `;
      });

      selectedItemsContainer.innerHTML = itemsHTML;

      // Bind remove actions
      const removeBtns = selectedItemsContainer.querySelectorAll('.selected-item-remove-btn');
      removeBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const cat = btn.dataset.cat;
          const id = btn.dataset.id;
          if (cat === 'toppings') {
            selectedRecipe.toppings.delete(id);
          } else if (cat === 'base') {
            selectedRecipe.base = null;
          } else if (cat === 'flavour') {
            selectedRecipe.flavour = null;
          }
          renderAll();
        });
      });
    }

    // Update Price Total
    const pricing = calculatePricing();
    if (selectedPriceAmount) selectedPriceAmount.innerHTML = `&#8377;${pricing.grandTotal}`;
    if (mobileBarTotal) mobileBarTotal.innerHTML = `&#8377;${pricing.grandTotal}`;
    if (mobileSelectionsCount) mobileSelectionsCount.textContent = selectedList.length;
  }

  // ═════════════════════════════════════════════════════════════════════════
  // 6. RENDERING: "YOUR CUSTOM CREATION" SECTION (BELOW WORKSPACE)
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Renders the final customized product card with drink preview, generated name,
   * compact specification pills, ingredient thumbnail gallery (reusing images!),
   * and expandable price breakdown.
   */
  function renderCustomCreationSection() {
    if (!creationCardWrapper) return;

    const baseObj = PRODUCTS[selectedRecipe.base];
    const flavObj = PRODUCTS[selectedRecipe.flavour];

    // If both required items (base & flavour) are unselected, show friendly prompt
    if (!baseObj && !flavObj) {
      creationCardWrapper.innerHTML = `
        <div class="creation-empty-card">
          <svg class="creation-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M12 2C6 2 2 8 2 14c0 4 3 8 10 8s10-4 10-8c0-6-4-12-10-12z"/>
            <path d="M12 22V2"/>
          </svg>
          <h3>Start Crafting Your Cup</h3>
          <p>Select your tea base and flavour above to see your handcrafted boba cup take shape right here.</p>
        </div>
      `;
      return;
    }

    const drinkName = computeDrinkName();
    const heroImg = resolveHeroDrinkImage();
    const pricing = calculatePricing();

    const milkObj = PRODUCTS[selectedRecipe.milk] || { name: 'Whole Milk' };
    const sizeObj = PRODUCTS[selectedRecipe.size] || { name: 'Medium', vol: '350 ml' };
    const sweetObj = PRODUCTS[selectedRecipe.sweetness] || { name: '75% Extra Sweet' };

    // Build ingredient thumbnails gallery (reusing exact product images!)
    const allSelectedItems = [];
    if (baseObj) allSelectedItems.push(baseObj);
    if (flavObj) allSelectedItems.push(flavObj);
    if (milkObj && milkObj.id) allSelectedItems.push(milkObj);
    selectedRecipe.toppings.forEach((topId) => {
      if (PRODUCTS[topId]) allSelectedItems.push(PRODUCTS[topId]);
    });

    let galleryItemsHTML = '';
    allSelectedItems.forEach((item) => {
      galleryItemsHTML += `
        <div class="ingredient-strip-item">
          <img src="${item.image}" alt="${item.name}" class="strip-item-img">
          <span class="strip-item-name">${item.name}</span>
        </div>
      `;
    });

    // Toppings count label
    const toppingsCountText = selectedRecipe.toppings.size > 0
      ? `${selectedRecipe.toppings.size} Topping${selectedRecipe.toppings.size > 1 ? 's' : ''}`
      : 'No Toppings';

    creationCardWrapper.innerHTML = `
      <div class="creation-product-card">
        <!-- Left: Hero Cup Visual Stage -->
        <div class="creation-cup-stage">
          <div class="creation-cup-halo" aria-hidden="true"></div>
          <div class="creation-cup-ring" aria-hidden="true"></div>
          <div class="creation-cup-frame">
            <img src="${heroImg}" alt="${drinkName}" class="creation-cup-img" id="creationMainCupImg">
            <div class="creation-cup-overlay" aria-hidden="true"></div>
            <div class="creation-floating-pill">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <span>HANDCRAFTED FOR YOU</span>
            </div>
          </div>
        </div>

        <!-- Right: Recipe Details & Specifications -->
        <div class="creation-details-col">
          <span class="creation-drink-badge">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C6 2 2 8 2 14c0 4 3 8 10 8s10-4 10-8c0-6-4-12-10-12z"/></svg>
            YOUR PERSONAL FORMULA
          </span>
          <h3 class="creation-drink-name">${drinkName}</h3>

          <!-- Compact Specification Pills -->
          <div class="creation-specs-row">
            <span class="spec-pill"><span class="spec-pill-label">Size:</span> ${sizeObj.name} (${sizeObj.vol})</span>
            <span class="spec-pill"><span class="spec-pill-label">Milk:</span> ${milkObj.name}</span>
            <span class="spec-pill"><span class="spec-pill-label">Sweetness:</span> ${sweetObj.name}</span>
            <span class="spec-pill"><span class="spec-pill-label">Toppings:</span> ${toppingsCountText}</span>
          </div>

          <!-- Selected Ingredients Gallery (Shared Product Images!) -->
          <div class="creation-gallery-block">
            <div class="creation-gallery-title">Selected Fresh Ingredients</div>
            <div class="creation-ingredients-strip">
              ${galleryItemsHTML}
            </div>
          </div>

          <!-- Pricing & Expandable Breakdown -->
          <div class="creation-pricing-box">
            <div class="creation-price-main-row">
              <div class="creation-price-label-wrap">
                <span class="creation-total-title">Total Estimated Price</span>
                <span class="creation-total-note">Inclusive of GST and packaging</span>
              </div>
              <strong class="creation-price-amount">&#8377;${pricing.grandTotal}</strong>
            </div>

            <!-- Price Breakdown Accordion -->
            <button type="button" class="btn-toggle-breakdown" id="btnToggleBreakdown" aria-expanded="false">
              <span>View Price Breakdown</span>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
            </button>

            <div class="breakdown-details-drawer" id="breakdownDrawer">
              <div class="breakdown-row">
                <span>Base Tea (${baseObj ? baseObj.name : 'None'}):</span>
                <strong>&#8377;${pricing.basePrice}</strong>
              </div>
              <div class="breakdown-row">
                <span>Size Adjustment (${sizeObj.name}):</span>
                <strong>+&#8377;${pricing.sizeAdjustment}</strong>
              </div>
              <div class="breakdown-row">
                <span>Flavour Infusion (${flavObj ? flavObj.name : 'None'}):</span>
                <strong>+&#8377;${pricing.flavourPrice}</strong>
              </div>
              <div class="breakdown-row">
                <span>Milk Option (${milkObj.name}):</span>
                <strong>+&#8377;${pricing.milkPrice}</strong>
              </div>
              <div class="breakdown-row">
                <span>Toppings Total (${pricing.toppingsBreakdown.length} items):</span>
                <strong>+&#8377;${pricing.toppingsTotal}</strong>
              </div>
            </div>
          </div>

          <!-- Add to Cart Primary Action -->
          <button type="button" class="btn-creation-add-to-cart" id="btnCreationAddToCart">
            <span>ADD TO MY CART</span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </button>
        </div>
      </div>
    `;

    // Bind price breakdown toggle
    const btnToggle = creationCardWrapper.querySelector('#btnToggleBreakdown');
    const drawer = creationCardWrapper.querySelector('#breakdownDrawer');
    if (btnToggle && drawer) {
      btnToggle.addEventListener('click', () => {
        const isOpen = drawer.classList.toggle('open');
        btnToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        btnToggle.querySelector('span').textContent = isOpen ? 'Hide Price Breakdown' : 'View Price Breakdown';
      });
    }

    // Bind Add to Cart
    const btnAdd = creationCardWrapper.querySelector('#btnCreationAddToCart');
    if (btnAdd) {
      btnAdd.addEventListener('click', openCartConfirmationModal);
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // 7. TAB NAVIGATION & COMPLETION STATUS
  // ═════════════════════════════════════════════════════════════════════════

  function updateTabIndicators() {
    const hasBase = Boolean(selectedRecipe.base);
    const hasFlavour = Boolean(selectedRecipe.flavour);
    const hasToppings = selectedRecipe.toppings.size > 0;
    const hasMilk = Boolean(selectedRecipe.milk);
    const hasSize = Boolean(selectedRecipe.size);
    const hasSweetness = Boolean(selectedRecipe.sweetness);

    const completionStatus = {
      base: hasBase,
      flavour: hasFlavour,
      toppings: hasToppings,
      milk: hasMilk,
      size: hasSize,
      sweetness: hasSweetness
    };

    categoryTabs.forEach((tab) => {
      const cat = tab.dataset.category;
      tab.classList.toggle('active', cat === activeCategory);
      tab.setAttribute('aria-selected', cat === activeCategory ? 'true' : 'false');
      tab.classList.toggle('completed', Boolean(completionStatus[cat]));
    });

    // Update active view panel
    const views = dynamicViewArea.querySelectorAll('.builder-category-view');
    views.forEach((v) => {
      v.classList.toggle('active', v.id === `view-${activeCategory}`);
    });
  }

  categoryTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      activeCategory = tab.dataset.category;
      updateTabIndicators();
      tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
  });

  // ═════════════════════════════════════════════════════════════════════════
  // 8. MASTER RENDER SYNCHRONIZER
  // ═════════════════════════════════════════════════════════════════════════

  function renderAll() {
    buildDynamicViewsHTML();
    renderSelectedItemsPanel();
    renderCustomCreationSection();
    updateTabIndicators();
  }

  // ═════════════════════════════════════════════════════════════════════════
  // 9. SURPRISE ME & RESET ACTIONS
  // ═════════════════════════════════════════════════════════════════════════

  if (btnSurpriseMe) {
    btnSurpriseMe.addEventListener('click', () => {
      const bases = ['classic-black', 'green-tea', 'matcha', 'taro'];
      const flavours = ['brown-sugar', 'strawberry', 'mango', 'peach', 'vanilla', 'honey', 'caramel'];
      const allToppings = ['tapioca', 'brown-sugar-pearls', 'mango-popping', 'strawberry-popping', 'fruit-jelly', 'coconut-jelly', 'cream-foam', 'whipped-cream'];
      const milks = ['whole-milk', 'oat-milk', 'almond-milk', 'coconut-milk', 'no-milk'];
      const sizes = ['small', 'medium', 'large'];
      const sweets = ['sweet-25', 'sweet-50', 'sweet-75', 'sweet-100'];

      selectedRecipe.base = bases[Math.floor(Math.random() * bases.length)];
      selectedRecipe.flavour = flavours[Math.floor(Math.random() * flavours.length)];
      selectedRecipe.milk = milks[Math.floor(Math.random() * milks.length)];
      selectedRecipe.size = sizes[Math.floor(Math.random() * sizes.length)];
      selectedRecipe.sweetness = sweets[Math.floor(Math.random() * sweets.length)];

      selectedRecipe.toppings.clear();
      const pickCount = Math.floor(Math.random() * 2) + 1; // 1 or 2 toppings
      const shuffled = [...allToppings].sort(() => 0.5 - Math.random());
      shuffled.slice(0, pickCount).forEach((t) => selectedRecipe.toppings.add(t));

      renderAll();

      const cupImg = document.getElementById('creationMainCupImg');
      if (cupImg) {
        cupImg.style.transform = 'scale(1.06) rotate(1.5deg)';
        setTimeout(() => {
          cupImg.style.transform = '';
        }, 300);
      }

      showToast('Barista inspiration loaded! A fresh tasty combo has been created.');
    });
  }

  function resetAllSelections() {
    selectedRecipe = {
      base: DEFAULT_RECIPE.base,
      flavour: DEFAULT_RECIPE.flavour,
      toppings: new Set(DEFAULT_RECIPE.toppings),
      milk: DEFAULT_RECIPE.milk,
      size: DEFAULT_RECIPE.size,
      sweetness: DEFAULT_RECIPE.sweetness
    };
    activeCategory = 'base';
    renderAll();
    showToast('Builder reset to signature standard recipe.');
  }

  if (btnResetBuilder) {
    btnResetBuilder.addEventListener('click', resetAllSelections);
  }

  if (btnClearSelections) {
    btnClearSelections.addEventListener('click', resetAllSelections);
  }

  // ═════════════════════════════════════════════════════════════════════════
  // 10. MODAL & MOBILE DRAWER HANDLERS
  // ═════════════════════════════════════════════════════════════════════════

  function openCartConfirmationModal() {
    if (!cartModalBackdrop) return;

    if (builderSelectedPanel) {
      builderSelectedPanel.classList.remove('mobile-drawer-open');
    }

    const drinkTitle = computeDrinkName();
    if (modalDrinkName) modalDrinkName.textContent = drinkTitle;

    const pricing = calculatePricing();
    if (modalGrandTotal) modalGrandTotal.innerHTML = `&#8377;${pricing.grandTotal}`;

    if (modalRecipeContent) {
      const baseObj = PRODUCTS[selectedRecipe.base] || { name: 'None' };
      const flavObj = PRODUCTS[selectedRecipe.flavour] || { name: 'None' };
      const milkObj = PRODUCTS[selectedRecipe.milk] || { name: 'Whole Milk' };
      const sizeObj = PRODUCTS[selectedRecipe.size] || { name: 'Medium', vol: '350 ml' };
      const sweetObj = PRODUCTS[selectedRecipe.sweetness] || { name: '75% Extra Sweet' };

      const topNames = [];
      selectedRecipe.toppings.forEach((tId) => {
        if (PRODUCTS[tId]) topNames.push(PRODUCTS[tId].name);
      });

      modalRecipeContent.innerHTML = `
        <div style="display:flex; justify-content:space-between; padding:0.3rem 0; border-bottom:1px solid rgba(185,130,88,0.18);">
          <span><strong>Tea Foundation:</strong> ${baseObj.name}</span>
          <span style="color:#98633A; font-weight:700;">&#8377;${pricing.basePrice}</span>
        </div>
        <div style="display:flex; justify-content:space-between; padding:0.3rem 0; border-bottom:1px solid rgba(185,130,88,0.18);">
          <span><strong>Flavour:</strong> ${flavObj.name}</span>
          <span style="color:#98633A; font-weight:700;">+&#8377;${pricing.flavourPrice}</span>
        </div>
        <div style="display:flex; justify-content:space-between; padding:0.3rem 0; border-bottom:1px solid rgba(185,130,88,0.18);">
          <span><strong>Milk Choice:</strong> ${milkObj.name}</span>
          <span style="color:#98633A; font-weight:700;">${pricing.milkPrice > 0 ? '+&#8377;' + pricing.milkPrice : 'Included'}</span>
        </div>
        <div style="display:flex; justify-content:space-between; padding:0.3rem 0; border-bottom:1px solid rgba(185,130,88,0.18);">
          <span><strong>Portion:</strong> ${sizeObj.name} (${sizeObj.vol})</span>
          <span style="color:#98633A; font-weight:700;">+&#8377;${pricing.sizeAdjustment}</span>
        </div>
        <div style="display:flex; justify-content:space-between; padding:0.3rem 0; border-bottom:1px solid rgba(185,130,88,0.18);">
          <span><strong>Sweetness:</strong> ${sweetObj.name}</span>
          <span style="color:#98633A; font-weight:700;">Included</span>
        </div>
        <div style="display:flex; justify-content:space-between; padding:0.3rem 0;">
          <span><strong>Toppings (${topNames.length}):</strong> ${topNames.length > 0 ? topNames.join(', ') : 'None'}</span>
          <span style="color:#98633A; font-weight:700;">+&#8377;${pricing.toppingsTotal}</span>
        </div>
      `;
    }

    cartModalBackdrop.classList.add('active');
    cartModalBackdrop.setAttribute('aria-hidden', 'false');
  }

  function closeCartConfirmationModal() {
    if (!cartModalBackdrop) return;
    cartModalBackdrop.classList.remove('active');
    cartModalBackdrop.setAttribute('aria-hidden', 'true');
  }

  if (btnCloseCartModal) btnCloseCartModal.addEventListener('click', closeCartConfirmationModal);
  if (btnKeepCustomizing) btnKeepCustomizing.addEventListener('click', closeCartConfirmationModal);

  if (cartModalBackdrop) {
    cartModalBackdrop.addEventListener('click', (e) => {
      if (e.target === cartModalBackdrop) closeCartConfirmationModal();
    });
  }

  // Mobile Bottom Bar Actions
  if (btnOpenMobileSummary && builderSelectedPanel) {
    btnOpenMobileSummary.addEventListener('click', () => {
      builderSelectedPanel.classList.toggle('mobile-drawer-open');
    });
  }

  if (btnCloseMobileSummary && builderSelectedPanel) {
    btnCloseMobileSummary.addEventListener('click', () => {
      builderSelectedPanel.classList.remove('mobile-drawer-open');
    });
  }

  if (btnMobileAddToCart) {
    btnMobileAddToCart.addEventListener('click', openCartConfirmationModal);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCartConfirmationModal();
      if (builderSelectedPanel) {
        builderSelectedPanel.classList.remove('mobile-drawer-open');
      }
    }
  });

  // ═════════════════════════════════════════════════════════════════════════
  // 11. INITIALIZATION RUN
  // ═════════════════════════════════════════════════════════════════════════

  renderAll();

});
