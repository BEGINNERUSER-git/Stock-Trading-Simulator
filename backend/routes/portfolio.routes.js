import {
    createPortfolio,
    getPortfolio,
    getPortfolioValue,
    getStockPosition,
    deletePortfolio,

} from '../controllers/portfolio.controllers.js';
import express from 'express';
import { verifyJWT } from '../middleware/auth.middleware.js';

const portfolioRouter = express.Router();

portfolioRouter.post('/create/:userId',verifyJWT, createPortfolio);
portfolioRouter.get('/:userId', verifyJWT,getPortfolio);
portfolioRouter.get('/:userId/value',verifyJWT, getPortfolioValue);
portfolioRouter.get('/:userId/symbol',verifyJWT, getStockPosition);
portfolioRouter.get('/:userId',verifyJWT, deletePortfolio);


export default portfolioRouter;