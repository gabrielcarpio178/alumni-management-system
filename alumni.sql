-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 23, 2024 at 07:10 PM
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
-- Database: `alumni`
--

-- --------------------------------------------------------

--
-- Table structure for table `accomplishment`
--

CREATE TABLE `accomplishment` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `isMasteral` tinyint(1) NOT NULL DEFAULT 0,
  `isDoctorate` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accomplishment`
--

INSERT INTO `accomplishment` (`id`, `student_id`, `isMasteral`, `isDoctorate`) VALUES
(5, 17, 0, 1),
(6, 18, 0, 1),
(7, 19, 1, 1),
(8, 20, 1, 0),
(9, 21, 0, 0),
(10, 22, 0, 0),
(11, 26, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id` int(11) NOT NULL,
  `course` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id`, `course`) VALUES
(1, 'BSIS'),
(27, 'BSED'),
(28, 'COMSCIE');

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `id` int(11) NOT NULL,
  `posted_user` int(1) DEFAULT NULL,
  `event` varchar(255) NOT NULL,
  `schedule` datetime NOT NULL,
  `address` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `banner` text NOT NULL,
  `isApprove` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`id`, `posted_user`, `event`, `schedule`, `address`, `description`, `banner`, `isApprove`) VALUES
(2, NULL, 'homecoming', '2024-11-20 13:00:00', 'sport center bago city', 'homecoming batch 2024', '1730297747632.jpeg', 1),
(3, NULL, 'Reunion', '2024-11-21 12:30:00', 'itech school campos', 'reunion batch 2000', '1730782298708.jpeg', 1),
(15, 17, 'sample', '2000-04-04 01:01:00', 'sample', 'sample', '1734413157585.jpeg', 0);

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

CREATE TABLE `gallery` (
  `id` int(11) NOT NULL,
  `caption` text NOT NULL,
  `image` text NOT NULL,
  `date_upload` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gallery`
--

INSERT INTO `gallery` (`id`, `caption`, `image`, `date_upload`) VALUES
(21, 'batch 2024 homecoming update', '1730269302194.jpeg', '2024-10-30'),
(23, 'test gallery', '1730963296124.jpeg', '2024-11-07');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` int(11) NOT NULL,
  `posted_user` int(11) DEFAULT NULL,
  `company_name` varchar(100) NOT NULL,
  `job_title` varchar(100) NOT NULL,
  `location` varchar(150) NOT NULL,
  `email` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `datepost` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `posted_user`, `company_name`, `job_title`, `location`, `email`, `description`, `datepost`) VALUES
(27, NULL, 'sample', 'sample', 'sample', 'sample@gmail.com', 'sample', '2024-12-16 22:49:22');

-- --------------------------------------------------------

--
-- Table structure for table `participant`
--

CREATE TABLE `participant` (
  `id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `middlename` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `birthday` date NOT NULL,
  `course` int(11) NOT NULL,
  `batch` year(4) NOT NULL,
  `contact_num` varchar(100) NOT NULL,
  `profile_pic` text DEFAULT NULL,
  `student_id` varchar(255) NOT NULL,
  `isEmployed` tinyint(1) NOT NULL DEFAULT 0,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `firstname`, `middlename`, `lastname`, `gender`, `birthday`, `course`, `batch`, `contact_num`, `profile_pic`, `student_id`, `isEmployed`, `status`, `email`, `password`) VALUES
