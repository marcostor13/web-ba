import { d as createComponent, l as renderComponent, r as renderTemplate, g as createAstro, m as maybeRenderHead, f as addAttribute } from '../../chunks/astro/server_CrEBP8um.mjs';
import 'piccolore';
import { $ as $$Layout, a as $$Header } from '../../chunks/Header_C3kthhmz.mjs';
import { p as pool } from '../../chunks/db_DIG-MEGf.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const [rows] = await pool.execute("SELECT * FROM cabinets WHERE id = ?", [id]);
  const cabinet = rows[0];
  if (!cabinet) {
    return Astro2.redirect("/cabinets");
  }
  const [relatedRows] = await pool.execute(
    "SELECT * FROM cabinets WHERE id != ? AND tag = ? LIMIT 3",
    [id, cabinet.tag]
  );
  let relatedCabinets = relatedRows;
  if (relatedCabinets.length === 0) {
    const [fallbackRows] = await pool.execute(
      "SELECT * FROM cabinets WHERE id != ? LIMIT 3",
      [id]
    );
    relatedCabinets = fallbackRows;
  }
  const specs = cabinet.specifications ? cabinet.specifications.split("\n").filter((s) => s.trim() !== "") : [];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${cabinet.name} | Cabinets | BA Kitchen & Bath Remodeling` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main> <!-- Hero Section --> <section class="relative h-[60vh] min-h-[400px] flex items-end justify-start text-white px-6 md:px-[54px] pt-[110px] pb-10 md:pb-[80px] bg-cover bg-center"${addAttribute(`background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('/cabinets/Image_Header (4).webp');`, "style")}> <div class="reveal reveal-up"> <h1 class="text-5xl md:text-[80px] leading-tight font-light text-white m-0">
Cabinets
</h1> </div> </section> <!-- Product Detail Section --> <section class="bg-beige-light px-6 md:px-[54px] lg:px-[140px] py-[110px]"> <div class="max-w-[1200px] mx-auto"> <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start"> <!-- Image Column --> <div class="reveal reveal-left"> <div class="aspect-[1/1.5] flex items-center justify-center group overflow-hidden"> <img${addAttribute(cabinet.image, "src")}${addAttribute(cabinet.name, "alt")} class="w-full h-auto object-contain transform hover:scale-105 transition-transform duration-1000"> </div> </div> <!-- Info Column --> <div class="flex flex-col reveal reveal-right"> <span class="text-[12px] uppercase tracking-[0.25em] text-black-soft/40 font-bold mb-2"> ${cabinet.brand} </span> <h2 class="text-4xl md:text-[50px] font-light text-black-soft mb-8 leading-tight"> ${cabinet.name} </h2> <p class="text-[16px] text-black-soft/70 font-light mb-12 leading-relaxed"> ${cabinet.description} </p> <div class="mb-12"> <h4 class="text-[14px] uppercase tracking-widest font-bold text-black-soft mb-6">${cabinet.series}</h4> <ul class="space-y-4"> ${specs.map((spec) => renderTemplate`<li class="flex items-start gap-3 text-[14px] text-black-soft/60 font-light"> <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold/40 flex-shrink-0"></span> ${spec} </li>`)} </ul> </div> <div class="flex items-center gap-4 pt-8 border-t border-black-soft/5"> <span class="text-[14px] text-black-soft/60 font-light">Color:</span> <div class="w-6 h-6 rounded-sm border border-black-soft/10"${addAttribute(`background-color: ${(cabinet.tag || "").toLowerCase() === "white" ? "#fff" : (cabinet.tag || "").toLowerCase() === "brown" ? "#5D4037" : (cabinet.tag || "").toLowerCase() === "gray" ? "#9E9E9E" : "#1A237E"}`, "style")}></div> </div> </div> </div> </div> </section> <!-- Related Products --> <section class="bg-beige-light px-6 md:px-[54px] lg:px-[140px] pb-[110px]"> <div class="max-w-[1200px] mx-auto border-t border-black-soft/5 pt-24"> <h3 class="text-[14px] uppercase tracking-[0.3em] font-medium text-black-soft/40 mb-16 reveal reveal-up">Related</h3> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-32"> ${relatedCabinets.map((item, index) => renderTemplate`<a${addAttribute(`/cabinets/${item.id}`, "href")} class="flex flex-col gap-10 reveal reveal-up group"${addAttribute(`animation-delay: ${index * 100}ms`, "style")}> <div class="max-w-[280px] mx-auto w-full flex flex-col gap-10"> <div class="aspect-[1/1.5] w-full flex items-center justify-center overflow-hidden"> <img${addAttribute(item.image, "src")}${addAttribute(item.name, "alt")} class="w-full h-auto object-contain transform group-hover:scale-105 transition-transform duration-1000"> </div> <div class="flex flex-col gap-2 text-left whitespace-nowrap"> <span class="text-[9px] tracking-[0.1em] text-black-soft/40 font-medium">${item.brand}</span> <h3 class="text-[16px] md:text-[18px] font-normal text-black-soft m-0 group-hover:text-gold transition-colors">${item.name}</h3> </div> </div> </a>`)} </div> </div> </section> <!-- CTA Section --> <section class="relative h-screen flex items-end overflow-hidden"> <div class="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] hover:scale-105" style="background-image: url('/cabinets/Image_Background (5).webp');"></div> <div class="absolute inset-0 bg-black/20"></div> <div class="relative z-10 w-full px-6 md:px-[54px] lg:px-[140px] pb-16 md:pb-24 max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-end gap-8"> <div class="reveal reveal-left"> <h2 class="text-3xl md:text-[42px] leading-tight font-light text-white max-w-[700px]">
Contact us for a quick online estimate or to schedule an in-home consult.
</h2> </div> <div class="reveal reveal-right"> <a href="/contact" class="text-[12px] uppercase tracking-[0.3em] font-medium text-white border-b border-white hover:text-gold hover:border-gold transition-all duration-300 pb-2 mb-2 inline-block">
Start now
</a> </div> </div> </section> </main> ` })}`;
}, "C:/Marcos/Proyectos/BA/web/web-ba/src/pages/cabinets/[id].astro", void 0);

const $$file = "C:/Marcos/Proyectos/BA/web/web-ba/src/pages/cabinets/[id].astro";
const $$url = "/cabinets/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
