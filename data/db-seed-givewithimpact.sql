SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;


CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `password_hash` varchar(250) NOT NULL,
  `user_type_id` int(11) NOT NULL,
  `organisation_id` int(11) NOT NULL,
  `gcm_reg_code` varchar(100) DEFAULT NULL,
  `email` varchar(250) NOT NULL,
  `token` varchar(500) DEFAULT NULL,
  `iat` int(11) DEFAULT NULL,
  `exp` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_organisation_id` (`email`,`organisation_id`),
  KEY `users_token` (`token`),
  KEY `users_organisation_id_name_email_gcm_reg_code` (`organisation_id`,`name`,`email`,`gcm_reg_code`),
  KEY `users_organisation_id` (`organisation_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

INSERT INTO `Users` (`id`, `name`, `password_hash`, `user_type_id`, `organisation_id`, `gcm_reg_code`, `email`, `token`, `iat`, `exp`, `created_at`, `updated_at`) VALUES
(1, 'Administrator', 'daf47b56dc2798bf1fc4ffe625dda31c0751b8db', 1, 101, NULL, 'support@wallstreetdocs.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJwYXNzd29yZF9oYXNoIjoiZGFmNDdiNTZkYzI3OThiZjFmYzRmZmU2MjVkZGEzMWMwNzUxYjhkYiIsInVzZXJfdHlwZV9pZCI6MSwib3JnYW5pc2F0aW9uX2lkIjoxMDEsImdjbV9yZWdfY29kZSI6bnVsbCwiZW1haWwiOiJzdXBwb3J0QHdhbGxzdHJlZXRkb2NzLmNvbSIsInRva2VuIjpudWxsLCJpYXQiOjE0NDQ0MDU3MTgsImV4cCI6MTQ0NDQyMzA5NiwiY3JlYXRlZF9hdCI6IjIwMTUtMTAtMDlUMDA6MDA6MDAuMDAwWiIsInVwZGF0ZWRfYXQiOiIyMDE1LTEwLTA5VDE1OjQ4OjM4LjAwMFoifQ._BlVsqeFktpbmstdYgylYGN3G4UZ1R3H4kzaqRFwFow', 1444405718, 1444423096, '2015-10-09 00:00:00', '2015-10-09 16:38:16');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
