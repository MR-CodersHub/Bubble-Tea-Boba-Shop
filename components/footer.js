/**
 * BUBBLE & BREW – Reusable Footer Component  v2.1
 * ================================================
 * 4-column café footer with social links, contact details,
 * legal notices, and responsive adaptation.
 */

(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════════════════════════════
     PATH HELPER — Works flawlessly on file://, localhost & live servers
     ═══════════════════════════════════════════════════════════════════════════ */
  function getRootPrefix() {
    const script = document.querySelector('script[src*="footer.js"]');
    if (script) {
      const src = script.getAttribute('src') || '';
      const idx = src.indexOf('components/footer.js');
      if (idx !== -1) {
        return src.substring(0, idx);
      }
    }
    return '';
  }

  /* ─── SVG Assets ───────────────────────────────────────────────────────── */
  const LOGO_SVG = `
    <svg class="bb-ft-logo-svg" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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

  const SOCIAL_ICONS = {
    instagram: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
    facebook:  `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z"/></svg>`,
    linkedin:  `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.97 0-1.75-.79-1.75-1.76s.78-1.75 1.75-1.75c.98 0 1.76.78 1.76 1.75s-.78 1.76-1.76 1.76m1.39 9.74v-8.37H5.07v8.37h2.78z"/></svg>`,
    twitter:   `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  };

  const CONTACT_ICONS = {
    phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    email: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    location: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`
  };

  /* ─── Build HTML ───────────────────────────────────────────────────────── */
  function buildFooter(root) {
    return `
      <footer class="bb-footer" role="contentinfo">

        <!-- Decorative top accent border line -->
        <div class="bb-footer-top-line" aria-hidden="true"></div>

        <!-- Main columns container -->
        <div class="bb-footer-main">

          <!-- Column 1 – Brand Identity -->
          <div class="bb-ft-brand-wrap">
            <a href="${root}index.html" class="bb-ft-logo-row" aria-label="Bubble &amp; Brew Home">
              ${LOGO_SVG}
              <div class="bb-ft-brand-text">
                <span class="bb-ft-brand-name">Bubble &amp; Brew</span>
                <span class="bb-ft-brand-tagline">Artisanal Tea Room</span>
              </div>
            </a>
            <p class="bb-ft-desc">
              Every cup brings a little moment of happiness. Freshly brewed tea, delightful pearls and flavours made with love.
            </p>
            <div class="bb-ft-socials" aria-label="Social media profiles">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                 class="bb-ft-social-link" aria-label="Follow us on Instagram">${SOCIAL_ICONS.instagram}</a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                 class="bb-ft-social-link" aria-label="Follow us on Facebook">${SOCIAL_ICONS.facebook}</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                 class="bb-ft-social-link" aria-label="Follow us on LinkedIn">${SOCIAL_ICONS.linkedin}</a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer"
                 class="bb-ft-social-link" aria-label="Follow us on X / Twitter">${SOCIAL_ICONS.twitter}</a>
            </div>
          </div>

          <!-- Column 2 – Explore -->
          <div class="bb-ft-col">
            <h3 class="bb-ft-col-title">Explore</h3>
            <ul class="bb-ft-links">
              <li><a href="${root}index.html">Home</a></li>
              <li><a href="${root}about.html">About Us</a></li>
              <li><a href="${root}flavours.html">Our Flavor</a></li>
              <li><a href="${root}menu.html">Menu</a></li>
              <li><a href="${root}customize.html">Customize</a></li>
            </ul>
          </div>

          <!-- Column 3 – Quick Information -->
          <div class="bb-ft-col">
            <h3 class="bb-ft-col-title">Quick Information</h3>
            <ul class="bb-ft-links">
              <li><a href="${root}contact.html">Contact Us</a></li>
              <li><a href="${root}contact.html#location">Store Location</a></li>
              <li><a href="${root}contact.html#privacy">Privacy Policy</a></li>
              <li><a href="${root}contact.html#terms">Terms &amp; Conditions</a></li>
            </ul>
          </div>

          <!-- Column 4 – Get In Touch -->
          <div class="bb-ft-col bb-ft-contact-col">
            <h3 class="bb-ft-col-title">Get In Touch</h3>
            <ul class="bb-ft-contact-list">
              <li>
                <div class="bb-ft-contact-icon">${CONTACT_ICONS.phone}</div>
                <div class="bb-ft-contact-text">
                  <span class="bb-ft-contact-label">Phone</span>
                  <a href="${typeof BB_SITE_DATA !== 'undefined' ? BB_SITE_DATA.business.phone.tel : 'tel:+919876543210'}" class="bb-ft-contact-val">${typeof BB_SITE_DATA !== 'undefined' ? BB_SITE_DATA.business.phone.display : '+91 98765 43210'}</a>
                </div>
              </li>
              <li>
                <div class="bb-ft-contact-icon">${CONTACT_ICONS.email}</div>
                <div class="bb-ft-contact-text">
                  <span class="bb-ft-contact-label">Email</span>
                  <a href="${typeof BB_SITE_DATA !== 'undefined' ? BB_SITE_DATA.business.email.mailto : 'mailto:hello@bubbleandbrew.com'}" class="bb-ft-contact-val">${typeof BB_SITE_DATA !== 'undefined' ? BB_SITE_DATA.business.email.display : 'hello@bubbleandbrew.com'}</a>
                </div>
              </li>
              <li>
                <div class="bb-ft-contact-icon">${CONTACT_ICONS.location}</div>
                <div class="bb-ft-contact-text">
                  <span class="bb-ft-contact-label">Store Location</span>
                  <span class="bb-ft-contact-val">${typeof BB_SITE_DATA !== 'undefined' ? BB_SITE_DATA.business.address.shortLine : '42 Boba Lane, Chai District, New Delhi'}</span>
                </div>
              </li>
              <li>
                <div class="bb-ft-contact-icon">${CONTACT_ICONS.clock}</div>
                <div class="bb-ft-contact-text">
                  <span class="bb-ft-contact-label">Opening Hours</span>
                  <span class="bb-ft-contact-val">${typeof BB_SITE_DATA !== 'undefined' ? BB_SITE_DATA.business.timings.summary : 'Mon – Sun: 10:00 AM – 10:00 PM'}</span>
                </div>
              </li>
            </ul>
          </div>

        </div><!-- /.bb-footer-main -->

        <!-- Subtle separator line -->
        <div class="bb-footer-divider" aria-hidden="true"></div>

        <!-- Footer bottom bar -->
        <div class="bb-footer-bottom">
          <p class="bb-ft-copy">
            &copy; 2026 <strong>Bubble &amp; Brew</strong>. All Rights Reserved.
          </p>
          <nav class="bb-ft-bottom-links" aria-label="Legal &amp; Policy Links">
            <a href="${root}contact.html#privacy">Privacy Policy</a>
            <span class="bb-ft-dot" aria-hidden="true">&bull;</span>
            <a href="${root}contact.html#terms">Terms &amp; Conditions</a>
          </nav>
        </div>

      </footer>
    `;
  }

  /* ─── Mount ────────────────────────────────────────────────────────────── */
  function mount() {
    const container = document.getElementById('footer-container');
    if (!container) return;

    const root = getRootPrefix();
    container.innerHTML = buildFooter(root);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

})();
