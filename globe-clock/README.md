# 3D Interactive World Clock

This project is a full-stack web application that displays a 3D world clock with a realistic day/night cycle.

## Core Features

-   **Interactive 3D Globe:** A zoomable and rotatable 3D model of the Earth.
-   **Dynamic Day/Night Cycle:** The globe is accurately lit by a sun based on the current UTC time.
-   **City Time Markers:** Add and remove city markers to see the local time.
-   **Full-Stack & Containerized:** Built with React/Three.js on the frontend, Node.js/Express on the backend, and containerized with Docker for easy deployment.

## Prerequisites

-   Docker
-   Docker Compose

## How to Run

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

## Project Structure

-   `/frontend`: Contains the React/Three.js application.
-   `/backend`: Contains the Node.js/Express server for managing city data.
-   `docker-compose.yml`: Orchestrates the frontend and backend services.
-   `README.md`: This file.
