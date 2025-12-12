import express from 'express';
import dotenv from 'dotenv';
import { userRoutes } from './routes/userRoutes.js';
import { posterRoutes } from './routes/posterRoutes.js';
import { genreRoutes } from './routes/genreRoutes.js';
import { cartlineRoutes } from './routes/cartlineRoutes.js';
import { userRatingsRoutes } from './routes/userRatingsRoutes copy.js';


// Indlæs miljøvariabler fra .env (uden at vise logs)
dotenv.config({ quiet: true });

// Brug port fra .env eller falde tilbage til 3000
const port = process.env.PORT || 3000;

// Opret express-app
const app = express();

// Gør det muligt at modtage JSON i requests
app.use(express.json());

// Gør det muligt at modtage form-data (fx fra formularer)
app.use(express.urlencoded({ extended: true }));

// Brug vores user-routes under /api/users
app.use('/api/users', userRoutes);
app.use('/api/posters', posterRoutes);
app.use('/api/genres', genreRoutes);
app.use('/api/cartlines', cartlineRoutes);
app.use('/api/userRatings', userRatingsRoutes);

// Start serveren
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});