CREATE DATABASE IF NOT EXISTS air8_db;
USE air8_db;

CREATE TABLE IF NOT EXISTS inquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(50),
  product VARCHAR(150),
  message TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  slug VARCHAR(150) NOT NULL UNIQUE,
  category VARCHAR(100),
  description TEXT,
  brochure_url VARCHAR(255),
  image_url VARCHAR(255),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Seed initial products
INSERT INTO products (name, slug, category, description) VALUES
('Abie Tiger Sound Attenuator Silencer', 'abie-tiger-sound-attenuator', 'Noise Control', 'Sound attenuator/silencer for HVAC ductwork systems.'),
('Abie Tiger Vibration Isolators', 'abie-tiger-vibration-isolators', 'Vibration Control', 'Vibration isolators to reduce mechanical vibration transfer.'),
('Elta Fans', 'elta-fans', 'Fans & Blowers', 'Commercial, industrial, and residential fans from Elta UK/Malaysia.');
