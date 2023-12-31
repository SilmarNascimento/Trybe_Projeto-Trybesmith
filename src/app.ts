import express from 'express';
import productRouter from './routes/product.routes';
import orderRouter from './routes/order.routes';
import loginRouter from './routes/login.routes';

const app = express();

app.use(express.json());

app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/login', loginRouter);

export default app;
