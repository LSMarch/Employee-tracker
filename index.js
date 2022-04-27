const inquirer = require('inquirer');
const db = require('./connection')
const showTable = require('console.table') 

main = () => {
inquirer.prompt([
    {
        type: "list",
        name: "mainMenu",
        message: "Which would you like to do?",
        choices: ["View all employees",
                    "View all roles",
                    "View all departments",
                    "Add an employee",                                       
                    "Add a role",                    
                    "Add a department",
                    "Update an employee",
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

                case "Quit":
                    exit()
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
    db.query('select * from employee', (err, results) => {
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
    db.query('select first_name from employee', (err, results) => {
        if (err) console.log(err)
        for (var i = 0; i < results.length; i++) {
            managerArr.push(results[i])
        }
    })
    return managerArr
}
// update employee
updateEmployee = () => {    
    db.query("select * from employee", (err, resultsEmploy) => {
        if (err) throw err;
        const updateEmploy = []
        resultsEmploy.forEach(({ first_name, last_name, id }) => {
            updateEmploy.push({
                name: first_name + " " + last_name,    
                value: id            
            }) 
        })       

    db.query("select * from employ_role", (err, resultsRole) => {
        if (err) throw err;
        const updateRole = []
        resultsRole.forEach(({ title, id }) => {
            updateRole.push({
                name: title,
                value: id
            })
        })
    
    let Q = [
        {
            type: 'list',
            name: 'updateEmployChoice',
            message: "Which employ would you like to update?",
            choices: updateEmploy
        },
        {
            type: 'list',
            name: 'updateRoleChoice',
            message: "Which role would you like to give the employee?",
            choices: updateRole
        },
    ]

    inquirer.prompt(Q)
    .then(answer => {
        const update = 'update employee set ? where ?? = ?';
        db.query(update, [
            {employ_role_id: answer.updateRoleChoice},
                "id", answer.updateEmployChoice                 
            
        ], (err, results) => {
            if (err) throw err;
            db.query('select employee.first_name as First, employee.last_name as Last, employ_role.title as Title from employee join employ_role on employee.employ_role_id = employ_role.id', (err,result) => {
                console.log('Employee has been updated')
                console.table(result)
                main()  
            })            
        });    
    })    
});
})
} // end updateEmployee
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
                if (err) throw err
                console.log('New role has been added')                
            })            
            viewAllRoles()            
        })
    })
}
// add a department
addDept = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addDept',
            message: 'What department would you like to add?'
        }
    ])
    .then((answer) => {
        db.query('insert into department (depart_name) values(?)', answer.addDept, (err,results) => {
            if (err) throw err
            console.log('New department has been added')                       
        })
        viewAllDept()        
    })
}
// add an employee
addEmploy = () => {
    db.query("select * from employ_role", (err, resultsRoleChoice) => {
        if (err) throw err;
        const roleChoice = []
        resultsRoleChoice.forEach(({ title, id }) => {
            roleChoice.push({
                name: title,
                value: id
            })
        })

    db.query('select * from employee', (err, resultsMan) => {
        if (err) throw err
        const managerChoice = []
        resultsMan.forEach(({ first_name, last_name, id }) => {
            managerChoice.push({
                name: first_name + " " + last_name,
                value: id
            })
        })    

    let addQuestions = [
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
            choices: roleChoice
        },
        {
            type: 'list',
            name: 'newEmployManager',
            message: "Who is employee's manager?",
            choices: managerChoice
        },
]
    inquirer.prompt(addQuestions)
    .then(answer => {
        const newEmployee = 'insert into employee set ?';
        db.query(newEmployee, [
            {
                first_name: answer.firstName,
                last_name: answer.lastName,
                employ_role_id: answer.newEmployRole,
                manager_id: answer.newEmployManager
            },           
        ], (err, results) => {
            if (err) throw err;
            console.log('Employee added successfully')            
            })
        viewAllEmp()            
        });    
    })
})
    

}
// view all employees
viewAllEmp = () => {
    db.query('select employee.id as ID, employee.first_name as First, employee.last_name as Last, employ_role.title as Title, employ_role.salary as Salary, department.depart_name as Department, employee.manager_id as Manager from employee join employ_role on employee.employ_role_id = employ_role.id join department on employ_role.depart_id = department.id', function (err,results){
        if (err) throw err

        console.table('Viewing all Employees', results)
        main()
    })  
}
// view all roles
viewAllRoles = () => {
    db.query('select employ_role.id as ID, employ_role.title as Title, employ_role.salary as Salary, depart_name as Department from employ_role join department on employ_role.depart_id = department.id', (err,resuts) => {
        if (err) throw err
        console.table('Viewing all Roles', resuts)
        main()
    })
}
// view all departments
viewAllDept = () => {
    db.query('select id as ID, depart_name as Department from department', function (err, results){
        if (err) throw err
        console.table('Viewing all Departments', results)
        main()
    })
}
// exit process
exit = () => {
    console.log('Thank you')
    process.exit()
}
main()
