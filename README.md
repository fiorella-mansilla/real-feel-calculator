# Real Feel Temperature Calculator

This is a MERN application that calculates the real feel temperature for any city in Germany. It executes an algorithm that combines various weather constants for heat index and wind chill formulas, with minor adjustments for local conditions.


## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Development Workflow](#development-workflow)

## Project Overview

This project includes :

1. **Client**: A React front-end using modern tools like Vite, MUI, Tailwind CSS, and React Query.

2. **Server**: A Node.js back-end using Express for handling API requests.

3. **Database**: A MongoDB database used to store a list of cities with their respective coordinates for retrieval.

4. **External API "Bright Sky"**: An external JSON API used to retrieve the necessary weather data in order to perform the calculation.

## Technologies Used

### Front-End
- **React**: Front-end library for building user interfaces.
- **Vite**: Fast build tool for modern web projects.
- **Tailwind CSS**: Utility-first CSS framework.
- **Material UI**: React components for faster and easier web development.
- **React Query**: Library for managing server state in React apps.

### Back-End
- **Express**: Web framework for building RESTful APIs.
- **Axios**: Ensures reliable API calls with built-in support for request/response transformations.
- **CORS**: Middleware for handling Cross-Origin Resource Sharing.
- **Mongoose**: ODM for MongoDB, providing schema-based solutions to model data.
- **dotenv**: Loads environment variables from a `.env` file.
- **MongoDB Atlas**: Cloud database service for storing city data.

## Getting Started

### Prerequisites

Ensure the following software is installed on your system:

- **Node.js**: v16.0.0 or higher 
- **npm**: v8.0.0 or higher 
- **Git**: v2.0.0 or higher 
- **MongoDB Atlas credentials**

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

### Environment Variables

To configure MongoDB Atlas, create a `.env` file in the `server` directory and add the following:

```bash
MONGO_URI=your_mongodb_atlas_connection_string
```

Replace `your_mongodb_atlas_connection_string` with the actual connection string provided on the first slide of the PPTX Phase 2 presentation file.

## Development Workflow

#### Front-End Development

1. Run the client:

   ```bash
   cd client
   npm run dev
   ```

2. Access the front-end at http://localhost:5173 

#### Back-End Development

1. Start the server:

   ```bash
   cd server
   node server.js
   ```

2.	The server will run at http://localhost:3000.

#### API Communication

The front-end communicates with the back-end using Axios for HTTP requests. Make sure both are running during development.
