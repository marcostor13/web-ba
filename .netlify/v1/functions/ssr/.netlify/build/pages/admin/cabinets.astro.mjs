import { d as createComponent, l as renderComponent, r as renderTemplate, m as maybeRenderHead, f as addAttribute } from '../../chunks/astro/server_CrEBP8um.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_CZ-14psD.mjs';
import { p as pool } from '../../chunks/db_DIG-MEGf.mjs';
import { a as actions } from '../../chunks/virtual_CZpefBZC.mjs';
export { renderers } from '../../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const [cabinets] = await pool.execute("SELECT * FROM cabinets ORDER BY created_at DESC");
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Manage Cabinets" }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="flex flex-col gap-10"> <header class="flex flex-col md:flex-row justify-between items-end gap-6"> <div class="flex flex-col gap-2"> <h1 class="text-[12px] uppercase tracking-[0.4em] text-black-soft/40 font-medium">Inventory</h1> <h2 class="text-4xl md:text-[50px] font-light text-black-soft m-0">Colors Cabinets</h2> </div> <a href="/admin/cabinets/new" class="bg-gold text-white px-8 py-4 uppercase tracking-[0.3em] text-[11px] font-medium hover:bg-black-soft transition-colors flex items-center gap-3"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path> </svg>
Add Cabinet
</a> </header> <div class="bg-white shadow-xl rounded-sm border border-black-soft/5 overflow-hidden"> <div class="overflow-x-auto"> <table class="w-full text-left border-collapse"> <thead> <tr class="bg-black-soft/5"> <th class="px-8 py-6 text-[10px] uppercase tracking-[0.2em] font-medium text-black-soft/60">Image</th> <th class="px-8 py-6 text-[10px] uppercase tracking-[0.2em] font-medium text-black-soft/60">Details</th> <th class="px-8 py-6 text-[10px] uppercase tracking-[0.2em] font-medium text-black-soft/60">Tag</th> <th class="px-8 py-6 text-[10px] uppercase tracking-[0.2em] font-medium text-black-soft/60">Actions</th> </tr> </thead> <tbody class="divide-y divide-black-soft/5 font-light"> ${cabinets.map((item) => renderTemplate`<tr class="hover:bg-beige-light/30 transition-colors"> <td class="px-8 py-6"> <div class="w-20 h-24 bg-beige-light flex items-center justify-center overflow-hidden rounded-sm"> <img${addAttribute(item.image, "src")}${addAttribute(item.name, "alt")} class="w-full h-full object-contain"> </div> </td> <td class="px-8 py-6"> <div class="flex flex-col gap-1"> <span class="text-[10px] uppercase tracking-widest text-gold font-medium">${item.brand}</span> <span class="text-lg text-black-soft">${item.name}</span> <span class="text-xs text-black-soft/40">${item.series}</span> </div> </td> <td class="px-8 py-6"> <span class="px-3 py-1 bg-black-soft/5 rounded-full text-[10px] uppercase tracking-widest text-black-soft/60"> ${item.tag} </span> </td> <td class="px-8 py-6"> <div class="flex items-center gap-4"> <a${addAttribute(`/admin/cabinets/${item.id}`, "href")} class="text-[10px] uppercase tracking-widest text-black-soft hover:text-gold transition-colors font-medium border-b border-black-soft/20 hover:border-gold">Edit</a> <form method="POST"${addAttribute(actions.deleteCabinet, "action")} onsubmit="return confirm('Are you sure you want to delete this product?')"> <input type="hidden" name="id"${addAttribute(item.id, "value")}> <button type="submit" class="text-[10px] uppercase tracking-widest text-red-500/60 hover:text-red-500 transition-colors font-medium border-b border-red-500/20 hover:border-red-500">
Delete
</button> </form> </div> </td> </tr>`)} ${cabinets.length === 0 && renderTemplate`<tr> <td colspan="4" class="px-8 py-20 text-center text-black-soft/30 italic font-light tracking-widest text-sm">
No cabinets found. Start by adding your first product.
</td> </tr>`} </tbody> </table> </div> </div> </div> ` })}`;
}, "C:/Marcos/Proyectos/BA/web/web-ba/src/pages/admin/cabinets/index.astro", void 0);

const $$file = "C:/Marcos/Proyectos/BA/web/web-ba/src/pages/admin/cabinets/index.astro";
const $$url = "/admin/cabinets";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
