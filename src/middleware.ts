import { lucia } from "./lib/auth";
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
    const sessionId = context.cookies.get(lucia.sessionCookieName)?.value ?? null;
    const { session, user } = sessionId
        ? await lucia.validateSession(sessionId)
        : { session: null, user: null };

    if (session && session.fresh) {
        const sessionCookie = lucia.createSessionCookie(session.id);
        context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
    if (!session && sessionId) {
        const sessionCookie = lucia.createBlankSessionCookie();
        context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }

    context.locals.session = session;
    context.locals.user = user;

    // Protect admin routes
    if (context.url.pathname.startsWith("/admin")) {
        // Whitelist login and register
        if (context.url.pathname !== "/admin/login" && context.url.pathname !== "/admin/register") {
            if (!user) {
                return context.redirect("/admin/login");
            }
        }
    }

    return next();
});
