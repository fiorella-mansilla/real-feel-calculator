import express from 'express';
import weatherRoutes from './routes/weatherRoutes.js';

const app = express();
const PORT = 3000;

// Use JSON parser middleware
app.use(express.json());

// Use weather routes
app.use('/api/weather', weatherRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});