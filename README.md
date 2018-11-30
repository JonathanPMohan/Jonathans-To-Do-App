## Jonathans-To-Do-App

### Description
This is a to-do app with a list of unfinished tasks. When the user visits the app, the user can log in with Google authentication to create, edit, and delete tasks. This app makes full use of CRUD axios methods with Firebase.

1. Login Page
![mainview](./screenshots/login.png)

2. ToDo Page
![mainview](./screenshots/todo.png)

3. Add ToDo Page
![mainview](./screenshots/addTodo.png)

4. Edit Page
![mainview](./screenshots/editTodo.png)

<!-- 5. Completed Tasks
![mainview](./screenshots/completed-task.png) -->

## Technologies Used
* Webpack
* Axios
* Firebase
* ES6 Modules
* SASS
* Bootstrap

## How to run this app
Note: To run this app you will need a firebase account and a new project.

### 1. Configure Firebase
1. Clone the repository to a local machine.
2. Run the following command in terminal to download the web dependencies: `npm install`
3. In the db folder, rename apiKeys.json.example to apiKeys.json.
4. In Firebase, create a new project.
5. Navigate to your config object, and copy the keys from Firebase into the apiKeys.json file.
6. Create a realtime databse in Firebase, and start in test mode.
7. Import the `./db/tasks.json` file into the database to seed data.

### 2. Serve up the app
* Run `npm start` in your terminal to initiate the app.