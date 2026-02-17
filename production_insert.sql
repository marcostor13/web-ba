-- SQL Insert for projects
INSERT INTO projects (id, name, main_image, logo_overlay, category, created_at, updated_at) VALUES (4, 'Mielke Project', 'https://ba-bucket-aws.s3.amazonaws.com/uploads/projects/1770827536210-header_individual_projects_kitchens3.webp', 'https://ba-bucket-aws.s3.amazonaws.com/uploads/projects/1770827537247-logo_kitchens17-3(1).webp', 'Kitchen', '2026-02-11 16:32:17', '2026-02-11 16:32:17');
INSERT INTO projects (id, name, main_image, logo_overlay, category, created_at, updated_at) VALUES (7, 'Pugh Project', 'https://ba-bucket-aws.s3.amazonaws.com/uploads/projects/1771267919420-pugh-4-.webp', 'https://ba-bucket-aws.s3.amazonaws.com/uploads/projects/1771267936937-logo-kitchens16.webp', 'Kitchen', '2026-02-16 18:52:17', '2026-02-16 19:10:05');
INSERT INTO projects (id, name, main_image, logo_overlay, category, created_at, updated_at) VALUES (8, 'Quijano Project', 'https://ba-bucket-aws.s3.amazonaws.com/uploads/projects/1771268859667-yami-quijano-.webp', 'https://ba-bucket-aws.s3.amazonaws.com/uploads/projects/1771268870346-capa-1-2.webp', 'Kitchen', '2026-02-16 19:07:50', '2026-02-16 19:07:50');
INSERT INTO projects (id, name, main_image, logo_overlay, category, created_at, updated_at) VALUES (9, 'leanord project', 'https://ba-bucket-aws.s3.amazonaws.com/uploads/projects/1771269245677-project-lenord.webp', 'https://ba-bucket-aws.s3.amazonaws.com/uploads/projects/1771269253623-logo-kitchens08.webp', 'Kitchen', '2026-02-16 19:14:14', '2026-02-16 19:14:14');
INSERT INTO projects (id, name, main_image, logo_overlay, category, created_at, updated_at) VALUES (10, 'mcclatchy project', 'https://ba-bucket-aws.s3.amazonaws.com/uploads/projects/1771290778656-img-8829.webp', 'https://ba-bucket-aws.s3.amazonaws.com/uploads/projects/1771290784812-logo-kitchens09.webp', 'Kitchen', '2026-02-17 01:13:05', '2026-02-17 01:13:05');
INSERT INTO projects (id, name, main_image, logo_overlay, category, created_at, updated_at) VALUES (11, 'preston project', 'https://ba-bucket-aws.s3.amazonaws.com/uploads/projects/1771293929094-copy-of-copy-of-copy-of-img-4507.webp', 'https://ba-bucket-aws.s3.amazonaws.com/uploads/projects/1771293933362-logo-kitchens10.webp', 'Kitchen', '2026-02-17 02:05:33', '2026-02-17 02:05:33');
INSERT INTO projects (id, name, main_image, logo_overlay, category, created_at, updated_at) VALUES (12, 'jewell project', 'https://ba-bucket-aws.s3.amazonaws.com/uploads/projects/1771294045930-copy-of-img-7726.webp', 'https://ba-bucket-aws.s3.amazonaws.com/uploads/projects/1771294047286-logo-kitchens18.webp', 'Kitchen', '2026-02-17 02:07:27', '2026-02-17 02:07:27');
INSERT INTO projects (id, name, main_image, logo_overlay, category, created_at, updated_at) VALUES (13, 'tatarka project', 'https://ba-bucket-aws.s3.amazonaws.com/uploads/projects/1771294636043-8-img-7656.webp', 'https://ba-bucket-aws.s3.amazonaws.com/uploads/projects/1771294636955-logo-bathrooms03.webp', 'Bathroom', '2026-02-17 02:17:17', '2026-02-17 02:17:17');

