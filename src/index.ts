import express from 'express';
import mongoose from 'mongoose';
import userRoute from './routes/user_route';
import productRoute from './routes/product_route';
import { seedInitialData } from './services/product_services';


const app = express();
const port = 3000;
app.use(express.json());

// ✅ Middleware لإضافة CSP
// app.use((req, res, next) => {
//   res.setHeader(
//     "Content-Security-Policy",
//     "default-src 'self'; connect-src 'self' http://localhost:3000"
//   );
//   next();
// });


app.get('/', (req, res) => {
  res.send('Root route is working 🚀');
});




// ✅ اتصال بقاعدة البيانات
mongoose.connect('mongodb://localhost:27017/ecommerce')
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

app.use('/user', userRoute);
app.use('/product', productRoute);

seedInitialData()



// ✅ تشغيل السيرفر
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
