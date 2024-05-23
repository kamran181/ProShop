import express from 'express';
import path from 'path';
import  dotenv  from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js'
import ordersRoutes from './routes/ordersRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'

dotenv.config()
connectDB()
const app = express();

app.use(express.json());

app.use('/api/products',productRoutes);
app.use('/api/user', userRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(8080, () => {
    console.log(`server is running in ${process.env.NODE_ENV} on port ${PORT}!`);
})