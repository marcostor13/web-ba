import { d as createComponent, m as maybeRenderHead, r as renderTemplate, f as addAttribute, g as createAstro, n as renderScript, l as renderComponent } from '../chunks/astro/server_CrEBP8um.mjs';
import 'piccolore';
import { $ as $$Layout, a as $$Header } from '../chunks/Header_C3kthhmz.mjs';
import 'clsx';
/* empty css                                 */
import { $ as $$Testimonials } from '../chunks/Testimonials_v4XgWmKB.mjs';
export { renderers } from '../renderers.mjs';

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="relative h-screen min-h-screen flex flex-col md:flex-row justify-end md:justify-between items-start md:items-end text-white px-6 md:px-[54px] pt-[110px] pb-10 md:pb-[100px] bg-cover bg-center" style="background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('/home/Image_Header.webp');"> <div class="max-w-[800px] mb-8 md:mb-0 reveal reveal-up"> <h1 class="text-4xl md:text-[80px] leading-tight md:leading-none font-light text-white">
Your dream kitchen & bath starts here!
</h1> </div> <div class="flex justify-start md:justify-end items-center w-full md:w-auto reveal reveal-up delay-300"> <a href="#contact" class="text-white text-[15px] no-underline pb-[5px] border-b border-white transition-opacity duration-300 hover:opacity-70">
Start your project now
</a> </div> </section>`;
}, "C:/Marcos/Proyectos/BA/web/web-ba/src/components/Hero.astro", void 0);

const $$AboutUs = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="about-us" class="h-screen min-h-screen bg-beige-light flex flex-col md:flex-row items-start px-6 md:px-[54px] pt-[110px] pb-[110px]"> <div class="w-full md:w-1/3 mb-8 md:mb-0 reveal reveal-right"> <h2 class="text-xs uppercase tracking-[0.2em] font-medium text-black-soft/60">
About us
</h2> </div> <div class="w-full md:w-2/3 reveal reveal-up delay-200"> <p class="text-xl md:text-[30px] leading-snug md:leading-[1.2] font-light text-black-soft">
At BA Kitchen & Bath Design, we turn your kitchen and bathroom dreams into reality. As a premier design and renovation company serving the greater metro Atlanta area, we specialize in fully customized luxury kitchen and bathroom remodels. From concept to completion, we deliver top-quality craftsmanship, personalized service, and exceptional attention to detail in every project.
</p> </div> </section>`;
}, "C:/Marcos/Proyectos/BA/web/web-ba/src/components/AboutUs.astro", void 0);

