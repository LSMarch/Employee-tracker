const db = require('./connection')
//const showTable = require('console.table')

function viewAllEmp() {
    db.query('select first_name as First, last_name as Last from employee', function (err,results){
        console.table('Employees', results)
        main()
    })

    module.exports = {
        viewAllEmp
    }
}


// case "View all departments": {
            //     db.query('select depart_name as Departments from department', function (err, results){
            //         console.table(results)
            //         main()
            //     })
            //     break;
            // }
            // case "View all roles": {
            //     db.query('select title as Title from employ_role', (err,results) =>{
            //         console.table(results)
            //         main()
            //     })
            //     break;
            // }