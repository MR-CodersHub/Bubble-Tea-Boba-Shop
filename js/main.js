/**
 * BUBBLE & BREW - HOME 1 BUBBLE TEA & BOBA SHOP
 * Vanilla JavaScript Controller (Single Signature Drink Showcase)
 *
 * NOTE: Navbar and mobile-menu interactions are handled by components/navbar.js
 *       Cart badge is updated via window.bbUpdateCartBadge() exposed by navbar.js
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // SIGNATURE DRINK DATA
  // =========================================================================
  const signatureDrink = {
    name: "Brown Sugar Boba Milk Tea",
    price: 149,
    image: "images/slide1_brown_sugar.png",
    origin: "Nantou High Mountain Black Tea with slow-cooked Taiwanese Muscovado syrup.",
    tastingNotes: "Rich molasses caramel, silky whole cream, chewy honey-glazed tapioca pearls.",
    nutrition: "340 kcal • Fresh Whole Milk • Slow-cooked brown sugar • Grade-A Cassava"
  };

  // =========================================================================
  // DOM ELEMENT REFERENCES
  // =========================================================================
  // Interactive Size Selection
  const sizeRadioItems = document.querySelectorAll('.size-radio-item');
  let selectedSize = 'Medium';

  // CTA Buttons
  const readMoreBtn  = document.getElementById('readMoreBtn');
  const orderNowBtn  = document.getElementById('orderNowBtn');

  // Modals & Drawers
  const orderModal       = document.getElementById('orderModal');
  const orderModalClose  = document.getElementById('orderModalClose');
  const orderModalTitle  = document.getElementById('orderModalTitle');
  const orderModalThumb  = document.getElementById('orderModalThumb');
  const orderModalPrice  = document.getElementById('orderModalPrice');
  const orderModalNotes  = document.getElementById('orderModalNotes');
  const addToBagBtn      = document.getElementById('addToBagBtn');

  // Read More Modal
  const readMoreModal      = document.getElementById('readMoreModal');
  const readMoreModalClose = document.getElementById('readMoreModalClose');

  // Cart Drawer
  const cartDrawerOverlay = document.getElementById('cartDrawerOverlay');
  const cartDrawer        = document.getElementById('cartDrawer');
  const cartDrawerClose   = document.getElementById('cartDrawerClose');
  const cartItemsList     = document.getElementById('cartItemsList');
  const cartTotalVal      = document.getElementById('cartTotalVal');
  const checkoutBtn       = document.getElementById('checkoutBtn');

  // Toast Notification
  const toastNotice = document.getElementById('toastNotice');
  const toastMsg    = document.getElementById('toastMsg');

  // State
  let cartItems    = [];
  let modalQty     = 1;
  let modalSweetness = '70%';
  let modalIce       = 'Regular';
  let modalToppings  = ['Brown Sugar Boba'];

  // =========================================================================
  // SIZE SELECTION HANDLER
  // =========================================================================
  sizeRadioItems.forEach(item => {
    item.addEventListener('click', () => {
      sizeRadioItems.forEach(r => r.classList.remove('selected'));
      item.classList.add('selected');
      selectedSize = item.getAttribute('data-size');
      showToast(`Selected size: ${selectedSize}`);
    });
  });

  // =========================================================================
  // ORDER NOW MODAL & CUSTOMIZATION
  // =========================================================================
  function openOrderModal() {
    orderModalTitle.textContent = signatureDrink.name;
    orderModalThumb.src         = signatureDrink.image;
    orderModalNotes.textContent = signatureDrink.origin;

    // Reset quantity
    modalQty = 1;
    document.getElementById('modalQty').textContent = modalQty;
    updateModalPrice();

    // Select matching size in modal
    document.querySelectorAll('.modal-size-btn').forEach(btn => {
      btn.classList.toggle('selected', btn.getAttribute('data-size') === selectedSize);
    });

    orderModal.classList.add('open');
  }

  function updateModalPrice() {
    const basePrice   = signatureDrink.price;
    const sizeDelta   = selectedSize === 'Large' ? 30 : selectedSize === 'Small' ? -20 : 0;
    const itemTotal   = (basePrice + sizeDelta) * modalQty;
    orderModalPrice.textContent = `₹${itemTotal}`;
  }

  if (orderNowBtn)    orderNowBtn.addEventListener('click', openOrderModal);

  if (orderModalClose) {
    orderModalClose.addEventListener('click', () => orderModal.classList.remove('open'));
  }
  orderModal.addEventListener('click', e => {
    if (e.target === orderModal) orderModal.classList.remove('open');
  });

  // Quantity stepper in modal
  const qtyMinus  = document.getElementById('qtyMinus');
  const qtyPlus   = document.getElementById('qtyPlus');
  const modalQtyEl = document.getElementById('modalQty');

  if (qtyMinus) {
    qtyMinus.addEventListener('click', () => {
      if (modalQty > 1) { modalQty--; modalQtyEl.textContent = modalQty; updateModalPrice(); }
    });
  }
  if (qtyPlus) {
    qtyPlus.addEventListener('click', () => {
      if (modalQty < 20) { modalQty++; modalQtyEl.textContent = modalQty; updateModalPrice(); }
    });
  }

  // Option pill buttons handler
  document.querySelectorAll('.option-group-pills').forEach(group => {
    const isMulti = group.getAttribute('data-multi') === 'true';
    const pills   = group.querySelectorAll('.pill-option-btn');

    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        if (!isMulti) {
          pills.forEach(p => p.classList.remove('selected'));
          pill.classList.add('selected');

          if (pill.classList.contains('modal-size-btn')) {
            selectedSize = pill.getAttribute('data-size');
            sizeRadioItems.forEach(r => {
              r.classList.toggle('selected', r.getAttribute('data-size') === selectedSize);
            });
            updateModalPrice();
          } else if (pill.classList.contains('modal-sweet-btn')) {
            modalSweetness = pill.getAttribute('data-val');
          } else if (pill.classList.contains('modal-ice-btn')) {
            modalIce = pill.getAttribute('data-val');
          }
        } else {
          pill.classList.toggle('selected');
          modalToppings = Array.from(group.querySelectorAll('.pill-option-btn.selected'))
                               .map(p => p.getAttribute('data-val'));
        }
      });
    });
  });

  // Add to Bag action
  if (addToBagBtn) {
    addToBagBtn.addEventListener('click', () => {
      const basePrice  = signatureDrink.price;
      const sizeDelta  = selectedSize === 'Large' ? 30 : selectedSize === 'Small' ? -20 : 0;
      const unitPrice  = basePrice + sizeDelta;
      const totalPrice = unitPrice * modalQty;

      cartItems.push({
        id:        Date.now(),
        name:      signatureDrink.name,
        size:      selectedSize,
        sweetness: modalSweetness,
        ice:       modalIce,
        toppings:  modalToppings.length ? modalToppings.join(', ') : 'Brown Sugar Boba',
        qty:       modalQty,
        total:     totalPrice,
        image:     signatureDrink.image
      });

      updateCartDisplay();
      orderModal.classList.remove('open');
      showToast(`Added ${modalQty}x ${signatureDrink.name} to bag!`);
    });
  }

  // =========================================================================
  // READ MORE MODAL
  // =========================================================================
  if (readMoreBtn) {
    readMoreBtn.addEventListener('click', () => readMoreModal.classList.add('open'));
  }
  if (readMoreModalClose) {
    readMoreModalClose.addEventListener('click', () => readMoreModal.classList.remove('open'));
  }
  readMoreModal.addEventListener('click', e => {
    if (e.target === readMoreModal) readMoreModal.classList.remove('open');
  });

  // =========================================================================
  // CART / SHOPPING BAG DRAWER
  // =========================================================================
  function updateCartDisplay() {
    const count = cartItems.reduce((acc, item) => acc + item.qty, 0);

    // Update navbar badge via the component's public API
    if (typeof window.bbUpdateCartBadge === 'function') {
      window.bbUpdateCartBadge(count);
    }

    if (cartItems.length === 0) {
      cartItemsList.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: rgba(255, 255, 255, 0.65);">
          <svg style="width: 48px; height: 48px; fill: rgba(245, 193, 143, 0.5); margin-bottom: 1rem;" viewBox="0 0 24 24">
            <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12z"/>
          </svg>
          <p style="font-weight: 500;">Your shopping bag is empty.</p>
          <p style="font-size: 0.8rem; margin-top: 0.25rem;">Choose your favourite tea and click Order Now!</p>
        </div>
      `;
      cartTotalVal.textContent = '₹0';
      return;
    }

    let grandTotal = 0;
    cartItemsList.innerHTML = cartItems.map((item, idx) => {
      grandTotal += item.total;
      return `
        <div class="cart-item-row">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name} (${item.qty}x)</div>
            <div class="cart-item-details">${item.size} • ${item.sweetness} Sugar • ${item.ice}</div>
            <div class="cart-item-price">₹${item.total}</div>
          </div>
          <div class="cart-remove-item" onclick="removeCartItem(${idx})">&times;</div>
        </div>
      `;
    }).join('');

    cartTotalVal.textContent = `₹${grandTotal}`;
  }

  window.removeCartItem = function (idx) {
    cartItems.splice(idx, 1);
    updateCartDisplay();
    showToast("Item removed from bag");
  };

  function closeCart() {
    if (cartDrawerOverlay) cartDrawerOverlay.classList.remove('open');
    if (cartDrawer)        cartDrawer.classList.remove('open');
  }

  if (cartDrawerClose)   cartDrawerClose.addEventListener('click', closeCart);
  if (cartDrawerOverlay) cartDrawerOverlay.addEventListener('click', closeCart);

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cartItems.length === 0) {
        showToast("Your bag is empty! Add a bubble tea first.");
        return;
      }
      showToast("Thank you for your order! Fresh boba is brewing...");
      cartItems = [];
      updateCartDisplay();
      setTimeout(closeCart, 1200);
    });
  }

  // =========================================================================
  // TOAST NOTIFICATION UTILITY
  // =========================================================================
  let toastTimer = null;
  function showToast(message) {
    clearTimeout(toastTimer);
    toastMsg.textContent = message;
    toastNotice.classList.add('show');
    toastTimer = setTimeout(() => toastNotice.classList.remove('show'), 3200);
  }

  function closeAllModals() {
    orderModal.classList.remove('open');
    readMoreModal.classList.remove('open');
    closeCart();
  }

  // Keyboard escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAllModals();
  });

  // Initialize view (empty cart state)
  updateCartDisplay();
});