const $$Astro = createAstro();
const $$ImageSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ImageSection;
  const { imagePath } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="h-screen min-h-screen bg-cover bg-center reveal"${addAttribute(`background-image: url('${imagePath}');`, "style")}></section>`;
}, "C:/Marcos/Proyectos/BA/web/web-ba/src/components/ImageSection.astro", void 0);

const $$ElevateSpaces = createComponent(($$result, $$props, $$slots) => {
  const sections = [
    {
      title: "Design + Craftsmanship",
      text: "At BA Kitchen & Bath Design, we bring your kitchen and bathroom visions to life. Serving the greater metro Atlanta area, we specialize in fully customized luxury remodels. From concept to completion, we deliver quality craftsmanship, personalized service, and attention to detail in every project.",
      image: "/home/Design + Craftsmanship.webp"
    },
    {
      title: "Marietta Showroom",
      text: "We proudly serve Buckhead, Brookhaven, East Cobb, Sandy Springs, Dunwoody, Marietta, Roswell, Alpharetta, and the greater metro Atlanta area. We offer in-home consultations and a kitchen and bath showroom in Marietta for a personalized, hands-on experience. We value fast, convenient communication\u2014get started with an online estimate, call to schedule a consult, or visit our showroom with no appointment needed.",
      image: "/home/Marietta Showroom.webp"
    },
    {
      title: "Cabinets & countertops",
      text: "In addition to full kitchen and bathroom design and remodeling, we offer cabinets, sinks, faucets and more. Visit our sister company next door, BA Stone Surfaces, for fast countertop fabrication and installation, featuring quartz, quartzite, marble, and granite from luxury brands like Cambria, Viatera, HanStone Quartz, MSI Surfaces, and more.",
      image: "/home/Cabinets & countertops.webp"
    },
    {
      title: "Professional organizers",
      text: "We do more than remodeling! We also offer professional home organizing services to help keep your home looking its best. Whether you need a one-time home makeover, weekly maintenance, or new home unpacking, we do it all!",
      image: "/home/Professional organizers.webp"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="min-h-screen bg-beige-light flex flex-col md:flex-row px-6 md:px-[54px] py-[110px] gap-12 md:gap-24"> <!-- Left Side: Header and CTA --> <div class="flex flex-col justify-between w-full md:w-1/4"> <h2 class="text-5xl md:text-[60px] leading-[1.1] font-normal text-black-soft m-0 reveal reveal-right">
Elevate your <br> spaces
</h2> <div class="mt-12 md:mt-0 reveal reveal-up delay-500"> <a href="#contact" class="text-gold text-[15px] no-underline pb-1 border-b border-gold transition-opacity duration-300 hover:opacity-70 inline-block uppercase tracking-wider font-medium">
Start your project now
</a> </div> </div> <!-- Right Side: Grid of Content --> <div class="w-full md:w-3/4"> <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8"> <!-- First Row: Texts --> <div class="flex flex-col gap-4 reveal reveal-up delay-100"> <h3 class="text-2xl md:text-[30px] font-normal text-black-soft m-0 leading-tight"> ${sections[0].title} </h3> <p class="text-[13px] md:text-[14px] leading-relaxed text-black-soft/80 font-light"> ${sections[0].text} </p> </div> <div class="flex flex-col gap-4 reveal reveal-up delay-200"> <h3 class="text-2xl md:text-[30px] font-normal text-black-soft m-0 leading-tight"> ${sections[1].title} </h3> <p class="text-[13px] md:text-[14px] leading-relaxed text-black-soft/80 font-light"> ${sections[1].text} </p> </div> <!-- Second Row: Images --> <div class="aspect-[16/11] overflow-hidden mb-8 reveal reveal-up delay-300"> <img${addAttribute(sections[0].image, "src")}${addAttribute(sections[0].title, "alt")} class="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"> </div> <div class="aspect-[16/11] overflow-hidden mb-8 reveal reveal-up delay-400"> <img${addAttribute(sections[1].image, "src")}${addAttribute(sections[1].title, "alt")} class="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"> </div> <!-- Third Row: Texts --> <div class="flex flex-col gap-4 reveal reveal-up delay-100"> <h3 class="text-2xl md:text-[30px] font-normal text-black-soft m-0 leading-tight"> ${sections[2].title} </h3> <p class="text-[13px] md:text-[14px] leading-relaxed text-black-soft/80 font-light"> ${sections[2].text} </p> </div> <div class="flex flex-col gap-4 reveal reveal-up delay-200"> <h3 class="text-2xl md:text-[30px] font-normal text-black-soft m-0 leading-tight"> ${sections[3].title} </h3> <p class="text-[13px] md:text-[14px] leading-relaxed text-black-soft/80 font-light"> ${sections[3].text} </p> </div> <!-- Fourth Row: Images --> <div class="aspect-[16/11] overflow-hidden reveal reveal-up delay-300"> <img${addAttribute(sections[2].image, "src")}${addAttribute(sections[2].title, "alt")} class="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"> </div> <div class="aspect-[16/11] overflow-hidden reveal reveal-up delay-400"> <img${addAttribute(sections[3].image, "src")}${addAttribute(sections[3].title, "alt")} class="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"> </div> </div> </div> </section>`;
}, "C:/Marcos/Proyectos/BA/web/web-ba/src/components/ElevateSpaces.astro", void 0);

