const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM(`
<!DOCTYPE html>
<html>
<body>
  <div id="sections-container"></div>
  <button id="add-btn">Add Section</button>
  <script>
    const container = document.getElementById('sections-container');
    const addBtn = document.getElementById('add-btn');
    let sectionCount = 0;

    const getTemplate = (id, type = 'paragraph') => {
        return \`<div class="section-item" data-id="\${id}">
            <select class="type-selector">
                <option value="paragraph" selected>Paragraph</option>
                <option value="image_single">Single Image</option>
            </select>
            <div class="content-area"></div>
        </div>\`;
    };

    const addSection = (type = 'paragraph') => {
        sectionCount++;
        container.insertAdjacentHTML('beforeend', getTemplate(sectionCount, type));
        
        const newSection = container.lastElementChild;
        const select = newSection.querySelector('.type-selector');

        select.addEventListener('change', (e) => {
             const newType = e.target.value;
             const id = newSection.dataset.id;
             let inputHtml = '';
             
             if (newType === 'image_single') {
                 inputHtml = \`<input type="text" class="file-mock" name="section_\${id}_img_1" />\`;
             }
             
             newSection.querySelector('.content-area').innerHTML = inputHtml; 
        });
    };

    addBtn.addEventListener('click', () => {
        addSection();
    });
  </script>
</body>
</html>
`, { runScripts: "dangerously" });

const document = dom.window.document;
const addBtn = document.getElementById("add-btn");
const container = document.getElementById("sections-container");

// Add first section
addBtn.click();
let s1 = container.lastElementChild;
let sel1 = s1.querySelector(".type-selector");
sel1.value = "image_single";
sel1.dispatchEvent(new dom.window.Event("change"));
s1.querySelector(".file-mock").value = "FILE_1";

// Add second section
addBtn.click();
let s2 = container.lastElementChild;
let sel2 = s2.querySelector(".type-selector");
sel2.value = "image_single";
sel2.dispatchEvent(new dom.window.Event("change"));
s2.querySelector(".file-mock").value = "FILE_2";

console.log("Section 1 Input Value:", s1.querySelector(".file-mock").value);
console.log("Section 2 Input Value:", s2.querySelector(".file-mock").value);
console.log("Section 1 Input Name:", s1.querySelector(".file-mock").name);
console.log("Section 2 Input Name:", s2.querySelector(".file-mock").name);
