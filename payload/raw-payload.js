[
    {
        endpoint: "/registration",
        payload: {
            // For Admin type of User
            "name": "Admin",
            "email": "admin@admin.com",
            "password": "admin123",
            "mobile_phone": "1234567890",
            "is_admin": true

            // For Member type of User
            // "name": "Vikas Sharma",
            // "email": "vicky@vicky.com",
            // "password": "vicky123",
            // "is_admin": false,
            // "mobile_phone": "1234567890"
        
        }
    },
    {
        endpoint: "/login",
        payload: {
            "email": "admin@admin.com",
            "password": "admin123"
        
        }
    },
    
    // It will create Proejct
    {
        endpoint: '/project',
        payload: {
            "name": "Backend end project For Vikas User",
            "description": "This is backend project based on latest version of NodeJs",
            "target_date": "2024-11-26"
        }
    },

    // Assign project to user
    {
        endpoint: '/projectUser',
        payload: {
            "project_id": 1,
            "user_id": 1
        }
    },


    // Create task against project_id, it will automatically assign this task to user
    {
        endpoint: '/task',
        payload: {
            "title": "Create Dashboard for Vikas user",
            "description": "This is first task to create dashboard",
            "priority_level": "High",
            "target_date": "2024-11-26",
            "project_id": 1
        }
    },


    // Assing task to user if task created by ADMIN
    {
        endpoint: '/projectTask',
        payload: {
            "project_id": 1,
            "task_id": 2,
            "user_id": 10
        }
    }
]