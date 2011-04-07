-- phpMyAdmin SQL Dump
-- version 3.3.9.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 06, 2011 at 10:28 PM
-- Server version: 5.1.49
-- PHP Version: 5.3.3-1ubuntu9.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `giprocesscontrol`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) DEFAULT NULL,
  `username` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`) VALUES
(1, 'ila', 'a82f40dbd2a1f96a58429ca440642a2a'),
(2, 'bb', 'a82f40dbd2a1f96a58429ca440642a2a'),
(3, 'dya', 'a82f40dbd2a1f96a58429ca440642a2a'),
(4, 'joseph', 'a82f40dbd2a1f96a58429ca440642a2a');

-- --------------------------------------------------------

--
-- Table structure for table `waterfall`
--

CREATE TABLE IF NOT EXISTS `waterfall` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  `bb` text COLLATE utf8_unicode_ci,
  `bbcheck` int(11) DEFAULT NULL,
  `dya` text COLLATE utf8_unicode_ci,
  `dyacheck` int(11) DEFAULT NULL,
  `ila` text COLLATE utf8_unicode_ci,
  `ilacheck` int(11) DEFAULT NULL,
  `joseph` text COLLATE utf8_unicode_ci,
  `josephcheck` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

--
-- Dumping data for table `waterfall`
--

