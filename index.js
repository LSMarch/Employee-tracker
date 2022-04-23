const inquirer = require('inquirer');
const queryFun = require('./queryFunctions')
const db = require('./connection')

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
        console.log(answer);
        switch (answer.mainMenu) {
            case "View all employees": {
                db.query('select * from employee', function (err, results){
                    console.log(results)
                    main()
                })
                break;
            } // end case
            case "View all departments": {
                db.query('select * from department', function (err, results){
                    console.log(results)
                    //main()
                })
                break;
            }
            case "View all roles": {
                db.query('select * from employ_role', (err,results) =>{
                    console.log(results)
                    //main()
                })
                break;
            }
        }
    })
}

main();
