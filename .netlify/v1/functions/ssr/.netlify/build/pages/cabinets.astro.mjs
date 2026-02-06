import { d as createComponent, l as renderComponent, r as renderTemplate, p as defineScriptVars, f as addAttribute, m as maybeRenderHead } from '../chunks/astro/server_CrEBP8um.mjs';
import 'piccolore';
import { $ as $$Layout, a as $$Header } from '../chunks/Header_C3kthhmz.mjs';
import { p as pool } from '../chunks/db_DIG-MEGf.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Cabinets = createComponent(async ($$result, $$props, $$slots) => {
  const [rows] = await pool.execute("SELECT * FROM cabinets ORDER BY created_at DESC");
  const dbCabinets = rows.map((c) => ({
    id: c.id,
    brand: c.brand,
    name: c.name,
    color: c.tag,
    image: c.image
  }));
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Cabinets | BA Kitchen & Bath Remodeling", "data-astro-cid-aqmuqdry": true }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", " ", `<main data-astro-cid-aqmuqdry> <!-- Hero Section --> <section class="relative h-screen min-h-screen flex items-end justify-start text-white px-6 md:px-[54px] pt-[110px] pb-10 md:pb-[100px] bg-cover bg-center" style="background-image: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url('/our-process/Image_Header (2).webp');" data-astro-cid-aqmuqdry> <div class="reveal reveal-up" data-astro-cid-aqmuqdry> <h1 class="text-5xl md:text-[80px] leading-tight font-light text-white m-0" data-astro-cid-aqmuqdry>
Cabinets
</h1> </div> </section> <!-- Gallery Section --> <section class="bg-beige-light px-6 md:px-[54px] lg:px-[140px] py-[110px]" id="colors-gallery" data-astro-cid-aqmuqdry> <div class="max-w-[1200px] mx-auto w-full" data-astro-cid-aqmuqdry> <!-- Header & Title --> <div class="text-center mb-12 reveal reveal-up" data-astro-cid-aqmuqdry> <h2 class="text-4xl md:text-[50px] font-light text-black-soft tracking-tight" data-astro-cid-aqmuqdry>Colors</h2> </div> <!-- Controls & Filters Bar --> <div class="relative flex flex-col items-center justify-center mb-32 pt-8 border-t border-black-soft/5 reveal reveal-up delay-100" data-astro-cid-aqmuqdry> <!-- Left: Results Counter (Absolute on Desktop) --> <p class="text-[12px] text-black-soft/40 font-light italic mb-6 md:mb-0 md:absolute md:left-0 md:top-8" id="results-counter" data-astro-cid-aqmuqdry>
Showing all results
</p> <!-- Center: Filters --> <div class="flex flex-col gap-4 items-center w-full md:w-auto" data-astro-cid-aqmuqdry> <div class="flex flex-wrap justify-center items-center gap-6 md:gap-12" data-astro-cid-aqmuqdry> `, ' </div> <button id="clear-filters" class="text-[10px] uppercase tracking-[0.3em] font-medium text-black-soft/30 hover:text-gold transition-colors opacity-0 pointer-events-none" data-astro-cid-aqmuqdry>\n[ Clear Filter ]\n</button> </div> <!-- Right: Sort (Absolute on Desktop) --> <div class="relative min-w-[200px] mt-6 md:mt-0 md:absolute md:right-0 md:top-6" data-astro-cid-aqmuqdry> <select id="sort-select" class="w-full bg-white border border-black-soft/10 px-4 py-2.5 text-[13px] font-light appearance-none cursor-pointer focus:outline-none focus:border-gold transition-colors" data-astro-cid-aqmuqdry> <option value="default" data-astro-cid-aqmuqdry>Default sorting</option> <option value="name-asc" data-astro-cid-aqmuqdry>Name (A-Z)</option> <option value="name-desc" data-astro-cid-aqmuqdry>Name (Z-A)</option> <option value="brand" data-astro-cid-aqmuqdry>By Brand</option> </select> <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" data-astro-cid-aqmuqdry> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3.5 h-3.5 text-black-soft/30" data-astro-cid-aqmuqdry> <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" data-astro-cid-aqmuqdry></path> </svg> </div> </div> </div> <!-- Gallery Grid --> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-32 mt-24" id="gallery-grid" data-astro-cid-aqmuqdry> <!-- Items will be rendered here by JS --> </div> <!-- Pagination --> <div class="mt-24 flex justify-center gap-4 reveal reveal-up" id="pagination" data-astro-cid-aqmuqdry> <!-- Pagination buttons here --> </div> </div> </section> <script>(function(){', `
      const cabinets = dbCabinets;

      let currentFilter = 'all';
      let currentSort = 'default';
      const itemsPerPage = 12;
      let currentPage = 1;

      const grid = document.getElementById('gallery-grid');
      const counter = document.getElementById('results-counter');
      const filterBtns = document.querySelectorAll('.filter-btn');
      const clearBtn = document.getElementById('clear-filters');
      const sortSelect = document.getElementById('sort-select');

      function renderGallery() {
        if (!grid) return;

        // 1. Filter
        let filtered = currentFilter === 'all' 
          ? [...cabinets] 
          : cabinets.filter(c => c.color === currentFilter);

        // 2. Sort
        if (currentSort === 'name-asc') {
          filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (currentSort === 'name-desc') {
          filtered.sort((a, b) => b.name.localeCompare(a.name));
        } else if (currentSort === 'brand') {
          filtered.sort((a, b) => a.brand.localeCompare(b.brand));
        }

        // 3. Update counter
        const start = (currentPage - 1) * itemsPerPage;
        const end = Math.min(start + itemsPerPage, filtered.length);
        if (counter) {
          counter.innerText = \`Showing \${filtered.length > 0 ? start + 1 : 0}-\${end} of \${filtered.length} results\`;
        }

        // 4. Render Items
        grid.innerHTML = filtered.map((item, index) => \`
          <a href="/cabinets/\${item.id}" class="flex flex-col gap-10 reveal reveal-up group" style="animation-delay: \${index * 100}ms">
            <div class="max-w-[280px] mx-auto w-full flex flex-col gap-10">
              <div class="w-full aspect-[1/1.5] flex items-center justify-center overflow-hidden">
                <img 
                  src="\${item.image}" 
                  alt="\${item.name}" 
                  class="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-1000" 
                />
              </div>
              <div class="flex flex-col gap-2 text-left whitespace-nowrap">
                <span class="text-[9px] tracking-[0.1em] text-black-soft/40 font-medium">\${item.brand}</span>
                <h3 class="text-[16px] md:text-[18px] font-normal text-black-soft m-0 group-hover:text-gold transition-colors">\${item.name}</h3>
              </div>
            </div>
          </a>
        \`).join('');
      }

      // Event Listeners
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const color = btn.getAttribute('data-color');
          
          // Toggle active class
          filterBtns.forEach(b => b.classList.remove('text-gold', 'border-gold'));
          btn.classList.add('text-gold', 'border-gold');
          
          if (color) {
            currentFilter = color;
          }
          clearBtn?.classList.remove('opacity-0', 'pointer-events-none');
          renderGallery();
        });
      });

      clearBtn?.addEventListener('click', () => {
        currentFilter = 'all';
        filterBtns.forEach(b => b.classList.remove('text-gold', 'border-gold'));
        clearBtn?.classList.add('opacity-0', 'pointer-events-none');
        renderGallery();
      });

      sortSelect?.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderGallery();
      });

      // Initial render
      renderGallery();
    })();<\/script> </main> `], [" ", " ", `<main data-astro-cid-aqmuqdry> <!-- Hero Section --> <section class="relative h-screen min-h-screen flex items-end justify-start text-white px-6 md:px-[54px] pt-[110px] pb-10 md:pb-[100px] bg-cover bg-center" style="background-image: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url('/our-process/Image_Header (2).webp');" data-astro-cid-aqmuqdry> <div class="reveal reveal-up" data-astro-cid-aqmuqdry> <h1 class="text-5xl md:text-[80px] leading-tight font-light text-white m-0" data-astro-cid-aqmuqdry>
Cabinets
</h1> </div> </section> <!-- Gallery Section --> <section class="bg-beige-light px-6 md:px-[54px] lg:px-[140px] py-[110px]" id="colors-gallery" data-astro-cid-aqmuqdry> <div class="max-w-[1200px] mx-auto w-full" data-astro-cid-aqmuqdry> <!-- Header & Title --> <div class="text-center mb-12 reveal reveal-up" data-astro-cid-aqmuqdry> <h2 class="text-4xl md:text-[50px] font-light text-black-soft tracking-tight" data-astro-cid-aqmuqdry>Colors</h2> </div> <!-- Controls & Filters Bar --> <div class="relative flex flex-col items-center justify-center mb-32 pt-8 border-t border-black-soft/5 reveal reveal-up delay-100" data-astro-cid-aqmuqdry> <!-- Left: Results Counter (Absolute on Desktop) --> <p class="text-[12px] text-black-soft/40 font-light italic mb-6 md:mb-0 md:absolute md:left-0 md:top-8" id="results-counter" data-astro-cid-aqmuqdry>
Showing all results
</p> <!-- Center: Filters --> <div class="flex flex-col gap-4 items-center w-full md:w-auto" data-astro-cid-aqmuqdry> <div class="flex flex-wrap justify-center items-center gap-6 md:gap-12" data-astro-cid-aqmuqdry> `, ' </div> <button id="clear-filters" class="text-[10px] uppercase tracking-[0.3em] font-medium text-black-soft/30 hover:text-gold transition-colors opacity-0 pointer-events-none" data-astro-cid-aqmuqdry>\n[ Clear Filter ]\n</button> </div> <!-- Right: Sort (Absolute on Desktop) --> <div class="relative min-w-[200px] mt-6 md:mt-0 md:absolute md:right-0 md:top-6" data-astro-cid-aqmuqdry> <select id="sort-select" class="w-full bg-white border border-black-soft/10 px-4 py-2.5 text-[13px] font-light appearance-none cursor-pointer focus:outline-none focus:border-gold transition-colors" data-astro-cid-aqmuqdry> <option value="default" data-astro-cid-aqmuqdry>Default sorting</option> <option value="name-asc" data-astro-cid-aqmuqdry>Name (A-Z)</option> <option value="name-desc" data-astro-cid-aqmuqdry>Name (Z-A)</option> <option value="brand" data-astro-cid-aqmuqdry>By Brand</option> </select> <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" data-astro-cid-aqmuqdry> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3.5 h-3.5 text-black-soft/30" data-astro-cid-aqmuqdry> <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" data-astro-cid-aqmuqdry></path> </svg> </div> </div> </div> <!-- Gallery Grid --> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-32 mt-24" id="gallery-grid" data-astro-cid-aqmuqdry> <!-- Items will be rendered here by JS --> </div> <!-- Pagination --> <div class="mt-24 flex justify-center gap-4 reveal reveal-up" id="pagination" data-astro-cid-aqmuqdry> <!-- Pagination buttons here --> </div> </div> </section> <script>(function(){', `
      const cabinets = dbCabinets;

      let currentFilter = 'all';
      let currentSort = 'default';
      const itemsPerPage = 12;
      let currentPage = 1;

      const grid = document.getElementById('gallery-grid');
      const counter = document.getElementById('results-counter');
      const filterBtns = document.querySelectorAll('.filter-btn');
      const clearBtn = document.getElementById('clear-filters');
      const sortSelect = document.getElementById('sort-select');

      function renderGallery() {
        if (!grid) return;

        // 1. Filter
        let filtered = currentFilter === 'all' 
          ? [...cabinets] 
          : cabinets.filter(c => c.color === currentFilter);

        // 2. Sort
        if (currentSort === 'name-asc') {
          filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (currentSort === 'name-desc') {
          filtered.sort((a, b) => b.name.localeCompare(a.name));
        } else if (currentSort === 'brand') {
          filtered.sort((a, b) => a.brand.localeCompare(b.brand));
        }

        // 3. Update counter
        const start = (currentPage - 1) * itemsPerPage;
        const end = Math.min(start + itemsPerPage, filtered.length);
        if (counter) {
          counter.innerText = \\\`Showing \\\${filtered.length > 0 ? start + 1 : 0}-\\\${end} of \\\${filtered.length} results\\\`;
        }

        // 4. Render Items
        grid.innerHTML = filtered.map((item, index) => \\\`
          <a href="/cabinets/\\\${item.id}" class="flex flex-col gap-10 reveal reveal-up group" style="animation-delay: \\\${index * 100}ms">
            <div class="max-w-[280px] mx-auto w-full flex flex-col gap-10">
              <div class="w-full aspect-[1/1.5] flex items-center justify-center overflow-hidden">
                <img 
                  src="\\\${item.image}" 
                  alt="\\\${item.name}" 
                  class="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-1000" 
                />
              </div>
              <div class="flex flex-col gap-2 text-left whitespace-nowrap">
                <span class="text-[9px] tracking-[0.1em] text-black-soft/40 font-medium">\\\${item.brand}</span>
                <h3 class="text-[16px] md:text-[18px] font-normal text-black-soft m-0 group-hover:text-gold transition-colors">\\\${item.name}</h3>
              </div>
            </div>
          </a>
        \\\`).join('');
      }

      // Event Listeners
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const color = btn.getAttribute('data-color');
          
          // Toggle active class
          filterBtns.forEach(b => b.classList.remove('text-gold', 'border-gold'));
          btn.classList.add('text-gold', 'border-gold');
          
          if (color) {
            currentFilter = color;
          }
          clearBtn?.classList.remove('opacity-0', 'pointer-events-none');
          renderGallery();
        });
      });

      clearBtn?.addEventListener('click', () => {
        currentFilter = 'all';
        filterBtns.forEach(b => b.classList.remove('text-gold', 'border-gold'));
        clearBtn?.classList.add('opacity-0', 'pointer-events-none');
        renderGallery();
      });

      sortSelect?.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderGallery();
      });

      // Initial render
      renderGallery();
    })();<\/script> </main> `])), renderComponent($$result2, "Header", $$Header, { "data-astro-cid-aqmuqdry": true }), maybeRenderHead(), ["Blue", "Brown", "Gray", "White"].map((color) => renderTemplate`<button class="filter-btn text-[13px] uppercase tracking-[0.2em] font-light transition-all duration-300 hover:text-gold border-b border-transparent hover:border-gold pb-1"${addAttribute(color, "data-color")} data-astro-cid-aqmuqdry> ${color} </button>`), defineScriptVars({ dbCabinets })) })} `;
}, "C:/Marcos/Proyectos/BA/web/web-ba/src/pages/cabinets.astro", void 0);

const $$file = "C:/Marcos/Proyectos/BA/web/web-ba/src/pages/cabinets.astro";
const $$url = "/cabinets";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Cabinets,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
