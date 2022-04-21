drop database if exists tracker_db;
create database tracker_db;

use tracker_db;

create table department (
    id int auto_increment primary key,
    department_name varchar(30)
);

create table position (
    id int primary key,
    title varchar(30),
    salary decimal,
    department_id int,
    foreign key (department_id)
    references department(id)
);

create table employee (
    id int primary key,
    first_name varchar(30),
    last_name varchar(30),
    position_id int,
    foreign key (position_id)
    references position(id)
);

