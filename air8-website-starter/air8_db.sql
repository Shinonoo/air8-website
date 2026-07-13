-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 13, 2026 at 04:04 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `air8_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(120) NOT NULL,
  `slug` varchar(140) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(120) NOT NULL,
  `slug` varchar(140) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `brand_id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(280) NOT NULL,
  `code` varchar(80) DEFAULT NULL,
  `short_description` text DEFAULT NULL,
  `full_description` longtext DEFAULT NULL,
  `primary_image_url` varchar(500) DEFAULT NULL,
  `brochure_url` varchar(500) DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT 0,
  `is_published` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_files`
--

CREATE TABLE `product_files` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `file_type` enum('brochure','datasheet','installation','technical_drawing','other') NOT NULL DEFAULT 'other',
  `file_url` varchar(500) NOT NULL,
  `title` varchar(255) NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `alt_text` varchar(255) DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_primary` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_specs`
--

CREATE TABLE `product_specs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `spec_label` varchar(120) NOT NULL,
  `spec_value` varchar(255) NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `idx_products_category` (`category_id`),
  ADD KEY `idx_products_brand` (`brand_id`),
  ADD KEY `idx_products_published` (`is_published`),
  ADD KEY `idx_products_sort` (`sort_order`);
ALTER TABLE `products` ADD FULLTEXT KEY `ft_products_search` (`name`,`code`,`short_description`,`full_description`);

--
-- Indexes for table `product_files`
--
ALTER TABLE `product_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_product_files_product` (`product_id`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_product_images_product` (`product_id`),
  ADD KEY `idx_product_images_primary` (`product_id`,`is_primary`);

--
-- Indexes for table `product_specs`
--
ALTER TABLE `product_specs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_product_specs_product` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_files`
--
ALTER TABLE `product_files`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_specs`
--
ALTER TABLE `product_specs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_brand` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`),
  ADD CONSTRAINT `fk_products_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Constraints for table `product_files`
--
ALTER TABLE `product_files`
  ADD CONSTRAINT `fk_product_files_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `fk_product_images_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_specs`
--
ALTER TABLE `product_specs`
  ADD CONSTRAINT `fk_product_specs_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

-- --------------------------------------------------------

--
-- Table structure for table `product_categories`
-- (products can belong to more than one category — e.g. "Inline Mounted
-- Fans" AND "Plate Mounted Fans" — so this many-to-many table is the
-- source of truth for category membership. `products.category_id` is
-- kept only as the "primary" category for simple joins.)
--

CREATE TABLE `product_categories` (
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `product_categories`
  ADD PRIMARY KEY (`product_id`,`category_id`),
  ADD KEY `idx_product_categories_category` (`category_id`);

ALTER TABLE `product_categories`
  ADD CONSTRAINT `fk_product_categories_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_product_categories_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

-- --------------------------------------------------------

--
-- Table structure for table `inquiries`
-- (every submission from the homepage contact form and the product
-- "Inquire for catalogue" popup lands here, regardless of whether SMTP
-- is configured — so a message is never silently lost.)
--

CREATE TABLE `inquiries` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(160) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(40) DEFAULT NULL,
  `company` varchar(160) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `service_type` varchar(60) DEFAULT NULL,
  `source` enum('contact','product') NOT NULL DEFAULT 'contact',
  `status` enum('new','contacted','quoted','closed') NOT NULL DEFAULT 'new',
  `email_sent` tinyint(1) NOT NULL DEFAULT 0,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `inquiries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_inquiries_created` (`created_at`);

ALTER TABLE `inquiries`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

-- --------------------------------------------------------

--
-- Table structure for table `site_content`
-- (editable text blocks for the marketing pages. Each row is one
-- "slot" the admin panel can reword — keyed by a stable content_key
-- that matches a data-content-key attribute in the HTML. The HTML keeps
-- the original copy as a fallback; `value` is only served to the front
-- end when it differs from `default_value`, i.e. the admin has actually
-- changed it. `default_value` is the seeded original, used for the
-- "reset to default" action and to decide whether a row is an override.)
--

CREATE TABLE `site_content` (
  `content_key` varchar(120) NOT NULL,
  `group_name` varchar(80) NOT NULL DEFAULT 'General',
  `label` varchar(200) NOT NULL,
  `value` text DEFAULT NULL,
  `default_value` text DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `site_content`
  ADD PRIMARY KEY (`content_key`),
  ADD KEY `idx_site_content_group` (`group_name`,`sort_order`);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
