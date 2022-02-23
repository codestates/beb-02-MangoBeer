DROP DATABASE IF EXISTS MangoBeer_DB;
CREATE DATABASE MangoBeer_DB;
USE MangoBeer_DB;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userName VARCHAR(255),
  password VARCHAR(255),
  created_at timestamp,
  address VARCHAR(255),
  privateKey VARCHAR(255),
);