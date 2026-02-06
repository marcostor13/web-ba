import { d as createComponent, l as renderComponent, r as renderTemplate, m as maybeRenderHead, f as addAttribute } from '../chunks/astro/server_CrEBP8um.mjs';
import 'piccolore';
import { $ as $$Layout, a as $$Header } from '../chunks/Header_C3kthhmz.mjs';
import { p as pool } from '../chunks/db_DIG-MEGf.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const [rows] = await pool.execute("SELECT * FROM blog_posts ORDER BY created_at DESC");
  const posts = rows;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blog | BA Kitchen & Bath Remodeling" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main> <!-- Hero Section --> <section class="relative h-screen min-h-screen flex items-end justify-start text-white px-6 md:px-[54px] pt-[110px] pb-10 md:pb-[100px] bg-cover bg-center" style="background-image: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url('/blog/image_header-10.webp');"> <div class="reveal reveal-up"> <h1 class="text-5xl md:text-[80px] leading-tight font-light text-white m-0">
Blog
</h1> </div> </section> <!-- Blog Grid --> <section class="bg-beige-light px-6 md:px-[54px] lg:px-[140px] py-[110px] min-h-screen"> <div class="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24"> ${posts.map((post, index) => renderTemplate`<article${addAttribute(`flex flex-col gap-6 reveal reveal-up delay-${index % 2 * 200}`, "class")}> <a${addAttribute(`/blog/${post.slug}`, "href")} class="block overflow-hidden group"> <img${addAttribute(post.main_image, "src")}${addAttribute(post.title, "alt")} class="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"> </a> <div class="flex flex-col gap-4"> <h2 class="text-[24px] md:text-[28px] font-light text-black-soft leading-tight"> <a${addAttribute(`/blog/${post.slug}`, "href")} class="hover:text-gold transition-colors">${post.title}</a> </h2> <p class="text-[15px] leading-relaxed text-black-soft/70 font-light line-clamp-3"> ${post.short_description} </p> <a${addAttribute(`/blog/${post.slug}`, "href")} class="text-[12px] uppercase tracking-[0.2em] text-gold hover:text-black-soft transition-colors w-fit border-b border-gold pb-1 mt-2">
Read more
</a> </div> </article>`)} </div> </section> </main> ` })}`;
}, "C:/Marcos/Proyectos/BA/web/web-ba/src/pages/blog/index.astro", void 0);

const $$file = "C:/Marcos/Proyectos/BA/web/web-ba/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
