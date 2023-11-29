CREATE DATABASE  IF NOT EXISTS `hcmut_ssps` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `hcmut_ssps`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: hcmut_ssps
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `customer_id` int unsigned NOT NULL,
  `name` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(128) COLLATE utf8mb4_general_ci NOT NULL,
  `type` enum('student','lecturer') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'student',
  `email` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `balance` int NOT NULL DEFAULT '0',
  `last_used` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `customer_id_UNIQUE` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1111111,'Mai Đức T','$2a$10$kfi60Lqg5/b2PrsTpJ9SMOrufr15jBz/GR0MusAJq9kkF/L/y4arO','lecturer','t.mai@hcmut.edu.vn',100,'2023-11-29 17:55:00'),(1122334,'Bùi Công T','$2a$10$ZnsU72UpL59PL1H.tTZgWe.I7k.H6HxiK8llMa5A8W2hzsWIRZHLq','lecturer','t.bui@hcmut.edu.vn',100,'2023-11-29 14:19:03'),(1234567,'Lê Đình T','$2a$10$BlyLtCjYJ31eZAkwE0GPsOYHvrlDlJwQCspM7L8VQhk3jMxvjCb/C','lecturer','t.le@hcmut.edu.vn',100,'2023-11-29 14:17:15'),(2112111,'John Doe','$2a$10$OxERhZZDNwnJasuiO3FR7.EGvF8Pzu7u4XaVmrXdXPpNE6XLBKGAK','student','john.doe@hcmut.edu.vn',50,'2023-11-19 10:21:17'),(2112222,'Lê Văn A','$2a$10$O3KgX9QJzZwaFBzr6sIBpuTmQ0O.2kfvgRqDVPjFGS7C1DMO.NjWm','student','a.le@hcmut.edu.vn',10,'2023-11-19 10:23:40'),(2112333,'Trần Đức B','$2a$10$m.SEHw6fim5c7r0FH8UXDupIZ9hDxlKTXE.q7J6.hVt3brpId4Ygm','student','b.tran@hcmut.edu.vn',6,'2023-11-19 10:23:40'),(2112345,'Nguyễn Quốc Thắng','$2a$10$O0zXaNpGPoSxiBLew.47E.FADa/GAPCGn9JBYEUhOliY3alLXTMoC','student','thang.nguyen@hcmut.edu.vn',100,'2023-11-29 18:49:21');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `document`
--

