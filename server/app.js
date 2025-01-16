import express from 'express';
import cors from 'cors';
import weatherRoutes from './routes/weatherRoutes.js';

const app = express();
const PORT = 3000;

app.use(cors());

// Use JSON parser middleware
app.use(express.json());

// Use weather routes
app.use('/api', weatherRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});