-- MySQL Script generated by MySQL Workbench
-- Вт 04 мая 2021 17:08:17
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`school`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`school` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `city` VARCHAR(255) NULL,
  `street` VARCHAR(255) NULL,
  `house` VARCHAR(20) NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `mydb`.`teachers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`teachers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `lostname` VARCHAR(255) NOT NULL,
  `firstname` VARCHAR(255) NOT NULL,
  `patronymic` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(150) NOT NULL,
  `id_school` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_teachers_shool_idx` (`id_school` ASC) VISIBLE,
  CONSTRAINT `fk_teachers_shool`
    FOREIGN KEY (`id_school`)
    REFERENCES `mydb`.`school` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `mydb`.`students`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`students` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `lostname` VARCHAR(255) NOT NULL,
  `firstname` VARCHAR(255) NOT NULL,
  `patronymic` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(20) NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(150) NOT NULL,
  `id_teacher` INT NULL,
  `class` VARCHAR(32) NOT NULL,
  `id_school` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_students_school_idx` (`id_school` ASC) VISIBLE,
  INDEX `fk_students_teacher_idx` (`id_teacher` ASC) VISIBLE,
  CONSTRAINT `fk_students_school`
    FOREIGN KEY (`id_school`)
    REFERENCES `mydb`.`school` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_students_teacher`
    FOREIGN KEY (`id_teacher`)
    REFERENCES `mydb`.`teachers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `mydb`.`tests`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tests` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `class` VARCHAR(32) NOT NULL,
  `src` VARCHAR(255) NOT NULL,
  `id_teacher` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tests_teacher_idx` (`id_teacher` ASC) VISIBLE,
  CONSTRAINT `fk_tests_teacher`
    FOREIGN KEY (`id_teacher`)
    REFERENCES `mydb`.`teachers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `mydb`.`complite`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`complite` (
  `id_test` INT NOT NULL,
  `id_student` INT NOT NULL,
  `estimation` INT NOT NULL,
  PRIMARY KEY (`id_test`, `id_student`),
  INDEX `fk_complite_student_idx` (`id_student` ASC) VISIBLE,
  CONSTRAINT `fk_complite_test`
    FOREIGN KEY (`id_test`)
    REFERENCES `mydb`.`tests` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_complite_student`
    FOREIGN KEY (`id_student`)
    REFERENCES `mydb`.`students` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
