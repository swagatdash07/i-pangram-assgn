import express  from 'express';
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js';
import cors from 'cors';
import empRoutes from './routes/route.js'
// rest objects
const app = express();
// config env
dotenv.config()

// db config
connectDB();
// PORT
const PORT = process.env.PORT || 8080;

// middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors())
// routes
app.use('/',empRoutes)

app.get('/',(req,res)=>{
    res.send("<h1> Welcome to ecommerce app </h1>");
})

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})