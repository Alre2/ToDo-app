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

  const task = {
    id: Date.now(),
    text: text,
    done: false
  };

  tasks.push(task);
  renderTasks();
  taskInput.value = "";
});

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.done) {
      li.classList.add("done");
    }

    li.addEventListener("click", () => {
      task.done = !task.done;
      renderTasks();
    });

    const delBtn = document.createElement("span");
    delBtn.textContent = "🗑️";
    delBtn.classList.add("delete");
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter(t => t.id !== task.id);
      renderTasks();
    });

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });

  updateDoneCount();
}

function updateDoneCount() {
  const count = tasks.filter(t => t.done).length;
  doneCount.textContent = count;
}

