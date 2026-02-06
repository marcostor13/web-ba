import { d as createComponent, l as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CrEBP8um.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../chunks/AdminLayout_CZ-14psD.mjs';
import { p as pool } from '../chunks/db_DIG-MEGf.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const [cabinetsRows] = await pool.execute("SELECT COUNT(*) as count FROM cabinets");
  const stats = {
    cabinets: cabinetsRows[0].count
  };
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Dashboard" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col gap-10"> <header class="flex flex-col gap-2"> <h1 class="text-[12px] uppercase tracking-[0.4em] text-black-soft/40 font-medium">Overview</h1> <h2 class="text-4xl md:text-[50px] font-light text-black-soft m-0">Dashboard</h2> </header> <div class="grid grid-cols-1 md:grid-cols-3 gap-8"> <div class="bg-white p-10 shadow-lg rounded-sm border border-black-soft/5 flex flex-col gap-4"> <span class="text-[10px] uppercase tracking-[0.3em] text-black-soft/40 font-medium">Total Products</span> <div class="flex items-baseline gap-4"> <span class="text-5xl font-light text-black-soft">${stats.cabinets}</span> <span class="text-gold text-sm font-medium tracking-widest uppercase">Cabinets</span> </div> </div> <a href="/admin/cabinets" class="bg-gold p-10 shadow-lg rounded-sm border border-black-soft/5 flex flex-col justify-between hover:bg-black-soft transition-colors group"> <span class="text-[10px] uppercase tracking-[0.3em] text-white/60 font-medium">Quick Access</span> <div class="flex items-center justify-between"> <span class="text-2xl font-light text-white uppercase tracking-widest">Manage Cabinets</span> <svg class="w-6 h-6 text-white transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4 4H3"></path> </svg> </div> </a> <a href="/admin/blog" class="bg-white p-10 shadow-lg rounded-sm border border-black-soft/5 flex flex-col justify-between hover:border-gold/50 transition-colors group"> <span class="text-[10px] uppercase tracking-[0.3em] text-black-soft/40 font-medium">Content</span> <div class="flex items-center justify-between"> <span class="text-2xl font-light text-black-soft uppercase tracking-widest">Manage Blog</span> <svg class="w-6 h-6 text-black-soft transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4 4H3"></path> </svg> </div> </a> </div> <div class="mt-10"> <h3 class="text-[12px] uppercase tracking-[0.3em] text-black-soft/40 font-medium mb-8">System Status</h3> <div class="bg-white p-8 border border-black-soft/5 rounded-sm"> <div class="flex items-center gap-4"> <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> <p class="text-[14px] font-light text-black-soft/60">Connected to MySQL Local Instance</p> </div> </div> </div> </div> ` })}`;
}, "C:/Marcos/Proyectos/BA/web/web-ba/src/pages/admin/index.astro", void 0);

const $$file = "C:/Marcos/Proyectos/BA/web/web-ba/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
