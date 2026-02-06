import { d as createComponent, l as renderComponent, r as renderTemplate, g as createAstro, m as maybeRenderHead, f as addAttribute } from '../../chunks/astro/server_CrEBP8um.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_CZ-14psD.mjs';
import { a as actions } from '../../chunks/virtual_CZpefBZC.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Register = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Register;
  const user = Astro2.locals.user;
  if (user) {
    return Astro2.redirect("/admin");
  }
  const result = Astro2.getActionResult(actions.register);
  if (result?.data?.success) {
    return Astro2.redirect("/admin");
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Register" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-md mx-auto mt-20 p-10 bg-white shadow-xl rounded-sm border border-black-soft/5"> <h1 class="text-3xl font-light mb-8 uppercase tracking-widest text-center">Register Admin</h1> <form method="POST"${addAttribute(actions.register, "action")} class="flex flex-col gap-6"> <div class="flex flex-col gap-2"> <label for="username" class="text-[10px] uppercase tracking-[0.2em] text-black-soft/60">Desired Username</label> <input type="text" name="username" id="username" required minlength="3" class="border-b border-black-soft/20 py-2 focus:border-gold outline-none transition-colors font-light"> </div> <div class="flex flex-col gap-2"> <label for="password" class="text-[10px] uppercase tracking-[0.2em] text-black-soft/60">Password</label> <input type="password" name="password" id="password" required minlength="6" class="border-b border-black-soft/20 py-2 focus:border-gold outline-none transition-colors font-light"> </div> ${result?.error && renderTemplate`<p class="text-red-500 text-xs text-center font-light mt-2 italic">${result.error.message}</p>`} <button type="submit" class="mt-4 bg-black-soft text-white py-4 px-8 uppercase tracking-[0.3em] text-[12px] font-medium hover:bg-gold transition-colors">
Create Account
</button> </form> <div class="mt-8 text-center"> <p class="text-[11px] text-black-soft/40 uppercase tracking-widest">
Already have an account? <a href="/admin/login" class="text-gold border-b border-gold/30 hover:border-gold transition-all">Login</a> </p> </div> </div> ` })}`;
}, "C:/Marcos/Proyectos/BA/web/web-ba/src/pages/admin/register.astro", void 0);

const $$file = "C:/Marcos/Proyectos/BA/web/web-ba/src/pages/admin/register.astro";
const $$url = "/admin/register";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Register,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
