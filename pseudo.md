1. Add .gitignore
    - node_modules

2. Create database folder to hold database files, including connection to sql database
    - Use mysql shell username and password
    - Reference activiteis to do, usually in server.js files
    - Import mysql2 into connection file
    - Export connection to db

3. Build schema.sql using README instructions
    - Create database
    - Create department table
    - Create roles table
    - Create employee table

4. Create seed.sql that adds data to tables

5. Create main index.js file
    - Import inquirer, console.table, mysql2, db connection
    - Create function to start inquirer prompts/display main menu
    - Use conditionals to run appropriate function based on user's choice

6. Create functions to handle each of the following (use sql queries):
    - View all employees
    - View all employees by department
    - View all emplyees by manager
    - Add employees
    - Add department
    - Add role
    - Remove employee
    - Remove role
    - Update employee manager
    - Update employee role
    - Exit

7. Call function to start prompts


