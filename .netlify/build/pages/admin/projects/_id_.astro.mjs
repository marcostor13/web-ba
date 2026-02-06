import { d as createComponent, l as renderComponent, r as renderTemplate, g as createAstro, m as maybeRenderHead, f as addAttribute } from '../../../chunks/astro/server_CrEBP8um.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../../chunks/AdminLayout_CZ-14psD.mjs';
import { p as pool } from '../../../chunks/db_DIG-MEGf.mjs';
import { a as actions } from '../../../chunks/virtual_CZpefBZC.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const [projectRows] = await pool.execute("SELECT * FROM projects WHERE id = ?", [id]);
  const project = projectRows[0];
  if (!project) {
    return Astro2.redirect("/admin/projects");
  }
  const [imageRows] = await pool.execute("SELECT * FROM project_images WHERE project_id = ?", [id]);
  const gallery = imageRows;
  const result = Astro2.getActionResult(actions.updateProject);
  if (result?.data?.success) {
    return Astro2.redirect("/admin/projects");
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": `Edit ${project.name}` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col gap-10 max-w-4xl"> <header class="flex flex-col gap-2"> <a href="/admin/projects" class="text-[10px] uppercase tracking-[0.3em] text-gold hover:text-black-soft transition-colors mb-4 flex items-center gap-2"> <svg class="w-3 h-3 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"></path></svg>
Back to projects
</a> <h1 class="text-[12px] uppercase tracking-[0.4em] text-black-soft/40 font-medium">Edit Project</h1> <h2 class="text-4xl md:text-[50px] font-light text-black-soft m-0">${project.name}</h2> </header> <form method="POST"${addAttribute(actions.updateProject, "action")} enctype="multipart/form-data" class="bg-white p-8 md:p-12 shadow-xl border border-black-soft/5 flex flex-col gap-10"> <input type="hidden" name="id"${addAttribute(project.id, "value")}> ${result?.error && renderTemplate`<div class="bg-red-50 text-red-500 p-4 text-sm border-l-4 border-red-500"> ${result.error.message} </div>`} <!-- Basic Info --> <div class="grid grid-cols-1 md:grid-cols-2 gap-8"> <div class="flex flex-col gap-3"> <label class="text-[10px] uppercase tracking-[0.2em] font-bold text-black-soft">Project Name</label> <input type="text" name="name" required${addAttribute(project.name, "value")} class="bg-beige-light/50 border-0 p-4 text-sm focus:ring-1 focus:ring-gold outline-none"> </div> <div class="flex flex-col gap-3"> <label class="text-[10px] uppercase tracking-[0.2em] font-bold text-black-soft">Category</label> <select name="category" class="bg-beige-light/50 border-0 p-4 text-sm focus:ring-1 focus:ring-gold outline-none"> <option value="Kitchen"${addAttribute(project.category === "Kitchen", "selected")}>Kitchen</option> <option value="Bathroom"${addAttribute(project.category === "Bathroom", "selected")}>Bathroom</option> <option value="Basement"${addAttribute(project.category === "Basement", "selected")}>Basement</option> </select> </div> </div> <!-- Main Images --> <div class="grid grid-cols-1 md:grid-cols-2 gap-8"> <div class="flex flex-col gap-3"> <label class="text-[10px] uppercase tracking-[0.2em] font-bold text-black-soft">Main Image (Background)</label> <div class="mb-2"> <img${addAttribute(project.main_image, "src")} class="w-32 h-20 object-cover rounded-sm border border-black-soft/10"> </div> <input type="file" name="mainImage" accept="image/*" class="text-sm text-black-soft/60 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-[10px] file:uppercase file:tracking-widest file:bg-gold file:text-white hover:file:bg-black-soft file:transition-colors"> </div> <div class="flex flex-col gap-3"> <label class="text-[10px] uppercase tracking-[0.2em] font-bold text-black-soft">Logo Overlay (Center Image)</label> ${project.logo_overlay && renderTemplate`<div class="mb-2 bg-black-soft/5 p-2 inline-block"> <img${addAttribute(project.logo_overlay, "src")} class="h-10 object-contain"> </div>`} <input type="file" name="logoOverlay" accept="image/*" class="text-sm text-black-soft/60 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-[10px] file:uppercase file:tracking-widest file:bg-gold file:text-white hover:file:bg-black-soft file:transition-colors"> </div> </div> <!-- Gallery --> <div class="flex flex-col gap-6"> <label class="text-[10px] uppercase tracking-[0.2em] font-bold text-black-soft">Gallery Images</label> <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"> ${gallery.map((img) => renderTemplate`<div class="relative group aspect-square"> <img${addAttribute(img.image_path, "src")} class="w-full h-full object-cover rounded-sm"> </div>`)} </div> <div class="flex flex-col gap-3 mt-4"> <label class="text-[10px] uppercase tracking-[0.2em] font-bold text-black-soft">Add More Gallery Images</label> <input type="file" name="gallery" accept="image/*" multiple class="text-sm text-black-soft/60 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-[10px] file:uppercase file:tracking-widest file:bg-black-soft file:text-white hover:file:bg-gold file:transition-colors"> </div> </div> <div class="pt-6 border-t border-black-soft/5"> <button type="submit" class="bg-gold text-white px-12 py-5 uppercase tracking-[0.3em] text-[11px] font-bold hover:bg-black-soft transition-all duration-500 shadow-lg hover:shadow-gold/20">
Update Project
</button> </div> </form> </div> ` })}`;
}, "C:/Marcos/Proyectos/BA/web/web-ba/src/pages/admin/projects/[id].astro", void 0);

const $$file = "C:/Marcos/Proyectos/BA/web/web-ba/src/pages/admin/projects/[id].astro";
const $$url = "/admin/projects/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
