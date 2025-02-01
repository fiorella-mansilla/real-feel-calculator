import express from 'express';
import cors from 'cors';
import cityRoutes from './routes/cityRoutes.js';
import weatherRoutes from './routes/weatherRoutes.js';

/* Express app configuration */
const app = express();

// Middleware to parse the request body as JSON
app.use(express.json());

// Middleware to allow cross-origin requests
app.use(cors());

// Use the imported routes
app.use('/api', cityRoutes);
app.use('/api', weatherRoutes);

export default app;