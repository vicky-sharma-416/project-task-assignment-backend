# project-task-assignment-backend\
Backend creates to design a Project Task assignment system.
It will give an overview of how can control users, projects, and tasks based on the  role
Assign task to project, task operation can be performed by same user or admin only

1. After cloning the project run the command "npm install", it will install the dependency.
2. Make sure PostgreSQL is installed on the system, if not then please install and create a local server, localhost (please refer url to download Postgres if not available https://www.postgresql.org/download/)
3. Update database configuration like database name etc. by config file, exits under config folder/directory.
4. After installing everything, run the command on CMD i.e. command prompt "node app.js".
5. Step#4  will create a table for you if not available in the database else it will skip.
6. After creating tables need to first register the user, and use the "/registration" endpoint for the same.
7. By step#7, you may register the user either as an Admin or Member (currently supporting 2 roles, can increase as per requirement).
8. After registration is done, generate a JWT token by login endpoint "/login".
9. Use generated token in step#8 as "Authorization" while consuming other endpoints like "/project", "/user" etc. to perform CRUD.
10. Token is generated based on role, so while performing CRUD on other endpoints (mentioned in step#9) will check Auth and based on that either proceed further or error.
11. Project, User, and Token are accessible only by ADMIN.
12. Project assignment to a particular user is only by ADMIN.
13. Task assignment against Project is done either by ADMIN or the user who belongs to that project (step#12).
14. Task CRUD can be performed by either ADMIN or the user who belongs to that project.
15. If a Task is created by the user then automatically the task will be assigned to the created user but if the task is created by ADMIN then manually assign the task to any user. 
16. Added the Postman collection for your reference, and also added a payload for each kind of request under the payload folder.
17. Feel free to reach out to me(https://www.linkedin.com/in/vikas-sharma-59887175) for any clarification, build UI to release in upcoming weeks

NOTE :- Endpoint will call with /api/v1/{ENDPOINT_NAME} for versioning purpose