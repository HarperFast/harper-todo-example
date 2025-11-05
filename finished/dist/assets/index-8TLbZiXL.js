(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))u(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&u(n)}).observe(document,{childList:!0,subtree:!0});function p(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function u(o){if(o.ep)return;o.ep=!0;const s=p(o);fetch(o.href,s)}})();document.addEventListener("DOMContentLoaded",()=>{const y=document.querySelector("#add-todo-form"),r=document.querySelector("#todos-message"),p=document.querySelector("#todos-left"),u=document.querySelector("#filter-all"),o=document.querySelector("#filter-active"),s=document.querySelector("#filter-completed");let n=[],l=!1;const a=async()=>{l=!0,n=await fetch("undefined/").then(e=>e.json()),l=!1,d(n)},m=e=>{const t=new DOMParser,i=`
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
  `,c=t.parseFromString(i,"text/html");return c.querySelector(`#check-todo-${e.id}`).addEventListener("change",()=>{g(e.id)}),c.querySelector(`#toggle-edit-todo-${e.id}`).addEventListener("click",()=>{const h=prompt("Edit todo description:",e.description);h!==null&&h.trim()!==""&&v(e.id,h.trim())}),c.querySelector(`#delete-todo-${e.id}`).addEventListener("click",()=>{$(e.id)}),c.body.firstChild},d=e=>{const t=document.querySelector("#todo-list");t.innerHTML="",e.forEach(i=>{const c=m(i);t.appendChild(c)}),e.length||(l=!1,r.textContent="Please add your todo items above."),e.length&&(r.style.display="none"),f(),l=!1},g=async e=>{await fetch(`undefined/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({description:n.find(t=>t.id===e)?.description,status:n.find(t=>t.id===e)?.status==="active"?"completed":"active"})}).then(t=>t.json()),a(),d(n),f()},v=async(e,t)=>{await fetch(`undefined/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({description:t,status:n.find(i=>i.id===e)?.status})}),a(),d(n)},L=async e=>{await fetch("undefined/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({description:e,status:"active"})}).then(t=>t.json()),a(),d(n),f()},$=async e=>{await fetch(`undefined/${e}`,{method:"DELETE",headers:{"Content-Type":"application/json"}}).then(t=>t.json()),a(),d(n),f()},f=()=>{const e=n.filter(t=>t.status==="active").length;return p.textContent=`${e} item${e===1?"":"s"} left`,e};a(),l&&(r.textContent="Loading..."),u.addEventListener("click",()=>{d(n)}),o.addEventListener("click",()=>{const e=n.filter(t=>t.status==="active");d(e)}),s.addEventListener("click",()=>{const e=n.filter(t=>t.status==="completed");d(e)}),y.addEventListener("submit",e=>{e.preventDefault();const t=document.querySelector("#new-todo"),i=t.value.trim();i!==""&&(L(i),t.value="")})});
