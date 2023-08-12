import express from 'express';
import productRouter from './routes/product.routes';
import orderRouter from './routes/order.routes';

const app = express();

app.use(express.json());

app.use('/products', productRouter);
app.use('/orders', orderRouter);

export default app;
