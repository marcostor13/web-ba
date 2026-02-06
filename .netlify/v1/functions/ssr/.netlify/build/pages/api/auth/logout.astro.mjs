import { l as lucia } from '../../../chunks/auth_BXBfL_D5.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async (context) => {
  if (!context.locals.session) {
    return context.redirect("/admin/login");
  }
  await lucia.invalidateSession(context.locals.session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return context.redirect("/admin/login");
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
