DROP DATABASE IF EXISTS employeelist_db;

CREATE DATABASE employeelist_db;
USE employeelist_db;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

-- TODO: Add a way to pull manager ids from this table both here and in query.sql
CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary INTEGER,
    department_id INT,
    FOREIGN KEY(department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employees(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL, 
    role_id INT,
    manager_id INT DEFAULT NULL,
    FOREIGN KEY(role_id)
    REFERENCES role(id),
    FOREIGN KEY(manager_id)
    REFERENCES employees(id)

);
