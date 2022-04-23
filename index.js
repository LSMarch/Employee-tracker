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
                // case "View all employees":                    
                //     viewAllEmp()                                     
                //     break;

                // case "View all roles":
                //     viewAllRoles()
                //     break;

                // case "View all departments":
                //     viewAllDept()
                //     break;
                case "Add department":
                    addDept()
                    break

                default:                    
                    break;
            }
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
            console.table(results)
        })
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
