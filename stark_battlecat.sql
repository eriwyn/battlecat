-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le :  ven. 07 fév. 2020 à 16:36
-- Version du serveur :  10.0.38-MariaDB-0+deb8u1
-- Version de PHP :  7.1.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `stark_battlecat`
--

-- --------------------------------------------------------

--
-- Structure de la table `cats`
--

CREATE TABLE `cats` (
  `id` int(11) NOT NULL,
  `breed` varchar(256) NOT NULL,
  `name` varchar(256) NOT NULL,
  `image_url` text NOT NULL,
  `strength` int(11) NOT NULL,
  `hp_max` int(11) NOT NULL,
  `in_team` tinyint(1) NOT NULL,
  `date_summoned` datetime NOT NULL,
  `original_user_id` int(11) NOT NULL,
  `current_user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `cats`
--

INSERT INTO `cats` (`id`, `breed`, `name`, `image_url`, `strength`, `hp_max`, `in_team`, `date_summoned`, `original_user_id`, `current_user_id`) VALUES
(8, 'Turkish Angora', 'bonsoir', 'https://cdn2.thecatapi.com/images/41Fe8q9vU.jpg', 5, 18, 0, '2020-02-07 12:50:19', 12, 12),
(9, 'Scottish Fold', 'bonjour', 'https://cdn2.thecatapi.com/images/83CUYAi3g.jpg', 2, 11, 0, '2020-02-07 12:52:50', 12, 12),
(10, 'Munchkin', 'blabla', 'https://cdn2.thecatapi.com/images/LxcLIxuVT.jpg', 4, 15, 0, '2020-02-07 13:18:19', 12, 12),
(11, 'Bambino', 'bonjour', 'https://cdn2.thecatapi.com/images/wiHVRle1m.jpg', 4, 12, 0, '2020-02-07 16:08:32', 12, 12),
(12, 'Exotic Shorthair', 'test', 'https://cdn2.thecatapi.com/images/u3V0SSE-F.jpg', 6, 15, 0, '2020-02-07 16:10:09', 12, 12);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `points` int(11) NOT NULL,
  `date_creation` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `points`, `date_creation`) VALUES
(1, 'test', 'test', 0, '2020-01-08 00:00:00'),
(2, 'NULL', 'NULL', 0, '2020-02-05 16:55:11'),
(3, 'NULL', 'NULL', 0, '2020-02-06 22:54:08'),
(4, '\'aze\'', '\'aze\'', 0, '2020-02-06 22:54:38'),
(5, '\'azeazeza\'', '\'aze\'', 0, '2020-02-06 22:55:19'),
(6, '\'a\'', '\'a\'', 0, '2020-02-06 23:23:36'),
(7, '\'&œ\'', '\'a\'', 0, '2020-02-06 23:27:53'),
(8, '\'&œ\'', '\'a\'', 0, '2020-02-06 23:27:54'),
(9, '\'&œ\'', '\'a\'', 0, '2020-02-06 23:27:58'),
(10, '\'&œa\'', '\'a\'', 0, '2020-02-06 23:31:19'),
(11, '&œaa', 'aaze', 0, '2020-02-06 23:32:16'),
(12, 'aze', 'aze', 99159, '2020-02-06 23:32:45');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `cats`
--
ALTER TABLE `cats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `original_user_id` (`original_user_id`),
  ADD KEY `current_user_id` (`current_user_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `cats`
--
ALTER TABLE `cats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `cats`
--
ALTER TABLE `cats`
  ADD CONSTRAINT `cats_ibfk_1` FOREIGN KEY (`original_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cats_ibfk_2` FOREIGN KEY (`current_user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
