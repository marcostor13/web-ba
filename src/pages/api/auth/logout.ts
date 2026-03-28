import { lucia } from "../../../lib/auth";
import type { APIRoute } from "astro";

/** GET evita el aviso del pre-render estático; la sesión solo se invalida en POST. */
export const GET: APIRoute = async (context) => context.redirect("/admin/login");

export const POST: APIRoute = async (context) => {
  if (!context.locals.session) {
    return context.redirect("/admin/login");
  }

  await lucia.invalidateSession(context.locals.session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return context.redirect("/admin/login");
};
