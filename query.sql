-- joins the department id inot the role table
SELECT * FROM department JOIN role WHERE role.department = department.id
-- joines the role id into the employees table
SELECT * FROM role JOIN employees WHERE employees.role = role.id
-- Add a self join query for the manager id within the employee table- refer to paper notes
SELECT 

