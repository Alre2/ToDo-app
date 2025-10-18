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
  del.textContent="×";
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
  const t=e.target;
  if(t.classList.contains("text")){
    const li=t.closest(".item");
    const willComplete=!li.classList.contains("completed");
    li.classList.toggle("completed");
    setCounter(doneCount+(willComplete?1:-1));
  }
  if(t.classList.contains("del")){
    const li=t.closest(".item");
    if(li.classList.contains("completed"))setCounter(doneCount-1);
    li.style.transition="opacity .2s ease, transform .2s ease";
    li.style.opacity="0";
    li.style.transform="translateY(6px)";
    setTimeout(()=>li.remove(),180);
  }
});
