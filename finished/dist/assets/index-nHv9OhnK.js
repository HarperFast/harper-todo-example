(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))u(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&u(n)}).observe(document,{childList:!0,subtree:!0});function f(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function u(o){if(o.ep)return;o.ep=!0;const s=f(o);fetch(o.href,s)}})();document.addEventListener("DOMContentLoaded",()=>{const y=document.querySelector("#add-todo-form"),r=document.querySelector("#todos-message"),f=document.querySelector("#todos-left"),u=document.querySelector("#filter-all"),o=document.querySelector("#filter-active"),s=document.querySelector("#filter-completed");let n=[],l=!1;const a=async()=>{l=!0,n=await fetch("/api/TodoList/").then(e=>e.json()),l=!1,i(n)},m=e=>{const t=new DOMParser,d=`
    <li class="inline-flex items-center w-full h-16 px-6" id="todo-item-${e.id}">
      <label class="inline-flex items-center w-full cursor-pointer peer">
        <input
          id="check-todo-${e.id}"
          type="checkbox"
          class="w-5 h-5 mr-3 cursor-pointer peer"
          ${e.status==="completed"?"checked":""}
          data-todo-id="${e.id}"
        />
        <span class="peer-checked:text-gray-600 peer-checked:line-through">
          ${e.description}
        </span>
      </label>
      <button
        type="button"
        id="toggle-edit-todo-${e.id}"
        class="mr-2 text-blue-500 hover:text-blue-700"
      >
        Edit
      </button>
      <button
        type="button"
        id="delete-todo-${e.id}"
        class="ml-auto text-red-500 hover:text-red-700"
        data-delete-id="${e.id}"
      >
        Delete
      </button>
    </li>
  `,c=t.parseFromString(d,"text/html");return c.querySelector(`#check-todo-${e.id}`).addEventListener("change",()=>{L(e.id)}),c.querySelector(`#toggle-edit-todo-${e.id}`).addEventListener("click",()=>{const h=prompt("Edit todo description:",e.description);h!==null&&h.trim()!==""&&g(e.id,h.trim())}),c.querySelector(`#delete-todo-${e.id}`).addEventListener("click",()=>{v(e.id)}),c.body.firstChild},i=e=>{const t=document.querySelector("#todo-list");t.innerHTML="",e.forEach(d=>{const c=m(d);t.appendChild(c)}),e.length||(l=!1,r.textContent="Please add your todo items above."),e.length&&(r.style.display="none"),p(),l=!1},L=async e=>{await fetch(`/api/TodoList/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({description:n.find(t=>t.id===e)?.description,status:n.find(t=>t.id===e)?.status==="active"?"completed":"active"})}).then(t=>t.json()),a(),i(n),p()},g=async(e,t)=>{await fetch(`/api/TodoList/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({description:t,status:n.find(d=>d.id===e)?.status})}),a(),i(n)},T=async e=>{await fetch("/api/TodoList/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({description:e,status:"active"})}).then(t=>t.json()),a(),i(n),p()},v=async e=>{await fetch(`/api/TodoList/${e}`,{method:"DELETE",headers:{"Content-Type":"application/json"}}).then(t=>t.json()),a(),i(n),p()},p=()=>{const e=n.filter(t=>t.status==="active").length;return f.textContent=`${e} item${e===1?"":"s"} left`,e};a(),l&&(r.textContent="Loading..."),u.addEventListener("click",()=>{i(n)}),o.addEventListener("click",()=>{const e=n.filter(t=>t.status==="active");i(e)}),s.addEventListener("click",()=>{const e=n.filter(t=>t.status==="completed");i(e)}),y.addEventListener("submit",e=>{e.preventDefault();const t=document.querySelector("#new-todo"),d=t.value.trim();d!==""&&(T(d),t.value="")})});
