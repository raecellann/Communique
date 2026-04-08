-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 15, 2024 at 10:55 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `thread_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `account_id` bigint(20) NOT NULL,
  `username` varchar(100) NOT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `email` varchar(255) NOT NULL,
  `bio` varchar(250) DEFAULT NULL,
  `profile_image` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`account_id`, `username`, `gender`, `email`, `bio`, `profile_image`, `password`) VALUES
(1, 'vince', 'Male', 'vince@gmail.com', NULL, 'https://res.cloudinary.com/dhisbk3b2/image/upload/v1730429736/men_user_etkhsg.png', '6f75fb98da0788bf9bda09e05bf4b541327c9055f0dda1da8f8e9976b4baf8fc'),
(2, 'wilson', 'Male', 'wilson@gmail.com', NULL, 'https://res.cloudinary.com/dhisbk3b2/image/upload/v1730429736/men_user_etkhsg.png', '6f75fb98da0788bf9bda09e05bf4b541327c9055f0dda1da8f8e9976b4baf8fc'),
(4, 'johnnig', 'Female', 'johnnig@gmail.com', NULL, 'https://res.cloudinary.com/dhisbk3b2/image/upload/v1730429760/women_user_ohu8ga.png', 'beaefc3f3dbc06f15c3f2fae9115638cafc62d0e59876bc0d4673618e612d839'),
(5, 'YoloTommy812', 'Male', 'yolo@gmail.com', NULL, 'https://res.cloudinary.com/dhisbk3b2/image/upload/v1730429736/men_user_etkhsg.png', 'beaefc3f3dbc06f15c3f2fae9115638cafc62d0e59876bc0d4673618e612d839'),
(7, 'dummyAccount', 'Male', 'yesh@gmail.com', NULL, 'https://res.cloudinary.com/dhisbk3b2/image/upload/v1730429736/men_user_etkhsg.png', 'beaefc3f3dbc06f15c3f2fae9115638cafc62d0e59876bc0d4673618e612d839'),
(11, 'owosan', 'Male', 'owosan@gmail.com', NULL, 'https://res.cloudinary.com/dhisbk3b2/image/upload/v1730429736/men_user_etkhsg.png', '68560936cbdac7a771b235c5552c76cfcc6770ac39c432ecfe2ffa334ad0d1da'),
(12, 'username123', 'Female', 'user@gmail.com', NULL, 'https://res.cloudinary.com/dhisbk3b2/image/upload/v1730429760/women_user_ohu8ga.png', '68560936cbdac7a771b235c5552c76cfcc6770ac39c432ecfe2ffa334ad0d1da'),
(13, 'owo', 'Male', 'owo@gmail.com', NULL, 'https://res.cloudinary.com/dhisbk3b2/image/upload/v1730429736/men_user_etkhsg.png', 'beaefc3f3dbc06f15c3f2fae9115638cafc62d0e59876bc0d4673618e612d839'),
(17, 'yeshel', 'Female', 'nikatron12@gmail.com', NULL, 'https://res.cloudinary.com/dhisbk3b2/image/upload/v1730429760/women_user_ohu8ga.png', 'f8ed6f4e57c31ef803ad576ae7b3fcf3e65fb7917c82484eb3681e9401e8c863');

-- --------------------------------------------------------

--
-- Table structure for table `hashtags`
--

CREATE TABLE `hashtags` (
  `hashtag_id` bigint(20) NOT NULL,
  `hashtag_name` varchar(100) NOT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hashtags`
--

INSERT INTO `hashtags` (`hashtag_id`, `hashtag_name`, `created_at`) VALUES
(5, '#kabado', '2024-11-02'),
(6, '#lol', '2024-11-02'),
(7, '#testing', '2024-11-02'),
(8, '#cutie', '2024-11-02'),
(9, '#testing1', '2024-11-02'),
(10, '#skl', '2024-11-02'),
(11, '#takoyaki', '2024-11-02'),
(12, '#10owo', '2024-11-02'),
(13, '#labkoto', '2024-11-02'),
(14, '#labkotakoyaki', '2024-11-02'),
(15, '#pagod', '2024-11-03'),
(16, '#pagodpadin', '2024-11-03'),
(17, '#ligma', '2024-11-12'),
(18, '#owo', '2024-11-14'),
(19, '#loving-cats-for-layf', '2024-11-14');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `like_id` bigint(20) NOT NULL,
  `thread_id` bigint(20) NOT NULL,
  `account_id` bigint(20) NOT NULL,
  `liked` tinyint(1) NOT NULL,
  `liked_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`like_id`, `thread_id`, `account_id`, `liked`, `liked_at`) VALUES
(44, 9, 4, 1, '2024-11-08'),
(45, 14, 4, 1, '2024-11-08');

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `report_id` bigint(20) NOT NULL,
  `thread_id` bigint(20) NOT NULL,
  `reason` set('Bullying','Sexual','False Information') NOT NULL,
  `report_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `account_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `report`
--

INSERT INTO `report` (`report_id`, `thread_id`, `reason`, `report_at`, `account_id`) VALUES
(3, 9, 'Bullying', '2024-11-03 04:35:25', 4),
(4, 9, 'Sexual', '2024-11-03 04:35:25', 4);

-- --------------------------------------------------------

--
-- Table structure for table `threads`
--

CREATE TABLE `threads` (
  `thread_id` bigint(20) NOT NULL,
  `content` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `account_id` bigint(20) NOT NULL,
  `parent_thread_id` bigint(20) DEFAULT NULL,
  `is_repost` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `threads`
--

INSERT INTO `threads` (`thread_id`, `content`, `created_at`, `account_id`, `parent_thread_id`, `is_repost`) VALUES
(8, 'Owo 🤔', '2024-11-01 13:27:58', 2, NULL, 0),
(9, 'Testing', '2024-11-01 23:56:55', 2, NULL, 0),
(14, 'Gusto ko ng takoyaki #skl #takoyaki #10owo #labkoto #labkotakoyaki', '2024-11-02 15:10:29', 4, NULL, 0),
(15, 'Needed rest #pagod #pagodpadin', '2024-11-03 03:44:56', 4, NULL, 0),
(33, 'Lol I love Cats cause they look like living floof balls :3 #owo #loving-cats-for-layf', '2024-11-14 13:20:36', 4, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `thread_hashtags`
--

CREATE TABLE `thread_hashtags` (
  `thread_id` bigint(20) NOT NULL,
  `hashtag_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `thread_hashtags`
