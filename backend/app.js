import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import ApiError from '../backend/utils/ApiError.js';
// Importing Routes
import Userrouter from './routes/user.routes.js'; 
import OrderRouter from './routes/order.routes.js';
import portfolioRouter from './routes/portfolio.routes.js';
import TransRouter from './routes/transaction.routes.js';
import StockRouter from './routes/stock.routes.js';


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 1000, 
    message: "Too many requests, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
});

dotenv.config();
const app = express();
app.set('trust proxy', 1);
app.use((req, res, next) => {
    console.log("--- New Request ---");
    console.log("Method:", req.method);
    console.log("Path:", req.path);
    console.log("IP:", req.ip);
    next();
});

app.use(limiter); 
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS','PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: "16kb" })); 
app.use(express.urlencoded({ extended: true, limit: "16kb" }));


// Using Routes
app.use("/api/users",Userrouter);
app.use("/api/orders",OrderRouter);
app.use("/api/portfolio",portfolioRouter);
app.use("/api/transactions",TransRouter);
app.use("/api/stock",StockRouter);


app.get("/",(req,res)=>{
    res.send("Trading Simulator Backend is Running.")
})

// Global Error Handler
app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            status: 'error',    
            message: err.message,
            errors: err.errors || null
        });
    }
    console.error(err);
    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    });
}
);
export default app;