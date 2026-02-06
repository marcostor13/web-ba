import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_DZFmO2Zu.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/_actions/_---path_.astro.mjs');
const _page2 = () => import('./pages/about-us.astro.mjs');
const _page3 = () => import('./pages/admin/blog/edit/_id_.astro.mjs');
const _page4 = () => import('./pages/admin/blog/new.astro.mjs');
const _page5 = () => import('./pages/admin/blog.astro.mjs');
const _page6 = () => import('./pages/admin/cabinets/new.astro.mjs');
const _page7 = () => import('./pages/admin/cabinets/_id_.astro.mjs');
const _page8 = () => import('./pages/admin/cabinets.astro.mjs');
const _page9 = () => import('./pages/admin/login.astro.mjs');
const _page10 = () => import('./pages/admin/projects/new.astro.mjs');
const _page11 = () => import('./pages/admin/projects/_id_.astro.mjs');
const _page12 = () => import('./pages/admin/projects.astro.mjs');
const _page13 = () => import('./pages/admin/register.astro.mjs');
const _page14 = () => import('./pages/admin.astro.mjs');
const _page15 = () => import('./pages/api/auth/logout.astro.mjs');
const _page16 = () => import('./pages/bathroom.astro.mjs');
const _page17 = () => import('./pages/blog/_slug_.astro.mjs');
const _page18 = () => import('./pages/blog.astro.mjs');
const _page19 = () => import('./pages/cabinets/_id_.astro.mjs');
const _page20 = () => import('./pages/cabinets.astro.mjs');
const _page21 = () => import('./pages/contact.astro.mjs');
const _page22 = () => import('./pages/kitchen.astro.mjs');
const _page23 = () => import('./pages/our-process.astro.mjs');
const _page24 = () => import('./pages/projects/basement.astro.mjs');
const _page25 = () => import('./pages/projects/bathroom/_id_.astro.mjs');
const _page26 = () => import('./pages/projects/kitchen/_id_.astro.mjs');
const _page27 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["node_modules/astro/dist/actions/runtime/route.js", _page1],
    ["src/pages/about-us.astro", _page2],
    ["src/pages/admin/blog/edit/[id].astro", _page3],
    ["src/pages/admin/blog/new.astro", _page4],
    ["src/pages/admin/blog/index.astro", _page5],
    ["src/pages/admin/cabinets/new.astro", _page6],
    ["src/pages/admin/cabinets/[id].astro", _page7],
    ["src/pages/admin/cabinets/index.astro", _page8],
    ["src/pages/admin/login.astro", _page9],
    ["src/pages/admin/projects/new.astro", _page10],
    ["src/pages/admin/projects/[id].astro", _page11],
    ["src/pages/admin/projects/index.astro", _page12],
    ["src/pages/admin/register.astro", _page13],
    ["src/pages/admin/index.astro", _page14],
    ["src/pages/api/auth/logout.ts", _page15],
    ["src/pages/bathroom.astro", _page16],
    ["src/pages/blog/[slug].astro", _page17],
    ["src/pages/blog/index.astro", _page18],
    ["src/pages/cabinets/[id].astro", _page19],
    ["src/pages/cabinets.astro", _page20],
    ["src/pages/contact.astro", _page21],
    ["src/pages/kitchen.astro", _page22],
    ["src/pages/our-process.astro", _page23],
    ["src/pages/projects/basement.astro", _page24],
    ["src/pages/projects/bathroom/[id].astro", _page25],
    ["src/pages/projects/kitchen/[id].astro", _page26],
    ["src/pages/index.astro", _page27]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "395ca137-f9e2-40ab-8f2b-178a4122b1a5"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
