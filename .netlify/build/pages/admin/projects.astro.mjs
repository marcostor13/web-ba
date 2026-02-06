import { d as createComponent, l as renderComponent, r as renderTemplate, m as maybeRenderHead, f as addAttribute } from '../../chunks/astro/server_CrEBP8um.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_CZ-14psD.mjs';
import { p as pool } from '../../chunks/db_DIG-MEGf.mjs';
import { a as actions } from '../../chunks/virtual_CZpefBZC.mjs';
export { renderers } from '../../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const [rows] = await pool.execute("SELECT * FROM projects ORDER BY created_at DESC");
  const projects = rows;
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Manage Projects" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col gap-10"> <header class="flex flex-col md:flex-row justify-between items-end gap-6"> <div class="flex flex-col gap-2"> <h1 class="text-[12px] uppercase tracking-[0.4em] text-black-soft/40 font-medium">Portfolio</h1> <h2 class="text-4xl md:text-[50px] font-light text-black-soft m-0">Projects</h2> </div> <a href="/admin/projects/new" class="bg-gold text-white px-8 py-4 uppercase tracking-[0.3em] text-[11px] font-medium hover:bg-black-soft transition-colors flex items-center gap-3"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path> </svg>
Add Project
</a> </header> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> ${projects.map((project) => renderTemplate`<div class="bg-white shadow-xl rounded-sm border border-black-soft/5 overflow-hidden group"> <div class="relative aspect-video overflow-hidden bg-beige-light"> <img${addAttribute(project.main_image, "src")}${addAttribute(project.name, "alt")} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"> ${project.logo_overlay && renderTemplate`<div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-12"> <img${addAttribute(project.logo_overlay, "src")} alt="Logo Overlay" class="max-w-full max-h-full object-contain brightness-0 invert"> </div>`} </div> <div class="p-6 flex flex-col gap-4"> <div class="flex flex-col gap-1"> <span class="text-[10px] uppercase tracking-widest text-gold font-medium">${project.category}</span> <h3 class="text-lg text-black-soft font-normal">${project.name}</h3> </div> <div class="flex items-center justify-between pt-4 border-t border-black-soft/5"> <div class="flex gap-4"> <a${addAttribute(`/admin/projects/${project.id}`, "href")} class="text-[10px] uppercase tracking-widest text-black-soft hover:text-gold transition-colors font-medium">Edit</a> <form method="POST"${addAttribute(actions.deleteProject, "action")} onsubmit="return confirm('Silently delete this project? This cannot be undone.')"> <input type="hidden" name="id"${addAttribute(project.id, "value")}> <button type="submit" class="text-[10px] uppercase tracking-widest text-red-500/60 hover:text-red-500 transition-colors font-medium">Delete</button> </form> </div> </div> </div> </div>`)} </div> ${projects.length === 0 && renderTemplate`<div class="py-20 text-center border-2 border-dashed border-black-soft/5 rounded-sm"> <p class="text-black-soft/40 font-light italic">No projects added yet.</p> </div>`} </div> ` })}`;
}, "C:/Marcos/Proyectos/BA/web/web-ba/src/pages/admin/projects/index.astro", void 0);

const $$file = "C:/Marcos/Proyectos/BA/web/web-ba/src/pages/admin/projects/index.astro";
const $$url = "/admin/projects";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
