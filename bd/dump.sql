-- MySQL Workbench Forward Engineering Limpio
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `Proyecto_BD` DEFAULT CHARACTER SET utf8 ;
USE `Proyecto_BD` ;

-- 1. Calificacion (Tabla independiente)
CREATE TABLE IF NOT EXISTS `Proyecto_BD`.`Calificacion` (
  `id_Calificacion` INT NOT NULL AUTO_INCREMENT,
  `Puntaje` INT NOT NULL,
  `Fecha_Clasificacion` DATE NULL,
  PRIMARY KEY (`id_Calificacion`))
ENGINE = InnoDB;

-- 2. Peliculas
CREATE TABLE IF NOT EXISTS `Proyecto_BD`.`Peliculas` (
  `id_Peliculas` INT NOT NULL AUTO_INCREMENT,
  `Titulo_pelicula` VARCHAR(100) NOT NULL,
  `Fecha_lanzamiento` DATE NOT NULL,
  `Sinopsis` TEXT NULL,
  `Director` VARCHAR(45) NULL,
  `Portada` VARCHAR(255) NULL,
  PRIMARY KEY (`id_Peliculas`))
ENGINE = InnoDB;

-- 3. Usuario
CREATE TABLE IF NOT EXISTS `Proyecto_BD`.`Usuario` (
  `id_Usuario` INT NOT NULL AUTO_INCREMENT,
  `Nombre_usuario` VARCHAR(45) NOT NULL,
  `Pasword_usuario` VARCHAR(45) NOT NULL,
  `Correo_electronico` VARCHAR(45) NULL,
  `Foto_perfil` VARCHAR(255) NULL,
  PRIMARY KEY (`id_Usuario`))
ENGINE = InnoDB;

-- 4. Reviews (Relaciona Pelicula, Usuario y Calificacion)
CREATE TABLE IF NOT EXISTS `Proyecto_BD`.`Reviews` (
  `id_Review` INT NOT NULL AUTO_INCREMENT,
  `id_Pelicula` INT NOT NULL,
  `id_Usuario` INT NOT NULL,
  `id_Calificacion` INT NOT NULL,
  `Contenido_preview` TEXT NOT NULL,
  `Fresh` TINYINT(1) NOT NULL DEFAULT 0,
  `Fecha` DATE NOT NULL,
  PRIMARY KEY (`id_Review`),
  CONSTRAINT `fk_peli` FOREIGN KEY (`id_Pelicula`) REFERENCES `mydb`.`Peliculas` (`id_Peliculas`),
  CONSTRAINT `fk_user` FOREIGN KEY (`id_Usuario`) REFERENCES `mydb`.`Usuario` (`id_Usuario`),
  CONSTRAINT `fk_cali` FOREIGN KEY (`id_Calificacion`) REFERENCES `mydb`.`Calificacion` (`id_Calificacion`))
ENGINE = InnoDB;

-- 5. Favoritos (Tabla Intermedia M:N)
CREATE TABLE IF NOT EXISTS `Proyecto_BD`.`Favoritos` (
  `id_Pelicula` INT NOT NULL,
  `id_Usuario` INT NOT NULL,
  PRIMARY KEY (`id_Pelicula`, `id_Usuario`),
  CONSTRAINT `fk_fav_peli` FOREIGN KEY (`id_Pelicula`) REFERENCES `mydb`.`Peliculas` (`id_Peliculas`),
  CONSTRAINT `fk_fav_user` FOREIGN KEY (`id_Usuario`) REFERENCES `mydb`.`Usuario` (`id_Usuario`))
ENGINE = InnoDB;

-- 6. Bitácoras (Sin llaves foráneas para evitar errores en borrados)
CREATE TABLE IF NOT EXISTS `Proyecto_BD`.`Bitacora_Review` (
  `id_bit_rev` INT NOT NULL AUTO_INCREMENT,
  `Fecha` DATETIME NOT NULL,
  `Nombre_usuario_bd` VARCHAR(45) NOT NULL,
  `Accion` VARCHAR(10) NOT NULL,
  `Modificacion_new` TEXT NULL,
  `Modificacion_old` TEXT NULL,
  PRIMARY KEY (`id_bit_rev`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `Proyecto_BD`.`Bitacora_Pelicula` (
  `id_bit_peli` INT NOT NULL AUTO_INCREMENT,
  `Fecha` DATETIME NOT NULL,
  `Nombre_usuario_bd` VARCHAR(45) NOT NULL,
  `Accion` VARCHAR(10) NOT NULL,
  `Modificacion_new` TEXT NULL,
  `Modificacion_old` TEXT NULL,
  PRIMARY KEY (`id_bit_peli`))
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
