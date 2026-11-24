/**
 * BUBBLE & BREW – Authentication JavaScript (Login & Signup)
 * ==========================================================
 * Handles:
 *  1. Theme & Direction sync with main site localStorage keys ('bb-theme', 'bb-dir')
 *  2. Password show/hide visibility toggles with accessible SVG icons
 *  3. Form validation (login & signup) with real-time feedback
 *  4. Remember Me persistence
 *  5. Forgot Password modal interaction
 *  6. Social login button placeholders
 *  7. Accessible keyboard & screen reader states
 */

'use strict';

(function () {
  /* ═════════════════════════════════════════════════════════════════════════
     1. THEME & DIRECTION MANAGERS (Syncs with components/navbar.js)
     ═════════════════════════════════════════════════════════════════════════ */
  const THEME_KEY = 'bb-theme';
  const DIR_KEY   = 'bb-dir';

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const themeToggleBtn = document.getElementById('authThemeToggle');
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-label', savedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      themeToggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem(THEME_KEY, next);
        themeToggleBtn.setAttribute('aria-label', next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      });
    }
  }

  function initDirection() {
    const savedDir = localStorage.getItem(DIR_KEY) || 'ltr';
    document.documentElement.setAttribute('dir', savedDir);

    const dirToggleBtn = document.getElementById('authDirToggle');
    const dirLabel     = document.getElementById('authDirLabel');
    if (dirLabel) dirLabel.textContent = savedDir.toUpperCase();

    if (dirToggleBtn) {
      dirToggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('dir') || 'ltr';
        const next = current === 'rtl' ? 'ltr' : 'rtl';
        document.documentElement.setAttribute('dir', next);
        localStorage.setItem(DIR_KEY, next);
        if (dirLabel) dirLabel.textContent = next.toUpperCase();
      });
    }
  }

  /* ═════════════════════════════════════════════════════════════════════════
     2. PASSWORD SHOW / HIDE TOGGLE
     ═════════════════════════════════════════════════════════════════════════ */
  const EYE_OPEN_SVG = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>`;

  const EYE_OFF_SVG = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>`;

  function initPasswordToggles() {
    const toggleBtns = document.querySelectorAll('.auth-password-toggle');
    toggleBtns.forEach(btn => {
      btn.innerHTML = EYE_OPEN_SVG;
      btn.setAttribute('aria-label', 'Show password');
      btn.setAttribute('aria-pressed', 'false');

      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const input = targetId ? document.getElementById(targetId) : btn.parentElement.querySelector('input');
        if (!input) return;

        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        btn.innerHTML = isPassword ? EYE_OFF_SVG : EYE_OPEN_SVG;
        btn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
        btn.setAttribute('aria-pressed', isPassword ? 'true' : 'false');
      });
    });
  }

  /* ═════════════════════════════════════════════════════════════════════════
     3. FIELD VALIDATION UTILITIES
     ═════════════════════════════════════════════════════════════════════════ */
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PHONE_REGEX = /^[\d\s\-\+\(\)]{7,15}$/;

  function setFieldError(fieldId, errorId, message) {
    const input = document.getElementById(fieldId);
    const errorEl = document.getElementById(errorId);
    if (!input || !errorEl) return;

    if (message) {
      input.classList.add('is-invalid');
      input.classList.remove('is-valid');
      input.setAttribute('aria-invalid', 'true');
      errorEl.textContent = message;
    } else {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      input.setAttribute('aria-invalid', 'false');
      errorEl.textContent = '';
    }
  }

  function clearFieldError(fieldId, errorId) {
    const input = document.getElementById(fieldId);
    const errorEl = document.getElementById(errorId);
    if (!input || !errorEl) return;
    input.classList.remove('is-invalid');
    input.classList.remove('is-valid');
    input.removeAttribute('aria-invalid');
    errorEl.textContent = '';
  }

  /* ═════════════════════════════════════════════════════════════════════════
     4. LOGIN FORM HANDLER
     ═════════════════════════════════════════════════════════════════════════ */
  function initLoginForm() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    const emailInput    = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    const rememberInput = document.getElementById('loginRemember');
    const alertBox      = document.getElementById('authAlertBox');
    const submitBtn     = document.getElementById('loginSubmitBtn');

    // Auto-fill remembered email if saved
    const rememberedEmail = localStorage.getItem('bb-remembered-email');
    if (rememberedEmail && emailInput) {
      emailInput.value = rememberedEmail;
      if (rememberInput) rememberInput.checked = true;
    }

    // Real-time validation on input/blur
    if (emailInput) {
      emailInput.addEventListener('blur', () => {
        const val = emailInput.value.trim();
        if (!val) {
          setFieldError('loginEmail', 'loginEmailError', 'Please enter your email address.');
        } else if (!EMAIL_REGEX.test(val)) {
          setFieldError('loginEmail', 'loginEmailError', 'Please enter a valid email address.');
        } else {
          setFieldError('loginEmail', 'loginEmailError', '');
        }
      });
      emailInput.addEventListener('input', () => {
        if (emailInput.classList.contains('is-invalid')) {
          const val = emailInput.value.trim();
          if (EMAIL_REGEX.test(val)) setFieldError('loginEmail', 'loginEmailError', '');
        }
      });
    }

    if (passwordInput) {
      passwordInput.addEventListener('blur', () => {
        const val = passwordInput.value;
        if (!val) {
          setFieldError('loginPassword', 'loginPasswordError', 'Please enter your password.');
        } else if (val.length < 6) {
          setFieldError('loginPassword', 'loginPasswordError', 'Password must be at least 6 characters.');
        } else {
          setFieldError('loginPassword', 'loginPasswordError', '');
        }
      });
      passwordInput.addEventListener('input', () => {
        if (passwordInput.classList.contains('is-invalid') && passwordInput.value.length >= 6) {
          setFieldError('loginPassword', 'loginPasswordError', '');
        }
      });
    }

    // Submit handler
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const emailVal = emailInput.value.trim();
      const passVal  = passwordInput.value;

      if (!emailVal) {
        setFieldError('loginEmail', 'loginEmailError', 'Please enter your email address.');
        isValid = false;
      } else if (!EMAIL_REGEX.test(emailVal)) {
        setFieldError('loginEmail', 'loginEmailError', 'Please enter a valid email address.');
        isValid = false;
      } else {
        setFieldError('loginEmail', 'loginEmailError', '');
      }

      if (!passVal) {
        setFieldError('loginPassword', 'loginPasswordError', 'Please enter your password.');
        isValid = false;
      } else if (passVal.length < 6) {
        setFieldError('loginPassword', 'loginPasswordError', 'Password must be at least 6 characters.');
        isValid = false;
      } else {
        setFieldError('loginPassword', 'loginPasswordError', '');
      }

      if (!isValid) {
        const firstError = form.querySelector('.is-invalid');
        if (firstError) firstError.focus();
        return;
      }

      // Handle Remember Me
      if (rememberInput && rememberInput.checked) {
        localStorage.setItem('bb-remembered-email', emailVal);
      } else {
        localStorage.removeItem('bb-remembered-email');
      }

      // UI Loading & Simulated verification (No false backend claim)
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="auth-spinner" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" style="animation: spin 0.8s linear infinite;">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
            <path d="M12 2a10 10 0 0 1 10 10"/>
          </svg>
          <span>Logging in...</span>
        `;
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span>Login to Your Account</span>`;
        }

        if (alertBox) {
          alertBox.className = 'auth-alert-box auth-alert-success';
          alertBox.hidden = false;
          alertBox.innerHTML = `
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <div>
              <strong>Welcome back, ${escapeHtml(emailVal.split('@')[0])}!</strong>
              <div style="font-size: 0.84rem; margin-top: 2px;">
                Frontend demo verified successfully. (Note: A real backend server is not connected.)
              </div>
            </div>
          `;
          alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 900);
    });
  }

  /* ═════════════════════════════════════════════════════════════════════════
     5. SIGNUP FORM HANDLER
     ═════════════════════════════════════════════════════════════════════════ */
  function initSignupForm() {
    const form = document.getElementById('signupForm');
    if (!form) return;

    const nameInput    = document.getElementById('signupName');
    const emailInput   = document.getElementById('signupEmail');
    const phoneInput   = document.getElementById('signupPhone');
    const countryCode  = document.getElementById('signupCountryCode');
    const passInput    = document.getElementById('signupPassword');
    const confirmInput = document.getElementById('signupConfirmPassword');
    const termsInput   = document.getElementById('signupTerms');
    const alertBox     = document.getElementById('authAlertBox');
    const submitBtn    = document.getElementById('signupSubmitBtn');

    // Real-time validations
    if (nameInput) {
      nameInput.addEventListener('blur', () => {
        const val = nameInput.value.trim();
        if (!val) {
          setFieldError('signupName', 'signupNameError', 'Please enter your full name.');
        } else if (val.length < 2) {
          setFieldError('signupName', 'signupNameError', 'Name must be at least 2 characters.');
        } else {
          setFieldError('signupName', 'signupNameError', '');
        }
      });
    }

    if (emailInput) {
      emailInput.addEventListener('blur', () => {
        const val = emailInput.value.trim();
        if (!val) {
          setFieldError('signupEmail', 'signupEmailError', 'Please enter your email address.');
        } else if (!EMAIL_REGEX.test(val)) {
          setFieldError('signupEmail', 'signupEmailError', 'Please enter a valid email address.');
        } else {
          setFieldError('signupEmail', 'signupEmailError', '');
        }
      });
    }

    if (phoneInput) {
      phoneInput.addEventListener('blur', () => {
        const val = phoneInput.value.trim();
        if (!val) {
          setFieldError('signupPhone', 'signupPhoneError', 'Please enter your phone number.');
        } else if (!PHONE_REGEX.test(val) || val.replace(/\D/g, '').length < 8) {
          setFieldError('signupPhone', 'signupPhoneError', 'Please enter a valid 10-digit phone number.');
        } else {
          setFieldError('signupPhone', 'signupPhoneError', '');
        }
      });
    }

    if (passInput) {
      passInput.addEventListener('blur', () => {
        const val = passInput.value;
        if (!val) {
          setFieldError('signupPassword', 'signupPasswordError', 'Please create a password.');
        } else if (val.length < 8) {
          setFieldError('signupPassword', 'signupPasswordError', 'Password must be at least 8 characters.');
        } else {
          setFieldError('signupPassword', 'signupPasswordError', '');
        }
      });
    }

    if (confirmInput) {
      confirmInput.addEventListener('blur', () => {
        const passVal = passInput.value;
        const confirmVal = confirmInput.value;
        if (!confirmVal) {
          setFieldError('signupConfirmPassword', 'signupConfirmPasswordError', 'Please confirm your password.');
        } else if (confirmVal !== passVal) {
          setFieldError('signupConfirmPassword', 'signupConfirmPasswordError', 'Passwords do not match.');
        } else {
          setFieldError('signupConfirmPassword', 'signupConfirmPasswordError', '');
        }
      });
    }

    // Submit handler
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const nameVal    = nameInput.value.trim();
      const emailVal   = emailInput.value.trim();
      const phoneVal   = phoneInput.value.trim();
      const passVal    = passInput.value;
      const confirmVal = confirmInput.value;
      const termsCheck = termsInput.checked;

      if (!nameVal || nameVal.length < 2) {
        setFieldError('signupName', 'signupNameError', 'Please enter your full name.');
        isValid = false;
      } else {
        setFieldError('signupName', 'signupNameError', '');
      }

      if (!emailVal || !EMAIL_REGEX.test(emailVal)) {
        setFieldError('signupEmail', 'signupEmailError', 'Please enter a valid email address.');
        isValid = false;
      } else {
        setFieldError('signupEmail', 'signupEmailError', '');
      }

      if (!phoneVal || phoneVal.replace(/\D/g, '').length < 8) {
        setFieldError('signupPhone', 'signupPhoneError', 'Please enter a valid phone number.');
        isValid = false;
      } else {
        setFieldError('signupPhone', 'signupPhoneError', '');
      }

      if (!passVal || passVal.length < 8) {
        setFieldError('signupPassword', 'signupPasswordError', 'Password must be at least 8 characters.');
        isValid = false;
      } else {
        setFieldError('signupPassword', 'signupPasswordError', '');
      }

      if (!confirmVal || confirmVal !== passVal) {
        setFieldError('signupConfirmPassword', 'signupConfirmPasswordError', 'Passwords do not match.');
        isValid = false;
      } else {
        setFieldError('signupConfirmPassword', 'signupConfirmPasswordError', '');
      }

      const termsError = document.getElementById('signupTermsError');
      if (!termsCheck) {
        if (termsError) termsError.textContent = 'You must agree to the Terms & Privacy Policy.';
        isValid = false;
      } else {
        if (termsError) termsError.textContent = '';
      }

      if (!isValid) {
        const firstError = form.querySelector('.is-invalid') || form.querySelector(':invalid');
        if (firstError) firstError.focus();
        return;
      }

      // UI Loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="auth-spinner" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" style="animation: spin 0.8s linear infinite;">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
            <path d="M12 2a10 10 0 0 1 10 10"/>
          </svg>
          <span>Creating your account...</span>
        `;
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span>Create My Account</span>`;
        }

        if (alertBox) {
          const selectedCode = countryCode ? countryCode.value : '+91';
          alertBox.className = 'auth-alert-box auth-alert-success';
          alertBox.hidden = false;
          alertBox.innerHTML = `
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <div>
              <strong>Welcome to the family, ${escapeHtml(nameVal)}!</strong>
              <div style="font-size: 0.84rem; margin-top: 3px;">
                Account details validated for ${escapeHtml(emailVal)} (${selectedCode} ${escapeHtml(phoneVal)}).
                <br><em>Demo Mode: Real account registration requires connecting to an authentication backend.</em>
              </div>
            </div>
          `;
          alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 950);
    });
  }

  /* ═════════════════════════════════════════════════════════════════════════
     6. FORGOT PASSWORD MODAL & SOCIAL PLACEHOLDERS
     ═════════════════════════════════════════════════════════════════════════ */
  function initModals() {
    const forgotLink     = document.getElementById('authForgotLink');
    const modalBackdrop  = document.getElementById('authModal');
    const modalCloseBtn  = document.getElementById('authModalClose');
    const modalForm      = document.getElementById('authModalForm');
    const modalEmail     = document.getElementById('authModalEmail');
    const modalAlert     = document.getElementById('authModalAlert');

    function openModal() {
      if (!modalBackdrop) return;
      modalBackdrop.hidden = false;
      document.body.style.overflow = 'hidden';
      if (modalEmail) {
        modalEmail.value = '';
        setTimeout(() => modalEmail.focus(), 100);
      }
      if (modalAlert) modalAlert.hidden = true;
    }

    function closeModal() {
      if (!modalBackdrop) return;
      modalBackdrop.hidden = true;
      document.body.style.overflow = '';
    }

    if (forgotLink) {
      forgotLink.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    }

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeModal);
    }

    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) closeModal();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modalBackdrop.hidden) closeModal();
      });
    }

    if (modalForm) {
      modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = modalEmail ? modalEmail.value.trim() : '';
        if (!email || !EMAIL_REGEX.test(email)) {
          if (modalAlert) {
            modalAlert.className = 'auth-alert-box auth-alert-error';
            modalAlert.hidden = false;
            modalAlert.innerHTML = `Please enter a valid email address.`;
          }
          return;
        }

        if (modalAlert) {
          modalAlert.className = 'auth-alert-box auth-alert-success';
          modalAlert.hidden = false;
          modalAlert.innerHTML = `
            <strong>Reset link sent!</strong>
            <div style="font-size: 0.82rem; margin-top: 2px;">
              If an account exists for <em>${escapeHtml(email)}</em>, password instructions have been dispatched. (Demo notification)
            </div>
          `;
        }
      });
    }

    // Social buttons interaction notice
    const socialBtns = document.querySelectorAll('.auth-social-btn');
    socialBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const provider = btn.getAttribute('data-provider') || 'Social login';
        const alertBox = document.getElementById('authAlertBox');
        if (alertBox) {
          alertBox.className = 'auth-alert-box auth-alert-info';
          alertBox.hidden = false;
          alertBox.innerHTML = `
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            <div>
              <strong>${escapeHtml(provider)} Authentication</strong>
              <div style="font-size: 0.84rem; margin-top: 2px;">
                ${escapeHtml(provider)} integration is scheduled for our upcoming release. Please use standard email & password.
              </div>
            </div>
          `;
          alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    });

    // Terms / Privacy placeholder modal or alert
    const termsLinks = document.querySelectorAll('.auth-legal-link');
    termsLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const doc = link.textContent.trim();
        alert(`${doc}\n\nBubble & Brew values your privacy and uses delicious tea leaves ethically. Official legal documents will be published shortly!`);
      });
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, (m) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    })[m]);
  }

  /* ═════════════════════════════════════════════════════════════════════════
     7. INITIALIZATION ON DOM READY
     ═════════════════════════════════════════════════════════════════════════ */
  function init() {
    initTheme();
    initDirection();
    initPasswordToggles();
    initLoginForm();
    initSignupForm();
    initModals();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
