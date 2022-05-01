const mysql = require('mysql2');
const inquirer = require('inquirer');
const express = require('express');
const res = require('express/lib/response');

const app = express();


// Assigns a port address for this app
const PORT = process.env.PORT || 2020;

// Connects this js to sql database
const db = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'Hannah1291',
        database:'employeelist_db'
    },
    console.log('Connected to the employeelist_db database.')
);

// First menu with options for going forward
function menu() {
    inquirer.prompt([
        {
            type:'list',
            name:'menu',
            choices:['View All Employees','Add Employee','Update Employee Role','View All Roles','Add Role','View All Departments','Add Department','Find ID','Exit']
        }
    ]).then (res =>{
        if(res.menu === 'View Employees'){
            viewEmployees();
        }else if (res.menu==='Add Employee'){
            addEmployee();
        }else if (res.menu==='Update Employee Role'){
            //TODO:add this function below
            updateEmployeeRole();
        }else if (res.menu==='View All Roles'){
            //TODO: add this function below
            viewRoles();
        }else if (res.menu==='Add Role'){
            //TODO: add this function below
            addRole();
        }else if (res.menu==='View All Departments'){
            //TODO: add this function below
            viewDepartments();
        }else if (res.menu==='Add Department'){
            //TODO: add this function below
            addDepartment();
        }else if(res.menu === 'Find ID'){
            employeeID()
        }else process.exit();
    })
}

// If showEmployees is selected, this function selects everything within employee table
const viewEmployees =()=>{
    db.query(`SELECT * FROM employees`, function(err,results){
        console.log(results);
        res.json(err);
        menu();
    })
}

// If add employee is selected, this function will allow the user to answer a series of questions to generate a new employee
const addEmployee =()=> {
    inquirer.prompt([
        {
            type:'input',
            message:'First name',
            name:'first'
        },{
            type:'input',
            message:'Last name',
            name:'last'
        },{
            type:'list',
            message:'Are they an employee?',
            choices:['Yes','No'],
            name:'employed',
        }
    ]).then(res =>{
        var employed;
        if(res.employed === 'Yes'){
            employed = true
        }else {
            employed = false
        }
        db.query(`INSERT INTO employees (first_name, last_name, employeed) VALUES (?,?,?)`[res.first,rest.last,employed],(err,data=>{
            console.log(data);
            menu();
            res.json(err);
        }))
    })
}
// If find ID is selected, this function will ask the user to prove the employee name to look up their id ->
// Will need to add something to check if it exists or not
const employeeID = ()=>{
    inquirer.prompt([
        {
            type:'input',
            message:'Please enter the employee first name',
            name:'first_name'
        }
    ]).then(res => {
        db.query(`SELECT id FROM students WHERE first_name = ?`, res.first_name,(err,data)=>{
            console.log(data);
            menu();
            res.json(err);
        })
    })
}
// listener for the app (it is showing up at the end of every current text, would like it to show either before or after)
app.listen(PORT,()=>{
    // console.log(`We are a go at port ${PORT}`)
});
menu();

