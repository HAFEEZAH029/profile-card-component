
document.addEventListener('DOMContentLoaded', () => {
       const currentTime = document.getElementById('current_time');

       if (!currentTime) return;

       const refresh = () => {
           currentTime.textContent = Date.now().toString();
       };

        refresh();  //ensures the time is shown right away before the first interval
        const intervalID = setInterval(refresh, 1000);

        window.addEventListener('beforeunload', () => {
            clearInterval(intervalID);
        }, {once:true});
}, {once:true});










/* contact-form-validation.js
   Vanilla JS validation for Contact page (matches HTML you provided)
*/
(function () {
  // Elements
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');

  const errors = {
    name: document.getElementById('test-contact-error-name'),
    email: document.getElementById('test-contact-error-email'),
    subject: document.getElementById('test-contact-error-subject'),
    message: document.getElementById('test-contact-error-message')
  };

  const successEl = document.getElementById('test-contact-success');

  // Utility: simple email check (sane & permissive)
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  // Show / clear helpers
  function showError(fieldKey, message) {
    const input = getField(fieldKey); //this gets the input element
    const el = errors[fieldKey]; //this gets the error message element
    if (!el || !input) return; // this prevents errors if elements are missing
    el.textContent = message;
    el.setAttribute('aria-hidden', 'false');
    el.classList.add('visible');
    input.setAttribute('aria-invalid', 'true');
  }

  function clearError(fieldKey) {
    const input = getField(fieldKey);
    const el = errors[fieldKey];
    if (!el || !input) return;
    el.textContent = '';
    el.setAttribute('aria-hidden', 'true');
    el.classList.remove('visible');
    input.removeAttribute('aria-invalid');
  }

  function clearAllErrors() {
    Object.keys(errors).forEach(clearError);
  }

  function hideSuccess() {
    if (!successEl) return;
    successEl.setAttribute('aria-hidden', 'true');
    successEl.classList.remove('visible');
  }

  function showSuccess(message = 'Thanks — your message was sent successfully.') {
    if (!successEl) return;
    successEl.textContent = message;
    successEl.setAttribute('aria-hidden', 'false');
    successEl.classList.add('visible');
    // Bring success message into view for screen readers and keyboard users
    // Make focusable temporarily so we can move focus to it
    successEl.setAttribute('tabindex', '-1');
    successEl.focus({ preventScroll: true });
    // remove tabindex after focus so it doesn't remain in tab order
    setTimeout(() => successEl.removeAttribute('tabindex'), 1000);
  }

  function getField(key) {
    switch (key) {
      case 'name': return nameInput;
      case 'email': return emailInput;
      case 'subject': return subjectInput;
      case 'message': return messageInput;
      default: return null;
    }
  }

  // Field-level validation (returns boolean)
  function validateField(key) {
    const input = getField(key);
    if (!input) return true;
    const value = (input.value || '').trim();

    if (!value) {
      showError(key, prettyFieldName(key) + ' is required.');
      return false;
    }

    if (key === 'email') {
      if (!isValidEmail(value)) {
        showError('email', 'Please enter a valid email address (e.g., name@example.com).');
        return false;
      }
    }

    if (key === 'message') {
      if (value.length < 10) {
        showError('message', 'Message must be at least 10 characters.');
        return false;
      }
    }

    // passed
    clearError(key);
    return true;
  }

  function prettyFieldName(key) {
    switch (key) {
      case 'name': return 'Full name';
      case 'email': return 'Email';
      case 'subject': return 'Subject';
      case 'message': return 'Message';
      default: return key;
    }
  }

  // Validate all fields, return { valid, firstInvalidFieldKey }
  function validateAll() {
    hideSuccess();
    clearAllErrors();

    const checks = ['name', 'email', 'subject', 'message'];
    let valid = true;
    let firstInvalid = null;

    for (const key of checks) {
      const ok = validateField(key);
      if (!ok) {
        valid = false;
        if (!firstInvalid) firstInvalid = key;
      }
    }

    return { valid, firstInvalid };
  }

  // Event listeners
  if (form) {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
      const { valid, firstInvalid } = validateAll();

      if (!valid) {
        // Focus the first invalid field for keyboard users
        const el = getField(firstInvalid);
        if (el) el.focus();
        return;
      }

      // If valid: show success message and clear form (you can change behavior here
      // to actually submit/send data to a server)
      showSuccess();
      form.reset();
      // Clean aria-invalid attributes after reset
      Object.keys(errors).forEach(key => clearError(key));
    });
  }

  // Live feedback: clear error for a field when user types and re-validate lightly
  [nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
    if (!input) return;
    input.addEventListener('input', (e) => {
      const id = e.target.id;
      // map element id to our keys
      if (id === 'contact-name') {
        validateField('name');
      } else if (id === 'contact-email') {
        // only validate structure when > 3 chars to reduce noise
        if (e.target.value.length > 3) validateField('email');
        else clearError('email');
      } else if (id === 'contact-subject') {
        validateField('subject');
      } else if (id === 'contact-message') {
        // message length live-check
        if (e.target.value.trim().length >= 10) clearError('message');
        else if (e.target.value.trim().length > 0) showError('message', 'Message must be at least 10 characters.');
        else clearError('message');
      }

      // any user interaction hides success (so user sees current state)
      hideSuccess();
    });

    // clear error on focus (optional UX improvement)
    input.addEventListener('focus', () => {
      const key = (input.id === 'contact-name') ? 'name'
        : (input.id === 'contact-email') ? 'email'
        : (input.id === 'contact-subject') ? 'subject'
        : (input.id === 'contact-message') ? 'message'
        : null;
      if (key) clearError(key);
    });
  });

})();



