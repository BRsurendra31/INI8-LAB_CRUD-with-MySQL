# Backend Registration System

This is a backend registration system built using Node.js, Express, and MySQL. It provides a simple API for user registration, allowing CRUD operations on user data.

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/backend-registration-system.git
   cd backend-registration-system
   ```

2. Install the dependencies in both backend and frontend :

   ```bash
   npm install 
   ```

2. Design the SQL Table 

4. Go to Backend and provide the mysql host url 

5. start the server 

```bash
    npm start
```

6. The server will run on `http://localhost:3000`.

7. Now go to Fronted and run the app

```bash
npm start
```

## API Endpoints

- **POST /register**
  - Registers a new user.
  - Request body should contain:
    ```json
    {
      "name": "User Name",
      "email": "user@example.com",
      "dateOfBirth": "YYYY-MM-DD",
      "phoneNumber": "1234567890"
    }
    ```

- **GET /register**
  - Retrieves all registered users.

- **PUT /register/:id**
  - Updates a registered user by ID.
  - Request body should contain the same fields as the registration.

- **DELETE /register/:id**
  - Deletes a registered user by ID.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.
