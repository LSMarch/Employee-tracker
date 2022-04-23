const inquirer = require('inquirer');
//const queryFun = require('./queryFunctions')
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
            case "View all employees": {
                db.query('select first_name as First, last_name as Last from employee', function (err, results){
                    console.table('Employees', results)
                    main()
                })
                break;
            } // end case
            case "View all departments": {
                db.query('select depart_name as Departments from department', function (err, results){
                    console.table(results)
                    main()
                })
                break;
            }
            case "View all roles": {
                db.query('select title as Title from employ_role', (err,results) =>{
                    console.table(results)
                    main()
                })
                break;
            }
        }
    })
}

main();
