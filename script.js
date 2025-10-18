const form = document.getElementById("todoForm");
const input = document.getElementById("todoInput");
const list = document.getElementById("todoList");
const errorMsg = document.getElementById("errorMsg");
const doneCounter = document.getElementById("doneCounter");
let doneCount = 0;

function createItem(text){
  const li = document.createElement("li");
  li.className = "item";
  const p = document.createElement("p");
  p.className = "text";
  p.textContent = text;
  const buttons = document.createElement("div");
  buttons.className = "buttons";
  const btnDone = document.createElement("button");
  btnDone.type = "button";
  btnDone.className = "btn-klar";
  btnDone.textContent = "Klar";
  const btnDel = document.createElement("button");
  btnDel.type = "button";
  btnDel.className = "btn-del";
  btnDel.textContent = "Ta bort";
  buttons.appendChild(btnDone);
  buttons.appendChild(btnDel);
  li.appendChild(p);
  li.appendChild(buttons);
  return li;
}

form.addEventListener("submit", function(e){
  e.preventDefault();
  const value = input.value.trim();
  if(!value){
    errorMsg.textContent = "Skriv något först.";
    errorMsg.classList.remove("blink");
    void errorMsg.offsetWidth;
    errorMsg.classList.add("blink");
    input.focus();
    return;
  }
  errorMsg.textContent = "";
  errorMsg.classList.remove("blink");
  const item = createItem(value);
  list.appendChild(item);
  input.value = "";
  input.focus();
});

list.addEventListener("click", function(e){
  const btn = e.target.closest("button");
  if(!btn) return;
  const li = btn.closest(".item");
  if(!li) return;
  if(btn.textContent === "Klar"){
    const willBeCompleted = !li.classList.contains("completed");
    li.classList.toggle("completed");
    if(willBeCompleted){doneCount++;}else{doneCount=Math.max(0,doneCount-1);}
    doneCounter.textContent = String(doneCount);
  }
  if(btn.textContent === "Ta bort"){
    if(li.classList.contains("completed")){
      doneCount = Math.max(0, doneCount - 1);
      doneCounter.textContent = String(doneCount);
    }
    li.style.transition = "opacity .2s ease";
    li.style.opacity = "0";
    setTimeout(()=>li.remove(),200);
  }
});
