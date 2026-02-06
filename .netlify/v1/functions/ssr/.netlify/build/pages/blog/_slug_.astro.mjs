import { d as createComponent, l as renderComponent, r as renderTemplate, g as createAstro, m as maybeRenderHead, f as addAttribute } from '../../chunks/astro/server_CrEBP8um.mjs';
import 'piccolore';
import { $ as $$Layout, a as $$Header } from '../../chunks/Header_C3kthhmz.mjs';
import { p as pool } from '../../chunks/db_DIG-MEGf.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const [rows] = await pool.execute("SELECT * FROM blog_posts WHERE slug = ?", [slug]);
  const post = rows[0];
  if (!post) {
    return Astro2.redirect("/blog");
  }
  const [sectionRows] = await pool.execute("SELECT * FROM blog_sections WHERE post_id = ? ORDER BY order_index ASC", [post.id]);
  const sections = sectionRows;
  const [relatedRows] = await pool.execute("SELECT * FROM blog_posts WHERE id != ? ORDER BY created_at DESC LIMIT 3", [post.id]);
  const relatedPosts = relatedRows;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${post.title} | Blog` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main> <!-- Hero --> <section class="h-[60vh] md:h-[70vh] relative flex items-end justify-center bg-cover bg-center"${addAttribute(`background-image: url('${post.main_image}');`, "style")}> <div class="absolute inset-0 bg-black/30"></div> <div class="relative z-10 text-center pb-20 px-6 max-w-4xl mx-auto"> <h1 class="text-3xl md:text-5xl lg:text-6xl text-white font-light leading-tight mb-4 reveal reveal-up">${post.title}</h1> <p class="text-white/80 text-base md:text-lg font-light reveal reveal-up delay-100 max-w-2xl mx-auto">${post.short_description}</p> </div> </section> <!-- Content Sections --> <article class="max-w-[1000px] mx-auto px-6 md:px-0 py-24 flex flex-col gap-16"> ${sections.map((section, index) => renderTemplate`<div${addAttribute(`reveal reveal-up delay-${index % 3 * 100} w-full`, "class")}> ${section.type === "title" && renderTemplate`<h2 class="text-3xl md:text-[40px] font-light text-black-soft mb-8 leading-tight">${section.content_text}</h2>`} ${section.type === "paragraph" && renderTemplate`<p class="text-[17px] md:text-[19px] text-black-soft/80 font-light leading-[1.8] whitespace-pre-line tracking-wide">${section.content_text}</p>`} ${section.type === "image_single" && renderTemplate`<img${addAttribute(section.image_path_1, "src")}${addAttribute(post.title, "alt")} class="w-full h-auto object-cover rounded-sm my-8 shadow-lg">`} ${section.type === "image_double" && renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-8"> <img${addAttribute(section.image_path_1, "src")} alt="Gallery 1" class="w-full h-[350px] md:h-[600px] object-cover rounded-sm shadow-md"> <img${addAttribute(section.image_path_2, "src")} alt="Gallery 2" class="w-full h-[350px] md:h-[600px] object-cover rounded-sm shadow-md"> </div>`} </div>`)} </article> <!-- Related Posts --> <section class="bg-beige-light py-24 px-6 md:px-[54px] lg:px-[140px] border-t border-black-soft/5"> <div class="max-w-[1200px] mx-auto"> <h3 class="text-2xl font-light text-black-soft mb-12 uppercase tracking-widest text-center">Related Posts</h3> <div class="grid grid-cols-1 md:grid-cols-3 gap-10"> ${relatedPosts.map((p) => renderTemplate`<a${addAttribute(`/blog/${p.slug}`, "href")} class="group flex flex-col gap-4"> <div class="overflow-hidden bg-gray-200"> <img${addAttribute(p.main_image, "src")}${addAttribute(p.title, "alt")} class="w-full h-[250px] object-cover transition-transform duration-700 group-hover:scale-105"> </div> <h4 class="text-xl font-light text-black-soft group-hover:text-gold transition-colors">${p.title}</h4> </a>`)} </div> </div> </section> </main> ` })}`;
}, "C:/Marcos/Proyectos/BA/web/web-ba/src/pages/blog/[slug].astro", void 0);

const $$file = "C:/Marcos/Proyectos/BA/web/web-ba/src/pages/blog/[slug].astro";
const $$url = "/blog/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
