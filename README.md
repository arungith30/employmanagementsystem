Fullstack Employee Management System (MERN)
Features
Employee Management:

Employee Registration and Login
Task Creation and Updates
Time Tracking (start and end times for tasks)
Work History and Report Generation
Admin Dashboard:

Manage Employee Records (Create, Update, Delete)
View Employee Task Assignments, Progress, and Hours Logged
Generate Reports of Total Hours Worked by Employees
Task Management:

Employees can create, update, and track tasks with statuses (To-Do, In Progress, Done)
Tasks can be filtered by project and status
Admins can assign tasks to employees and monitor progress
Time Tracking:

Log work hours for tasks and calculate total hours worked
Timer feature for automatic time logging
Admins can approve or reject time logs based on task status
Authentication & Authorization:

JWT Authentication for secure login
Role-based access control (Admins can access all data, employees can access only their data)

Setup Instructions
Backend Setup
Clone the repository and navigate to the backend folder:

cd sever
Install dependencies:

npm install
Set up environment variables by creating a .env file:

envfile

MONGO_URI=mongodb://localhost:27017/employee-management
JWT_SECRET=your_jwt_secret
PORT=5000
Run the backend server:

npm run dev
Frontend Setup
Navigate to the frontend folder:
create react app

cd client
Install dependencies:

npm install
Run the frontend app:

npm run dev
Visit http://localhost:5173 in your browser to access the app.

API Documentation
Authentication
POST /api/auth/register: Register a new employee.
Body: { name, email, password, role }
POST /api/auth/login: Employee login.
Body: { email, password }
Response: { token }
Tasks
GET /api/tasks/filter: Get filtered tasks.
Query Parameters: { status, project }
Response: [ { taskId, title, description, status, project } ]
POST /api/tasks: Create a new task (Admin only).
Body: { title, description, status, project, assignedTo, deadline }
Response: { message: 'Task created successfully' }
Time Logs
POST /api/timelogs: Log work hours for a task.
Body: { taskId, startTime, endTime }
Response: { message: 'Time logged successfully' }
JWT Authentication & Role-Based Access
JWT Authentication:

Upon login, the server generates a JWT token and sends it back to the client. This token is stored in the client-side localStorage.
The token is used for authorization in API requests by attaching it to the Authorization header: Bearer <token>.
The server verifies the token before allowing access to protected routes.
Role-Based Access:

Employees and admins are assigned roles (employee or admin).
The verifyToken middleware checks the role of the user in the decoded JWT token before granting access to certain routes.
Admins have full access to all routes, while employees only have access to their personal data.
Time-Tracking Features
Logging Work Hours: Employees can log time against tasks using a start and end time.
Timer Feature: A built-in timer allows employees to log hours automatically as they work on tasks.
Approvals: Admins can approve or reject time logs based on the task status.
Reports: Generate reports showing the total hours worked by employees over specific periods.
Project Structure
Backend:

/models: MongoDB models (Employee, Task, TimeLog)
/routes: API route handlers (auth, tasks, time logs)
/middleware: Authentication middleware (verifyToken)
/server.js: Main backend entry point
Frontend:

/src: React components and pages (LoginPage, EmployeeDashboard, AdminDashboard, etc.)
/src/api: Axios API calls to interact with the backend
/src/utils: Utility functions (e.g., PrivateRoute for protecting routes)
Additional Tools and Libraries
Postman: Use Postman for testing the APIs.
Swagger: You can generate API documentation using tools li
