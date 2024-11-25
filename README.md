# project-task-assignment-backend\
Backend creates to design a Project Task assignment system.
Basically it will give overview how can control user, project, task based on role
Assing task to project, task operation can be performed by same user or admin only

1. After clone the project run command "npm install", it will install dependency.
2. Make sure PostgreSQL installed on system, if not then please install and create a local server basically localhost (please refer url to download Postgres if not available https://www.postgresql.org/download/)
3. Update database configration like database name etc. by config file, exits under config folder / directory.
4. After installed everything, run command on CMD i.e. command prompt "node app.js".
5. Step#4  will create a table for you if not available in database else it will skip.
6. After created tables need to first register user, use "/registration" endpoint for the same.
7. By step#7, you may registered user either as a Admin or Member (currently supporting 2 roles, can increase as per requirement).
8. After registration done, generate a JWT token by login enpoint "/login".
9. Use generated token in step#8 as "Authorization" while consuming other endpoints like "/project", "/user" etc. to perfrom CRUD.
10. Token is generated based on role, so while performing CRUD on other endpoint(mention in step#9) will check Auth and based on that either proceed further or error.
11. Project, User, Token is accesible only by ADMIN.
12. Project assignment to particular user is only by ADMIN.
13. Task assignment against Project is done either by ADMIN or the user who belongs to that project (step#12).
14. Task CRUD can perfrom by either by ADMIN or the user who belongs to that project.
15. If Task created by user then automatically task will assign to created user but if task is creaed by ADMIN then manually need to assign task to any user. 
16. Added Postman collection for your reference, also added payload for each kind of request under payload folder.
17. Feel free to reach out to me(https://www.linkedin.com/in/vikas-sharma-59887175) for any clarification, build UI to release in upcoming weeks

NOTE :- Endpoint will call with /api/v1/{ENDPOINT_NAME} for versioning purpose