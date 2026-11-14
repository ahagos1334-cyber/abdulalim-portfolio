// Contact Form Validation (Empty checks, Email regex, Digits-only Phone check)
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  if (!contactForm) return;

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameEl = document.getElementById("full-name");
    const emailEl = document.getElementById("email");
    const phoneEl = document.getElementById("phone");
    const messageEl = document.getElementById("message");
    const feedbackEl = document.getElementById("form-feedback");

    // Clear previous error states
    clearError(nameEl, "name-error");
    clearError(emailEl, "email-error");
    clearError(phoneEl, "phone-error");
    clearError(messageEl, "message-error");
    feedbackEl.className = "alert-box";
    feedbackEl.textContent = "";

    let isValid = true;

    // 1. Name validation (non-empty)
    if (nameEl.value.trim() === "") {
      showError(nameEl, "name-error", "Full name is required.");
      isValid = false;
    }

    // 2. Email validation (non-empty + valid email format)
    const emailVal = emailEl.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailVal === "") {
      showError(emailEl, "email-error", "Email address is required.");
      isValid = false;
    } else if (!emailPattern.test(emailVal)) {
      showError(emailEl, "email-error", "Please enter a valid email address (e.g., student@miva.edu.ng).");
      isValid = false;
    }

    // 3. Phone validation (non-empty + strictly digits only)
    const phoneVal = phoneEl.value.trim();
    const digitsOnlyPattern = /^\d+$/;
    if (phoneVal === "") {
      showError(phoneEl, "phone-error", "Phone number is required.");
      isValid = false;
    } else if (!digitsOnlyPattern.test(phoneVal)) {
      showError(phoneEl, "phone-error", "Phone number must contain only digits (0-9), with no spaces or symbols.");
      isValid = false;
    } else if (phoneVal.length < 10 || phoneVal.length > 15) {
      showError(phoneEl, "phone-error", "Phone number must be between 10 and 15 digits.");
      isValid = false;
    }

    // 4. Message validation (non-empty)
    if (messageEl.value.trim() === "") {
      showError(messageEl, "message-error", "Please enter your message.");
      isValid = false;
    }

    if (isValid) {
      feedbackEl.className = "alert-box alert-success";
      feedbackEl.textContent = `Thank you, ${nameEl.value.trim()}! Your message has been validated and sent to Abdulalim Hagos.`;
      contactForm.reset();
    }
  });
});

function showError(inputEl, errorId, message) {
  inputEl.classList.add("input-error");
  const errSpan = document.getElementById(errorId);
  if (errSpan) errSpan.textContent = message;
}

function clearError(inputEl, errorId) {
  inputEl.classList.remove("input-error");
  const errSpan = document.getElementById(errorId);
  if (errSpan) errSpan.textContent = "";
}
