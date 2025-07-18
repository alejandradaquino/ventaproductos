-- 🔄 DROPS
DROP TABLE IF EXISTS `A_Article`;
DROP TABLE IF EXISTS `A_Banner`;
DROP TABLE IF EXISTS `A_Category`;
DROP TABLE IF EXISTS `A_Company`;
DROP TABLE IF EXISTS `A_Configuration`;
DROP TABLE IF EXISTS `A_Detail`;
DROP TABLE IF EXISTS `A_Orders`;
DROP TABLE IF EXISTS `A_Price`;
DROP TABLE IF EXISTS `A_PriceList`;
DROP TABLE IF EXISTS `A_Session`;
DROP TABLE IF EXISTS `A_Subcategory`;
DROP TABLE IF EXISTS `A_User`;

-- 🏗️ CREATES

CREATE TABLE `A_Article` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `specifications` varchar(500) NOT NULL,
  `code` varchar(30) NOT NULL,
  `defaultPrice` double(10,4) NOT NULL,
  `imgPath` varchar(200) NOT NULL,
  `categoryId` bigint NOT NULL,
  `subcategoryId` bigint NOT NULL,
  `wallapopLink` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `fk_Subcategory` (`subcategoryId`),
  KEY `fk_Category` (`categoryId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=0;

CREATE TABLE `A_Banner` (
  `id` int NOT NULL AUTO_INCREMENT,
  `imagePath` varchar(100) NOT NULL,
  `url` varchar(200) NOT NULL,
  `order` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=0;

CREATE TABLE `A_Category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=0;

CREATE TABLE `A_Company` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `idPriceList` int NOT NULL,
  `addresses` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=0;

CREATE TABLE `A_Configuration` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(200) NOT NULL,
  `telefono` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=0;

CREATE TABLE `A_Detail` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `idArticle` bigint NOT NULL,
  `name` varchar(300) NOT NULL,
  `code` varchar(100) NOT NULL,
  `imgPath` varchar(300) NOT NULL,
  `price` double NOT NULL,
  `quantity` int NOT NULL,
  `orderId` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=0;

CREATE TABLE `A_Orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `companyId` bigint NOT NULL,
  `orderNumber` varchar(100) NOT NULL,
  `costCenter` varchar(300) NOT NULL,
  `address` varchar(300) NOT NULL,
  `observations` varchar(300) NOT NULL,
  `requesterUserId` bigint NOT NULL,
  `dateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=0;

CREATE TABLE `A_Price` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idPriceList` int NOT NULL,
  `idArticle` int NOT NULL,
  `value` double(10,4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=0;

CREATE TABLE `A_PriceList` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(200) NOT NULL,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=0;

CREATE TABLE `A_Session` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idUser` int NOT NULL,
  `token` varchar(60) NOT NULL,
  `dateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=0;

CREATE TABLE `A_Subcategory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `categoryId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=0;

CREATE TABLE `A_User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullName` varchar(500) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `idCompany` int NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `seeAllArticles` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=0;

-- 📥 INSERTs

-- Tabla User
INSERT INTO `A_User` (`fullName`, `email`, `password`, `idCompany`, `deleted`, `seeAllArticles`) VALUES
('Administrador', 'alejandradaquino@gmail.com', 'adaquino', 0, 0, 0);

-- Tabla Banner
INSERT INTO `A_Banner` (`imagePath`, `url`, `order`) VALUES
('banner/muestra.jpg', '/profile', 1),
('banner/muestra3.jpg', '', 0);

-- Tabla Category
INSERT INTO `A_Category` (`name`) VALUES
('Muebles'),
('Tecnología'),
('Bazar'),
('Otros');

-- Tabla Subcategory (referencias por subconsulta)
INSERT INTO `A_Subcategory` (`name`, `categoryId`) VALUES
('Living',      (SELECT id FROM A_Category WHERE name = 'Muebles')),
('Niños',      (SELECT id FROM A_Category WHERE name = 'Muebles')),
('Tecnología',   (SELECT id FROM A_Category WHERE name = 'Tecnología')),
('Bazar',        (SELECT id FROM A_Category WHERE name = 'Bazar')),
('Juguetes',        (SELECT id FROM A_Category WHERE name = 'Otros'));
('Otros',        (SELECT id FROM A_Category WHERE name = 'Otros'));

