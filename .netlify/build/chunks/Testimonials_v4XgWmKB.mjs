import { d as createComponent, m as maybeRenderHead, f as addAttribute, r as renderTemplate, n as renderScript } from './astro/server_CrEBP8um.mjs';
import 'piccolore';
import 'clsx';
/* empty css                            */

const $$Testimonials = createComponent(($$result, $$props, $$slots) => {
  const testimonials = [
    {
      quote: "BA is an excellent company and we would not hesitate to do business with them again. Right from the start they were courteous, friendly and helpful. They were able to install our granite quickly and it turned out beautiful. Thank you so much BA!",
      author: "Teresa V.",
      project: "Mielke"
    },
    {
      quote: "BA is an excellent company and we would not hesitate to do business with them again. Right from the start they were courteous, friendly and helpful. They were able to install our granite quickly and it turned out beautiful. Thank you so much BA!",
      author: "Teresa V.",
      project: "McClatchy"
    },
    {
      quote: "BA is an excellent company and we would not hesitate to do business with them again. Right from the start they were courteous, friendly and helpful. They were able to install our granite quickly and it turned out beautiful. Thank you so much BA!",
      author: "Teresa V.",
      project: "Luxury Kitchen"
    },
    {
      quote: "BA is an excellent company and we would not hesitate to do business with them again. Right from the start they were courteous, friendly and helpful. They were able to install our granite quickly and it turned out beautiful. Thank you so much BA!",
      author: "Teresa V.",
      project: "Modern Reno"
    },
    {
      quote: "BA is an excellent company and we would not hesitate to do business with them again. Right from the start they were courteous, friendly and helpful. They were able to install our granite quickly and it turned out beautiful. Thank you so much BA!",
      author: "Teresa V.",
      project: "Brookhaven"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="bg-black-soft text-white px-6 md:px-[54px] py-[110px] flex flex-col md:flex-row gap-12 md:gap-24 overflow-hidden h-screen min-h-screen" data-astro-cid-aadlzisc> <!-- Left Side: Header --> <div class="w-full md:w-1/4 mb-4 md:mb-0 reveal reveal-right flex flex-col justify-start" data-astro-cid-aadlzisc> <h2 class="text-xs uppercase tracking-[0.2em] font-medium text-white/60" data-astro-cid-aadlzisc>
Testimonials
</h2> </div> <!-- Right Side: Carousel --> <div class="w-full md:w-3/4 flex flex-col justify-start gap-12" data-astro-cid-aadlzisc> <div id="testimonial-container" class="flex gap-12 md:gap-24 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory" data-astro-cid-aadlzisc> ${testimonials.map((t, index) => renderTemplate`<div${addAttribute(`min-w-full md:min-w-[400px] snap-start flex flex-col gap-6 reveal reveal-up delay-${index % 3 * 100 + 200}`, "class")} data-astro-cid-aadlzisc> <p class="text-[16px] md:text-[18px] lg:text-[22px] leading-relaxed font-light text-white/90 italic" data-astro-cid-aadlzisc>
&ldquo;${t.quote}&rdquo;
</p> <div class="flex flex-col gap-1" data-astro-cid-aadlzisc> <span class="text-[15px] font-normal text-white" data-astro-cid-aadlzisc>${t.author}</span> <span class="text-[12px] font-light text-white/40 uppercase tracking-widest" data-astro-cid-aadlzisc>${t.project}</span> </div> </div>`)} </div> <!-- Navigation Images --> <div class="flex gap-6 reveal reveal-up delay-500" data-astro-cid-aadlzisc> <img id="test-prev" src="/home/sliderleft.webp" alt="Previous" class="w-10 h-10 cursor-pointer hover:opacity-70 transition-opacity duration-300" data-astro-cid-aadlzisc> <img id="test-next" src="/home/sliderright.webp" alt="Next" class="w-10 h-10 cursor-pointer hover:opacity-70 transition-opacity duration-300" data-astro-cid-aadlzisc> </div> </div> </section> ${renderScript($$result, "C:/Marcos/Proyectos/BA/web/web-ba/src/components/Testimonials.astro?astro&type=script&index=0&lang.ts")} `;
}, "C:/Marcos/Proyectos/BA/web/web-ba/src/components/Testimonials.astro", void 0);

export { $$Testimonials as $ };