-- SQL Insert for project_images
INSERT INTO project_images (id, project_id, image_path) VALUES (12, 4, 'https://ba-bucket-aws.s3.amazonaws.com/uploads/projects/1770827537387-image_mielke013.webp');
INSERT INTO project_images (id, project_id, image_path) VALUES (13, 7, 'https://ba-bucket-aws.s3.amazonaws.com/uploads/projects/1771267965313-img-0481.webp');
INSERT INTO project_images (id, project_id, image_path) VALUES (14, 7, 'https://ba-bucket-aws.s3.amazonaws.com/uploads/projects/1771268136774-pugh-2-.webp');
INSERT INTO project_images (id, project_id, image_path) VALUES (15, 7, 'https://ba-bucket-aws.s3.amazonaws.com/uploads/projects/1771268329699-pugh.webp');
INSERT INTO project_images (id, project_id, image_path) VALUES (16, 7, 'https://ba-bucket-aws.s3.amazonaws.com/uploads/projects/1771268385420-pugh-1-.webp');
INSERT INTO project_images (id, project_id, image_path) VALUES (17, 7, 'https://ba-bucket-aws.s3.amazonaws.com/uploads/projects/1771268536833-pugh-3-.webp');
INSERT INTO project_images (id, project_id, image_path) VALUES (18, 8, 'https://ba-bucket-aws.s3.amazonaws.com/uploads/projects/1771268889017-yami-quijano-2-.webp');
INSERT INTO project_images (id, project_id, image_path) VALUES (19, 8, 'https://ba-bucket-aws.s3.amazonaws.com/uploads/projects/1771268902817-yami-quijano-1-.webp');
INSERT INTO project_images (id, project_id, image_path) VALUES (20, 8, 'https://ba-bucket-aws.s3.amazonaws.com/uploads/projects/1771268945210-yami-quijano-3-.webp');
INSERT INTO project_images (id, project_id, image_path) VALUES (21, 8, 'https://ba-bucket-aws.s3.amazonaws.com/uploads/projects/1771268965120-yami-quijano-4-.webp');
INSERT INTO project_images (id, project_id, image_path) VALUES (22, 9, 'https://ba-bucket-aws.s3.amazonaws.com/uploads/projects/1771269273486-25-img-0330.webp');
INSERT INTO project_images (id, project_id, image_path) VALUES (23, 9, 'https://ba-bucket-aws.s3.amazonaws.com/uploads/projects/1771269305373-4-img-0231.webp');
INSERT INTO project_images (id, project_id, image_path) VALUES (24, 9, 'https://ba-bucket-aws.s3.amazonaws.com/uploads/projects/1771269337329-img-0249.webp');
INSERT INTO project_images (id, project_id, image_path) VALUES (25, 9, 'https://ba-bucket-aws.s3.amazonaws.com/uploads/projects/1771269373017-kitchenreno1.webp');
INSERT INTO project_images (id, project_id, image_path) VALUES (26, 9, 'https://ba-bucket-aws.s3.amazonaws.com/uploads/projects/1771269408769-lenord.webp');
INSERT INTO project_images (id, project_id, image_path) VALUES (27, 9, 'https://ba-bucket-aws.s3.amazonaws.com/uploads/projects/1771269455345-project-lenord.webp');
INSERT INTO project_images (id, project_id, image_path) VALUES (28, 10, 'https://ba-bucket-aws.s3.amazonaws.com/uploads/projects/1771290785272-roswell-reno-kitchen7.webp');
INSERT INTO project_images (id, project_id, image_path) VALUES (29, 10, 'https://ba-bucket-aws.s3.amazonaws.com/uploads/projects/1771292383803-roswell-reno-kitchen29.webp');
INSERT INTO project_images (id, project_id, image_path) VALUES (30, 10, 'https://ba-bucket-aws.s3.amazonaws.com/uploads/projects/1771292409671-img-8829.webp');
INSERT INTO project_images (id, project_id, image_path) VALUES (31, 10, 'https://ba-bucket-aws.s3.amazonaws.com/uploads/projects/1771292435249-roswell-reno-kitchen4.webp');
INSERT INTO project_images (id, project_id, image_path) VALUES (32, 12, 'https://ba-bucket-aws.s3.amazonaws.com/uploads/projects/1771294047432-copy-of-copy-of-img-7742.webp');
INSERT INTO project_images (id, project_id, image_path) VALUES (33, 13, 'https://ba-bucket-aws.s3.amazonaws.com/uploads/projects/1771294637106-4-img-7641.webp');
INSERT INTO project_images (id, project_id, image_path) VALUES (34, 13, 'https://ba-bucket-aws.s3.amazonaws.com/uploads/projects/1771294658248-6-img-7644.webp');

-- SQL Insert for blog_posts
INSERT INTO blog_posts (id, title, slug, short_description, main_image, created_at, updated_at) VALUES (1, 'Design Spotlight:  Rise of the ‘Spathroom’', 'design-spotlight-rise-of-the-spathroom-6303', 'Bathroom Remodeling | Design Spotlight', '/uploads/blog/1770312935785-header_entrada_blog.webp', '2026-02-05 17:35:36', '2026-02-05 17:35:36');

-- SQL Insert for blog_sections
INSERT INTO blog_sections (id, post_id, type, content_text, image_path_1, image_path_2, order_index) VALUES (1, 1, 'image_single', NULL, '/uploads/blog/1770312936344-header_entrada_blog.webp', NULL, 0);
