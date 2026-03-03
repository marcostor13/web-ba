const http = require('http');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Create dummy files
fs.writeFileSync('img1.jpg', 'fake image 1');
fs.writeFileSync('img2.jpg', 'fake image 2');

const form = new FormData();
form.append('title', 'Mutipart Test');
form.append('short_description', 'Testing backend');
form.append('main_image', fs.createReadStream('img1.jpg'));
form.append('section_1_img_1', fs.createReadStream('img1.jpg'));
form.append('section_2_img_1', fs.createReadStream('img2.jpg'));

const sections = [
    { type: 'image_single', image_1_key: 'section_1_img_1' },
    { type: 'image_single', image_1_key: 'section_2_img_1' }
];
form.append('sections', JSON.stringify(sections));

const request = http.request({
  method: 'post',
  host: '127.0.0.1',
  port: 8000,
  path: '/api/blog.php?action=create',
  headers: form.getHeaders(),
});

form.pipe(request);

request.on('response', function(res) {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log('Response:', body));
});
