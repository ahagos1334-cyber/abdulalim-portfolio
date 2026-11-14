// Mobile navigation toggle & shared UI helpers
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }
});

// Project preview modal helper (used on projects.html)
function openProjectModal(title, description, stack) {
  const modal = document.getElementById("project-modal");
  if (!modal) return;
  document.getElementById("modal-title").textContent = title;
  document.getElementById("modal-desc").textContent = description;
  document.getElementById("modal-stack").textContent = "Tech Stack: " + stack;
  modal.classList.add("open");
}

function closeProjectModal() {
  const modal = document.getElementById("project-modal");
  if (modal) modal.classList.remove("open");
}
