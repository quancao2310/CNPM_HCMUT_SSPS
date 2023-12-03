-- Drop database if it already exists
DROP DATABASE IF EXISTS hcmut_ssps;

-- Create and use the database
CREATE DATABASE hcmut_ssps
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;
USE hcmut_ssps;

-- CREATE TABLES
-- Customer table
CREATE TABLE customer (
  customer_id INT,
  name VARCHAR(32) NOT NULL,
  password VARCHAR(128) NOT NULL,
  type ENUM('student','lecturer') NOT NULL DEFAULT 'student',
  email VARCHAR(32) NOT NULL,
  balance INT NOT NULL DEFAULT 0,
  last_used DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (customer_id)
) ENGINE=InnoDB;

-- SPSO table
CREATE TABLE spso (
  spso_id INT AUTO_INCREMENT,
  name VARCHAR(32) NOT NULL,
  username VARCHAR(32) NOT NULL,
  password VARCHAR(128) NOT NULL,
  dob DATE NOT NULL DEFAULT (CURRENT_DATE()),
  email VARCHAR(32) NOT NULL,
  phone VARCHAR(16) NOT NULL,
  last_used DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (spso_id),
  CONSTRAINT spso_username_unique UNIQUE (username)
) ENGINE=InnoDB;

-- Printer table
CREATE TABLE printer (
  printer_id INT AUTO_INCREMENT,
  name VARCHAR(256) NOT NULL,
  brand VARCHAR(256) NOT NULL,
  model VARCHAR(256) NOT NULL,
  description VARCHAR(4096) NOT NULL,
  loc_campus ENUM('1','2') NOT NULL DEFAULT '1',
  loc_building VARCHAR(64) NOT NULL,
  loc_room VARCHAR(64) NOT NULL,
  status ENUM('running','disabled','deleted') NOT NULL DEFAULT 'running',
  PRIMARY KEY (printer_id),
  CONSTRAINT printer_name_unique UNIQUE (name)
) ENGINE=InnoDB;

