const inquirer = require('inquirer');
const menuFun = require('./menuFunctions')
require('dotenv').config();

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
                    menuFun.viewAllEmp()                                     
                    break;

                case "View all roles":
                    menuFun.viewAllRoles()
                    break;

                case "View all departments":
                    menuFun.viewAllDept()
                    break;

                default:
                    main()
                    break;
            }
        })       
}


main()
