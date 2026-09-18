-- ============================================================
-- VINS Christian College of Engineering Database Schema
-- Database: MySQL 5.7+ / 8.0+ / MariaDB
-- ============================================================

CREATE DATABASE IF NOT EXISTS vins_college
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE vins_college;

-- ------------------------------------------------------------
-- 1. Admin Users Table (for Admin Portal Authentication)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(191) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  is_active BOOLEAN DEFAULT TRUE,
  last_login DATETIME NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_admin_username (username),
  INDEX idx_admin_email (email)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- 2. Notifications & Circulars Table
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS notifications (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  date_str VARCHAR(100) NOT NULL,
  category ENUM('Admissions', 'Exams', 'Placements', 'Events', 'Circulars', 'Scholarships') NOT NULL DEFAULT 'Circulars',
  is_new BOOLEAN DEFAULT TRUE,
  is_urgent BOOLEAN DEFAULT FALSE,
  summary TEXT NOT NULL,
  full_details LONGTEXT NOT NULL,
  issued_by VARCHAR(255) DEFAULT 'Principal Office & Administration',
  pdf_attachment_id VARCHAR(64) NULL,
  pdf_title VARCHAR(255) NULL,
  pdf_filename VARCHAR(255) NULL,
  pdf_path VARCHAR(500) NULL,
  pdf_size VARCHAR(50) NULL,
  pdf_type VARCHAR(20) DEFAULT 'PDF',
  external_link VARCHAR(500) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_notif_category (category),
  INDEX idx_notif_created (created_at)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- 3. Contact Inquiries & Feedback Table
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(191) NOT NULL DEFAULT '',
  phone VARCHAR(50) NOT NULL DEFAULT '',
  subject VARCHAR(200) DEFAULT 'General Inquiry',
  message TEXT NOT NULL,
  source ENUM('footer', 'contact_page', 'quick_inquiry') DEFAULT 'quick_inquiry',
  status ENUM('new', 'in_progress', 'contacted', 'closed') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_inquiry_status (status),
  INDEX idx_inquiry_created (created_at)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- 4. Online Admission Applications Table
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admission_applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  dob DATE NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(191) NOT NULL,
  academic_year VARCHAR(50) DEFAULT '2027 - 2028',
  category ENUM('UG', 'PG') NOT NULL DEFAULT 'UG',
  preferred_course VARCHAR(100) NOT NULL,
  qualification VARCHAR(100) DEFAULT 'HSC',
  percentage VARCHAR(20) NULL,
  city VARCHAR(100) DEFAULT 'Nagercoil',
  status ENUM('pending', 'reviewed', 'admitted', 'rejected') DEFAULT 'pending',
  notes TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_adm_status (status),
  INDEX idx_adm_course (preferred_course),
  INDEX idx_adm_created (created_at)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- 5. Campus Gallery Images Table
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS gallery_images (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL DEFAULT 'Campus',
  image_path LONGTEXT NOT NULL,
  description TEXT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_gallery_cat (category)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- 6. College Events & Showcase Table
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS college_events (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255) NULL,
  category VARCHAR(100) NOT NULL DEFAULT 'Ceremony',
  date_str VARCHAR(100) NOT NULL,
  image_path LONGTEXT NOT NULL,
  description TEXT NULL,
  chief_guest VARCHAR(255) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_event_cat (category)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- 7. Official Documents & Circulars Table
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS documents (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  filename VARCHAR(255) NOT NULL,
  path LONGTEXT NOT NULL,
  file_size VARCHAR(50) DEFAULT '1.5 MB',
  file_type VARCHAR(20) DEFAULT 'PDF',
  category VARCHAR(100) DEFAULT 'Official Documents',
  description TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_doc_cat (category)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- 8. Site Theme, Banners & Global Settings Key-Value Table
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS site_settings (
  setting_key VARCHAR(100) PRIMARY KEY,
  setting_value JSON NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================================
-- SEED DEFAULT DATA
-- ============================================================

-- Default Admin User (Password: admin123 -> bcrypt hashed)
INSERT INTO admin_users (username, email, password_hash, role)
VALUES (
  'admin',
  'admin@vinsengineeringcollege.org',
  '$2a$10$w822vIomWwM.o2.l.vI9kOqv2gqL734j2q023q6L6h8Z4B53pQY/W',
  'admin'
) ON DUPLICATE KEY UPDATE username = username;

-- Default Notifications
INSERT INTO notifications (id, title, date_str, category, is_new, is_urgent, summary, full_details, issued_by, pdf_title, pdf_filename, pdf_path, pdf_size, pdf_type)
VALUES
('notif-1', 'Admissions Open 2027-28: B.E. / M.E. / MBA Admissions Live', 'August 12, 2027', 'Admissions', 1, 1,
 'Applications invited for 10 UG Engineering Branches, 3 PG Research Specializations, and Master of Business Administration (MBA). Anna University Counseling Code: 4982.',
 'VINS Christian College of Engineering, Chunkankadai, Nagercoil announces open admissions for the academic year 2027-28 under Management and Government Quota (TNEA Code: 4982). Candidates can submit applications online or download printable forms from the college website.',
 'Admissions Directorate, VINS College', 'VINS Official Prospectus & Admission Rules 2027-28', 'prospectus.pdf', '/documents/prospectus.pdf', '3.4 MB', 'PDF'),

('notif-2', 'Azentra Global, Cognizant & TCS Mega On-Campus Placement Drive for 2027 Batch', 'August 10, 2027', 'Placements', 1, 1,
 'Azentra Global, Cognizant (GenC), and TCS Digital placement recruitment registration is now active for final year B.E., M.E., and MBA students.',
 'The Training & Placement Cell requests all eligible final year CSE, ECE, EEE, Mechanical, IT, Civil, and MBA students to register on the placement portal by August 18, 2027. Mock aptitude tests and technical interview coaching start on August 15.',
 'Directorate of Training & Placement', 'Azentra Global Placement Drive Schedule & Eligibility', 'placement-schedule-2027.pdf', '/documents/placement-schedule.pdf', '1.5 MB', 'PDF'),

('notif-3', 'Anna University End Semester Autonomous Examinations Schedule', 'August 08, 2026', 'Exams', 1, 0,
 'Timetable and hall ticket download guidelines for UG & PG End Semester Theory and Practical Examinations.',
 'Controller of Examinations releases the official schedule for November/December 2026 Anna University examinations. Students must clear fee dues and collect hall tickets from respective HOD offices before August 22.',
 'Controller of Examinations, Anna University / VINS', 'End-Semester Exam Timetable & Seating Plan', 'exam-timetable.pdf', '/documents/exam-timetable.pdf', '2.1 MB', 'PDF')
ON DUPLICATE KEY UPDATE title = VALUES(title);

-- Default Gallery Images
INSERT INTO gallery_images (id, title, category, image_path, description)
VALUES
('gal-1', 'Annual College Day Inaugural Ceremony & Lamp Lighting', 'Ceremony', '/images/college events and news galeery/h1.jpg', 'Distinguished guests and management lighting the ceremonial lamp.'),
('gal-2', 'Classical & Cultural Fusion Dance Performance', 'Cultural Dance', '/images/college events and news galeery/h3.jpg', 'Student cultural dance ensemble performance during annual festival.'),
('gal-3', 'Academic Quadrangle Architecture & Hillside Panorama', 'Campus', '/images/college events and news galeery/h5.jpg', 'Lush hillside campus quadrangle overlooking Chunkankadai hills.'),
('gal-4', 'Anna University Gold Medal & Rank Distribution', 'Awards', '/images/college events and news galeery/3 (1).jpg', 'Honoring university top rank holders and academic achievers.'),
('gal-5', 'Autonomous Robotics & AI Hackathon Workshop', 'Workshop', '/images/college events and news galeery/h11.jpg', 'Hands-on practical development session in robotics and AI computing lab.')
ON DUPLICATE KEY UPDATE title = VALUES(title);

-- Default Events
INSERT INTO college_events (id, title, subtitle, category, date_str, image_path, description, chief_guest)
VALUES
('evt-1', 'National Level Technical Symposium - CYBERTRON 2026', 'Department of CSE & IT', 'Conference', 'Mar 24 – Mar 25', '/images/college events and news galeery/h12.jpg', 'Two-day technical research symposium bringing together leading academic researchers, industry keynote speakers, and student innovators across India.', 'Dr. R. Velraj, Former Vice Chancellor, Anna University'),
('evt-2', 'Grand Annual College Day & Cultural Extravaganza', 'VINS Annual Fest', 'Ceremony', 'May 19', '/images/college events and news galeery/h3.jpg', 'Celebration of artistic talent, musical performances, classical dance competitions, and meritorious academic award distribution with distinguished guests.', 'Prof. M.P. Poonia, AICTE Vice Chairman'),
('evt-3', 'Mega Campus Placement & Corporate Recruitment Drive', 'Placement & Career Cell', 'Placement', 'Jun 12', '/images/college events and news galeery/h13.jpg', 'Over 40+ premier IT companies and core engineering recruiters conducting interviews, technical assessments, and issuing on-the-spot offer letters.', 'Director of HR, Cognizant Technology Solutions'),
('evt-4', 'Inter-College Hackathon & Robotics Championship', 'Robotics & AI Lab', 'Workshop', 'Aug 28', '/images/college events and news galeery/h11.jpg', '24-hour non-stop coding hackathon challenging engineering students to solve real-world industrial and societal challenges with prize pool of ₹1,00,000.', 'ISRO Senior Scientist')
ON DUPLICATE KEY UPDATE title = VALUES(title);

-- Default Documents
INSERT INTO documents (id, title, filename, path, file_size, file_type, category, description)
VALUES
('doc-mandatory', 'Mandatory Disclosure AICTE 2026-27', 'mandatory-disclosure-2026-27.pdf', '/documents/mandatory-disclosure.pdf', '2.4 MB', 'PDF', 'Statutory Disclosure', 'Mandatory public disclosure submitted to AICTE New Delhi.'),
('doc-aicte-eoa', 'AICTE Extension of Approval (EOA) 2025-26', 'aicte-eoa-2025-26.pdf', '/documents/aicte-eoa.pdf', '1.1 MB', 'PDF', 'Accreditation', 'Official AICTE Southern Region extension approval certificate.'),
('doc-prospectus', 'College Information Brochure & Prospectus', 'college-prospectus.pdf', '/documents/prospectus.pdf', '4.8 MB', 'PDF', 'Admissions', 'Complete degree syllabus, eligibility, lab details, and hostel guide.')
ON DUPLICATE KEY UPDATE title = VALUES(title);

-- Default Site Settings
INSERT INTO site_settings (setting_key, setting_value)
VALUES
('site_theme', '{
  "themeId": "navy-gold",
  "primaryColor": "#0a192f",
  "accentColor": "#d97706",
  "tneaCode": "4982",
  "phonePrimary": "+91 4652 259680",
  "emailPrimary": "info@vinsengineeringcollege.org",
  "collegeMotto": "Excellence in Education, Character for Life",
  "bannerTitle": "ADMISSIONS OPEN 2027-2028 | Anna University Code: 4982"
}'),
('site_banner', '{
  "isActive": true,
  "enabled": true,
  "headline": "Academic Year 2027 - 2028 Admissions Open!",
  "message": "Apply for B.E. / B.Tech / M.E. / MBA degree programs. Anna University Counselling Code: 4982.",
  "badge": "ADMISSIONS 2027-28",
  "buttonText": "Apply Online",
  "buttonTab": "admissions",
  "linkText": "Apply Online",
  "linkUrl": "#admissions",
  "type": "admissions"
}'),
('ticker_title', '"LIVE ANNOUNCEMENTS & CIRCULARS"')
ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value);