const $$ProjectsCarousel = createComponent(($$result, $$props, $$slots) => {
  const originalProjects = [
    {
      name: "Mielke",
      image: "/home/Copy of IMG_9970 10 (2).webp",
      logo: "/home/Logo_mielke..webp",
      href: "/projects/mielke"
    },
    {
      name: "McClatchy",
      image: "/home/Image_Project (1).webp",
      logo: "/home/Log_McClatchy.webp",
      href: "/projects/mcclatchy"
    },
    {
      name: "Luxury Kitchen",
      image: "/home/Image_Project.webp",
      logo: "/home/Log_McClatchy.webp",
      href: "/projects/luxury-kitchen"
    },
    {
      name: "Brookhaven Bath",
      image: "/home/Copy of IMG_9970 10 (2).webp",
      logo: "/home/Logo_mielke..webp",
      href: "/projects/brookhaven"
    },
    {
      name: "Modern Reno",
      image: "/home/Image_Project (1).webp",
      logo: "/home/Log_McClatchy.webp",
      href: "/projects/modern-reno"
    }
  ];
  const projects = [...originalProjects, ...originalProjects, ...originalProjects];
  return renderTemplate`${maybeRenderHead()}<section class="bg-beige-light px-6 md:px-[54px] py-[110px] flex flex-col gap-12 overflow-hidden" data-astro-cid-mieudr2m> <div class="flex justify-between items-end max-w-[1440px] mx-auto w-full reveal reveal-up" data-astro-cid-mieudr2m> <h2 class="text-5xl md:text-[60px] leading-[1.1] font-normal text-black-soft m-0" data-astro-cid-mieudr2m>
Some projects
</h2> <a href="/projects" class="text-[12px] uppercase tracking-widest text-black-soft/60 pb-1 border-b border-black-soft/20 hover:text-gold hover:border-gold transition-all duration-300" data-astro-cid-mieudr2m>
View all
</a> </div> <div id="carousel-container" class="relative w-full overflow-x-auto no-scrollbar flex gap-6 md:gap-[30px] pb-12 cursor-grab active:cursor-grabbing" data-astro-cid-mieudr2m> ${projects.map((project, index) => renderTemplate`<div class="min-w-[85vw] md:min-w-[calc(50%-15px)] lg:min-w-[480px] flex flex-col gap-6 project-card reveal reveal-up"${addAttribute(index, "data-index")} data-astro-cid-mieudr2m> <a${addAttribute(project.href, "href")} class="relative block aspect-[16/10] overflow-hidden group" data-astro-cid-mieudr2m> <img${addAttribute(project.image, "src")}${addAttribute(project.name, "alt")} class="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" data-astro-cid-mieudr2m> <div class="absolute inset-0 bg-black-soft/30 transition-opacity duration-500" data-astro-cid-mieudr2m></div> <div class="absolute inset-0 flex items-center justify-center p-12 pointer-events-none" data-astro-cid-mieudr2m> <img${addAttribute(project.logo, "src")}${addAttribute(`${project.name} logo`, "alt")} class="max-w-[220px] max-h-[100px] object-contain invert brightness-0" data-astro-cid-mieudr2m> </div> </a> <div class="flex flex-col gap-4" data-astro-cid-mieudr2m> <h3 class="text-2xl md:text-[28px] font-normal text-black-soft m-0" data-astro-cid-mieudr2m> ${project.name} </h3> <a${addAttribute(project.href, "href")} class="text-[14px] uppercase tracking-widest text-black-soft/40 hover:text-gold transition-colors duration-300 border-b border-black-soft/10 w-fit pb-1" data-astro-cid-mieudr2m>
View
</a> </div> </div>`)} </div> </section> ${renderScript($$result, "C:/Marcos/Proyectos/BA/web/web-ba/src/components/ProjectsCarousel.astro?astro&type=script&index=0&lang.ts")} `;
}, "C:/Marcos/Proyectos/BA/web/web-ba/src/components/ProjectsCarousel.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main> ${renderComponent($$result2, "Hero", $$Hero, {})} ${renderComponent($$result2, "AboutUs", $$AboutUs, {})} ${renderComponent($$result2, "ImageSection", $$ImageSection, { "imagePath": "/home/Image_Background.webp" })} ${renderComponent($$result2, "ElevateSpaces", $$ElevateSpaces, {})} ${renderComponent($$result2, "ImageSection", $$ImageSection, { "imagePath": "/home/Image_Background (1).webp" })} ${renderComponent($$result2, "ProjectsCarousel", $$ProjectsCarousel, {})} ${renderComponent($$result2, "Testimonials", $$Testimonials, {})} </main> ` })}`;
}, "C:/Marcos/Proyectos/BA/web/web-ba/src/pages/index.astro", void 0);

const $$file = "C:/Marcos/Proyectos/BA/web/web-ba/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
