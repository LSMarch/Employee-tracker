const inquirer = require('inquirer');
//const queryFun = require('./queryFunctions')
const db = require('./connection')
const showTable = require('console.table')
//const { viewAllEmp } = require('./menuFunctions')

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

                default:
                    break;
            }
        })
}

function viewAllEmp() {
    db.query('select first_name as First, last_name as Last from employee', function (err,results){
        console.table('Employees', results)
        main()
    })
        
}



main()
