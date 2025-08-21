// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Task Management
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const progressBar = document.getElementById("progress-bar");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function updateTasks() {
  taskList.innerHTML = "";
  let completed = 0;
  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
      <span style="text-decoration:${task.done ? 'line-through' : 'none'}">
        ${task.text}
      </span>
      <button onclick="toggleTask(${index})">✔</button>
      <button onclick="deleteTask(${index})">🗑</button>
    `;
    taskList.appendChild(li);
    if (task.done) completed++;
  });
  let progress = (completed / tasks.length) * 100 || 0;
  progressBar.style.width = progress + "%";
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

addTaskBtn.addEventListener("click", () => {
  if (taskInput.value.trim() === "") return;
  tasks.push({ text: taskInput.value, done: false });
  taskInput.value = "";
  updateTasks();
});

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  updateTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  updateTasks();
}

updateTasks();

// Pomodoro Timer
let timer;
let timeLeft = 25 * 60;

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");

function updateTimer() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2,"0")}`;
}

startBtn.addEventListener("click", () => {
  if (timer) return;
  timer = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(timer);
      timer = null;
      alert("Time's up!");
    }
  }, 1000);
});

resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  timeLeft = 25 * 60;
  updateTimer();
});

updateTimer();
