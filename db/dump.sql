-- MySQL dump 10.13  Distrib 8.0.45, for Linux (x86_64)
--
-- Host: localhost    Database: moovies
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment_votes`
--

DROP DATABASE IF EXISTS `moovies`;
CREATE DATABASE moovies;
use moovies;


DROP TABLE IF EXISTS `comment_votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_votes` (
  `user_id` int NOT NULL,
  `comment_id` int NOT NULL,
  `vote` tinyint NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`comment_id`),
  KEY `fk_votes_comment` (`comment_id`),
  CONSTRAINT `fk_votes_comment` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_votes_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `chk_vote_value` CHECK ((`vote` in (1,-(1))))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_votes`
--

LOCK TABLES `comment_votes` WRITE;
/*!40000 ALTER TABLE `comment_votes` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment_votes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `movie_id` int NOT NULL,
  `user_id` int NOT NULL,
  `content` text NOT NULL,
  `rating` int NOT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `movie_id` (`movie_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comments_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,1,1,'meh',2,'2026-04-11 02:18:03'),(2,2,2,'no lo recomendaria',2,'2026-04-11 02:18:03'),(3,5,2,'excelente ritmo',3,'2026-04-11 02:18:03'),(4,3,3,'esos efectos wow',3,'2026-04-11 02:18:03'),(5,4,2,'merece paciencia',4,'2026-04-11 02:18:03'),(6,5,4,'el mejor actor de todos',4,'2026-04-11 02:18:03'),(7,6,2,'genialidad pura',5,'2026-04-11 02:18:03'),(8,7,1,'no hay nada mejor',5,'2026-04-11 02:18:03'),(9,8,5,'mejor mi*rda',1,'2026-04-11 02:18:03'),(10,9,6,'igual que emilia perez',1,'2026-04-11 02:18:03'),(11,6,8,'grandiosaaaa',4,'2026-04-11 02:18:03'),(12,7,8,'horrible',2,'2026-04-11 02:18:03'),(13,8,16,'mi peli fav',5,'2026-04-11 02:18:03'),(14,9,18,'genial',4,'2026-04-11 02:18:03'),(15,10,14,'no la vean',2,'2026-04-11 02:18:03'),(16,11,20,'green lantern estuvo mejor',2,'2026-04-11 02:18:03'),(17,12,8,'terrible',2,'2026-04-11 02:18:03'),(18,12,9,'cuando gana un oscar',5,'2026-04-11 02:18:03'),(19,12,12,'la vi dos veces',4,'2026-04-11 02:18:03'),(20,11,11,'mala',2,'2026-04-11 02:18:03'),(21,14,19,'buena para pasar el rato',3,'2026-04-11 02:18:03'),(22,12,10,'aburrida',2,'2026-04-11 02:18:03'),(23,10,9,'mid',3,'2026-04-11 02:18:03');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact` (
  `id` tinyint NOT NULL,
  `email` varchar(100) NOT NULL,
  `subject` varchar(150) DEFAULT NULL,
  `body` text,
  PRIMARY KEY (`id`),
  CONSTRAINT `contact_chk_1` CHECK ((`id` = 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
INSERT INTO `contact` VALUES (1,'feriva00526@gmail.com','Duda sobre MOOVIES','Hola, tengo una duda sobre la página web...');
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genres` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (1,'Acción'),(2,'Aventura'),(3,'Animación'),(4,'Comedia'),(5,'Crimen'),(6,'Documental'),(7,'Drama'),(8,'Fantasía'),(9,'Ciencia ficción'),(10,'Terror'),(11,'Misterio'),(12,'Romance'),(13,'Suspenso'),(14,'Bélico'),(15,'Histórico'),(16,'Musical'),(17,'Deporte'),(18,'Biografía'),(19,'Western'),(20,'Familia');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `milks`
--

DROP TABLE IF EXISTS `milks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `milks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `milks`
--

LOCK TABLES `milks` WRITE;
/*!40000 ALTER TABLE `milks` DISABLE KEYS */;
INSERT INTO `milks` VALUES (1,'Entera'),(2,'Deslactosada'),(3,'Almendra');
/*!40000 ALTER TABLE `milks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie_cast`
--

DROP TABLE IF EXISTS `movie_cast`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie_cast` (
  `movie_id` int NOT NULL,
  `person_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`movie_id`,`person_id`,`role_id`),
  KEY `person_id` (`person_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `movie_cast_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE,
  CONSTRAINT `movie_cast_ibfk_2` FOREIGN KEY (`person_id`) REFERENCES `people` (`id`) ON DELETE CASCADE,
  CONSTRAINT `movie_cast_ibfk_3` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie_cast`
--

LOCK TABLES `movie_cast` WRITE;
/*!40000 ALTER TABLE `movie_cast` DISABLE KEYS */;
INSERT INTO `movie_cast` VALUES (1,1,2),(1,1,3),(3,1,2),(3,1,3),(4,1,2),(4,1,3),(1,2,3),(4,2,3),(1,3,4),(3,3,4),(4,3,4),(8,3,4),(1,4,1),(2,4,1),(1,5,1),(1,6,1),(1,7,1),(4,7,1),(2,8,2),(17,8,2),(17,8,3),(2,9,4),(2,10,3),(2,11,1),(3,11,1),(9,11,1),(2,12,1),(2,13,1),(3,14,1),(3,15,1),(3,16,1),(4,17,1),(4,18,1),(4,19,1),(5,20,2),(5,20,3),(5,21,3),(5,22,1),(5,23,1),(5,24,1),(5,25,1),(6,26,2),(13,26,2),(13,26,3),(6,27,4),(13,27,4),(6,28,3),(6,29,1),(6,30,1),(6,31,1),(6,32,1),(7,33,2),(7,33,3),(7,34,2),(7,34,3),(7,35,4),(7,36,1),(7,37,1),(7,38,1),(7,39,1),(8,40,2),(8,41,4),(8,42,1),(8,43,1),(8,44,1),(8,45,1),(9,46,2),(9,46,3),(10,46,2),(10,46,3),(12,46,2),(12,46,3),(9,47,4),(10,47,4),(9,48,1),(9,49,1),(9,50,1),(10,51,1),(10,52,1),(10,53,1),(10,54,1),(11,55,2),(16,55,2),(11,56,4),(16,56,4),(19,56,4),(11,57,3),(11,58,3),(11,59,1),(11,60,1),(11,61,1),(11,62,1),(12,63,4),(12,64,3),(12,65,1),(12,66,1),(12,67,1),(12,68,1),(13,69,3),(13,70,1),(13,71,1),(13,72,1),(13,73,1),(14,74,2),(14,74,3),(14,75,4),(14,76,3),(14,77,1),(14,78,1),(14,79,1),(14,80,1),(15,81,2),(15,82,4),(15,83,3),(15,84,1),(15,85,1),(15,86,1),(15,87,1),(16,88,3),(16,90,1),(16,91,1),(16,92,1),(16,93,1),(17,94,3),(17,95,1),(17,96,1),(17,97,1),(18,98,2),(18,98,3),(18,99,4),(18,100,1),(18,101,1),(18,102,1),(18,103,1),(19,104,2),(19,104,3),(19,105,1),(19,106,1),(19,107,1),(19,108,1);
/*!40000 ALTER TABLE `movie_cast` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(150) NOT NULL,
  `description` varchar(300) NOT NULL,
  `summary` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `trailer` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movies`
--

LOCK TABLES `movies` WRITE;
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;
INSERT INTO `movies` VALUES (1,'Interstellar','Exploradores cruzan un agujero de gusano para salvar a la humanidad.','Ambientada en un futuro donde la Tierra ya no puede sustentar a la humanidad, un grupo de astronautas emprende un viaje interestelar más allá de nuestra galaxia a través de un agujero de gusano. Cooper, ex piloto convertido en agricultor, lidera la misión que podría salvar a la especie. La película explora el amor filial, el tiempo dilatado y la física cuántica con una banda sonora icónica de Hans Zimmer.','https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/f2e73310663523.560e8b9b60787.jpg','https://www.youtube.com/watch?v=zSWdZVtXT7E'),(2,'El lobo de Wall Street','Jordan Belfort y el exceso financiero en los años 90.','Basada en hechos reales, narra el ascenso y caída de Jordan Belfort, corredor de bolsa de Long Island que construyó un imperio de riqueza corrupta. Con humor salvaje y crítica social, Scorsese retrata la codicia, las drogas y el exceso de la cultura financiera de finales del siglo XX. Advertencia: humor adulto y escenas fuertes.','https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg','https://www.youtube.com/watch?v=Pj0wz7zu3Ms'),(3,'Inception','Robo de secretos dentro de los sueños, capas de realidad.','Dom Cobb es un ladrón especializado en la extracción: roba secretos del subconsciente mientras la víctima sueña. Cuando se le ofrece la posibilidad de borrar su pasado a cambio de una tarea casi imposible —implantar una idea (inception)— debe liderar un equipo en distintos niveles oníricos. Una obra maestra visual y conceptual sobre la culpa, la memoria y la duda.','https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg','https://www.youtube.com/watch?v=YoHD9XLrDyz'),(4,'El caballero oscuro','Batman contra el Joker en una batalla por el alma de Gotham.','Con la llegada del Joker, un criminal que desafía toda lógica, Batman, Gordon y Harvey Dent se ven arrastrados a un juego moral donde las reglas se rompen. La segunda entrega de la trilogía de Nolan redefine el cine de superhéroes con tensión, filosofía política y una actuación legendaria de Heath Ledger.','https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg','https://www.youtube.com/watch?v=EXeTwQWrcwY'),(5,'Pulp Fiction','Historias cruzadas de crimen, humor negro y diálogos memorables.','Los destinos de dos sicarios, un boxeador, la esposa de un gánster y otros personajes se entrelazan en Los Ángeles en una narrativa no lineal. Tarantino revoluciona el cine independiente con diálogos eléctricos, violencia estilizada y referencias pop. Ganadora de la Palma de Oro y referencia cultural absoluta de los 90.','https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg','https://www.youtube.com/watch?v=s7EdQnFqLCY'),(6,'Forrest Gump','La vida de un hombre simple en medio de la historia de EE. UU.','Forrest Gump no es el más listo de su pueblo, pero su corazón honesto lo lleva a vivir de todo: fútbol universitario, Vietnam, ping-pong internacional y un imperio de camarones. A través de su mirada ingenua recorremos décadas de historia estadounidense. Tom Hanks ofrece una actuación entrañable en una fábula sobre el destino y el amor.','https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg','https://www.youtube.com/watch?v=bLvqoHBptTU'),(7,'Matrix','Neo descubre que el mundo es una simulación y elige despertar.','Thomas Anderson, hacker conocido como Neo, recibe un mensaje misterioso que lo conduce a Morfeo y a la verdad: la realidad percibida es Matrix, una simulación creada por máquinas. Revolución visual con bullet time, artes marciales y filosofía. Una obra que definió el cine de ciencia ficción de finales de los 90.','https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg','https://www.youtube.com/watch?v=vKQi3bBA1y8'),(8,'Gladiator','Un general romano busca venganza en la arena.','Máximo Decimo Meridio es traicionado cuando Cómodo asesina a su padre y toma el trono. Esclavizado como gladiador, su furia y honor lo convierten en leyenda en el Coliseo. Ridley Scott combina espectáculo épico, drama político y una banda sonora inolvidable de Hans Zimmer y Lisa Gerrard.','https://upload.wikimedia.org/wikipedia/en/f/fb/Gladiator_%282000_film_poster%29.png','https://www.youtube.com/watch?v=ow5aMvDtVxg'),(9,'Titanic','Un romance imposible a bordo del transatlántico más famoso.','Jack y Rose se conocen en el viaje inaugural del RMS Titanic en 1912: él es un artista sin recursos, ella una joven atrapada en un compromiso impuesto por su clase. James Cameron combina romance épico, reconstrucción histórica y tragedia marítima con efectos que marcaron época. Una de las películas más taquilleras de la historia.','https://upload.wikimedia.org/wikipedia/en/1/18/Titanic_%281997_film%29_poster.png','https://www.youtube.com/watch?v=2CD5l7xQ70M'),(10,'Avatar','Un marine en Pandora entre dos mundos y una guerra por recursos.','Jake Sully pilota un avatar Na\'vi para infiltrarse en Pandora, pero su conexión con el planeta y con Neytiri lo obliga a elegir bando. James Cameron redefine el blockbuster con 3D inmersivo, diseño de mundos y un mensaje ecológico. Una experiencia visual que renovó el interés por el cine en 3D.','https://upload.wikimedia.org/wikipedia/en/d/d6/Avatar_%282009_film%29_poster.jpg','https://www.youtube.com/watch?v=5PSNL1qE6VY'),(11,'Parque Jurásico','Dinosaurios clonados y un parque temático que pierde el control.','En la isla Nublar, el multimillonario John Hammond abre un parque con dinosaurios recreados por ADN. Un grupo de especialistas visita la instalación el mismo día que un fallo eléctrico libera a los depredadores. Spielberg mezcla asombro infantil y terror adulto; revolucionó los efectos con animatrónica y CGI.','https://image.tmdb.org/t/p/w500/oU7Oq2kFAAlGqbU4VoAE36g4hoI.jpg','https://www.youtube.com/watch?v=RFinNxS5KN4'),(12,'Terminator 2: El juicio final','Un T-800 protege a John Connor del T-1000.','Sarah Connor prepara a su hijo John para el futuro apocalíptico mientras un Terminator T-800 reprogramado lo protege del letal T-1000. Cameron eleva la acción con efectos revolucionarios para el T-1000 líquido y una historia sobre el destino y la redención. Arnold Schwarzenegger en su papel más icónico.','https://image.tmdb.org/t/p/w500/wevxK10KhRKoCYSCHRNkzC1q1PL.jpg','https://www.youtube.com/watch?v=CRRlbKAWwGg'),(13,'Regreso al futuro','Marty viaje a 1955 y debe reunir a sus padres para volver.','Marty McFly accidentalmente viaja a 1955 en un DeLorean convertido en máquina del tiempo por el Doc Brown. Debe asegurar que sus padres se enamoren o dejará de existir. Comedia familiar perfecta con ritmo, chistes y una banda sonora inolvidable. Trilogía de referencia de los 80.','https://image.tmdb.org/t/p/w500/fNOH9f1aA7XRTzl1sAOx9iF553Q.jpg','https://www.youtube.com/watch?v=qvsgGtivCsg'),(14,'El padrino','La familia Corleone y el poder en el crimen organizado.','Don Vito Corleone es el patriarca de una familia mafiosa en Nueva York. Cuando le piden entrar en el negocio de las drogas, estalla un conflicto que arrastra a sus hijos Michael, Sonny y Fredo. Coppola redefine el gánster con Shakespeare, silencios incómodos y una fotografía cálida y sombría.','https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg','https://www.youtube.com/watch?v=Ua4lVJUPrKg'),(15,'El club de la lucha','Un insomne y un carismático Tyler crean un club clandestino.','El narrador, un oficinista insomne, conoce a Tyler Durden y fundan un club de pelea subterráneo que crece hasta convertirse en algo más oscuro. Fincher dirige con estética sucia y giros narrativos memorables. Adaptación de Chuck Palahniuk sobre identidad, consumo y rebelión.','https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg','https://www.youtube.com/watch?v=SUXWAEX2Ilg'),(16,'La lista de Schindler','Oskar Schindler salva judíos empleándolos en sus fábricas.','Durante el Holocausto, el empresario alemán Oskar Schindler emplea a más de mil judíos en sus fábricas para salvarlos de los campos de exterminio. Spielberg filma en blanco y negro con humanidad sobrecogedora. Ganadora de múltiples Óscar, incluida mejor película y director.','https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg','https://www.youtube.com/watch?v=gG22XNhtnoY'),(17,'Uno de los nuestros','Henry Hill y la mafia italiana de Nueva York.','Desde niño, Henry Hill sueña con pertenecer a la mafia. Scorsese narra décadas de ascenso y caída con voz en off frenética, planos secuencia icónicos y montaje vertiginoso. Ray Liotta, Joe Pesci y Robert De Niro en una de las mejores películas de gánsteres jamás filmadas.','https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg','https://www.youtube.com/watch?v=2ilzidi_J8Q'),(18,'Cadena perpetua','Esperanza y amistad en la prisión de Shawshank.','Andy Dufresne es condenado por un crimen que no cometió y forja amistad con Red en la penitenciaría de Shawshank. Con paciencia y dignidad, busca la libertad. Basada en Stephen King, es una reflexión sobre la esperanza y la injusticia con final memorable.','https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg','https://www.youtube.com/watch?v=NmzuHCHWEqI'),(19,'Star Wars: Una nueva esperanza','Luke, Han y Leia contra el Imperio y la Estrella de la Muerte.','La princesa Leia envía los planos de la Estrella de la Muerte a través de R2-D2. Luke Skywalker, Obi-Wan Kenobi y Han Solo unen fuerzas para rescatarla y destruir la superarma. George Lucas inventa un universo de ciencia ficción serial con efectos que cambiaron la industria.','https://upload.wikimedia.org/wikipedia/en/8/87/StarWarsMoviePoster1977.jpg','https://www.youtube.com/watch?v=1g3_CFmnf7Q');
/*!40000 ALTER TABLE `movies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movies_genres`
--

DROP TABLE IF EXISTS `movies_genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movies_genres` (
  `movie_id` int NOT NULL,
  `genre_id` int NOT NULL,
  PRIMARY KEY (`movie_id`,`genre_id`),
  KEY `genre_id` (`genre_id`),
  CONSTRAINT `movies_genres_ibfk_1` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`) ON DELETE CASCADE,
  CONSTRAINT `movies_genres_ibfk_2` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movies_genres`
--

LOCK TABLES `movies_genres` WRITE;
/*!40000 ALTER TABLE `movies_genres` DISABLE KEYS */;
INSERT INTO `movies_genres` VALUES (4,1),(8,2),(11,2),(13,2),(2,4),(5,5),(14,5),(17,5),(6,7),(15,7),(16,7),(18,7),(1,9),(3,9),(7,9),(10,9),(12,9),(19,9),(9,12);
/*!40000 ALTER TABLE `movies_genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `people`
--

DROP TABLE IF EXISTS `people`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `people` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `people`
--

LOCK TABLES `people` WRITE;
/*!40000 ALTER TABLE `people` DISABLE KEYS */;
INSERT INTO `people` VALUES (1,'Christopher Nolan'),(2,'Jonathan Nolan'),(3,'Hans Zimmer'),(4,'Matthew McConaughey'),(5,'Anne Hathaway'),(6,'Jessica Chastain'),(7,'Michael Caine'),(8,'Martin Scorsese'),(9,'Howard Shore'),(10,'Terence Winter'),(11,'Leonardo DiCaprio'),(12,'Jonah Hill'),(13,'Margot Robbie'),(14,'Joseph Gordon-Levitt'),(15,'Elliot Page'),(16,'Tom Hardy'),(17,'Christian Bale'),(18,'Heath Ledger'),(19,'Aaron Eckhart'),(20,'Quentin Tarantino'),(21,'Roger Avary'),(22,'John Travolta'),(23,'Samuel L. Jackson'),(24,'Uma Thurman'),(25,'Bruce Willis'),(26,'Robert Zemeckis'),(27,'Alan Silvestri'),(28,'Eric Roth'),(29,'Tom Hanks'),(30,'Robin Wright'),(31,'Gary Sinise'),(32,'Sally Field'),(33,'Lana Wachowski'),(34,'Lilly Wachowski'),(35,'Don Davis'),(36,'Keanu Reeves'),(37,'Laurence Fishburne'),(38,'Carrie-Anne Moss'),(39,'Hugo Weaving'),(40,'Ridley Scott'),(41,'Lisa Gerrard'),(42,'Russell Crowe'),(43,'Joaquin Phoenix'),(44,'Connie Nielsen'),(45,'Oliver Reed'),(46,'James Cameron'),(47,'James Horner'),(48,'Kate Winslet'),(49,'Billy Zane'),(50,'Kathy Bates'),(51,'Sam Worthington'),(52,'Zoe Saldaña'),(53,'Sigourney Weaver'),(54,'Stephen Lang'),(55,'Steven Spielberg'),(56,'John Williams'),(57,'Michael Crichton'),(58,'Michael Koepp'),(59,'Sam Neill'),(60,'Laura Dern'),(61,'Jeff Goldblum'),(62,'Richard Attenborough'),(63,'Brad Fiedel'),(64,'William Wisher'),(65,'Arnold Schwarzenegger'),(66,'Linda Hamilton'),(67,'Edward Furlong'),(68,'Robert Patrick'),(69,'Bob Gale'),(70,'Michael J. Fox'),(71,'Christopher Lloyd'),(72,'Lea Thompson'),(73,'Crispin Glover'),(74,'Francis Ford Coppola'),(75,'Nino Rota'),(76,'Mario Puzo'),(77,'Marlon Brando'),(78,'Al Pacino'),(79,'James Caan'),(80,'Robert Duvall'),(81,'David Fincher'),(82,'The Dust Brothers'),(83,'Jim Uhls'),(84,'Brad Pitt'),(85,'Edward Norton'),(86,'Helena Bonham Carter'),(87,'Meat Loaf'),(88,'Steven Zaillian'),(89,'Thomas Keneally'),(90,'Liam Neeson'),(91,'Ben Kingsley'),(92,'Ralph Fiennes'),(93,'Embeth Davidtz'),(94,'Nicholas Pileggi'),(95,'Ray Liotta'),(96,'Joe Pesci'),(97,'Lorraine Bracco'),(98,'Frank Darabont'),(99,'Thomas Newman'),(100,'Tim Robbins'),(101,'Morgan Freeman'),(102,'Bob Gunton'),(103,'William Sadler'),(104,'George Lucas'),(105,'Mark Hamill'),(106,'Harrison Ford'),(107,'Carrie Fisher'),(108,'Alec Guinness');
/*!40000 ALTER TABLE `people` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'actor'),(4,'composer'),(2,'director'),(3,'writer');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'cine_vaca','Cine Vaca','cine.vaca@gmail.com','moo123'),(2,'leche_galaxy','Leche Galaxy','galaxy@gmail.com','moo123'),(3,'moo_fan','Moo Fan','moofan@gmail.com','moo123'),(4,'palomitas_mx','Palomitas MX','palomitas@gmail.com','moo123'),(5,'critico_leche','Crítico Leche','critico@gmail.com','moo123'),(6,'sillon_comodo','Sillón Cómodo','sillon@gmail.com','moo123'),(7,'bluray_hd','Blu-ray HD','bluray@gmail.com','moo123'),(8,'soundtrack_lover','Soundtrack Lover','ost@gmail.com','moo123'),(9,'spoiler_alert','Spoiler Alert','spoiler@gmail.com','moo123'),(10,'cinefilo_00','Cinéfilo 00','cinefilo@gmail.com','moo123'),(11,'maraton_nocturno','Maratón Nocturno','maraton@gmail.com','moo123'),(12,'director_sofa','Director Sofá','sofa@gmail.com','moo123'),(13,'pop_corn_king','Pop Corn King','pop@gmail.com','moo123'),(14,'matinee_sol','Matinee Sol','matinee@gmail.com','moo123'),(15,'subtitulos_ok','Subtítulos OK','subs@gmail.com','moo123'),(16,'imax_dream','IMAX Dream','imax@gmail.com','moo123'),(17,'festival_moo','Festival Moo','festival@gmail.com','moo123'),(18,'rollo_camara','Rollo Cámara','rollo@gmail.com','moo123'),(19,'claqueta_azul','Claqueta Azul','claqueta@gmail.com','moo123'),(20,'vaquero_lacteo','admin','admin@gmail.com','1234');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_milks`
--

DROP TABLE IF EXISTS `users_milks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_milks` (
  `user_id` int NOT NULL,
  `milk_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`milk_id`),
  KEY `milk_id` (`milk_id`),
  CONSTRAINT `users_milks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `users_milks_ibfk_2` FOREIGN KEY (`milk_id`) REFERENCES `milks` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_milks`
--

LOCK TABLES `users_milks` WRITE;
/*!40000 ALTER TABLE `users_milks` DISABLE KEYS */;
INSERT INTO `users_milks` VALUES (1,1),(4,1),(6,1),(8,1),(10,1),(12,1),(14,1),(16,1),(18,1),(20,1),(2,2),(5,2),(9,2),(13,2),(17,2),(3,3),(7,3),(11,3),(15,3),(19,3);
/*!40000 ALTER TABLE `users_milks` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-11 11:34:42
