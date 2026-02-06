import { d as createComponent, l as renderComponent, r as renderTemplate, g as createAstro, m as maybeRenderHead, f as addAttribute } from '../../../chunks/astro/server_CrEBP8um.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../../chunks/AdminLayout_CZ-14psD.mjs';
import { a as actions } from '../../../chunks/virtual_CZpefBZC.mjs';
import { p as pool } from '../../../chunks/db_DIG-MEGf.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const [rows] = await pool.execute("SELECT * FROM cabinets WHERE id = ?", [id]);
  const cabinet = rows[0];
  if (!cabinet) {
    return Astro2.redirect("/admin/cabinets");
  }
  const result = Astro2.getActionResult(actions.updateCabinet);
  if (result?.data?.success) {
    return Astro2.redirect("/admin/cabinets");
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": `Edit ${cabinet.name}` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-4xl flex flex-col gap-10"> <header class="flex flex-col gap-2"> <h1 class="text-[12px] uppercase tracking-[0.4em] text-black-soft/40 font-medium">Inventory / Edit</h1> <h2 class="text-4xl md:text-[50px] font-light text-black-soft m-0 uppercase tracking-tight">Edit Cabinet</h2> </header> <div class="bg-white p-10 shadow-xl rounded-sm border border-black-soft/5"> <form method="POST"${addAttribute(actions.updateCabinet, "action")} enctype="multipart/form-data" class="grid grid-cols-1 md:grid-cols-2 gap-10"> <input type="hidden" name="id"${addAttribute(cabinet.id, "value")}> <!-- Main Info --> <div class="flex flex-col gap-8"> <div class="flex flex-col gap-2"> <label for="name" class="text-[10px] uppercase tracking-[0.2em] text-black-soft/60">Product Name / Title</label> <input type="text" name="name" id="name" required${addAttribute(cabinet.name, "value")} class="border-b border-black-soft/20 py-2 focus:border-gold outline-none transition-colors font-light text-lg"> </div> <div class="flex flex-col gap-2"> <label for="brand" class="text-[10px] uppercase tracking-[0.2em] text-black-soft/60">Brand</label> <input type="text" name="brand" id="brand"${addAttribute(cabinet.brand, "value")} class="border-b border-black-soft/20 py-2 focus:border-gold outline-none transition-colors font-light"> </div> <div class="flex flex-col gap-2"> <label for="series" class="text-[10px] uppercase tracking-[0.2em] text-black-soft/60">Series</label> <input type="text" name="series" id="series"${addAttribute(cabinet.series, "value")} class="border-b border-black-soft/20 py-2 focus:border-gold outline-none transition-colors font-light"> </div> <div class="flex flex-col gap-2"> <label for="tag" class="text-[10px] uppercase tracking-[0.2em] text-black-soft/60">Category / Color Tag</label> <select name="tag" id="tag" class="border-b border-black-soft/20 py-2 focus:border-gold outline-none transition-colors font-light bg-transparent"> <option value="White"${addAttribute(cabinet.tag === "White", "selected")}>White</option> <option value="Gray"${addAttribute(cabinet.tag === "Gray", "selected")}>Gray</option> <option value="Blue"${addAttribute(cabinet.tag === "Blue", "selected")}>Blue</option> <option value="Brown"${addAttribute(cabinet.tag === "Brown", "selected")}>Brown</option> </select> </div> </div> <!-- Extra Info --> <div class="flex flex-col gap-8"> <div class="flex flex-col gap-4"> <label class="text-[10px] uppercase tracking-[0.2em] text-black-soft/60">Product Image</label> <div class="flex items-center gap-6"> <div class="w-20 h-24 bg-beige-light rounded-sm overflow-hidden shrink-0 border border-black-soft/5"> <img${addAttribute(cabinet.image, "src")}${addAttribute(cabinet.name, "alt")} class="w-full h-full object-contain"> </div> <div class="flex-1"> <input type="file" name="image" id="image" accept="image/*" class="font-light text-xs text-black-soft/60 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:uppercase file:tracking-widest file:bg-beige-light file:text-black-soft hover:file:bg-gold hover:file:text-white file:transition-colors"> <p class="text-[9px] text-black-soft/30 mt-2 uppercase tracking-widest">Leave empty to keep current image</p> </div> </div> </div> <div class="flex flex-col gap-2"> <label for="description" class="text-[10px] uppercase tracking-[0.2em] text-black-soft/60">Description</label> <textarea name="description" id="description" rows="3" class="border border-black-soft/10 p-4 focus:border-gold outline-none transition-colors font-light text-sm resize-none">${cabinet.description}</textarea> </div> <div class="flex flex-col gap-2"> <label for="specifications" class="text-[10px] uppercase tracking-[0.2em] text-black-soft/60">Product Details (one per line)</label> <textarea name="specifications" id="specifications" rows="5" class="border border-black-soft/10 p-4 focus:border-gold outline-none transition-colors font-light text-sm resize-none">${cabinet.specifications}</textarea> </div> </div> <div class="md:col-span-2 flex justify-end gap-6 pt-10 border-t border-black-soft/5"> <a href="/admin/cabinets" class="px-8 py-4 uppercase tracking-[0.3em] text-[11px] font-medium text-black-soft/40 hover:text-black-soft transition-colors">Cancel</a> <button type="submit" class="bg-gold text-white px-12 py-4 uppercase tracking-[0.3em] text-[11px] font-medium hover:bg-black-soft transition-colors shadow-lg">Update Product</button> </div> </form> ${result?.error && renderTemplate`<p class="mt-6 text-red-500 text-xs font-light italic text-center">${result.error.message}</p>`} </div> </div> ` })}`;
}, "C:/Marcos/Proyectos/BA/web/web-ba/src/pages/admin/cabinets/[id].astro", void 0);

const $$file = "C:/Marcos/Proyectos/BA/web/web-ba/src/pages/admin/cabinets/[id].astro";
const $$url = "/admin/cabinets/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
