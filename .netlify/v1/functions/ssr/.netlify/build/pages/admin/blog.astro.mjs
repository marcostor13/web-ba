import { d as createComponent, l as renderComponent, r as renderTemplate, m as maybeRenderHead, f as addAttribute } from '../../chunks/astro/server_CrEBP8um.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_CZ-14psD.mjs';
import { p as pool } from '../../chunks/db_DIG-MEGf.mjs';
export { renderers } from '../../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const [rows] = await pool.execute("SELECT * FROM blog_posts ORDER BY created_at DESC");
  const posts = rows;
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Manage Blog" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col gap-10"> <header class="flex flex-col md:flex-row md:items-end justify-between gap-4"> <div class="flex flex-col gap-2"> <h1 class="text-[12px] uppercase tracking-[0.4em] text-black-soft/40 font-medium">Content / Blog</h1> <h2 class="text-4xl md:text-[50px] font-light text-black-soft m-0 uppercase tracking-tight">Blog Posts</h2> </div> <a href="/admin/blog/new" class="bg-gold text-white px-8 py-3 uppercase tracking-[0.2em] text-[10px] font-medium hover:bg-black-soft transition-colors shadow-lg">
+ Create Post
</a> </header> <div class="bg-white border border-black-soft/5 rounded-sm overflow-hidden"> ${posts.length === 0 ? renderTemplate`<div class="p-10 text-center"> <p class="text-black-soft/40 font-light italic">No posts found. Start by creating one.</p> </div>` : renderTemplate`<table class="w-full text-left border-collapse"> <thead> <tr class="border-b border-black-soft/10 bg-beige-light/20"> <th class="p-4 text-[10px] uppercase tracking-[0.2em] text-black-soft/60 font-medium w-[80px]">Image</th> <th class="p-4 text-[10px] uppercase tracking-[0.2em] text-black-soft/60 font-medium">Title</th> <th class="p-4 text-[10px] uppercase tracking-[0.2em] text-black-soft/60 font-medium w-[150px]">Date</th> <th class="p-4 text-[10px] uppercase tracking-[0.2em] text-black-soft/60 font-medium w-[120px] text-right">Actions</th> </tr> </thead> <tbody> ${posts.map((post) => renderTemplate`<tr class="border-b border-black-soft/5 hover:bg-beige-light/10 transition-colors group"> <td class="p-4"> <img${addAttribute(post.main_image, "src")}${addAttribute(post.title, "alt")} class="w-12 h-12 object-cover rounded-sm bg-gray-100"> </td> <td class="p-4"> <div class="flex flex-col gap-1"> <span class="text-sm font-light text-black-soft group-hover:text-gold transition-colors">${post.title}</span> <span class="text-xs text-black-soft/40 font-light truncate max-w-[300px]">${post.short_description}</span> </div> </td> <td class="p-4"> <span class="text-xs text-black-soft/60 font-light font-mono"> ${new Date(post.created_at).toLocaleDateString()} </span> </td> <td class="p-4 text-right"> <div class="flex justify-end gap-4"> <!-- Edit --> <a${addAttribute(`/admin/blog/edit/${post.id}`, "href")} class="text-[10px] uppercase tracking-widest text-black-soft/40 hover:text-gold transition-colors font-medium">Edit</a> <!-- View --> <a${addAttribute(`/blog/${post.slug}`, "href")} target="_blank" class="text-[10px] uppercase tracking-widest text-black-soft/40 hover:text-gold transition-colors font-medium">View</a> </div> </td> </tr>`)} </tbody> </table>`} </div> </div> ` })}`;
}, "C:/Marcos/Proyectos/BA/web/web-ba/src/pages/admin/blog/index.astro", void 0);

const $$file = "C:/Marcos/Proyectos/BA/web/web-ba/src/pages/admin/blog/index.astro";
const $$url = "/admin/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
