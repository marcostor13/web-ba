const sections = [
    { type: 'title', content_text: 'Test Title' },
    { type: 'paragraph', content_text: 'Test Paragraph' },
    { type: 'image_single', image_path_1: '/uploads/blog/real.webp' },
    { type: 'image_single', image_path_1: null },
    { type: 'image_double', image_path_1: '/1.jpg', image_path_2: null }
];
const post = { title: 'Test Post' };

const sectionsHtml = sections.map((section, index) => {
    let innerHtml = '';
    if (section.type === 'title') {
        innerHtml = `<h2 class="text-2xl md:text-[32px] font-light text-black-soft mb-6 text-center leading-tight">${section.content_text || ''}</h2>`;
    } else if (section.type === 'paragraph') {
        innerHtml = `<p class="text-[16px] md:text-[18px] text-black-soft/90 font-light leading-[1.7] whitespace-pre-line tracking-normal text-center max-w-2xl mx-auto">${section.content_text || ''}</p>`;
    } else if (section.type === 'image_single') {
        if (section.image_path_1) {
            innerHtml = `<div class="my-6"><img src="${section.image_path_1}" alt="${post.title}" class="w-full h-auto object-cover rounded-sm shadow-sm" /></div>`;
        }
    } else if (section.type === 'image_double') {
        let imgs = '';
        if (section.image_path_1) imgs += `<img src="${section.image_path_1}" alt="Gallery 1" class="w-full h-[300px] md:h-[500px] object-cover rounded-sm shadow-sm" />`;
        if (section.image_path_2) imgs += `<img src="${section.image_path_2}" alt="Gallery 2" class="w-full h-[300px] md:h-[500px] object-cover rounded-sm shadow-sm" />`;
        if (imgs) {
            innerHtml = `<div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">${imgs}</div>`;
        }
    }
    return innerHtml ? `<div class="reveal reveal-up delay-${(index % 3) * 100} w-full">${innerHtml}</div>` : '';
}).join('');

console.log(sectionsHtml);
