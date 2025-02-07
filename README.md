# Movie Reservation App

## Description
Movie Reservation App is a back-end only application that manages movie reservations. It provides APIs for movie listing, reservations, login, and user registration. The app is built with NestJS and hosted online.

## API Endpoints

- **Base URL**: [https://nestappjs.onrender.com](https://nestappjs.onrender.com)
- **API URL**: [https://nestappjs.onrender.com/api](https://nestappjs.onrender.com/api)

### Endpoints

1. **GET /movies**
   - Retrieve a list of movies available for reservation.
   - Example response:
     ```json
     [
       {
         "id": 1,
         "title": "Movie Title",
         "description": "Movie description"
       },
       ...
     ]
     ```

2. **POST /reservation**
   - Create a new reservation for a movie.
   - Requires user authentication (login).
   - Example request:
     ```json
     {
       "movieId": 1,
       "userId": 123
     }
     ```

3. **POST /login**
   - Authenticate a user to access protected routes.
   - Example request:
     ```json
     {
       "username": "user",
       "password": "password"
     }
     ```
   - Example response:
     ```json
     {
       "token": "JWT_token_here"
     }
     ```

4. **POST /register**
   - Register a new user.
   - Example request:
     ```json
     {
       "username": "newUser",
       "password": "password",
       "email": "email@example.com"
     }
     ```
   - Example response:
     ```json
     {
       "message": "User registered successfully"
     }
     ```

## Technologies Used
- **NestJS** for building the API
- **JWT Authentication** for user login and registration

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/movie-reservation-app.git
   cd movie-reservation-app