-- Document table
CREATE TABLE document (
  document_id INT AUTO_INCREMENT,
  name VARCHAR(64) NOT NULL,
  file_type VARCHAR(8) NOT NULL,
  no_of_pages INT NOT NULL,
  user_id INT,
  printer_id INT,
  PRIMARY KEY (document_id),
  CONSTRAINT fk_prter_print_doc FOREIGN KEY (printer_id) REFERENCES printer(printer_id) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_user_own_doc FOREIGN KEY (user_id) REFERENCES customer(customer_id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Print Order table
CREATE TABLE print_order (
  print_id INT AUTO_INCREMENT,
  side ENUM('1','2') NOT NULL DEFAULT '1',
  page_size ENUM('A4','A3') NOT NULL DEFAULT 'A4',
  orientation ENUM('portrait','landscape') NOT NULL DEFAULT 'portrait',
  pages_per_sheet INT NOT NULL DEFAULT 1,
  scale DECIMAL(3,2) NOT NULL DEFAULT 1.00,
  time_start DATETIME DEFAULT CURRENT_TIMESTAMP(),
  time_end DATETIME DEFAULT CURRENT_TIMESTAMP(),
  status ENUM('success','progress','failed','pending') NOT NULL DEFAULT 'pending',
  pages_to_be_printed VARCHAR(64) DEFAULT NULL,
  document_id INT,
  user_id INT,
  PRIMARY KEY (print_id),
  CONSTRAINT fk_doc_printed FOREIGN KEY (document_id) REFERENCES document(document_id) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_user_print FOREIGN KEY (user_id) REFERENCES customer(customer_id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Purchase Order table
CREATE TABLE purchase_order (
  purchase_id INT AUTO_INCREMENT,
  time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  amount INT NOT NULL DEFAULT 0,
  price FLOAT NOT NULL DEFAULT 0,
  status ENUM('unpaid','paid') NOT NULL DEFAULT 'unpaid',
  user_id INT,
  PRIMARY KEY (purchase_id),
  CONSTRAINT fk_user_prchse FOREIGN KEY (user_id) REFERENCES customer(customer_id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

-- INSERT DATA INTO TABLES
-- Insert data for the customer table
INSERT INTO customer (customer_id, name, password, type, email, balance, last_used)
VALUES
(1111111, 'Mai Đức T', '$2a$10$kfi60Lqg5/b2PrsTpJ9SMOrufr15jBz/GR0MusAJq9kkF/L/y4arO', 'lecturer', 't.mai@hcmut.edu.vn', 100, '2023-11-29 17:55:00'),
(2222222, 'Bùi Công T', '$2a$10$ZnsU72UpL59PL1H.tTZgWe.I7k.H6HxiK8llMa5A8W2hzsWIRZHLq', 'lecturer', 't.bui@hcmut.edu.vn', 100, '2023-11-29 14:19:03'),
(3333333, 'Lê Đình T', '$2a$10$BlyLtCjYJ31eZAkwE0GPsOYHvrlDlJwQCspM7L8VQhk3jMxvjCb/C', 'lecturer', 't.le@hcmut.edu.vn', 100, '2023-11-29 14:17:15'),
(2112111, 'John Doe', '$2a$10$OxERhZZDNwnJasuiO3FR7.EGvF8Pzu7u4XaVmrXdXPpNE6XLBKGAK', 'student', 'john.doe@hcmut.edu.vn', 50, '2023-11-19 10:21:17'),
(2112222, 'Lê Văn A', '$2a$10$O3KgX9QJzZwaFBzr6sIBpuTmQ0O.2kfvgRqDVPjFGS7C1DMO.NjWm', 'student', 'a.le@hcmut.edu.vn', 10, '2023-11-19 10:23:40'),
(2112333, 'Trần Đức B', '$2a$10$m.SEHw6fim5c7r0FH8UXDupIZ9hDxlKTXE.q7J6.hVt3brpId4Ygm', 'student', 'b.tran@hcmut.edu.vn', 6, '2023-11-19 10:23:40'),
(2112444, 'Nguyễn Quốc Thắng', '$2a$10$O0zXaNpGPoSxiBLew.47E.FADa/GAPCGn9JBYEUhOliY3alLXTMoC', 'student', 'thang.nguyen@hcmut.edu.vn', 100, '2023-11-29 18:49:21');

-- Insert data for the SPSO table
INSERT INTO spso (spso_id, name, username, password, dob, email, phone, last_used)
VALUES
(1, 'Huỳnh Nguyên Phúc', 'adminph', '$2a$10$/5QDldKgWy.NxkwpXAmCquVgi9WlFbNsq3dVKWgkClh5DSNq4ItAm', '2000-01-01', 'p.huynh@hcmut.edu.vn', 123456789, '2023-11-29 18:47:31'),
(2, 'Trần Bảo Phúc', 'adminpt', '$2a$10$Fi7DXEiZyD9YhDUYHrwNb.skX2fXPrtZKTrnTXeHTvb8s9KKTQfBu', '2000-01-01', 'p.tran@hcmut.edu.vn', 123456789, '2023-11-26 00:00:00'),
(3, 'Dương Phúc Thắng', 'admintd', '$2a$10$OHJiPUO0QUnIuDA6xWJBkOFt1cylOOowdOkp7PkjK1Ed8.aFs/r9y', '2000-01-01', 't.duong@hcmut.edu.vn', 123456789, '2023-11-26 00:00:00'),
(4, 'Cao Minh Quân', 'adminqc', '$2a$10$vcQRRMYm4gR6mFLL.8V1ZOyrNuA34MRkxEZPWpq5hCdeKSkvWwSqq', '2000-01-01', 'q.cao@hcmut.edu.vn', 123456789, '2023-11-29 18:49:25'),
(5, 'Nguyễn Tiến Phát', 'adminpn', '$2a$10$5zoeSehUPPk9dS42Ujr1sOG.IZJKQQasG6K9hmsaEQDM6ukh83wP6', '2000-01-01', 'p.nguyen@hcmut.edu.vn', 123456789, '2023-11-29 14:27:45');

-- Insert data for the printer table
INSERT INTO printer (printer_id, name, brand, model, description, loc_campus, loc_building, loc_room, status)
VALUES
(1, 'Máy in 1', 'HP', 'HP OfficeJet 8015e', 'Máy in HP OfficeJet 8015 có khả năng in, sao chép, quét và gửi fax một cách hiệu quả. Nó cũng hỗ trợ các tính năng đáng tin cậy như in hai mặt tự động và in từ xa thông qua kết nối Wi-Fi và Bluetooth. Với mẫu mã đẹp và kiểu dáng nhỏ gọn, nó làm cho việc giải quyết các nhu cầu văn phòng dễ dàng hơn.', '1', 'B1', '101', 'running'),
(2, 'Máy in 2', 'HP', 'HP LaserJet MFP 135a (4ZB82A)', 'Máy in HP Laser Trắng đen đa năng In scan copy LaserJet 135a (4ZB82A) thiết kế các mặt tinh xảo, vỏ phủ màu trắng - đen trang nhã, kiểu dáng gọn gàng, tô điểm cho không gian làm việc, sinh hoạt của bạn cao cấp, hiện đại hơn.', '1', 'B1', '105', 'running'),
(3, 'Máy in 3', 'Canon', 'Canon PIXMA GM2070 Wifi', 'Máy in phun đơn năng Canon PIXMA GM2070 sở hữu nét thiết kế hiện đại, vẻ ngoài sang trọng cùng các tính năng in ấn tân tiến, phù hợp để sử dụng trong văn phòng, trường học cũng như các hộ gia đình. Thiết kế hiện đại, đặt thăng bằng trên mọi mặt bàn, tủ. Hiệu suất in cao với tốc độ ổn định.', '1', 'B2', '111', 'running'),
(4, 'Máy in 4', 'Brother', 'Brother DCP-T720DW Wifi', 'Máy in phun màu đa năng In-Scan-Copy Brother DCP-T720DW được cài đặt các chức năng in 2 mặt, in wifi, copy và scan. Hơn nữa, là máy in phun màu, ngoài khả năng in đen trắng, máy còn có thể tạo nên những bản in màu tươi tắn. Phục vụ tốt cho nhu cầu in ấn trong gia đình, công ty quy mô nhỏ với tốc độ in ảnh 17 ảnh/phút (đen trắng), 16.5 ảnh/phút (màu), in trang 30 trang/phút (đen trắng), 26 trang/phút (màu). Công suất in đến 2.500 trang/tháng, in màu xuất trang đầu tiên trong 9.5 giây, in đen trắng chỉ trong 6 giây, giúp rút ngắn thời gian xử lý công việc.', '1', 'A2', '102', 'running'),
(5, 'Máy in 5', 'Canon', 'Canon PIXMA G1020', 'Máy In Phun Màu Đơn Năng Canon PIXMA G1020 đạt hiệu suất in cao, cho ra những bản in chất lượng, sắc nét cùng những tính năng hỗ trợ in ấn từ xa tiết kiệm thời gian, đáp ứng tối ưu cho nhu cầu in ấn của những hộ gia đình hay các doanh nghiệp vừa và nhỏ.', '1', 'A5', '105', 'running'),
(6, 'Máy in 6', 'HP', 'HP LaserJet M211dw Wifi (9YF83A)', 'Máy in HP sở hữu tông màu trắng đen đơn giản mà sang trọng, với chiều dài 356 mm, rộng 216 mm, cao 152.4 mm cho phép đặt ổn định, vững vàng trên mặt kệ tủ, bàn làm việc của bạn.', '2', 'H1', '107', 'running'),
(7, 'Máy in 7', 'Epson', 'Epson EcoTank L3250 Wifi (C11CJ67503)', 'Máy In Phun Màu Đa Năng Epson EcoTank L3250 Wifi (C11CJ67503) có vẻ ngoài gọn đẹp, in ấn linh hoạt với đa dạng chức năng cũng như linh hoạt trong việc kết nối với thiết bị tương thích, đảm bảo chất lượng bản in rõ nét với mực in chuyên dụng cho máy.', '2', 'H2', '107', 'running'),
(8, 'Máy in 8', 'HP', 'HP 107w Wifi (4ZB78A)', 'Máy in HP thiết kế các góc cạnh bo tròn mềm mại, mặt trước in logo thương hiệu nổi bật, kiểu dáng gọn gàng, đặt vững vàng ở nhiều vị trí trong phòng khách, văn phòng làm việc hoặc phòng ngủ của bạn.', '2', 'H6', '106', 'running'),
(9, 'Máy in 9', 'HP', 'HP LaserJet MFP 135a (4ZB82A)', 'Máy in HP Laser Trắng đen đa năng In scan copy LaserJet 135a (4ZB82A) thiết kế các mặt tinh xảo, vỏ phủ màu trắng - đen trang nhã, kiểu dáng gọn gàng, tô điểm cho không gian làm việc, sinh hoạt của bạn cao cấp, hiện đại hơn.', '2', 'H3', '104', 'disabled'),
(10, 'Máy in 10', 'HP', 'HP LaserJet M211d (9YF82A)', 'Máy in HP thiết kế đơn giản, gọn gàng, dễ bố trí ngay trên bàn làm việc với chiều dài 355 mm, rộng 279.5 mm, cao 205 mm và khối lượng chỉ 5.6 kg.', '2', 'H3', '101', 'deleted');

-- Insert data for the document table
INSERT INTO document (document_id, name, file_type, no_of_pages, user_id, printer_id) VALUES
(1, 'Internship Report 2023', 'pdf', 16, 2222222, 3),
(2, 'C++ Programming Teaching Plan', 'pdf', 10, 2112222, 1),
(3, 'Occupational Safety Regulations', 'doc', 5, 2112333, 2),
(4, 'AI Technology Advancements Research Project', 'xls', 20, 2112444, 4),
(5, 'Student Evaluation Semester 1', 'pdf', 8, 2112111, 6),
(6, 'Enterprise Accounting Course Program', 'ppt', 15, 2222222, 5),
(7, 'Project Management Software User Guide', 'pdf', 37, 2112111, 3),
(8, 'Advanced Calculus Course Final Grades', 'doc', 12, 2112222, 7),
(9, 'Software Development Best Practices', 'xls', 18, 2112333, 9),
(10, 'Cybersecurity Guidelines', 'ppt', 10, 2112444, 8);

-- Insert data for the print_order table
INSERT INTO print_order (print_id, side, page_size, orientation, pages_per_sheet, scale, time_start, time_end, status, pages_to_be_printed, document_id, user_id) VALUES
(1, '1', 'A4', 'portrait', 1, 1.00, '2022-10-01 10:00:00', '2022-10-01 11:00:00', 'progress', '8-15', 3, 2112333),
(2, '1', 'A4', 'portrait', 1, 1.00, '2022-11-01 17:30:00', '2022-11-01 18:30:00', 'success', '5-15', 9, 2112333),
(3, '1', 'A4', 'portrait', 1, 0.90, '2022-12-01 08:00:00', '2022-12-01 08:30:00', 'success', '5-10', 1, 2222222),
(4, '1', 'A4', 'portrait', 1, 0.50, '2023-03-01 14:00:00', '2023-03-01 15:00:00', 'failed', '3-7', 6, 2222222),
(5, '2', 'A3', 'landscape', 2, 1.50, '2023-05-01 18:00:00', '2023-05-01 19:30:00', 'failed', 'All', 10, 2112444),
(6, '1', 'A4', 'portrait', 1, 1.00, '2023-05-01 15:30:00', '2023-05-01 16:30:00', 'progress', '10-20', 7, 2112111),
(7, '1', 'A4', 'portrait', 1, 0.60, '2023-07-01 11:30:00', '2023-07-01 12:30:00', 'pending', 'All', 4, 2112444),
(8, '2', 'A3', 'landscape', 2, 0.78, '2023-12-01 16:00:00', '2023-12-01 17:30:00', 'pending', 'All', 8, 2112222),
(9, '2', 'A3', 'landscape', 2, 0.85, '2023-12-01 13:00:00', '2023-12-01 14:30:00', 'success', '1-6', 5, 2112111),
(10, '2', 'A3', 'landscape', 2, 0.90, '2023-12-01 09:00:00', '2023-12-01 10:30:00', 'failed', '1-3', 2, 2112222);

-- Insert data for the Purchase order table
INSERT INTO purchase_order (purchase_id, time, amount, price, status, user_id) VALUES
(1, '2023-12-01 08:00:00', 50, 50, 'unpaid', 2112222),
(2, '2023-12-01 09:00:00', 3, 30, 'paid', 2112333),
(3, '2023-12-01 10:00:00', 80, 80, 'unpaid', 2112444),
(4, '2023-12-01 11:00:00', 26, 20, 'paid', 2112111),
(5, '2023-12-01 12:00:00', 6, 60, 'unpaid', 2222222),
(6, '2023-12-01 13:00:00', 14, 40, 'paid', 2112111),
(7, '2023-12-01 14:00:00', 7, 70, 'unpaid', 2112222),
(8, '2023-12-01 15:00:00', 100, 10, 'paid', 2112333),
(9, '2023-12-01 16:00:00', 49, 90, 'unpaid', 2112444),
(10, '2023-12-01 17:00:00', 5, 50, 'paid', 2222222);