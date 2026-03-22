-- ────────────────────────────────────────────────────────────
-- CodePromix Agency — Full MySQL Schema
-- Run: mysql -u root -p < schema.sql
-- ────────────────────────────────────────────────────────────

CREATE DATABASE IF NOT EXISTS CodePromix_site
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE CodePromix_site;

-- ── Admin users ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admins (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100)  NOT NULL,
  email       VARCHAR(255)  NOT NULL UNIQUE,
  password    VARCHAR(255)  NOT NULL,
  role        ENUM('super_admin','editor') DEFAULT 'editor',
  avatar_url  VARCHAR(500)  DEFAULT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── Blog categories ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS categories (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  slug       VARCHAR(120) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── Blog posts ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS posts (
  id               INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title            VARCHAR(255)  NOT NULL,
  slug             VARCHAR(280)  NOT NULL UNIQUE,
  excerpt          TEXT,
  content          LONGTEXT,
  feature_image    VARCHAR(500)  DEFAULT NULL,
  category_id      INT UNSIGNED  DEFAULT NULL,
  author_id        INT UNSIGNED  NOT NULL,
  status           ENUM('draft','published') DEFAULT 'draft',
  -- SEO fields
  meta_title       VARCHAR(255)  DEFAULT NULL,
  meta_description VARCHAR(500)  DEFAULT NULL,
  meta_keywords    VARCHAR(500)  DEFAULT NULL,
  robots           ENUM('index,follow','noindex,nofollow','index,nofollow','noindex,follow') DEFAULT 'index,follow',
  -- Timestamps
  published_at     TIMESTAMP     DEFAULT NULL,
  created_at       TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id)   REFERENCES admins(id)     ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── Contact messages ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contacts (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(150) NOT NULL,
  email      VARCHAR(255) NOT NULL,
  phone      VARCHAR(30)  DEFAULT NULL,
  service    VARCHAR(100) DEFAULT NULL,
  message    TEXT         NOT NULL,
  is_read    TINYINT(1)   DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── Indexes ──────────────────────────────────────────────────
CREATE INDEX idx_posts_slug     ON posts(slug);
CREATE INDEX idx_posts_status   ON posts(status);
CREATE INDEX idx_posts_pub      ON posts(published_at);
CREATE INDEX idx_admins_email   ON admins(email);

-- ── Seed: default categories ─────────────────────────────────
INSERT IGNORE INTO categories (name, slug) VALUES
  ('Web Development', 'web-development'),
  ('Digital Marketing', 'digital-marketing'),
  ('SEO Tips', 'seo-tips'),
  ('WordPress', 'wordpress'),
  ('Business Growth', 'business-growth');

-- ── Seed: default super admin ────────────────────────────────
-- Password: Admin@1234  (bcrypt hash - change immediately after first login)
INSERT IGNORE INTO admins (name, email, password, role) VALUES
  ('CodePromix Admin', 'admin@CodePromix.in',
   '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TiGTsWsOKH0Mh.jxiYkH7j1JLKW',
   'super_admin');
