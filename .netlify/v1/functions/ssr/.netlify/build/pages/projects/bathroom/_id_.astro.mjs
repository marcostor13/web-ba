import { d as createComponent, l as renderComponent, r as renderTemplate, g as createAstro, m as maybeRenderHead, f as addAttribute } from '../../../chunks/astro/server_CrEBP8um.mjs';
import 'piccolore';
import { $ as $$Layout, a as $$Header } from '../../../chunks/Header_C3kthhmz.mjs';
import { p as pool } from '../../../chunks/db_DIG-MEGf.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const [projectRows] = await pool.execute("SELECT * FROM projects WHERE id = ?", [id]);
  const project = projectRows[0];
  if (!project) {
    return Astro2.redirect("/bathroom");
  }
  const [imageRows] = await pool.execute("SELECT * FROM project_images WHERE project_id = ? ORDER BY id ASC", [id]);
  const gallery = imageRows;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${project.name} | Projects | BA Kitchen & Bath Remodeling` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main> <!-- Section 1: Hero Image --> <section class="relative h-screen min-h-screen bg-cover bg-center"${addAttribute(`background-image: url('${project.main_image}');`, "style")}> <div class="absolute inset-0 bg-black/10"></div> </section> <!-- Section 2: Title and Gallery --> <section class="bg-beige-light px-6 md:px-[54px] lg:px-[140px] py-[110px]"> <div class="max-w-[1000px] mx-auto flex flex-col items-center gap-16"> <!-- Project Title --> <h2 class="text-[18px] md:text-[22px] uppercase tracking-[0.4em] font-light text-black-soft text-center reveal reveal-up"> ${project.name} </h2> <!-- Main Image (Featured again in gallery) --> <div class="w-full reveal reveal-up delay-100"> <img${addAttribute(project.main_image, "src")}${addAttribute(`${project.name} main view`, "alt")} class="w-full h-auto shadow-sm"> </div> <!-- Gallery Grid (2 Columns) --> <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full"> ${gallery.map((img, index) => renderTemplate`<div class="reveal reveal-up"${addAttribute(`animation-delay: ${index * 100}ms`, "style")}> <img${addAttribute(img.image_path, "src")}${addAttribute(`${project.name} gallery image ${index + 1}`, "alt")} class="w-full h-auto shadow-sm hover:scale-[1.02] transition-transform duration-700 cursor-zoom-in"> </div>`)} </div> <!-- Back Link --> <div class="mt-16 reveal reveal-up"> <a href="/bathroom" class="text-[11px] uppercase tracking-[0.3em] font-medium text-black-soft/40 hover:text-gold transition-colors border-b border-black-soft/10 hover:border-gold pb-1">
Back to Bathrooms
</a> </div> </div> </section> </main> ` })}`;
}, "C:/Marcos/Proyectos/BA/web/web-ba/src/pages/projects/bathroom/[id].astro", void 0);

const $$file = "C:/Marcos/Proyectos/BA/web/web-ba/src/pages/projects/bathroom/[id].astro";
const $$url = "/projects/bathroom/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
