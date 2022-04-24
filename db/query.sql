-- show all dept
select depart_name as Departments from department;

-- show all roles
select title as Title from employ_role;

-- show all employees
select first_name as First, last_name as Last from employee;

-- add dept
insert into department (depart_name) values (?)

-- add role
insert into employ_role (title) values(?)

-- add employee
insert into employee(first_name, last_name, employ_role_id)

-- update employee
select employee.first_name, employ_role.title from employee join employ_role on employee.employ_role_id = employ_role.id;

