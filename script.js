const form=document.getElementById("todoForm");
const input=document.getElementById("todoInput");
const list=document.getElementById("todoList");
const errorMsg=document.getElementById("errorMsg");
const doneCounter=document.getElementById("doneCounter");

let doneCount=0;
function setCounter(v){doneCount=Math.max(0,v);doneCounter.textContent=String(doneCount);}

function makeItem(text){
  const li=document.createElement("li");
  li.className="item";
  const p=document.createElement("p");
  p.className="text";
  p.textContent=text;
  const del=document.createElement("button");
  del.className="del";
  del.type="button";
  del.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 7h12M9 7v10m6-10v10M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>';
  li.appendChild(p);
  li.appendChild(del);
  return li;
}

form.addEventListener("submit",e=>{
  e.preventDefault();
  const value=input.value.trim();
  if(!value){
    errorMsg.textContent="Skriv något först.";
    errorMsg.classList.remove("blink");
    void errorMsg.offsetWidth;
    errorMsg.classList.add("blink");
    input.focus();
    return;
  }
  errorMsg.textContent="";
  errorMsg.classList.remove("blink");
  const item=makeItem(value);
  list.appendChild(item);
  input.value="";
  input.focus();
});

list.addEventListener("click",e=>{
  const item=e.target.closest(".item");
  if(!item) return;

  const delBtn=e.target.closest(".del");
  if(delBtn){
    item.style.transition="opacity .2s ease, transform .2s ease";
    item.style.opacity="0";
    item.style.transform="translateY(6px)";
    setTimeout(()=>item.remove(),180);
    return;
  }

  const willComplete=!item.classList.contains("completed");
  item.classList.toggle("completed");
  if(willComplete) setCounter(doneCount+1);
});
