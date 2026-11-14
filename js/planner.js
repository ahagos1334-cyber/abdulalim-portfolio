// Interactive Academic Planner (Arrays, Functions, DOM Manipulation, Events)
let tasks = JSON.parse(localStorage.getItem("abdulalim_cos106_tasks")) || [
  {
    id: 1,
    title: "Complete COS 106 Responsive Portfolio Website",
    course: "COS 106",
    dueDate: "2026-11-16",
    priority: "High",
    completed: false
  },
  {
    id: 2,
    title: "Submit COS 102 C++ Problem Solving Report",
    course: "COS 102",
    dueDate: "2026-11-14",
    priority: "High",
    completed: true
  },
  {
    id: 3,
    title: "Review Network Security & Cryptography Notes",
    course: "CYB 101",
    dueDate: "2026-11-20",
    priority: "Medium",
    completed: false
  }
];

let currentFilter = "all";

function saveTasks() {
  localStorage.setItem("abdulalim_cos106_tasks", JSON.stringify(tasks));
}

function updateStats() {
  const totalEl = document.getElementById("total-tasks");
  const completedEl = document.getElementById("completed-tasks");
  const pendingEl = document.getElementById("pending-tasks");

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  if (totalEl) totalEl.textContent = total;
  if (completedEl) completedEl.textContent = completed;
  if (pendingEl) pendingEl.textContent = pending;
}

function renderTasks() {
  const listEl = document.getElementById("task-list");
  if (!listEl) return;

  listEl.innerHTML = "";

  const filtered = tasks.filter(task => {
    if (currentFilter === "completed") return task.completed;
    if (currentFilter === "pending") return !task.completed;
    return true;
  });

  if (filtered.length === 0) {
    listEl.innerHTML = '<li class="card"><p>No tasks found in this view. Add a new academic task above!</p></li>';
    updateStats();
    return;
  }

  filtered.forEach(task => {
    const li = document.createElement("li");
    li.className = "task-item" + (task.completed ? " completed" : "");

    li.innerHTML = `
      <div class="task-info">
        <input type="checkbox" class="task-checkbox" ${task.completed ? "checked" : ""} aria-label="Mark task completed">
        <div>
          <strong class="task-title">${escapeHtml(task.title)}</strong>
          <div class="task-meta">
            Course: <strong>${escapeHtml(task.course)}</strong> &bull;
            Due: ${escapeHtml(task.dueDate || "No date")} &bull;
            Priority: ${escapeHtml(task.priority)}
          </div>
        </div>
      </div>
      <div>
        <button type="button" class="btn btn-danger btn-sm delete-btn">Delete</button>
      </div>
    `;

    li.querySelector(".task-checkbox").addEventListener("change", () => toggleTask(task.id));
    li.querySelector(".delete-btn").addEventListener("click", () => deleteTask(task.id));

    listEl.appendChild(li);
  });

  updateStats();
}

function addTask(event) {
  event.preventDefault();
  const titleInput = document.getElementById("task-title");
  const courseInput = document.getElementById("task-course");
  const dateInput = document.getElementById("task-date");
  const priorityInput = document.getElementById("task-priority");
  const errorEl = document.getElementById("planner-error");

  const title = titleInput.value.trim();
  const course = courseInput.value.trim() || "General";
  const dueDate = dateInput.value;
  const priority = priorityInput.value;

  if (!title) {
    errorEl.textContent = "Please enter a task description before adding.";
    return;
  }
  errorEl.textContent = "";

  const newTask = {
    id: Date.now(),
    title,
    course,
    dueDate,
    priority,
    completed: false
  };

  tasks.unshift(newTask);
  saveTasks();
  renderTasks();
  titleInput.value = "";
  courseInput.value = "";
  dateInput.value = "";
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("planner-form");
  if (form) {
    form.addEventListener("submit", addTask);
  }

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      renderTasks();
    });
  });

  renderTasks();
});
