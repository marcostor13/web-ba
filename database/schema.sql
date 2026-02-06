-- Database Schema for BA Backoffice

CREATE DATABASE IF NOT EXISTS ba_remodeling;
USE ba_remodeling;

-- Authentication Tables (Lucia v3)
CREATE TABLE IF NOT EXISTS user (
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(1024) NOT NULL
);

CREATE TABLE IF NOT EXISTS session (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    expires_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

-- Cabinets Data Table
CREATE TABLE IF NOT EXISTS cabinets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(255) DEFAULT 'BA Kitchen & Bath',
    image VARCHAR(512) NOT NULL, -- Relative path for storage (e.g., /cabinets/product_1.webp)
    description TEXT,
    series VARCHAR(255),
    specifications TEXT, -- Long text or JSON
    tag ENUM('Blue', 'Brown', 'Gray', 'White') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    main_image VARCHAR(512) NOT NULL,
    logo_overlay VARCHAR(512), -- Graphic for center of project item
    category VARCHAR(100) DEFAULT 'Kitchen',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Project Gallery Images Table
CREATE TABLE IF NOT EXISTS project_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    image_path VARCHAR(512) NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    short_description TEXT,
    main_image VARCHAR(512) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Blog Sections Table (Dynamic Content)
CREATE TABLE IF NOT EXISTS blog_sections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    type ENUM('title', 'paragraph', 'image_single', 'image_double') NOT NULL,
    content_text TEXT, -- For title or paragraph
    image_path_1 VARCHAR(512), -- For image_single or first of double
    image_path_2 VARCHAR(512), -- For second of double
    order_index INT NOT NULL DEFAULT 0,
    FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE
);
