import express from 'express';
import { json } from 'body-parser';
import productsRoutes from './routes/products.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use('/api/products', productsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});