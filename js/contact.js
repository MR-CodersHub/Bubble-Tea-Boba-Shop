/**
 * BUBBLE & BREW – Contact Page JavaScript  v1.0
 * =================================================
 * Sections:
 *  1. CONTACT_CONFIG  — editable business data (address, phone, email, hours, socials)
 *  2. Populate contact info blocks
 *  3. Populate location section
 *  4. Office-hours table with today highlight
 *  5. Social links builder
 *  6. Form validation & submit handler
 *  7. Scroll-reveal (Intersection Observer)
 *  8. Init
 */

'use strict';

/* ═══════════════════════════════════════════════════════════════════════════
   1. CONTACT CONFIGURATION — Edit this object to update all contact details
   ═══════════════════════════════════════════════════════════════════════════ */
const CONTACT_CONFIG = (typeof window !== 'undefined' && window.BB_SITE_DATA && window.BB_SITE_DATA.business) ? {
  businessName: window.BB_SITE_DATA.business.name || 'BUBBLE & BREW',
  address: window.BB_SITE_DATA.business.address || {
    street: '42 Boba Lane, Chai District',
    city: 'Connaught Place',
    state: 'New Delhi 110001',
    country: 'India',
    fullLine: '42 Boba Lane, Chai District, Connaught Place, New Delhi 110001, India',
    mapsUrl: 'https://maps.google.com/?q=42+Boba+Lane+Connaught+Place+New+Delhi'
  },
  phone: window.BB_SITE_DATA.business.phone || {
    display: '+91 98765 43210',
    tel: 'tel:+919876543210',
    hours: 'Available Mon–Sun: 10:00 AM – 10:00 PM'
  },
  email: window.BB_SITE_DATA.business.email || {
    display: 'hello@bubbleandbrew.com',
    mailto: 'mailto:hello@bubbleandbrew.com',
    desc: 'We reply within 24 hours — no auto-replies, just real humans.'
  },
  socials: [
    {
      label: 'Instagram',
      href: (window.BB_SITE_DATA.business.socials && window.BB_SITE_DATA.business.socials.instagram) ? window.BB_SITE_DATA.business.socials.instagram.url : 'https://instagram.com',
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
    },
    {
      label: 'Facebook',
      href: (window.BB_SITE_DATA.business.socials && window.BB_SITE_DATA.business.socials.facebook) ? window.BB_SITE_DATA.business.socials.facebook.url : 'https://facebook.com',
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
    },
    {
      label: 'Pinterest',
      href: (window.BB_SITE_DATA.business.socials && window.BB_SITE_DATA.business.socials.pinterest) ? window.BB_SITE_DATA.business.socials.pinterest.url : 'https://pinterest.com',
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.22-5.17 1.22-5.17s-.31-.62-.31-1.55c0-1.45.84-2.53 1.89-2.53.89 0 1.32.67 1.32 1.47 0 .9-.57 2.24-.87 3.48-.25 1.04.52 1.88 1.54 1.88 1.84 0 3.09-2.36 3.09-5.16 0-2.14-1.44-3.63-3.5-3.63-2.39 0-3.79 1.79-3.79 3.65 0 .72.28 1.5.62 1.92.07.08.08.16.06.24-.06.25-.21.9-.24 1.02-.04.16-.13.2-.3.12-1.11-.52-1.81-2.14-1.81-3.44 0-2.79 2.03-5.37 5.85-5.37 3.07 0 5.46 2.19 5.46 5.1 0 3.04-1.91 5.49-4.56 5.49-.89 0-1.73-.46-2.02-1.01l-.54 2.03c-.2.75-.73 1.69-1.09 2.26.82.25 1.69.39 2.59.39 5.52 0 10-4.48 10-10S17.52 2 12 2z"/></svg>`,
    },
    {
      label: 'YouTube',
      href: (window.BB_SITE_DATA.business.socials && window.BB_SITE_DATA.business.socials.youtube) ? window.BB_SITE_DATA.business.socials.youtube.url : 'https://youtube.com',
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>`,
    },
  ],
  hours: (window.BB_SITE_DATA.business.timings && window.BB_SITE_DATA.business.timings.schedule) ? window.BB_SITE_DATA.business.timings.schedule : [
    { day: 'Monday',    open: '10:00 AM', close: '10:00 PM' },
    { day: 'Tuesday',   open: '10:00 AM', close: '10:00 PM' },
    { day: 'Wednesday', open: '10:00 AM', close: '10:00 PM' },
    { day: 'Thursday',  open: '10:00 AM', close: '10:00 PM' },
    { day: 'Friday',    open: '10:00 AM', close: '10:00 PM' },
    { day: 'Saturday',  open: '10:00 AM', close: '10:00 PM' },
    { day: 'Sunday',    open: '10:00 AM', close: '10:00 PM' },
  ],
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.980648710892!2d77.2177!3d28.6315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjhCsDM3JzUzLjQiTiA3N8KwMTMnMDMuNyJF!5e0!3m2!1sen!2sin!4v1600000000000',
} : {
  businessName: 'BUBBLE & BREW',
  address: {
    street:   '42 Boba Lane, Chai District',
    city:     'Connaught Place, New Delhi',
    state:    'Delhi 110001',
    country:  'India',
    fullLine: '42 Boba Lane, Chai District, Connaught Place, New Delhi 110001, India',
    mapsUrl:  'https://maps.google.com/?q=42+Boba+Lane+Connaught+Place+New+Delhi',
  },
  phone: {
    display: '+91 98765 43210',
    tel:     'tel:+919876543210',
    hours:   'Available Mon–Sun: 10:00 AM – 10:00 PM',
  },
  email: {
    display: 'hello@bubbleandbrew.com',
    mailto:  'mailto:hello@bubbleandbrew.com',
    desc:    'We reply within 24 hours — no auto-replies, just real humans.',
  },
  socials: [
    {
      label: 'Instagram',
      href: 'https://instagram.com',
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
    },
    {
      label: 'Facebook',
      href: 'https://facebook.com',
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
    },
    {
      label: 'Pinterest',
      href: 'https://pinterest.com',
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.22-5.17 1.22-5.17s-.31-.62-.31-1.55c0-1.45.84-2.53 1.89-2.53.89 0 1.32.67 1.32 1.47 0 .9-.57 2.24-.87 3.48-.25 1.04.52 1.88 1.54 1.88 1.84 0 3.09-2.36 3.09-5.16 0-2.14-1.44-3.63-3.5-3.63-2.39 0-3.79 1.79-3.79 3.65 0 .72.28 1.5.62 1.92.07.08.08.16.06.24-.06.25-.21.9-.24 1.02-.04.16-.13.2-.3.12-1.11-.52-1.81-2.14-1.81-3.44 0-2.79 2.03-5.37 5.85-5.37 3.07 0 5.46 2.19 5.46 5.1 0 3.04-1.91 5.49-4.56 5.49-.89 0-1.73-.46-2.02-1.01l-.54 2.03c-.2.75-.73 1.69-1.09 2.26.82.25 1.69.39 2.59.39 5.52 0 10-4.48 10-10S17.52 2 12 2z"/></svg>`,
    },
    {
      label: 'YouTube',
      href: 'https://youtube.com',
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>`,
    },
  ],
  hours: [
    { day: 'Monday',    open: '10:00 AM', close: '10:00 PM' },
    { day: 'Tuesday',   open: '10:00 AM', close: '10:00 PM' },
    { day: 'Wednesday', open: '10:00 AM', close: '10:00 PM' },
    { day: 'Thursday',  open: '10:00 AM', close: '10:00 PM' },
    { day: 'Friday',    open: '10:00 AM', close: '10:00 PM' },
    { day: 'Saturday',  open: '10:00 AM', close: '10:00 PM' },
    { day: 'Sunday',    open: '10:00 AM', close: '10:00 PM' },
  ],
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.980648710892!2d77.2177!3d28.6315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjhCsDM3JzUzLjQiTiA3N8KwMTMnMDMuNyJF!5e0!3m2!1sen!2sin!4v1600000000000',
};


/* ═══════════════════════════════════════════════════════════════════════════
   2. POPULATE CONTACT INFO CARDS
   ═══════════════════════════════════════════════════════════════════════════ */
function populateContactInfo() {
  // Address card
  const addrTitle = document.getElementById('contactAddress');
  const addrDesc  = document.getElementById('contactAddressDesc');
  if (addrTitle) addrTitle.textContent = CONTACT_CONFIG.address.street;
  if (addrDesc)  addrDesc.textContent  = `${CONTACT_CONFIG.address.city}, ${CONTACT_CONFIG.address.state}`;

  // Phone card
  const phoneTitle = document.getElementById('contactPhone');
  const phoneHours = document.getElementById('contactPhoneHours');
  if (phoneTitle) {
    const a = document.createElement('a');
    a.href = CONTACT_CONFIG.phone.tel;
    a.textContent = CONTACT_CONFIG.phone.display;
    a.style.color = 'inherit';
    a.style.textDecoration = 'none';
    phoneTitle.appendChild(a);
  }
  if (phoneHours) phoneHours.textContent = CONTACT_CONFIG.phone.hours;

  // Email card
  const emailTitle = document.getElementById('contactEmail');
  const emailDesc  = document.getElementById('contactEmailDesc');
  if (emailTitle) {
    const a = document.createElement('a');
    a.href = CONTACT_CONFIG.email.mailto;
    a.textContent = CONTACT_CONFIG.email.display;
    a.style.color = 'inherit';
    a.style.textDecoration = 'none';
    emailTitle.appendChild(a);
  }
  if (emailDesc) emailDesc.textContent = CONTACT_CONFIG.email.desc;
}


/* ═══════════════════════════════════════════════════════════════════════════
   3. POPULATE LOCATION SECTION
   ═══════════════════════════════════════════════════════════════════════════ */
function populateLocation() {
  const locAddress = document.getElementById('locAddress');
  const locPhone   = document.getElementById('locPhone');
  if (locAddress) locAddress.textContent = CONTACT_CONFIG.address.fullLine;
  if (locPhone)   locPhone.textContent   = CONTACT_CONFIG.phone.display;

  // Directions button href
  const dirBtn = document.getElementById('contactDirectionsBtn');
  if (dirBtn) dirBtn.href = CONTACT_CONFIG.address.mapsUrl;

  // Map iframe
  const mapIframe = document.getElementById('contactMapIframe');
  if (mapIframe && CONTACT_CONFIG.mapEmbedUrl) {
    mapIframe.src = CONTACT_CONFIG.mapEmbedUrl;
  }
}


/* ═══════════════════════════════════════════════════════════════════════════
   4. OFFICE HOURS TABLE — highlights today's row
   ═══════════════════════════════════════════════════════════════════════════ */
function buildHoursTable() {
  const tbody = document.querySelector('#contactHoursTable tbody');
  if (!tbody) return;

  // JS: 0=Sun, 1=Mon … 6=Sat; config array: index 0=Mon … 6=Sun
  const jsDay = new Date().getDay(); // 0=Sun
  // Map JS day → config index (config[0]=Mon, config[6]=Sun)
  const configIndex = jsDay === 0 ? 6 : jsDay - 1;

  CONTACT_CONFIG.hours.forEach((entry, idx) => {
    const tr = document.createElement('tr');
    if (idx === configIndex) tr.classList.add('contact-hours-row-today');

    const dayTd = document.createElement('td');
    dayTd.textContent = entry.day;

    const hoursTd = document.createElement('td');
    hoursTd.textContent = `${entry.open} – ${entry.close}`;

    tr.appendChild(dayTd);
    tr.appendChild(hoursTd);
    tbody.appendChild(tr);
  });
}


/* ═══════════════════════════════════════════════════════════════════════════
   5. SOCIAL LINKS
   ═══════════════════════════════════════════════════════════════════════════ */
function buildSocialLinks() {
  const container = document.getElementById('contactSocialLinks');
  if (!container) return;

  CONTACT_CONFIG.socials.forEach(social => {
    const a = document.createElement('a');
    a.href        = social.href;
    a.className   = 'contact-social-link';
    a.target      = '_blank';
    a.rel         = 'noopener noreferrer';
    a.setAttribute('aria-label', `Follow us on ${social.label}`);
    a.innerHTML   = `${social.svg}<span>${social.label}</span>`;
    container.appendChild(a);
  });
}


/* ═══════════════════════════════════════════════════════════════════════════
   6. FORM VALIDATION & SUBMIT
   ═══════════════════════════════════════════════════════════════════════════ */
const VALIDATORS = {
  name:    { required: true,  minLen: 2,  pattern: null,                   message: 'Please enter your name (at least 2 characters).' },
  email:   { required: true,  minLen: 0,  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email address.' },
  phone:   { required: false, minLen: 0,  pattern: /^[\d\s\+\-\(\)]{7,16}$/,     message: 'Please enter a valid phone number.' },
  subject: { required: true,  minLen: 0,  pattern: null,                   message: 'Please select a subject.' },
  message: { required: true,  minLen: 10, pattern: null,                   message: 'Please enter a message (at least 10 characters).' },
};

function setFieldError(fieldId, errorId, msg) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  if (!field || !error) return;
  if (msg) {
    field.classList.add('is-invalid');
    error.textContent = msg;
  } else {
    field.classList.remove('is-invalid');
    error.textContent = '';
  }
}

function validateField(fieldId, errorId, rules) {
  const field = document.getElementById(fieldId);
  if (!field) return true;
  const val = field.value.trim();

  if (rules.required && val === '') {
    setFieldError(fieldId, errorId, rules.message);
    return false;
  }
  if (rules.required && rules.minLen > 0 && val.length < rules.minLen) {
    setFieldError(fieldId, errorId, rules.message);
    return false;
  }
  if (!rules.required && val === '') {
    setFieldError(fieldId, errorId, '');
    return true; // optional empty is fine
  }
  if (rules.pattern && !rules.pattern.test(val)) {
    setFieldError(fieldId, errorId, rules.message);
    return false;
  }
  setFieldError(fieldId, errorId, '');
  return true;
}

function validateAll() {
  const results = [
    validateField('cfName',    'cfNameError',    VALIDATORS.name),
    validateField('cfEmail',   'cfEmailError',   VALIDATORS.email),
    validateField('cfPhone',   'cfPhoneError',   VALIDATORS.phone),
    validateField('cfSubject', 'cfSubjectError', VALIDATORS.subject),
    validateField('cfMessage', 'cfMessageError', VALIDATORS.message),
  ];
  return results.every(Boolean);
}

function initForm() {
  const form       = document.getElementById('contactFormEl');
  const successDiv = document.getElementById('contactSuccessState');
  const resetBtn   = document.getElementById('contactResetBtn');
  const submitBtn  = document.getElementById('contactSubmitBtn');
  const submitLabel = document.getElementById('contactSubmitLabel');

  if (!form) return;

  // Real-time validation on blur
  ['cfName','cfEmail','cfPhone','cfSubject','cfMessage'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('blur', () => {
      const errorId = id + 'Error';
      const rules   = VALIDATORS[id.replace('cf','').toLowerCase()];
      if (rules) validateField(id, errorId, rules);
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validateAll()) {
      // Scroll to first error
      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Show loading state
    if (submitBtn)  submitBtn.disabled = true;
    if (submitLabel) submitLabel.textContent = 'Sending…';

    // Simulate async (front-end only — no backend)
    setTimeout(() => {
      form.hidden = true;
      if (successDiv) successDiv.hidden = false;
      if (submitBtn)  submitBtn.disabled = false;
      if (submitLabel) submitLabel.textContent = 'Send Message';
    }, 900);
  });

  // Reset / send another
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      // Clear all error states
      ['cfName','cfEmail','cfPhone','cfSubject','cfMessage'].forEach(id => {
        setFieldError(id, id + 'Error', '');
      });
      if (successDiv) successDiv.hidden = true;
      form.hidden = false;
    });
  }
}


/* ═══════════════════════════════════════════════════════════════════════════
   7. SCROLL-REVEAL (Intersection Observer)
   ═══════════════════════════════════════════════════════════════════════════ */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.hs-reveal');
  if (!reveals.length) return;

  // Immediately reveal elements already inside or near the viewport
  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 150) {
      el.classList.add('is-visible');
    }
  });

  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    reveals.forEach(el => el.classList.add('is-visible'));
    return;
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px 60px 0px' });

    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }
}


/* ═══════════════════════════════════════════════════════════════════════════
   8. INIT — run after DOM ready
   ═══════════════════════════════════════════════════════════════════════════ */
function init() {
  populateContactInfo();
  populateLocation();
  buildHoursTable();
  buildSocialLinks();
  initForm();
  initScrollReveal();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
