CREATE DATABASE  IF NOT EXISTS `hcmut_ssps` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci /*!80016 DEFAULT ENCRYPTION='N' */;
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
INSERT INTO `customer` VALUES (2111111,'John Doe','123456','student','abc@xyz.com',10,'2023-11-19 10:21:17'),(2111112,'Sarah Fortune','123456','student','abc@xyz.com',5,'2023-11-19 10:23:40'),(2111113,'Khada Jhin','123456','student','abc@xyz.com',6,'2023-11-19 10:23:40'),(2114837,'Nguyễn Quốc Thắng','thangdeptrai','student','nhagiau@hocgioi.provjp',100,'2023-11-19 10:31:51');
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
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `file_type` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `no_of_pages` int NOT NULL,
  `user_id` int unsigned NOT NULL,
  `printer_id` int unsigned NOT NULL,
  PRIMARY KEY (`document_id`),
  UNIQUE KEY `document_id_UNIQUE` (`document_id`),
  KEY `fk_prter_print_doc_idx` (`printer_id`),
  KEY `fk_user_own_doc_idx` (`user_id`),
  CONSTRAINT `fk_prter_print_doc` FOREIGN KEY (`printer_id`) REFERENCES `printer` (`printer_id`),
  CONSTRAINT `fk_user_own_doc` FOREIGN KEY (`user_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
  `user_id` int unsigned NOT NULL,
  PRIMARY KEY (`print_id`),
  UNIQUE KEY `print_id_UNIQUE` (`print_id`),
  KEY `fk_user_print_idx` (`user_id`),
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
  `status` enum('running','disabled') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'running',
  PRIMARY KEY (`printer_id`),
  UNIQUE KEY `printer_id_UNIQUE` (`printer_id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `printer`
--

LOCK TABLES `printer` WRITE;
/*!40000 ALTER TABLE `printer` DISABLE KEYS */;
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
  `document_id` int unsigned NOT NULL,
  PRIMARY KEY (`purchase_id`),
  UNIQUE KEY `purchase_id_UNIQUE` (`purchase_id`),
  KEY `fk_doc_printed_idx` (`document_id`),
  KEY `fk_user_prchse_idx` (`user_id`),
  CONSTRAINT `fk_doc_printed` FOREIGN KEY (`document_id`) REFERENCES `document` (`document_id`),
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
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `username` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `dob` date NOT NULL DEFAULT (curdate()),
  `email` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` int NOT NULL,
  PRIMARY KEY (`spso_id`),
  UNIQUE KEY `spso_id_UNIQUE` (`spso_id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spso`
--

LOCK TABLES `spso` WRITE;
/*!40000 ALTER TABLE `spso` DISABLE KEYS */;
INSERT INTO `spso` VALUES (1,'The Unforgiven','admin1','123456','2000-01-01','nhagiau@hocgioi.provjp',123456789),(2,'The Conqueror','admin2','123456','2000-01-01','abc@def.ghi',123456789),(3,'Admin','admin3','123456','2000-01-01','abc@def.ghi',123456789);
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

-- Dump completed on 2023-11-19 17:55:55
