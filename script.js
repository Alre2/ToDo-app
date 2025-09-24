let tasks = [];

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const message = document.getElementById("message");
const doneCount = document.getElementById("doneCount");

addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text === "") {
    message.textContent = "Du måste skriva något!";
    return;
  }
  message.textContent = "";
  const task = { id: Date.now(), text: text, done: false };
  tasks.push(task);
  renderTasks();
  taskInput.value = "";
});

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      renderTasks();
    });
    const textSpan = document.createElement("span");
    textSpan.textContent = task.text;
    if (task.done) {
      textSpan.style.textDecoration = "line-through";
      textSpan.style.color = "gray";
    }
    const delBtn = document.createElement("span");
    delBtn.textContent = "🗑️";
    delBtn.classList.add("delete");
    delBtn.addEventListener("click", () => {
      tasks = tasks.filter(t => t.id !== task.id);
      renderTasks();
    });
    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
  updateDoneCount();
}

function updateDoneCount() {
  const count = tasks.filter(t => t.done).length;
  doneCount.textContent = count;
}
