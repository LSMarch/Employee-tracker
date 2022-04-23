drop database if exists tracker_db;
create database tracker_db;

use tracker_db;

create table department (
    id int not null auto_increment primary key,
    depart_name varchar(30) not null
);

create table employ_role (
    id int not null auto_increment primary key,
    title varchar(30) not null,
    salary decimal(10,2) not null,
    depart_id int not null,
    foreign key (depart_id) references department(id)
);

create table employee (
    id int not null auto_increment primary key,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    employ_role_id int,
    manager_id int,
    foreign key (employ_role_id) references employ_role(id),
    foreign key (manager_id) references employee(id)
    
);

