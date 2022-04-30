const mysql = require('mysq2');
const inquirer = require('inquirer');

const db = mysql.creatConnection(
    {
        host:'localhost',
        user:'root',
        password:'Hannah1291',
        database:'employeelist_db'
    },
    console.log(`Connected to the employeelist_db database.`)
);

function menu() {
    inquirer.prompt([
        {
            type:'list',
            name:'menu',
            choices:['View Employees','Add Employee','Find ID','Exit']
        }
    ]).then (res =>{
        if(res.menu === "View Employees"){
            showEmployees();
        }else if (res.menu==='Add Employee'){
            addEmployee();
        }else if(res.menu === 'Find ID'){
            employeeID()
        }else process.exit();
    })
}

const showEmployees =()=>{
    db.query('SELECT * FROM sutdents', function(err,results){
        console.log(results);
        menu();
    })
}

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
            menu();
        }))
    })
}
// Will need to add something to check if it exists or not
const employeeID = ()=>{
    inquirer.prompt([
        {
            type:'input',
            message:'Please enter the employee first name',
            name:'first_name'
        }
    ]).then(res => {
        db.query('SELECT id FROM students WHERE first_name =?', res.first_name,(err,data)=>{
            console.log(data);
            menu();
        })
    })
}