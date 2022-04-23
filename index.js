const inquirer = require('inquirer');
//const queryFun = require('./queryFunctions')
//const db = require('./connection')
//const showTable = require('console.table')
const { viewAllEmp, viewAllRoles, viewAllDept } = require('./menuFunctions')

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
                    viewAllEmp();
                    break;

                case "View all roles":
                    viewAllRoles()
                    break;

                case "View all departments":
                    viewAllDept()
                    break;

                default:
                    break;
            }
        })
}

// function viewAllEmp() {
//     db.query('select first_name as First, last_name as Last from employee', function (err,results){
//         console.table('Employees', results)
//         main()
//     })
        
// }

// function viewAllRoles() {
//     db.query('select title as Title from employ_role', (err,resuts) => {
//         console.table(resuts)
//         main()
//     })
// }

// function viewAllDept() {
//     db.query('select depart_name as Departments from department', function (err, results){
//         console.table(results)
//         main()
//     })
// }



main()
