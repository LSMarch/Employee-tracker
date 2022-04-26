-- show all dept
select depart_name as Departments from department;

-- show all roles
select employ_role.id as ID, employ_role.title as Title, employ_role.salary as Salary, depart_name as Department from employ_role join department on employ_role.depart_id = department.id;

-- show all employees
select employee.id as ID, employee.first_name as First, employee.last_name as Last, employ_role.title as Title, employ_role.salary as Salary, department.depart_name as Department, employee.manager_id as Manager from employee join employ_role on employee.employ_role_id = employ_role.id join department on employ_role.depart_id = department.id;

-- add dept
insert into department (depart_name) values (?)

-- add role
insert into employ_role (title) values(?)

-- add employee
insert into employee(first_name, last_name, employ_role_id)

-- update employee
select employee.first_name, employ_role.title from employee join employ_role on employee.employ_role_id = employ_role.id;

