# 3D Interactive World Clock

This project is a full-stack web application that displays a 3D world clock with a realistic day/night cycle. Users can add and remove city markers to see the local time around the globe. The application is built with React/Three.js on the frontend, Node.js/Express on the backend, and is containerized with Docker for easy deployment.

## Tech Stack

-   **Frontend:**
    -   React
    -   Three.js
    -   axios
    -   Tailwind CSS
-   **Backend:**
    -   Node.js
    -   Express
    -   cors
    -   body-parser
-   **DevOps:**
    -   Docker
    -   Docker Compose

## Features

-   **Interactive 3D Globe:** A zoomable and rotatable 3D model of the Earth.
-   **Dynamic Day/Night Cycle:** The globe is accurately lit by a sun based on the current UTC time.
-   **City Time Markers:** Add and remove city markers to see the local time.
-   **Full-Stack & Containerized:** Built with React/Three.js on the frontend, Node.js/Express on the backend, and containerized with Docker for easy deployment.

## How to Use

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd globe-clock
    ```

2.  **Build and run the application using Docker Compose:**
    ```bash
    docker-compose up --build
    ```

3.  **Access the application:**
    -   The frontend will be available at `http://localhost:80`.
    -   The backend API will be running on `http://localhost:3001`.

The application will start, and you can interact with the 3D globe immediately.

## API Endpoints

The backend server provides the following API endpoints:

-   `GET /api/cities`: Get the list of cities.
    -   **Response:**
        ```json
        [
          "London",
          "Tokyo",
          "New York"
        ]
        ```
-   `POST /api/cities`: Update the list of cities.
    -   **Request Body:**
        ```json
        {
          "cities": ["London", "Tokyo", "New York", "Sydney"]
        }
        ```
    -   **Response:** `200 OK`

## Screenshots

*A screenshot of the application in action.*

![Application Screenshot](<url-to-screenshot>)

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

### Development

To run the application in a development environment, you can use the following commands:

-   **Frontend:**
    ```bash
    cd frontend
    npm install
    npm start
    ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
-   **Backend:**
    ```bash
    cd backend
    npm install
    npm start
    ```
