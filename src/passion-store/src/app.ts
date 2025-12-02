import express from 'express';
import { json } from 'body-parser';
import productsRoutes from './routes/products.routes';

const app = express();

// Middleware
app.use(json());

// Routes
app.use('/api/products', productsRoutes);

// Export the app for testing or further configuration
export default app;