(17, 'sample', 'sample', 'sample', 'male', '2000-05-01', 1, '2024', '9123456789', NULL, '20240293012', 0, 1, 'sample@gmail.com', '$2b$10$.OzV7pnMFZwpUWi.nJkVfu/MihFNzt36tLwzm4CSi2eZmLoH1BWKu'),
(18, 'gabriel', 'huelar', 'carpio', 'male', '2000-05-01', 1, '2023', '9123456758', NULL, '20240293028', 1, 1, 'gabrielcarpio@gmail.com', '$2b$10$.OzV7pnMFZwpUWi.nJkVfu/MihFNzt36tLwzm4CSi2eZmLoH1BWKu'),
(19, 'andrew', 'carpio', 'tooc', 'male', '2000-06-17', 27, '2023', '9123456767', NULL, '20240293010', 1, 1, 'andrew@gmail.com', '$2b$10$.OzV7pnMFZwpUWi.nJkVfu/MihFNzt36tLwzm4CSi2eZmLoH1BWKu'),
(20, 'juan', 'dela', 'cruz', 'female', '1997-06-26', 1, '2010', '9123456789', NULL, '20240293039', 0, 1, 'jaun@gmail.com', '$2b$10$.OzV7pnMFZwpUWi.nJkVfu/MihFNzt36tLwzm4CSi2eZmLoH1BWKu'),
(21, 'john', 'dou', 'dei', 'female', '1997-06-26', 1, '2010', '9123456720', NULL, '20240293032', 0, 0, 'john@gmail.com', '$2b$10$.OzV7pnMFZwpUWi.nJkVfu/MihFNzt36tLwzm4CSi2eZmLoH1BWKu'),
(22, 'angela', 'dimagiba', 'montenegro', 'female', '2005-05-20', 27, '2024', '09231654798', NULL, '20240293015', 0, 0, 'angela@gmail.com', '$2b$10$LlL1V9EFGLPjM2bnn9sKjucdfYyRqoo5x7vh4vdMwv.RC2KJQc0bW'),
(26, 'alucard', 'dracon', 'vampire', 'male', '1999-11-01', 27, '2023', '09123456798', NULL, '20240293078', 1, 0, 'gabrielcarpio178@gmail.com', '$2b$10$rX4VeA3aeysFNYBlYk9xLeJl0e0GnAqPmSGlbpoQ5vIyRKISd4ZVq');

--
-- Triggers `students`
--
DELIMITER $$
CREATE TRIGGER `insertAccomplistment` AFTER INSERT ON `students` FOR EACH ROW INSERT INTO `accomplishment`(`student_id`, `isMasteral`, `isDoctorate`) VALUES (NEW.id,0,0)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `system_data`
--

CREATE TABLE `system_data` (
  `id` int(11) NOT NULL,
  `system_title` varchar(50) NOT NULL,
  `about` varchar(100) NOT NULL,
  `contact_number` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `system_data`
--

INSERT INTO `system_data` (`id`, `system_title`, `about`, `contact_number`, `email`) VALUES
(1, 'alumni information system', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est iure itaque dolore exercitationem dele', '09123456789', 'sample@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`) VALUES
(1, 'admin@test.com', '$2b$10$Nc5XzqBtQSCvM4R5OwSGeO2CNHYCf8W63nd9Aako0CjEGTZ5iSIEW');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accomplishment`
--
ALTER TABLE `accomplishment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `accomplishment_ibfk_1` (`student_id`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_ibfk_1` (`posted_user`);

--
-- Indexes for table `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_ibfk_1` (`posted_user`);

--
-- Indexes for table `participant`
--
ALTER TABLE `participant`
  ADD PRIMARY KEY (`id`),
  ADD KEY `participant_ibfk_1` (`event_id`),
  ADD KEY `participant_ibfk_2` (`student_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD KEY `students_ibfk_1` (`course`);

--
-- Indexes for table `system_data`
--
ALTER TABLE `system_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accomplishment`
--
ALTER TABLE `accomplishment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `gallery`
--
ALTER TABLE `gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `participant`
--
ALTER TABLE `participant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `system_data`
--
ALTER TABLE `system_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `accomplishment`
--
ALTER TABLE `accomplishment`
  ADD CONSTRAINT `accomplishment_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `event_ibfk_1` FOREIGN KEY (`posted_user`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `jobs`
--
ALTER TABLE `jobs`
  ADD CONSTRAINT `jobs_ibfk_1` FOREIGN KEY (`posted_user`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `participant`
--
ALTER TABLE `participant`
  ADD CONSTRAINT `participant_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `participant_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`course`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
