````
# Algorithm Visualizer

A web-based **Algorithm Visualizer** built with **React**, **Spring Boot**, and **Tailwind CSS**, featuring **Framer Motion** for animations. The application provides interactive algorithm visualizations and is powered by a backend that manages operations such as insertion, deletion, and searching.

## Features

- 🖥 **Interactive Visualizations** - Watch algorithms in action with step-by-step animations.
- 📊 **Multiple Algorithms** - Supports sorting, searching, and pathfinding algorithms.
- 🎨 **Modern UI** - Clean and responsive interface with Tailwind CSS.
- ⚡ **Optimized Performance** - Efficient rendering for smooth animations.
- 🔄 **Backend Operations** - Controls algorithm execution, including insertion, deletion, and searching.
- 🏗 **Scalable Architecture** - Built with modular and reusable components.

## Technologies Used

- **Frontend:** React, Tailwind CSS, Framer Motion
- **State Management:** useState, useEffect, useReducer
- **Backend:** Spring Boot (handles algorithm operations)

## Installation & Setup

### Frontend

1. Clone the repository:
   ```bash
   git clone https://github.com/hayyanhaider0/algorithm-visualizer.git
   cd algorithm-visualizer
````

2. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:5173/` in your browser.

### Backend

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Set up the Spring Boot backend. Make sure you have **Java 11+** installed.
3. Install dependencies (if using Maven):
   ```bash
   mvn install
   ```
4. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
5. The backend should now be running at `http://localhost:8080/`.

## Deployment

To deploy on **Netlify** (for frontend):

1. Push your code to GitHub.
2. Go to [Netlify](https://netlify.com/) and connect your repository.
3. Set the **build command**:
   ```bash
   npm run build
   ```
4. Set the **publish directory** to `dist`.
5. Deploy and get a live link!

For **backend deployment**, you can use platforms like **Heroku**, **AWS**, or **DigitalOcean**.

## Future Updates

I will be regularly updating and adding more data structures and algorithms to the visualizer.

## License

MIT License © 2025 Hayyan Haider
