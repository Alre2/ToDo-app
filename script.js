const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list  = document.getElementById('todo-list');
const error = document.getElementById('error');
const doneCountEl = document.getElementById('done-count');

let doneCount = 0;

// Enter i input ska lägga till (förutom form-submit funkar Enter ändå, detta gör den explicit)
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    form.requestSubmit(); // triggar formens submit
  }
});

function showError(msg){
  error.textContent = msg;
  error.classList.add('show','blink');
  error.addEventListener('animationend', () => {
    error.classList.remove('blink');
  }, { once:true });
}

function clearError(){
  if(!error.textContent) return;
  error.textContent = '';
  error.classList.remove('show','blink');
}

function createTodoItem(text){
  const li = document.createElement('li');
  li.className = 'todo todo-enter';
  li.setAttribute('role', 'button');
  li.setAttribute('tabindex', '0');
  li.setAttribute('aria-pressed', 'false');

  const p = document.createElement('p');
  p.className = 'todo__text';
  p.textContent = text;

  const del = document.createElement('button');
  del.className = 'btn-delete';
  del.type = 'button';
  del.title = 'Radera';
  del.setAttribute('aria-label','Radera punkt');
  del.textContent = '✕';

  li.appendChild(p);
  li.appendChild(del);

  li.addEventListener('animationend', () => {
    li.classList.remove('todo-enter');
  }, { once:true });

  return li;
}

function addTodo(text){
  const item = createTodoItem(text);
  list.prepend(item);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = input.value.trim();

  if(!value){
    showError('Skriv något innan du lägger till.');
    input.focus();
    return;
  }
  clearError();
  addTodo(value);
  input.value = '';
  input.focus();
});

// Klick: radera eller markera klar
list.addEventListener('click', (e) => {
  const target = e.target;

  if(target.classList.contains('btn-delete')){
    target.closest('.todo')?.remove();
    return;
  }

  const li = target.closest('.todo');
  if(li && !target.classList.contains('btn-delete')){
    const wasCompleted = li.classList.contains('completed');
    li.classList.toggle('completed');

    if(!wasCompleted && li.classList.contains('completed')){
      doneCount += 1;
      doneCountEl.textContent = String(doneCount);
    }
    li.setAttribute('aria-pressed', li.classList.contains('completed') ? 'true' : 'false');
  }
});

// Enter/Space på markerad rad
list.addEventListener('keydown', (e) => {
  if(e.key === 'Enter' || e.key === ' '){
    const li = e.target.closest('.todo');
    if(li){
      e.preventDefault();
      const wasCompleted = li.classList.contains('completed');
      li.classList.toggle('completed');
      if(!wasCompleted && li.classList.contains('completed')){
        doneCount += 1;
        doneCountEl.textContent = String(doneCount);
      }
      li.setAttribute('aria-pressed', li.classList.contains('completed') ? 'true' : 'false');
    }
  }
});

// Rensa fel när man börjar skriva
input.addEventListener('input', () => {
  if(input.value.trim().length > 0) clearError();
});
