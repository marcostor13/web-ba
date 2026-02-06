import { l as lucia } from './chunks/auth_BXBfL_D5.mjs';
import 'es-module-lexer';
import './chunks/shared_DyYQXJN5.mjs';
import 'piccolore';
import { o as originPathnameSymbol, A as AstroError, F as ForbiddenRewrite } from './chunks/astro/server_CrEBP8um.mjs';
import 'clsx';
import 'html-escaper';
import { s as shouldAppendForwardSlash, a as apiContextRoutesSymbol } from './chunks/render-context_DqXWylYx.mjs';
import { a as appendForwardSlash, r as removeTrailingForwardSlash } from './chunks/path_BV6vj9ag.mjs';

function setOriginPathname(request, pathname, trailingSlash, buildFormat) {
  if (!pathname) {
    pathname = "/";
  }
  const shouldAppendSlash = shouldAppendForwardSlash(trailingSlash, buildFormat);
  let finalPathname;
  if (pathname === "/") {
    finalPathname = "/";
  } else if (shouldAppendSlash) {
    finalPathname = appendForwardSlash(pathname);
  } else {
    finalPathname = removeTrailingForwardSlash(pathname);
  }
  Reflect.set(request, originPathnameSymbol, encodeURIComponent(finalPathname));
}

function getParams(route, pathname) {
  if (!route.params.length) return {};
  const paramsMatch = route.pattern.exec(pathname) || route.fallbackRoutes.map((fallbackRoute) => fallbackRoute.pattern.exec(pathname)).find((x) => x);
  if (!paramsMatch) return {};
  const params = {};
  route.params.forEach((key, i) => {
    if (key.startsWith("...")) {
      params[key.slice(3)] = paramsMatch[i + 1] ? paramsMatch[i + 1] : void 0;
    } else {
      params[key] = paramsMatch[i + 1];
    }
  });
  return params;
}

function sequence(...handlers) {
  const filtered = handlers.filter((h) => !!h);
  const length = filtered.length;
  if (!length) {
    return defineMiddleware((_context, next) => {
      return next();
    });
  }
  return defineMiddleware((context, next) => {
    let carriedPayload = void 0;
    return applyHandle(0, context);
    function applyHandle(i, handleContext) {
      const handle = filtered[i];
      const result = handle(handleContext, async (payload) => {
        if (i < length - 1) {
          if (payload) {
            let newRequest;
            if (payload instanceof Request) {
              newRequest = payload;
            } else if (payload instanceof URL) {
              newRequest = new Request(payload, handleContext.request.clone());
            } else {
              newRequest = new Request(
                new URL(payload, handleContext.url.origin),
                handleContext.request.clone()
              );
            }
            const oldPathname = handleContext.url.pathname;
            const pipeline = Reflect.get(handleContext, apiContextRoutesSymbol);
            const { routeData, pathname } = await pipeline.tryRewrite(
              payload,
              handleContext.request
            );
            if (pipeline.serverLike === true && handleContext.isPrerendered === false && routeData.prerender === true) {
              throw new AstroError({
                ...ForbiddenRewrite,
                message: ForbiddenRewrite.message(
                  handleContext.url.pathname,
                  pathname,
                  routeData.component
                ),
                hint: ForbiddenRewrite.hint(routeData.component)
              });
            }
            carriedPayload = payload;
            handleContext.request = newRequest;
            handleContext.url = new URL(newRequest.url);
            handleContext.params = getParams(routeData, pathname);
            handleContext.routePattern = routeData.route;
            setOriginPathname(
              handleContext.request,
              oldPathname,
              pipeline.manifest.trailingSlash,
              pipeline.manifest.buildFormat
            );
          }
          return applyHandle(i + 1, handleContext);
        } else {
          return next(payload ?? carriedPayload);
        }
      });
      return result;
    }
  });
}

function defineMiddleware(fn) {
  return fn;
}

const onRequest$1 = defineMiddleware(async (context, next) => {
  const sessionId = context.cookies.get(lucia.sessionCookieName)?.value ?? null;
  const { session, user } = sessionId ? await lucia.validateSession(sessionId) : { session: null, user: null };
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
  if (context.url.pathname.startsWith("/admin")) {
    if (context.url.pathname !== "/admin/login" && context.url.pathname !== "/admin/register") {
      if (!user) {
        return context.redirect("/admin/login");
      }
    }
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