DROP TABLE IF EXISTS `document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document` (
  `document_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `file_type` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `no_of_pages` int NOT NULL,
  `user_id` int unsigned NOT NULL,
  `printer_id` int unsigned NOT NULL,
  PRIMARY KEY (`document_id`),
  UNIQUE KEY `document_id_UNIQUE` (`document_id`),
  KEY `fk_prter_print_doc_idx` (`printer_id`),
  KEY `fk_user_own_doc_idx` (`user_id`),
  CONSTRAINT `fk_prter_print_doc` FOREIGN KEY (`printer_id`) REFERENCES `printer` (`printer_id`),
  CONSTRAINT `fk_user_own_doc` FOREIGN KEY (`user_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document`
--

LOCK TABLES `document` WRITE;
/*!40000 ALTER TABLE `document` DISABLE KEYS */;
/*!40000 ALTER TABLE `document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `print_order`
--

DROP TABLE IF EXISTS `print_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `print_order` (
  `print_id` int unsigned NOT NULL AUTO_INCREMENT,
  `side` enum('1','2') COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1',
  `page_size` enum('A4','A3') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'A4',
  `orientation` enum('portrait','landscape') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'portrait',
  `pages_per_sheet` int NOT NULL DEFAULT '1',
  `scale` float NOT NULL DEFAULT '1',
  `time_start` datetime DEFAULT CURRENT_TIMESTAMP,
  `time_end` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(45) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'pending',
  `pages_to_be_printed` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `document_id` int unsigned NOT NULL,
  `user_id` int unsigned NOT NULL,
  PRIMARY KEY (`print_id`),
  UNIQUE KEY `print_id_UNIQUE` (`print_id`),
  KEY `fk_user_print_idx` (`user_id`),
  KEY `fk_doc_printed` (`document_id`),
  CONSTRAINT `fk_doc_printed` FOREIGN KEY (`document_id`) REFERENCES `document` (`document_id`),
  CONSTRAINT `fk_user_print` FOREIGN KEY (`user_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `print_order`
--

LOCK TABLES `print_order` WRITE;
/*!40000 ALTER TABLE `print_order` DISABLE KEYS */;
/*!40000 ALTER TABLE `print_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `printer`
--

DROP TABLE IF EXISTS `printer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `printer` (
  `printer_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(256) COLLATE utf8mb4_general_ci NOT NULL,
  `brand` varchar(256) COLLATE utf8mb4_general_ci NOT NULL,
  `model` varchar(256) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(4096) COLLATE utf8mb4_general_ci NOT NULL,
  `loc_campus` enum('1','2') COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1',
  `loc_building` varchar(64) COLLATE utf8mb4_general_ci NOT NULL,
  `loc_room` varchar(64) COLLATE utf8mb4_general_ci NOT NULL,
  `status` enum('running','disabled','deleted') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'running',
  PRIMARY KEY (`printer_id`),
  UNIQUE KEY `printer_id_UNIQUE` (`printer_id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `printer`
--

LOCK TABLES `printer` WRITE;
/*!40000 ALTER TABLE `printer` DISABLE KEYS */;
INSERT INTO `printer` VALUES (1,'Máy in 1','HP','HP OfficeJet 8015e','Máy in HP OfficeJet 8015 có khả năng in, sao chép, quét và gửi fax một cách hiệu quả. Nó cũng hỗ trợ các tính năng đáng tin cậy như in hai mặt tự động và in từ xa thông qua kết nối Wi-Fi và Bluetooth. Với mẫu mã đẹp và kiểu dáng nhỏ gọn, nó làm cho việc giải quyết các nhu cầu văn phòng dễ dàng hơn.','1','B1','101','running'),(2,'Máy in 2','HP','HP LaserJet MFP 135a (4ZB82A)','Máy in HP Laser Trắng đen đa năng In scan copy LaserJet 135a (4ZB82A) thiết kế các mặt tinh xảo, vỏ phủ màu trắng - đen trang nhã, kiểu dáng gọn gàng, tô điểm cho không gian làm việc, sinh hoạt của bạn cao cấp, hiện đại hơn.','1','B1','105','running'),(3,'Máy in 3','Canon','Canon PIXMA GM2070 Wifi','Máy in phun đơn năng Canon PIXMA GM2070 sở hữu nét thiết kế hiện đại, vẻ ngoài sang trọng cùng các tính năng in ấn tân tiến, phù hợp để sử dụng trong văn phòng, trường học cũng như các hộ gia đình. Thiết kế hiện đại, đặt thăng bằng trên mọi mặt bàn, tủ. Hiệu suất in cao với tốc độ ổn định.','1','B2','111','running'),(4,'Máy in 4','Brother','Brother DCP-T720DW Wifi','Máy in phun màu đa năng In-Scan-Copy Brother DCP-T720DW được cài đặt các chức năng in 2 mặt, in wifi, copy và scan. Hơn nữa, là máy in phun màu, ngoài khả năng in đen trắng, máy còn có thể tạo nên những bản in màu tươi tắn. Phục vụ tốt cho nhu cầu in ấn trong gia đình, công ty quy mô nhỏ với tốc độ in ảnh 17 ảnh/phút (đen trắng), 16.5 ảnh/phút (màu), in trang 30 trang/phút (đen trắng), 26 trang/phút (màu). Công suất in đến 2.500 trang/tháng, in màu xuất trang đầu tiên trong 9.5 giây, in đen trắng chỉ trong 6 giây, giúp rút ngắn thời gian xử lý công việc.','1','A2','102','running'),(5,'Máy in 5','Canon','Canon PIXMA G1020','Máy In Phun Màu Đơn Năng Canon PIXMA G1020 đạt hiệu suất in cao, cho ra những bản in chất lượng, sắc nét cùng những tính năng hỗ trợ in ấn từ xa tiết kiệm thời gian, đáp ứng tối ưu cho nhu cầu in ấn của những hộ gia đình hay các doanh nghiệp vừa và nhỏ.','1','A5','105','running'),(6,'Máy in 6','HP','HP LaserJet M211dw Wifi (9YF83A)','Máy in HP sở hữu tông màu trắng đen đơn giản mà sang trọng, với chiều dài 356 mm, rộng 216 mm, cao 152.4 mm cho phép đặt ổn định, vững vàng trên mặt kệ tủ, bàn làm việc của bạn.','2','H1','107','running'),(7,'Máy in 7','Epson','Epson EcoTank L3250 Wifi (C11CJ67503)','Máy In Phun Màu Đa Năng Epson EcoTank L3250 Wifi (C11CJ67503) có vẻ ngoài gọn đẹp, in ấn linh hoạt với đa dạng chức năng cũng như linh hoạt trong việc kết nối với thiết bị tương thích, đảm bảo chất lượng bản in rõ nét với mực in chuyên dụng cho máy.','2','H2','107','running'),(8,'Máy in 8','HP','HP 107w Wifi (4ZB78A)','Máy in HP thiết kế các góc cạnh bo tròn mềm mại, mặt trước in logo thương hiệu nổi bật, kiểu dáng gọn gàng, đặt vững vàng ở nhiều vị trí trong phòng khách, văn phòng làm việc hoặc phòng ngủ của bạn.','2','H6','106','running'),(9,'Máy in 9','HP','HP LaserJet MFP 135a (4ZB82A)','Máy in HP Laser Trắng đen đa năng In scan copy LaserJet 135a (4ZB82A) thiết kế các mặt tinh xảo, vỏ phủ màu trắng - đen trang nhã, kiểu dáng gọn gàng, tô điểm cho không gian làm việc, sinh hoạt của bạn cao cấp, hiện đại hơn.','2','H3','104','disabled'),(10,'Máy in 10','HP','HP LaserJet M211d (9YF82A)','Máy in HP thiết kế đơn giản, gọn gàng, dễ bố trí ngay trên bàn làm việc với chiều dài 355 mm, rộng 279.5 mm, cao 205 mm và khối lượng chỉ 5.6 kg.','2','H3','101','deleted');
/*!40000 ALTER TABLE `printer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_order`
--

DROP TABLE IF EXISTS `purchase_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_order` (
  `purchase_id` int unsigned NOT NULL AUTO_INCREMENT,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `amount` int NOT NULL DEFAULT '0',
  `price` float NOT NULL DEFAULT '0',
  `status` varchar(45) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'pending',
  `user_id` int unsigned NOT NULL,
  PRIMARY KEY (`purchase_id`),
  UNIQUE KEY `purchase_id_UNIQUE` (`purchase_id`),
  KEY `fk_user_prchse_idx` (`user_id`),
  CONSTRAINT `fk_user_prchse` FOREIGN KEY (`user_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_order`
--

LOCK TABLES `purchase_order` WRITE;
/*!40000 ALTER TABLE `purchase_order` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchase_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spso`
--

DROP TABLE IF EXISTS `spso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `spso` (
  `spso_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `username` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(128) COLLATE utf8mb4_general_ci NOT NULL,
  `dob` date NOT NULL DEFAULT (curdate()),
  `email` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `phone` int NOT NULL,
  `last_used` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`spso_id`),
  UNIQUE KEY `spso_id_UNIQUE` (`spso_id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spso`
--

LOCK TABLES `spso` WRITE;
/*!40000 ALTER TABLE `spso` DISABLE KEYS */;
INSERT INTO `spso` VALUES (1,'Huỳnh Nguyên P','adminph','$2a$10$/5QDldKgWy.NxkwpXAmCquVgi9WlFbNsq3dVKWgkClh5DSNq4ItAm','2000-01-01','p.huynh@hcmut.edu.vn',123456789,'2023-11-29 18:47:31'),(2,'Trần Bảo P','adminpt','$2a$10$Fi7DXEiZyD9YhDUYHrwNb.skX2fXPrtZKTrnTXeHTvb8s9KKTQfBu','2000-01-01','p.tran@hcmut.edu.vn',123456789,'2023-11-26 00:00:00'),(3,'Dương Phúc T','admintd','$2a$10$OHJiPUO0QUnIuDA6xWJBkOFt1cylOOowdOkp7PkjK1Ed8.aFs/r9y','2000-01-01','t.duong@hcmut.edu.vn',123456789,'2023-11-26 00:00:00'),(4,'Cao Minh Q','adminqc','$2a$10$vcQRRMYm4gR6mFLL.8V1ZOyrNuA34MRkxEZPWpq5hCdeKSkvWwSqq','2000-01-01','q.cao@hcmut.edu.vn',123456789,'2023-11-29 18:49:25'),(5,'Nguyễn Tiến P','adminpn','$2a$10$5zoeSehUPPk9dS42Ujr1sOG.IZJKQQasG6K9hmsaEQDM6ukh83wP6','2000-01-01','p.nguyen@hcmut.edu.vn',123456789,'2023-11-29 14:27:45');
/*!40000 ALTER TABLE `spso` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-29 22:29:04
