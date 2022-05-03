-- joins the department id into the role table (viewRoles)
-- SELECT role.id, title, salary, department.name AS department_name FROM department INNER JOIN role WHERE  department.id = role.department_id;

-- SELECT employees.id, CONCAT(first_name, ' ',last_name) AS employee_name FROM employees;

-- including employee ids, first names, last names, job titles, departments, salaries, and managers
SELECT e.id, e.first_name, e.last_name,e.manager_id, salary, title, department_id, name AS department FROM employees e LEFT JOIN role ON e.role_id = role.id LEFT JOIN department ON role.department_id = department.id

