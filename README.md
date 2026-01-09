# WTWR - What to Wear (Backend)

The back-end project is focused on creating a server for the WTWR application. It covers work with databases, authorization,
error handling, and building a secure API that the front end can use.
The goal is to create a reliable service that manages users, clothing items, and user interactions.

---

### Technologies Used

For this project, I worked with several tools and technologies that helped me build and organize the back-end server more efficiently.

- **Node.js** – lets me run JavaScript outside the browser to handle the server side.
- **Express.js** – makes it easier to set up routes, middleware, and handle requests.
- **MongoDB & Mongoose** – used for storing data and defining clear schemas for users and items.
- **ESLint (Airbnb config)** – keeps the code consistent and clean by catching common mistakes.
- **Prettier** – automatically formats the code so everything looks uniform.
- **Nodemon** – restarts the server automatically whenever I save changes during development.
- **dotenv** – stores environment variables securely so they’re not hardcoded in the project.
- **VS Code Auto-Recommendations** – helps suggest useful extensions (like ESLint and Prettier) when opening the project.
- **Markdown IntelliSense (VS Code)** – makes writing the README easier by suggesting syntax and code block formatting as I type.

---

### API Overview

This back-end server provides an API that handles users and clothing items for the WTWR application.  
It supports basic user authentication and CRUD operations for managing items, along with like and unlike features.

**Main Endpoints:**

**Authorization**

- `POST /signup` – creates a new user account.
- `POST /signin` – logs in a user and returns a JWT token for authentication.

**Users**

- `GET /users/me` – gets the profile data of the currently logged-in user.
- `PATCH /users/me` – updates the user's profile information.

**Items**

- `GET /items` – returns all clothing items stored in the database.
- `POST /items` – adds a new clothing item (available only for logged-in users).
- `DELETE /items/:itemId` – deletes a clothing item created by the user.
- `PUT /items/:itemId/likes` – likes an item.
- `DELETE /items/:itemId/likes` – removes a like from an item.

The API works with JSON, where clients send requests and get responses with either the requested data or an error message.

---

### Error Handling

The API uses standard status codes to show what went wrong or if something failed while testing routes in Postman.  
Each response includes a short message instead of full error details to keep it clean and secure.

The main ones used in this project:

- `400 Bad Request` – when the data doesn’t meet validation rules or something is missing.
- `401 Unauthorized` – when a request is made without a valid token.
- `404 Not Found` – when a user or item can’t be found.
- `500 Internal Server Error` – used as the default for unexpected issues on the server.

---

## Deployed Application Access

**Backend API Domain:**  
https://api.wtwr.generaloweb.com

**Frontend GitHub Repository:**  
https://github.com/AlexXavierRuiz571/se_project_react

---

### Project Pitch Video

This video presents the WTWR full-stack project, including the front-end interface, back-end API, and the deployment setup used to run the application in production.

[WTWR Full-Stack Project Pitch](https://drive.google.com/file/d/16tqdEM4VZpHkLDzj3hkIeg4XTueJwPlW/view?usp=sharing)

---

**Author:** Alex Xavier Ruiz  
_Developed as part of the TripleTen Software Engineering Program._
