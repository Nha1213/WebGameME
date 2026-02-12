-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 04, 2025 at 02:06 PM
-- Server version: 8.3.0
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webgame`
--

-- --------------------------------------------------------

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
CREATE TABLE IF NOT EXISTS `player` (
  `id` int NOT NULL AUTO_INCREMENT,
  `player_name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `team_id` varchar(255) NOT NULL,
  `status` int DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `player_name` (`player_name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `player`
--

INSERT INTO `player` (`id`, `player_name`, `image`, `team_id`, `status`) VALUES
(6, 'Nha', 'image_upload-1764855018028-344133417.png', 'TID001', 1),
(10, 'Oppi', 'image_upload-1764856076496-774350869.png', 'TID007', 0);

-- --------------------------------------------------------

--
-- Table structure for table `prize_pool`
--

DROP TABLE IF EXISTS `prize_pool`;
CREATE TABLE IF NOT EXISTS `prize_pool` (
  `id` int NOT NULL AUTO_INCREMENT,
  `place` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `team_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `place` (`place`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `prize_pool`
--

INSERT INTO `prize_pool` (`id`, `place`, `price`, `team_id`) VALUES
(11, 'PID001', 1000000, 'TID006'),
(15, 'PID012', 100000, 'TID004'),
(16, 'PID016', 10000, 'TID005');

-- --------------------------------------------------------

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
CREATE TABLE IF NOT EXISTS `team` (
  `id` int NOT NULL AUTO_INCREMENT,
  `team_name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `status` int DEFAULT '1',
  `description` text,
  `team_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `team_name` (`team_name`),
  UNIQUE KEY `team_id` (`team_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `team`
--

INSERT INTO `team` (`id`, `team_name`, `image`, `status`, `description`, `team_id`) VALUES
(4, 'TNC', 'image_upload-1764589115748-33486721.jpg', 1, 'office', 'TID004'),
(5, 'RRQ', 'image_upload-1764589349571-430224031.jpg', 0, 'R& Skyler', 'TID005'),
(6, 'Yamal', 'image_upload-1764589499606-570105668.jpg', 1, 'IT', 'TID006');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `create_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `create_at`, `status`) VALUES
(2, 'Vathana', 'Vathana@gmail.com', '$2b$10$69NbKrG1m5C0G2fecFvYZue6aBIMi5OgAR2R6x089u1K6Zpr5WVXC', '2025-11-03 16:54:04', NULL),
(6, 'Vathana', 'Vathana12@gmail.com', '$2b$10$IaFC6urZv5ZWxflkSa0c4O47D1Ezy.fsiUdEwb1OMrnkd8ECqUHD2', '2025-11-03 16:55:55', 0),
(8, 'Vathana', 'Vathana123@gmail.com', '$2b$10$AeRCx7TPuUKPfpBo4y7mK.u7fZhwAike08kjnqrvWCfHuIz0DfY/K', '2025-11-03 17:04:13', 0),
(9, 'gojo', 'gojo123@gmail.com', '$2b$10$KNd/UiWSTAdD0V6Kl6x0R.q.MUU2ZzgvtZvmuMYuSH1zikicg51vq', '2025-11-19 20:10:00', 0),
(18, 'admin', 'gojo12@gmail.com', '$2b$10$mp8V8pIQyF9fOVvueVDt2eT4vslZSptBhCKxwi2twTgHRgDdHkjly', '2025-11-19 21:03:54', 0),
(26, 'Roeun Vathana', 'gojo1@gmail.com', '$2b$10$cN.EThFEXLLIFK3nUwSB2e8CZ6oT03q3lCrhBc6wBk1QaFspxNWji', '2025-11-20 22:15:41', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
