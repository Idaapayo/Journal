
https://github.com/Idaapayo/Journal/assets/30591741/01ea6863-cef4-4412-9b10-119483b85cdb

## Introduction
This is an app that allows the user to enter Journal entries. The app has been built using an express backend with Postgres as the database and react-native for the frontend which has been bootstraped by expo.
The application offers a host of features including: 
* User authentication - the user can sign in and out. This feature is built using Passport utilizing the local strategy
* Profile management - You can change your username and password
* Security - all routes except sign-in and login require you to be authenticated
* Journal entries - you can create, edit and delete journal entries
* Journal categorization - the journals are listed according to their categories

 ## Setting up the backend
 * Install Postgres and pgadmin
 * Create a new database called `journal_db`
 * Clone this repository
 * Open `backend/config/config.js` and replace the password with the password for your Postgres user
 * cd to the backend folder and `npm install`
 * Then run ` npx sequelize-cli db:migrate`
 * Then run `node app.js` - take note of the port express is running on. Usually 8080

 ## Setting up react-native
 * cd into frontend/my-journal
 * Then `npm install`
 * Then `npm run android`

You can now sign up and start using the app!

Here are the routes used to perform crud operations and authentication:

POST /login
Authenticates a user using the username and password.

POST /signUp
Registers a new user.

PUT /updateCredentials/:userId
Updates the username and password for an authenticated user.

POST /logout
Logs out the authenticated user.

POST /create
Creates a new note for the authenticated user.

GET /getNotes/:userId
Fetches all notes for a specific user.

GET /getNote/:id
Fetches a specific note by its ID.

PUT /update/:id
Updates a specific note by its ID for the authenticated user.

DELETE /delete/:id
Deletes a specific note by its ID for the authenticated user.

GET /categories
Fetches all unique categories of notes for the authenticated user.

GET /notesByCategory/:userId/:category
Fetches all notes for a specific user and category.
 
 
