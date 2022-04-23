insert into department(depart_name)
 values ("Sales"),
 ("Engineering"),
 ("Finance"),
 ("Legal");

 insert into employ_role(title, salary, depart_id)
 values ("Salesperson", 2500.00, 1),
 ("Lead Engineer",2600.00, 2),
 ("Software Engineer",2500.00, 2),
 ("Account Manager",2600.00, 3),
 ("Accountant", 2500.00, 3),
 ("Legal Team Lead", 2600.00, 4),
 ("Lawyer", 2500.00, 4);

 insert into employee(first_name, last_name, employ_role_id, manager_id)
 values ("Eddard", "Stark", 6, null),
 ("Arya", "Stark", 7, 1);