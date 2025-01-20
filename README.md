# Real Feel Temperature Calculator

This application calculates the real feel temperature for any city in Germany. It uses an algorithm that combines various weather constants for heat index and wind chill formulas, with minor adjustments for local conditions.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Development Workflow](#development-workflow)

## Project Overview

This project includes :

1. **Client**: A React front-end using modern tools like Vite, MUI, Tailwind CSS, and React Query.

2. **Server**: A Node.js back-end using Express for handling API requests and performing calculations with the Math.js library.

3. **External API "Bright Sky"**: An external JSON API used to retrieve the necessary weather data in order to perform the calculation.

## Technologies Used

### Front-End
- **React**: Front-end library for building user interfaces.
- **Vite**: Fast build tool for modern web projects.
- **Tailwind CSS**: Utility-first CSS framework.
- **Material UI**: React components for faster and easier web development.
- **React Query**: Library for managing server state in React apps.

### Back-End
- **Express**: Web framework for building RESTful APIs.
- **Math.js**: Library for performing advanced mathematical operations.
- **CORS**: Middleware for handling Cross-Origin Resource Sharing.


## Getting Started

### Prerequisites
Ensure the following software is installed on your system:

- **Node.js**: v16.0.0 or higher 
- **npm**: v8.0.0 or higher 
- **Git**: v2.0.0 or higher 

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/fiorella-mansilla/real-feel-calculator.git

   cd real-feel-calculator
   ```

2. Navigate to the client folder and install dependencies:
    ```bash
    cd client
    npm install
    ```

3. Navigate to the server folder and install dependencies:
   ```bash
   cd ../server
   npm install
   ```

### Development Workflow

##### Front-End Development

1. Run the client:

   ```bash
   cd client
   npm run dev
   ```

2. Access the front-end at http://localhost:5173 (default Vite port).

##### Back-End Development

1. Start the server:

   ```bash
   cd server
   node app.js
   ```

2.	The server will run at http://localhost:3000.

##### API Communication

The front-end communicates with the back-end using Axios for HTTP requests. Make sure both are running during development.
