-- Script de inicialização do banco de dados para o BoTask

CREATE DATABASE IF NOT EXISTS bostask;
USE bostask;

CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status INT NOT NULL DEFAULT 1,
    tag INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