--

INSERT INTO `thread_hashtags` (`thread_id`, `hashtag_id`) VALUES
(14, 10),
(14, 11),
(14, 12),
(14, 13),
(14, 14),
(15, 15),
(15, 16),
(33, 18),
(33, 19);

-- --------------------------------------------------------

--
-- Table structure for table `user_relationship`
--

CREATE TABLE `user_relationship` (
  `user_relationship_id` bigint(20) NOT NULL,
  `follower_id` bigint(20) NOT NULL,
  `following_id` bigint(20) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_relationship`
--

INSERT INTO `user_relationship` (`user_relationship_id`, `follower_id`, `following_id`, `status`) VALUES
(1, 4, 2, 1),
(5, 4, 1, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`account_id`);

--
-- Indexes for table `hashtags`
--
ALTER TABLE `hashtags`
  ADD PRIMARY KEY (`hashtag_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`like_id`),
  ADD UNIQUE KEY `thread_id_2` (`thread_id`,`account_id`),
  ADD KEY `account_id` (`account_id`),
  ADD KEY `thread_id` (`thread_id`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`report_id`),
  ADD KEY `thread_id` (`thread_id`),
  ADD KEY `account_id` (`account_id`);

--
-- Indexes for table `threads`
--
ALTER TABLE `threads`
  ADD PRIMARY KEY (`thread_id`),
  ADD KEY `account_id` (`account_id`),
  ADD KEY `parent_thread_id` (`parent_thread_id`);

--
-- Indexes for table `thread_hashtags`
--
ALTER TABLE `thread_hashtags`
  ADD KEY `hashtag_id` (`hashtag_id`),
  ADD KEY `thread_id` (`thread_id`) USING BTREE;

--
-- Indexes for table `user_relationship`
--
ALTER TABLE `user_relationship`
  ADD PRIMARY KEY (`user_relationship_id`),
  ADD KEY `follower_id` (`follower_id`),
  ADD KEY `following_id` (`following_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `account_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `hashtags`
--
ALTER TABLE `hashtags`
  MODIFY `hashtag_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `like_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `report_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `threads`
--
ALTER TABLE `threads`
  MODIFY `thread_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `user_relationship`
--
ALTER TABLE `user_relationship`
  MODIFY `user_relationship_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`thread_id`) REFERENCES `threads` (`thread_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`) ON DELETE CASCADE;

--
-- Constraints for table `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `report_ibfk_1` FOREIGN KEY (`thread_id`) REFERENCES `threads` (`thread_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `report_ibfk_2` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`) ON DELETE CASCADE;

--
-- Constraints for table `threads`
--
ALTER TABLE `threads`
  ADD CONSTRAINT `threads_ibfk_1` FOREIGN KEY (`parent_thread_id`) REFERENCES `threads` (`thread_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `threads_ibfk_2` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`) ON DELETE CASCADE;

--
-- Constraints for table `thread_hashtags`
--
ALTER TABLE `thread_hashtags`
  ADD CONSTRAINT `thread_hashtags_ibfk_1` FOREIGN KEY (`thread_id`) REFERENCES `threads` (`thread_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `thread_hashtags_ibfk_2` FOREIGN KEY (`hashtag_id`) REFERENCES `hashtags` (`hashtag_id`) ON DELETE CASCADE;

--
-- Constraints for table `user_relationship`
--
ALTER TABLE `user_relationship`
  ADD CONSTRAINT `user_relationship_ibfk_1` FOREIGN KEY (`follower_id`) REFERENCES `account` (`account_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_relationship_ibfk_2` FOREIGN KEY (`following_id`) REFERENCES `account` (`account_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
