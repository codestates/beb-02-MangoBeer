DROP DATABASE IF EXISTS MangoBeer_DB;
CREATE DATABASE Mangobeer;
USE Mangobeer;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userName VARCHAR(255),
  password VARCHAR(255),
  created_at timestamp not null default current_timestamp,
  address VARCHAR(255),
  privateKey VARCHAR(255)
);

/*
INSERT INTO users(userName, password, address, privateKey) 
VALUES("woo","1234","12345","123456");
*/