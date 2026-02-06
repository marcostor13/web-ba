import { d as createComponent, l as renderComponent, r as renderTemplate, g as createAstro, m as maybeRenderHead, f as addAttribute } from '../../../chunks/astro/server_CrEBP8um.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../../chunks/AdminLayout_CZ-14psD.mjs';
import { a as actions } from '../../../chunks/virtual_CZpefBZC.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const $$New = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$New;
  const result = Astro2.getActionResult(actions.createCabinet);
  if (result?.data?.success) {
    return Astro2.redirect("/admin/cabinets");
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Add New Cabinet" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-4xl flex flex-col gap-10"> <header class="flex flex-col gap-2"> <h1 class="text-[12px] uppercase tracking-[0.4em] text-black-soft/40 font-medium">Inventory / New</h1> <h2 class="text-4xl md:text-[50px] font-light text-black-soft m-0 uppercase tracking-tight">Add Cabinet</h2> </header> <div class="bg-white p-10 shadow-xl rounded-sm border border-black-soft/5"> <form method="POST"${addAttribute(actions.createCabinet, "action")} enctype="multipart/form-data" class="grid grid-cols-1 md:grid-cols-2 gap-10"> <!-- Main Info --> <div class="flex flex-col gap-8"> <div class="flex flex-col gap-2"> <label for="name" class="text-[10px] uppercase tracking-[0.2em] text-black-soft/60">Product Name / Title</label> <input type="text" name="name" id="name" required class="border-b border-black-soft/20 py-2 focus:border-gold outline-none transition-colors font-light text-lg" placeholder="e.g. Classic White"> </div> <div class="flex flex-col gap-2"> <label for="brand" class="text-[10px] uppercase tracking-[0.2em] text-black-soft/60">Brand</label> <input type="text" name="brand" id="brand" class="border-b border-black-soft/20 py-2 focus:border-gold outline-none transition-colors font-light" value="BA Kitchen & Bath"> </div> <div class="flex flex-col gap-2"> <label for="series" class="text-[10px] uppercase tracking-[0.2em] text-black-soft/60">Series</label> <input type="text" name="series" id="series" class="border-b border-black-soft/20 py-2 focus:border-gold outline-none transition-colors font-light" placeholder="e.g. Frameless Series"> </div> <div class="flex flex-col gap-2"> <label for="tag" class="text-[10px] uppercase tracking-[0.2em] text-black-soft/60">Category / Color Tag</label> <select name="tag" id="tag" class="border-b border-black-soft/20 py-2 focus:border-gold outline-none transition-colors font-light bg-transparent"> <option value="White">White</option> <option value="Gray">Gray</option> <option value="Blue">Blue</option> <option value="Brown">Brown</option> </select> </div> </div> <!-- Extra Info --> <div class="flex flex-col gap-8"> <div class="flex flex-col gap-2"> <label for="image" class="text-[10px] uppercase tracking-[0.2em] text-black-soft/60">Product Image</label> <input type="file" name="image" id="image" accept="image/*" required class="font-light text-xs text-black-soft/60 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:uppercase file:tracking-widest file:bg-beige-light file:text-black-soft hover:file:bg-gold hover:file:text-white file:transition-colors"> </div> <div class="flex flex-col gap-2"> <label for="description" class="text-[10px] uppercase tracking-[0.2em] text-black-soft/60">Description</label> <textarea name="description" id="description" rows="3" class="border border-black-soft/10 p-4 focus:border-gold outline-none transition-colors font-light text-sm resize-none" placeholder="A brief overview of the product..."></textarea> </div> <div class="flex flex-col gap-2"> <label for="specifications" class="text-[10px] uppercase tracking-[0.2em] text-black-soft/60">Product Details (one per line)</label> <textarea name="specifications" id="specifications" rows="5" class="border border-black-soft/10 p-4 focus:border-gold outline-none transition-colors font-light text-sm resize-none" placeholder="Solid wood doors\nSoft-close hinges\nPlywood construction..."></textarea> </div> </div> <div class="md:col-span-2 flex justify-end gap-6 pt-10 border-t border-black-soft/5"> <a href="/admin/cabinets" class="px-8 py-4 uppercase tracking-[0.3em] text-[11px] font-medium text-black-soft/40 hover:text-black-soft transition-colors">Cancel</a> <button type="submit" class="bg-gold text-white px-12 py-4 uppercase tracking-[0.3em] text-[11px] font-medium hover:bg-black-soft transition-colors shadow-lg">Save Product</button> </div> </form> ${result?.error && renderTemplate`<p class="mt-6 text-red-500 text-xs font-light italic text-center">${result.error.message}</p>`} </div> </div> ` })}`;
}, "C:/Marcos/Proyectos/BA/web/web-ba/src/pages/admin/cabinets/new.astro", void 0);

const $$file = "C:/Marcos/Proyectos/BA/web/web-ba/src/pages/admin/cabinets/new.astro";
const $$url = "/admin/cabinets/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$New,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
