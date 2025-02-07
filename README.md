# Movie Reservation App - API Documentation

## Description
Movie Reservation App provides an API for managing movie reservations. The application includes endpoints for retrieving movie details, searching for movies, and listing movies. It is built with NestJS.

## API Base URL

- **Base URL**: [https://nestappjs.onrender.com](https://nestappjs.onrender.com)
- **API URL**: [https://nestappjs.onrender.com/api](https://nestappjs.onrender.com/api)

### Endpoints

1. **GET /tmdb/movie/:id**
   - Retrieve details of a movie by its ID.
   - **Params**:
     - `id` (required): The ID of the movie.
   - Example request:
     ```
     GET /tmdb/movie/123
     ```
   - Example response:
     ```json
     {
       "id": 123,
       "title": "Movie Title",
       "description": "Movie description",
       "release_date": "2025-02-01"
     }
     ```

2. **GET /tmdb/search**
   - Search for movies by a query string.
   - **Query parameters**:
     - `query` (required): The search term to query movies.
   - Example request:
     ```
     GET /tmdb/search?query=action
     ```
   - Example response:
     ```json
     [
       {
         "id": 1,
         "title": "Action Movie 1",
         "description": "Description of the action movie"
       },
       ...
     ]
     ```

3. **GET /tmdb/getMovies**
   - Retrieve a list of movies based on a query.
   - **Query parameters**:
     - `query` (required): The query to filter movies (e.g., genre or title).
   - Example request:
     ```
     GET /tmdb/getMovies?query=comedy
     ```
   - Example response:
     ```json
     [
       {
         "id": 1,
         "title": "Comedy Movie 1",
         "description": "Description of the comedy movie"
       },
       ...
     ]
     ```

## Technologies Used
- **NestJS** for building the API
- **Swagger** for API documentation

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/movie-reservation-app.git
   cd movie-reservation-app
