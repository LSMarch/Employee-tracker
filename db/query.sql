-- show all dept
select * from department;

-- show all roles
select * from employ_role;

-- show all employees
select * from employee;

-- add dept
insert into department (depart_name) values (?)

-- add role
insert into employ_role (title) values(?)

-- add employee
insert into employee(first_name, last_name, employ_role_id)