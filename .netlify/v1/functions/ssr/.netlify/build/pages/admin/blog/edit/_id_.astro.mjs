import { d as createComponent, r as renderTemplate, n as renderScript, p as defineScriptVars, l as renderComponent, g as createAstro, m as maybeRenderHead, f as addAttribute } from '../../../../chunks/astro/server_CrEBP8um.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../../../chunks/AdminLayout_CZ-14psD.mjs';
import { a as actions } from '../../../../chunks/virtual_CZpefBZC.mjs';
import { p as pool } from '../../../../chunks/db_DIG-MEGf.mjs';
export { renderers } from '../../../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const [postRows] = await pool.execute("SELECT * FROM blog_posts WHERE id = ?", [id]);
  const post = postRows[0];
  if (!post) {
    return Astro2.redirect("/admin/blog");
  }
  const [sectionRows] = await pool.execute("SELECT * FROM blog_sections WHERE post_id = ? ORDER BY order_index ASC", [id]);
  const sections = sectionRows;
  const result = Astro2.getActionResult(actions.updateBlogPost);
  if (result?.data?.success) {
    return Astro2.redirect("/admin/blog");
  }
  const initialSections = JSON.stringify(sections.map((s) => ({
    id: s.id,
    // purely for keying if needed
    type: s.type,
    content: s.content_text,
    existing_image_1: s.image_path_1,
    existing_image_2: s.image_path_2
  })));
  return renderTemplate(_a || (_a = __template(["", " <!-- Inject Initial Data --> <script>(function(){", "\n    window.initialSections = JSON.parse(initialSections);\n    window.initialTitle = post.title;\n    window.initialMainImage = post.main_image;\n    window.initialDesc = post.short_description;\n})();<\/script> ", ""])), renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Edit Blog Post" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-[1600px] mx-auto flex flex-col gap-10 h-full"> <header class="flex flex-col gap-2"> <h1 class="text-[12px] uppercase tracking-[0.4em] text-black-soft/40 font-medium">Blog / Edit</h1> <h2 class="text-4xl md:text-[50px] font-light text-black-soft m-0 uppercase tracking-tight">Edit Post</h2> </header> <!-- Split View Container --> <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 h-full"> <!-- Left: Form --> <div class="bg-white p-10 shadow-xl rounded-sm border border-black-soft/5 h-fit"> <form id="blog-form" method="POST"${addAttribute(actions.updateBlogPost, "action")} enctype="multipart/form-data" class="flex flex-col gap-10"> <input type="hidden" name="id"${addAttribute(post.id, "value")}> <!-- Main Info --> <div class="grid grid-cols-1 gap-8 border-b border-black-soft/5 pb-10"> <div class="flex flex-col gap-2"> <label for="title" class="text-[10px] uppercase tracking-[0.2em] text-black-soft/60">Post Title</label> <input type="text" name="title" id="title" required${addAttribute(post.title, "value")} class="border-b border-black-soft/20 py-2 focus:border-gold outline-none transition-colors font-light text-lg"> </div> <div class="flex flex-col gap-2"> <label for="main_image" class="text-[10px] uppercase tracking-[0.2em] text-black-soft/60">Main Image (Leave empty to keep current)</label> <input type="file" name="main_image" id="main_image" accept="image/*" class="font-light text-xs text-black-soft/60 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:uppercase file:tracking-widest file:bg-beige-light file:text-black-soft hover:file:bg-gold hover:file:text-white file:transition-colors"> <img${addAttribute(post.main_image, "src")} alt="Current" class="w-32 h-20 object-cover mt-2 rounded-sm bg-gray-100"> </div> <div class="flex flex-col gap-2"> <label for="short_description" class="text-[10px] uppercase tracking-[0.2em] text-black-soft/60">Short Description</label> <textarea name="short_description" id="short_description" rows="3" class="border border-black-soft/10 p-4 focus:border-gold outline-none transition-colors font-light text-sm resize-none">${post.short_description}</textarea> </div> </div> <!-- Dynamic Sections --> <div class="flex flex-col gap-6"> <div class="flex items-center justify-between"> <h3 class="text-[14px] uppercase tracking-[0.2em] text-black-soft font-medium">Content Sections</h3> <button type="button" id="add-section-btn" class="bg-black-soft text-white px-6 py-2 uppercase tracking-widest text-[10px] hover:bg-gold transition-colors">
+ Add Section
</button> </div> <div id="sections-container" class="flex flex-col gap-8"> <!-- Sections will be injected here --> </div> </div> <!-- Hidden Input for JSON --> <input type="hidden" name="sections" id="sections-json"> <div class="flex justify-end gap-6 pt-10 border-t border-black-soft/5"> <a href="/admin/blog" class="px-8 py-4 uppercase tracking-[0.3em] text-[11px] font-medium text-black-soft/40 hover:text-black-soft transition-colors">Cancel</a> <button type="submit" class="bg-gold text-white px-12 py-4 uppercase tracking-[0.3em] text-[11px] font-medium hover:bg-black-soft transition-colors shadow-lg">Update Post</button> </div> </form> ${result?.error && renderTemplate`<p class="mt-6 text-red-500 text-xs font-light italic text-center">${result.error.message}</p>`} </div> <!-- Right: Live Preview --> <div class="hidden lg:block relative"> <div class="sticky top-10 bg-white shadow-2xl rounded-sm border border-black-soft/5 overflow-hidden h-[800px] overflow-y-auto w-full"> <!-- Preview Header --> <div class="bg-black-soft text-white p-4 text-[10px] uppercase tracking-widest text-center">Live Preview</div> <!-- Preview Content --> <div id="preview-area" class="bg-white"> <!-- Dynamic Preview Content --> </div> </div> </div> </div> </div> ` }), defineScriptVars({ initialSections, post }), renderScript($$result, "C:/Marcos/Proyectos/BA/web/web-ba/src/pages/admin/blog/edit/[id].astro?astro&type=script&index=0&lang.ts"));
}, "C:/Marcos/Proyectos/BA/web/web-ba/src/pages/admin/blog/edit/[id].astro", void 0);

const $$file = "C:/Marcos/Proyectos/BA/web/web-ba/src/pages/admin/blog/edit/[id].astro";
const $$url = "/admin/blog/edit/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
