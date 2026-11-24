/**
 * BUBBLE & BREW – Reusable Navbar Component  v2.0
 * =================================================
 * Usage: add <div id="navbar-container"></div> to any page and import this
 * script. The component auto-detects the active page and highlights the
 * correct nav link.
 *
 * Features:
 *  • Fully transparent – no background card or box
 *  • 6 centre navigation links
 *  • RTL / LTR toggle  (persisted via localStorage)
 *  • Light / Dark mode toggle (persisted via localStorage)
 *  • Profile dropdown → Login · Signup
 *  • Shopping-cart badge (exposed as window.bbUpdateCartBadge)
 *  • Responsive hamburger mobile menu
 */

(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════════════════════════════
     PATH HELPER — Works flawlessly on file://, localhost & live servers
     ═══════════════════════════════════════════════════════════════════════════ */
  function getRootPrefix() {
    // 1. Detect relative prefix from script src (e.g. "components/navbar.js" -> "" or "../components/navbar.js" -> "../")
    const script = document.querySelector('script[src*="navbar.js"]');
    if (script) {
      const src = script.getAttribute('src') || '';
      const idx = src.indexOf('components/navbar.js');
      if (idx !== -1) {
        return src.substring(0, idx);
      }
    }
    return '';
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     ACTIVE-PAGE DETECTION
     ═══════════════════════════════════════════════════════════════════════════ */
  function getActivePage() {
    const filename = window.location.pathname.replace(/\\/g, '/').split('/').pop().toLowerCase() || 'index.html';
    if (filename === '' || filename === 'index.html' || filename === 'home2.html') return 'home';
    if (filename.startsWith('about'))    return 'about';
    if (filename.startsWith('flavour') || filename.startsWith('flavor')) return 'flavour';
    if (filename.startsWith('menu'))     return 'menu';
    if (filename.startsWith('customize'))return 'customize';
    if (filename.startsWith('contact'))  return 'contact';
    return '';
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     NAV LINK DEFINITIONS
     ═══════════════════════════════════════════════════════════════════════════ */
  const NAV_LINKS = [
    { key: 'home',      label: 'Home',       href: 'index.html'     },
    { key: 'about',     label: 'About Us',   href: 'about.html'     },
    { key: 'flavour',   label: 'Our Flavor', href: 'flavours.html'  },
    { key: 'menu',      label: 'Menu',       href: 'menu.html'      },
    { key: 'customize', label: 'Customize',  href: 'customize.html' },
    { key: 'contact',   label: 'Contact',    href: 'contact.html'   },
  ];

  /* ═══════════════════════════════════════════════════════════════════════════
     SVG ICONS
     ═══════════════════════════════════════════════════════════════════════════ */
  const LOGO_SVG = `
    <svg class="bb-brand-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M10 12L13.5 35C13.8 36.8 15.3 38 17.1 38H22.9C24.7 38 26.2 36.8 26.5 35L30 12"
            stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M8 12C8 10.9 8.9 10 10 10H30C31.1 10 32 10.9 32 12V12H8V12Z"
            stroke="#FFFFFF" stroke-width="2.2"/>
      <path d="M12 10C12 5.5 15.6 2 20 2C24.4 2 28 5.5 28 10"
            stroke="#F5C18F" stroke-width="2.2"/>
      <line x1="23" y1="2" x2="27" y2="-4" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="16" cy="30" r="2.2" fill="#F5C18F"/>
      <circle cx="21" cy="32" r="2.2" fill="#F5C18F"/>
      <circle cx="24" cy="28" r="2.2" fill="#F5C18F"/>
      <circle cx="18" cy="25" r="2.2" fill="#F5C18F"/>
    </svg>`;

  const SUN_SVG = `
    <svg class="bb-theme-icon bb-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1"  x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22"  x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3"  y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"/>
    </svg>`;

  const MOON_SVG = `
    <svg class="bb-theme-icon bb-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>`;

  const USER_SVG = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>`;

  const BAG_SVG = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>`;

  /* ═══════════════════════════════════════════════════════════════════════════
     BUILD HTML
     ═══════════════════════════════════════════════════════════════════════════ */
  function buildNavbar(root, activePage) {

    /* Desktop nav links */
    const desktopLinks = NAV_LINKS.map(({ key, label, href }) => {
      const active = key === activePage;
      return `<li>
        <a href="${root}${href}" class="bb-nav-link${active ? ' active' : ''}" data-page="${key}">${label}</a>
      </li>`;
    }).join('');

    /* Mobile nav links */
    const mobileNavLinks = NAV_LINKS.map(({ key, label, href }) => {
      const active = key === activePage;
      return `<li>
        <a href="${root}${href}" class="bb-mobile-link${active ? ' active' : ''}" data-page="${key}">${label}</a>
      </li>`;
    }).join('');

    return `
      <!-- ═══ TRANSPARENT NAVBAR ═══ -->
      <nav class="bb-navbar" role="navigation" aria-label="Main Navigation">
        <div class="bb-nav-inner">

          <!-- Brand / Logo -->
          <a href="${root}index.html" class="bb-brand" aria-label="Bubble &amp; Brew – Home">
            <img src="${root}assets/images/bubble-brew-logo.svg" alt="" class="bb-brand-icon">
            <div class="bb-brand-text">
              <span class="bb-brand-name">Bubble &amp; Brew</span>
              <span class="bb-brand-tagline">Artisanal Tea Room</span>
            </div>
          </a>

          <!-- Centre Navigation Links (desktop) -->
          <ul class="bb-nav-links" role="list">
            ${desktopLinks}
          </ul>

          <!-- Right-Side Controls -->
          <div class="bb-nav-actions">

            <!-- A. RTL / LTR Direction Toggle -->
            <button class="bb-dir-toggle bb-ctrl-btn" id="bbDirToggle"
                    aria-label="Toggle text direction" type="button" title="Toggle RTL / LTR">
              <span class="bb-dir-label" id="bbDirLabel">LTR</span>
            </button>

            <!-- B. Light / Dark Mode Toggle -->
            <button class="bb-theme-toggle bb-ctrl-btn" id="bbThemeToggle"
                    aria-label="Toggle light / dark mode" type="button" title="Toggle theme">
              ${SUN_SVG}
              ${MOON_SVG}
            </button>

            <!-- C. Cart Button (keeps existing functionality) -->
            <button class="bb-icon-btn" id="bbCartBtn" aria-label="Open shopping bag" type="button">
              ${BAG_SVG}
              <span class="bb-cart-badge" id="bbCartBadge">0</span>
            </button>

            <!-- D. Profile Icon + Dropdown -->
            <div class="bb-profile-wrap" id="bbProfileWrap">
              <button class="bb-icon-btn" id="bbProfileBtn"
                      aria-label="Account menu" aria-haspopup="true" aria-expanded="false" type="button">
                ${USER_SVG}
              </button>
              <div class="bb-profile-dropdown" id="bbProfileDropdown" role="menu" aria-hidden="true">
                <div class="bb-dropdown-arrow"></div>
                <a href="${root}login.html"  class="bb-dropdown-item" role="menuitem">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                       stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                    <polyline points="10 17 15 12 10 7"/>
                    <line x1="15" y1="12" x2="3" y2="12"/>
                  </svg>
                  Login
                </a>
                <a href="${root}signup.html" class="bb-dropdown-item" role="menuitem">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                       stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <line x1="19" y1="8" x2="19" y2="14"/>
                    <line x1="22" y1="11" x2="16" y2="11"/>
                  </svg>
                  Sign Up
                </a>
              </div>
            </div>

            <!-- E. Hamburger (mobile only) -->
            <button class="bb-hamburger" id="bbHamburger"
                    aria-label="Toggle navigation menu"
                    aria-expanded="false" type="button">
              <span></span><span></span><span></span>
            </button>

          </div><!-- /.bb-nav-actions -->

        </div><!-- /.bb-nav-inner -->
      </nav>

      <!-- Mobile slide-in menu -->
      <div class="bb-mobile-menu" id="bbMobileMenu" aria-hidden="true" role="dialog" aria-label="Navigation menu">
        <!-- Mobile close button -->
        <button class="bb-mobile-close" id="bbMobileClose" aria-label="Close menu" type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
               stroke-linecap="round" aria-hidden="true">
            <line x1="18" y1="6"  x2="6"  y2="18"/>
            <line x1="6"  y1="6"  x2="18" y2="18"/>
          </svg>
        </button>

        <!-- Mobile brand -->
        <div class="bb-mobile-brand">
          <img src="${root}assets/images/bubble-brew-logo.svg" alt="" class="bb-mobile-brand-icon">
          <div>
            <span class="bb-mobile-brand-name">Bubble &amp; Brew</span>
            <span class="bb-mobile-brand-tag">Artisanal Tea Room</span>
          </div>
        </div>

        <!-- Mobile nav links -->
        <ul class="bb-mobile-links-list" role="list">
          ${mobileNavLinks}
        </ul>

        <!-- Mobile divider -->
        <div class="bb-mobile-divider"></div>

        <!-- Mobile account links -->
        <ul class="bb-mobile-links-list bb-mobile-account" role="list">
          <li>
            <a href="${root}login.html"  class="bb-mobile-link bb-mobile-account-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                   stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10 17 15 12 10 7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
              Login
            </a>
          </li>
          <li>
            <a href="${root}signup.html" class="bb-mobile-link bb-mobile-account-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                   stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <line x1="19" y1="8" x2="19" y2="14"/>
                <line x1="22" y1="11" x2="16" y2="11"/>
              </svg>
              Sign Up
            </a>
          </li>
        </ul>

        <!-- Mobile bottom controls -->
        <div class="bb-mobile-controls">
          <button class="bb-mobile-ctrl-btn" id="bbMobileDirToggle"
                  aria-label="Toggle text direction" type="button">
            <span id="bbMobileDirLabel">LTR</span>
            <small>Direction</small>
          </button>
          <button class="bb-mobile-ctrl-btn" id="bbMobileThemeToggle"
                  aria-label="Toggle theme" type="button">
            <span id="bbMobileThemeLabel">Light</span>
            <small>Theme</small>
          </button>
        </div>
      </div>

      <!-- Mobile backdrop -->
      <div class="bb-mobile-backdrop" id="bbMobileBackdrop" aria-hidden="true"></div>
    `;
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     THEME MANAGER  (light / dark)
     ═══════════════════════════════════════════════════════════════════════════ */
  const THEME_KEY = 'bb-theme';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    /* Sync desktop button */
    const btn   = document.getElementById('bbThemeToggle');
    const mBtn  = document.getElementById('bbMobileThemeToggle');
    const label = document.getElementById('bbMobileThemeLabel');
    if (btn)   btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    if (btn)   btn.classList.toggle('dark-active', theme === 'dark');
    if (label) label.textContent = theme === 'dark' ? 'Dark' : 'Light';
    if (mBtn)  mBtn.classList.toggle('dark-active', theme === 'dark');
  }

  function getSavedTheme() {
    return localStorage.getItem(THEME_KEY) || 'light';
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(current === 'light' ? 'dark' : 'light');
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     DIRECTION MANAGER  (LTR / RTL)
     ═══════════════════════════════════════════════════════════════════════════ */
  const DIR_KEY = 'bb-dir';

  function applyDir(dir) {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', document.documentElement.getAttribute('lang') || 'en');
    localStorage.setItem(DIR_KEY, dir);

    /* Sync labels */
    const label  = document.getElementById('bbDirLabel');
    const mLabel = document.getElementById('bbMobileDirLabel');
    const btn    = document.getElementById('bbDirToggle');
    const mBtn   = document.getElementById('bbMobileDirToggle');
    if (label)  label.textContent  = dir.toUpperCase();
    if (mLabel) mLabel.textContent = dir.toUpperCase();
    if (btn)    btn.classList.toggle('rtl-active', dir === 'rtl');
    if (mBtn)   mBtn.classList.toggle('rtl-active', dir === 'rtl');
  }

  function getSavedDir() {
    return localStorage.getItem(DIR_KEY) || 'ltr';
  }

  function toggleDir() {
    const current = document.documentElement.getAttribute('dir') || 'ltr';
    applyDir(current === 'ltr' ? 'rtl' : 'ltr');
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     PROFILE DROPDOWN
     ═══════════════════════════════════════════════════════════════════════════ */
  function initProfileDropdown() {
    const wrap    = document.getElementById('bbProfileWrap');
    const btn     = document.getElementById('bbProfileBtn');
    const dropdown= document.getElementById('bbProfileDropdown');
    if (!wrap || !btn || !dropdown) return;

    function openDropdown() {
      dropdown.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      dropdown.setAttribute('aria-hidden', 'false');
    }
    function closeDropdown() {
      dropdown.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      dropdown.setAttribute('aria-hidden', 'true');
    }

    btn.addEventListener('click', e => {
      e.stopPropagation();
      dropdown.classList.contains('open') ? closeDropdown() : openDropdown();
    });

    /* Close on clicking outside */
    document.addEventListener('click', e => {
      if (!wrap.contains(e.target)) closeDropdown();
    });

    /* Close on item click */
    dropdown.querySelectorAll('.bb-dropdown-item').forEach(item => {
      item.addEventListener('click', closeDropdown);
    });

    /* Close on Escape */
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeDropdown();
    });
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     MOBILE MENU
     ═══════════════════════════════════════════════════════════════════════════ */
  function initMobileMenu() {
    const hamburger  = document.getElementById('bbHamburger');
    const closeBtn   = document.getElementById('bbMobileClose');
    const mobileMenu = document.getElementById('bbMobileMenu');
    const backdrop   = document.getElementById('bbMobileBackdrop');
    if (!hamburger || !mobileMenu) return;

    function openMenu() {
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      mobileMenu.classList.add('open');
      mobileMenu.setAttribute('aria-hidden', 'false');
      if (backdrop) { backdrop.classList.add('open'); }
      document.body.classList.add('bb-menu-open');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      if (backdrop) { backdrop.classList.remove('open'); }
      document.body.classList.remove('bb-menu-open');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () =>
      mobileMenu.classList.contains('open') ? closeMenu() : openMenu()
    );
    if (closeBtn)  closeBtn.addEventListener('click', closeMenu);
    if (backdrop)  backdrop.addEventListener('click', closeMenu);

    /* Close on nav link click with smooth redirect */
    mobileMenu.querySelectorAll('.bb-mobile-link').forEach(link => {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        closeMenu();
        if (href && !href.startsWith('#') && href !== 'javascript:void(0)') {
          // If the link points to a page, ensure the browser navigates smoothly
          if (window.location.pathname.indexOf(href) === -1) {
            e.preventDefault();
            window.location.href = href;
          }
        }
      });
    });

    /* Escape key */
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 991 && mobileMenu.classList.contains('open')) {
        closeMenu();
      }
    }, { passive: true });
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     WIRE-UP ALL CONTROLS
     ═══════════════════════════════════════════════════════════════════════════ */
  function initNavbar() {
    /* ── Direction toggle ── */
    const dirBtn  = document.getElementById('bbDirToggle');
    const mDirBtn = document.getElementById('bbMobileDirToggle');
    if (dirBtn)  dirBtn.addEventListener('click',  toggleDir);
    if (mDirBtn) mDirBtn.addEventListener('click', toggleDir);

    /* ── Theme toggle ── */
    const themeBtn  = document.getElementById('bbThemeToggle');
    const mThemeBtn = document.getElementById('bbMobileThemeToggle');
    if (themeBtn)  themeBtn.addEventListener('click',  toggleTheme);
    if (mThemeBtn) mThemeBtn.addEventListener('click', toggleTheme);

    /* ── Profile dropdown ── */
    initProfileDropdown();

    /* ── Mobile menu ── */
    initMobileMenu();

    /* ── Cart badge bridge ── */
    window.bbUpdateCartBadge = function (count) {
      const badge = document.getElementById('bbCartBadge');
      if (!badge) return;
      badge.textContent = count;
      badge.style.transform = 'scale(1.4)';
      setTimeout(() => { badge.style.transform = 'scale(1)'; }, 220);
    };

    /* ── Wire cart button and drawer across pages ── */
    const cartBtn      = document.getElementById('bbCartBtn');
    const cartDrawer   = document.getElementById('cartDrawer');
    const cartOverlay  = document.getElementById('cartDrawerOverlay');
    const cartCloseBtn = document.getElementById('cartDrawerClose');

    function openCart() {
      if (cartOverlay) cartOverlay.classList.add('open');
      if (cartDrawer)  cartDrawer.classList.add('open');
    }
    function closeCart() {
      if (cartOverlay) cartOverlay.classList.remove('open');
      if (cartDrawer)  cartDrawer.classList.remove('open');
    }

    if (cartBtn) cartBtn.addEventListener('click', openCart);
    if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
    if (cartOverlay)  cartOverlay.addEventListener('click', closeCart);

    /* ── Apply persisted preferences ── */
    applyTheme(getSavedTheme());
    applyDir(getSavedDir());

    /* ── Scroll-aware solid background ──────────────────────────────────── *
     * When the user scrolls past the hero (≈ 85vh), the navbar switches from
     * fully transparent to a rich caramel-brown so text stays readable over
     * light cream/white section backgrounds.
     * -------------------------------------------------------------------- */
    const navbar = document.querySelector('.bb-navbar');
    if (navbar) {
      function handleNavbarScroll() {
        const threshold = window.innerHeight * 0.75;
        if (window.scrollY > threshold) {
          navbar.classList.add('bb-navbar--solid');
        } else {
          navbar.classList.remove('bb-navbar--solid');
        }
      }
      window.addEventListener('scroll', handleNavbarScroll, { passive: true });
      handleNavbarScroll(); // run once on load
    }
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     MOUNT
     ═══════════════════════════════════════════════════════════════════════════ */
  function mount() {
    const container = document.getElementById('navbar-container');
    if (!container) return;

    const root       = getRootPrefix();
    const activePage = getActivePage();

    let favicon = document.querySelector('link[rel~="icon"]');
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      document.head.appendChild(favicon);
    }
    favicon.type = 'image/svg+xml';
    favicon.href = `${root}assets/images/bubble-brew-logo.svg`;

    container.innerHTML = buildNavbar(root, activePage);
    initNavbar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

})();
