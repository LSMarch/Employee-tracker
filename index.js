const inquirer = require('inquirer');
//const menuFun = require('./menuFunctions')
const db = require('./connection')
const showTable = require('console.table')

 

function main() {
inquirer.prompt([
    {
        type: "list",
        name: "mainMenu",
        message: "Which would you like to do?",
        choices: ["View all employees",
                    "Add employee",
                    "Update employee role",
                    "View all roles",
                    "Add role",
                    "View all departments",
                    "Add department", 
                    "Quit"
                ],
    }
])
        .then((answer) => {
            switch (answer.mainMenu) {
                case "View all employees":                    
                    viewAllEmp()                                     
                    break;

                case "View all roles":
                    viewAllRoles()
                    break;

                case "View all departments":
                    viewAllDept()
                    break;
                case "Add department":
                    addDept()
                    break;
                
                case "Add employee":
                    addEmploy()
                    break;

                case "Add role":
                    addRole()
                    break;

                case "Update employee role":
                    updateEmployee()
                    break;

                default:                    
                    break;
            }
        })       
}

// select role opt
const roleArr = [];
roleSelect = () => {    
    db.query('select title from employ_role', (err, results) => {
        for (var i = 0; i < results.length; i++) {
            roleArr.push(results[i].title)
            //console.log(roleArr)            
        }
    })
    return roleArr
    
}

// select employee opt
const employeeArr = [];
employeeSelect = () => {
    db.query('select first_name, last_name from employee', (err, results) => {
        for (var i = 0; i < results.length; i++) {
            employeeArr.push(results[i].first_name)
        }
    })
    return employeeArr
}

// select dept opt
const deptArr = [];
deptSelect = () => {
    db.query('select depart_name from department', (err, results) => {
        if (err) console.log(err)
        for (var i = 0; i < results.length; i++) {
            deptArr.push(results[i].depart_name)
        }
    })
    return deptArr
}

// select manager opt
const managerArr = [];
managerSelect = () => {
    db.query('select first_name, last_name from employee', (err, results) => {
        if (err) console.log(err)
        for (var i = 0; i < results.length; i++) {
            managerArr.push(results[i].first_name)
        }
    })
    return managerArr
}

updateEmployee = () => {
    db.query('select employee.first_name as Name, employ_role.title as Title from employee join employ_role on employee.employ_role_id = employ_role.id', (err, results) => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'updateFirstName',
                message: 'Which employee would you like to update?',
                choices: employeeSelect()
            },
            {
                type: 'list',
                name: 'updateRole',
                message: 'What is the new role?',
                choices: roleSelect()
            },
            
        ])
        .then((answer) => {
            const roleId = roleSelect().indexOf(answer.updateRole) + 1
            const employName = employeeSelect().indexOf(answer.updateFirstName) + 1 
            db.query('update employee set where ?', 
            {
                first_name: employName
            },
            {
                employ_role_id: roleId
            },
            (err, result) => {
                console.table(answer)
            })
            }) // end then
            //console.table('select employee.first_name as Name, employ_role.title as Title from employee join employ_role on employee.employ_role_id = employ_role.id',(err, results) => {
            })
        }
    


// add a role
addRole = () => {
    db.query('select title as Title from employ_role', (err, results) => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'addRole',
                message: 'What role would you like to add?'
            },
            {
                type: 'number',
                name: 'roleSal',
                message: 'What is the starting salary for the role?'
            },
            {
                type: 'list',
                name: 'roleDept',
                message: 'Which department will the role belong?',
                choices: deptSelect()
            },
        ])
        .then((answer) => {
            const deptId = deptSelect().indexOf(answer.roleDept) + 1
            db.query('insert into employ_role set ?', 
            {
                title: answer.addRole,
                salary: answer.roleSal,
                depart_id: deptId
            }, (err, results) => {
                //console.table(answer)
            })
            viewAllRoles()            
        })
    })
}


// add a department
function addDept () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addDept',
            message: 'What department would you like to add?'
        }
    ])
    .then((answer) => {
        db.query('insert into department (depart_name) values(?)', answer.addDept, (err,results) => {
            console.log('dept added')            
            //console.table(results)            
        })
        viewAllDept()
        //main()
    })
}

// add an employee
addEmploy = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "What is employee's first name?"
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is employee's last name?"
        },
        {
            type: 'list',
            name: 'newEmployRole',
            message: "What is employee's role?",
            choices: roleSelect()
        },
        {
            type: 'list',
            name: 'newEmployManager',
            message: "Who is employee's manager?",
            choices: managerSelect()
        },
])
    .then((answer) => {
        const roleId = roleSelect().indexOf(answer.newEmployRole) + 1
        const managerId = managerSelect().indexOf(answer.newEmployManager) + 1
        db.query('insert into employee set ?',
        {
            first_name: answer.firstName,
            last_name: answer.lastName,
            manager_id: managerId,
            employ_role_id: roleId
        }, (err, results) => {
        //console.table(answer)            
        })
        viewAllEmp()
    })
}


// view all employees
function viewAllEmp() {
    db.query('select first_name as First, last_name as Last from employee', function (err,results){
        console.table('Employees', results)
        main()
    })  
}

// view all roles
function viewAllRoles() {
    db.query('select title as Title from employ_role', (err,resuts) => {
        console.table(resuts)
        main()
    })
}

// view all departments
function viewAllDept() {
    db.query('select depart_name as Departments from department', function (err, results){
        console.table(results)
        main()
    })
}





main()
