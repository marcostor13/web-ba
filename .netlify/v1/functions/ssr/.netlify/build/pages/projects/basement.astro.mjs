import { d as createComponent, l as renderComponent, r as renderTemplate, m as maybeRenderHead, f as addAttribute, n as renderScript } from '../../chunks/astro/server_CrEBP8um.mjs';
import 'piccolore';
import { $ as $$Layout, a as $$Header } from '../../chunks/Header_C3kthhmz.mjs';
export { renderers } from '../../renderers.mjs';

const $$Basement = createComponent(($$result, $$props, $$slots) => {
  const processSteps = [
    {
      title: "Free inspection & consultation",
      description: "We\u2019ll evaluate your basement and suggest the best solutions.",
      image: "/basement/Copy of IMG_9970 6.webp"
    },
    {
      title: "Custom plan & estimate",
      description: "A tailored renovation plan with a transparent quote.",
      image: "/basement/Copy of IMG_9970 8.webp"
    },
    {
      title: "Professional installation & walkthrough",
      description: "We ensure every detail is perfect before finalizing the project.",
      image: "/basement/Copy of IMG_9970 9.webp"
    }
  ];
  const faqs = [
    {
      question: "How long does a basement renovation take?",
      answer: "Renovation timelines vary depending on the size and scope, but most projects are completed within 4-6 weeks."
    },
    {
      question: "What\u2019s included in the free inspection?",
      answer: "Our team will assess the current state of your basement, check for moisture or structural issues, and discuss your goals to provide a comprehensive project outline."
    },
    {
      question: "Can i customize the design and materials?",
      answer: "Absolutely. We offer a wide range of materials and finishes, allowing you to tailor every detail of your basement to match your vision and budget."
    },
    {
      question: "Do I need a permit for my basement renovation?",
      answer: "Yes, most structural changes require permits. Our team handles the entire permit application process to ensure your project complies with all local building codes."
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Basement Renovations | BA Kitchen & Bath Remodeling" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main> <!-- Section 1: Hero --> <section class="relative h-screen flex items-end justify-between px-6 md:px-[54px] lg:px-[140px] pb-16 md:pb-24 bg-cover bg-center" style="background-image: url('/basement/Image_Header (5).webp');"> <div class="absolute inset-0 bg-black/10"></div> <div class="relative z-10 w-full flex flex-col md:flex-row justify-between items-end gap-8"> <h1 class="text-6xl md:text-[100px] leading-[0.9] font-light text-white m-0 reveal reveal-left">
Basement<br><span class="ml-0">Renovations</span> </h1> <div class="hidden md:block reveal reveal-right"> <span class="text-[12px] uppercase tracking-[0.4em] text-white/60 font-medium">Renovations</span> </div> </div> </section> <!-- Section 2: Intro --> <section class="h-screen bg-beige-light flex items-center px-6 md:px-[54px] lg:px-[140px] py-32"> <div class="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-start"> <div class="reveal reveal-left"> <h2 class="text-4xl md:text-[50px] leading-tight font-light text-black-soft m-0 uppercase tracking-tight">
transform your basement<br> <span class="text-gold">Into a beautiful,</span><br>
functional space
</h2> </div> <div class="reveal reveal-right"> <p class="text-[18px] md:text-[22px] text-black-soft/70 font-light leading-relaxed max-w-[600px]">
Whether you need a family room, gym, home office, or rental suite, our team delivers top-quality basement renovations to fit your needs and budget.
</p> </div> </div> </section> <!-- Section 3: Visual --> <section class="h-screen relative overflow-hidden"> <div class="absolute inset-0 bg-cover bg-center transition-transform duration-[3000ms] hover:scale-110" style="background-image: url('/basement/Image_Background (6).webp');"></div> </section> <!-- Section 4: Process --> <section class="bg-beige-light px-6 md:px-[54px] lg:px-[140px] py-40 md:py-64"> <div class="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-y-16 gap-x-8"> <!-- Left: Heading --> <div class="reveal reveal-left"> <h2 class="text-4xl md:text-[50px] font-light text-black-soft m-0 tracking-tight">Our process</h2> </div> <!-- Right: Steps --> <div class="lg:col-span-2 flex flex-col gap-16 md:gap-20 pl-0 lg:pl-16"> ${processSteps.map((step, index) => renderTemplate`<div class="flex flex-col sm:flex-row gap-8 items-start group reveal reveal-up"${addAttribute(`animation-delay: ${index * 150}ms`, "style")}> <div class="flex flex-col gap-3 pt-2 flex-1"> <h3 class="text-xl md:text-[24px] font-normal text-black-soft leading-tight">${step.title}</h3> <p class="text-[14px] md:text-[15px] text-black-soft/60 font-light leading-relaxed max-w-[420px]"> ${step.description} </p> </div> <div class="w-full sm:w-[240px] shrink-0 overflow-hidden rounded-sm order-first sm:order-last"> <img${addAttribute(step.image, "src")}${addAttribute(step.title, "alt")} class="w-full h-auto aspect-[3/2] object-cover transform group-hover:scale-105 transition-transform duration-1000"> </div> </div>`)} </div> </div> </section> <!-- Section 5: FAQ --> <section class="bg-black-soft text-white px-6 md:px-[54px] lg:px-[140px] py-32 md:py-48"> <div class="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-y-16 gap-x-8"> <div class="reveal reveal-left"> <h2 class="text-4xl md:text-[50px] font-light m-0">FAQ</h2> </div> <div class="lg:col-span-2 flex flex-col gap-0 reveal reveal-right pl-0 lg:pl-16"> ${faqs.map((faq, index) => renderTemplate`<div class="faq-item border-b border-white/10 py-8 first:pt-0 group cursor-pointer"> <div class="flex justify-between items-center gap-6"> <h3 class="text-[18px] md:text-[20px] font-light m-0 group-hover:text-gold transition-colors leading-snug"> ${faq.question} </h3> <div class="faq-icon-wrapper w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 shrink-0"> <img src="/basement/Minimizar.webp" alt="Toggle" class="w-5 h-5 opacity-60 group-hover:opacity-100 transition-all duration-300 transform"> </div> </div> <div class="faq-answer overflow-hidden max-h-0 opacity-0 transition-all duration-500 ease-in-out"> <p class="pt-6 text-[14px] md:text-[15px] text-white/50 font-light leading-relaxed max-w-[650px]"> ${faq.answer} </p> </div> </div>`)} </div> </div> </section> <!-- Section 6: CTA --> <section class="relative h-screen flex items-end overflow-hidden"> <div class="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] hover:scale-105" style="background-image: url('/basement/Image_Background (7).webp');"></div> <div class="absolute inset-0 bg-black/20"></div> <div class="relative z-10 w-full px-6 md:px-[54px] lg:px-[140px] pb-16 md:pb-24 max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-end gap-8"> <div class="reveal reveal-left"> <h2 class="text-3xl md:text-[42px] leading-tight font-light text-white max-w-[700px]">
Contact us for a quick online estimate or to schedule an in-home consult.
</h2> </div> <div class="reveal reveal-right"> <a href="/contact" class="text-[12px] uppercase tracking-[0.3em] font-medium text-white border-b border-white hover:text-gold hover:border-gold transition-all duration-300 pb-2 mb-2 inline-block">
Start now
</a> </div> </div> </section> </main> ${renderScript($$result2, "C:/Marcos/Proyectos/BA/web/web-ba/src/pages/projects/basement.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "C:/Marcos/Proyectos/BA/web/web-ba/src/pages/projects/basement.astro", void 0);

const $$file = "C:/Marcos/Proyectos/BA/web/web-ba/src/pages/projects/basement.astro";
const $$url = "/projects/basement";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Basement,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
