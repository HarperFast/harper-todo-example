(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function p(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(t){if(t.ep)return;t.ep=!0;const n=p(t);fetch(t.href,n)}})();document.addEventListener("DOMContentLoaded",()=>{const y=document.querySelector("#add-todo-form"),s=document.querySelector("#todos-message"),p=document.querySelector("#todos-left"),a=document.querySelector("#filter-all"),t=document.querySelector("#filter-active"),n=document.querySelector("#filter-completed");let r=[],i=!1;const l=async()=>{i=!0,i=!1,d(r)},h=e=>{const o=new DOMParser,f=`
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
  `,c=o.parseFromString(f,"text/html");return c.querySelector(`#check-todo-${e.id}`).addEventListener("change",()=>{g(e.id)}),c.querySelector(`#toggle-edit-todo-${e.id}`).addEventListener("click",()=>{const m=prompt("Edit todo description:",e.description);m!==null&&m.trim()!==""&&L(e.id,m.trim())}),c.querySelector(`#delete-todo-${e.id}`).addEventListener("click",()=>{b(e.id)}),c.body.firstChild},d=e=>{const o=document.querySelector("#todo-list");o.innerHTML="",e.forEach(f=>{const c=h(f);o.appendChild(c)}),e.length||(i=!1,s.textContent="Please add your todo items above."),e.length&&(s.style.display="none"),u(),i=!1},g=async e=>{l(),d(r),u()},L=async(e,o)=>{l(),d(r)},v=async e=>{l(),d(r),u()},b=async e=>{l(),d(r),u()},u=()=>{const e=r.filter(o=>o.status==="active").length;return p.textContent=`${e} item${e===1?"":"s"} left`,e};l(),i&&(s.textContent="Loading..."),a.addEventListener("click",()=>{d(r)}),t.addEventListener("click",()=>{const e=r.filter(o=>o.status==="active");d(e)}),n.addEventListener("click",()=>{const e=r.filter(o=>o.status==="completed");d(e)}),y.addEventListener("submit",e=>{e.preventDefault();const o=document.querySelector("#new-todo");o.value.trim()!==""&&(v(),o.value="")})});
