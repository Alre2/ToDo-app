const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const error = document.getElementById('error');
const doneCountEl = document.getElementById('done-count');
let doneCount = 0;

// Enter ska lägga till
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    form.requestSubmit();
  }
});

function showError(msg) {
  error.textContent = msg;
  error.classList.add('show', 'blink');
  error.addEventListener('animationend', () => error.classList.remove('blink'), { once: true });
}

function clearError() {
  error.textContent = '';
  error.classList.remove('show', 'blink');
}

function createTodoItem(text) {
  const li = document.createElement('li');
  li.className = 'todo';

  const p = document.createElement('p');
  p.className = 'todo__text';
  p.textContent = text;

  const del = document.createElement('button');
  del.className = 'btn-delete';
  del.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6l-1 14H6L5 6"></path>
      <path d="M10 11v6"></path>
      <path d="M14 11v6"></path>
      <path d="M9 6V4h6v2"></path>
    </svg>
  `;
  del.title = 'Radera';

  li.append(p, del);
  return li;
}

function addTodo(text) {
  const item = createTodoItem(text);
  list.prepend(item);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = input.value.trim();

  if (!value) {
    showError('Skriv något innan du lägger till.');
    return;
  }

  clearError();
  addTodo(value);
  input.value = '';
  input.focus();
});

list.addEventListener('click', (e) => {
  if (e.target.closest('.btn-delete')) {
    e.target.closest('.todo').remove();
    return;
  }

  const li = e.target.closest('.todo');
  if (li) {
    const wasCompleted = li.classList.contains('completed');
    li.classList.toggle('completed');
    if (!wasCompleted && li.classList.contains('completed')) {
      doneCount++;
      doneCountEl.textContent = doneCount;
    }
  }
});
