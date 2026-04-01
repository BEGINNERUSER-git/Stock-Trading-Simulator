import {
    allShares, sharePerSymboldaily, sharePerSymbolInterday, getsharebySymbol,
    getAllShares
} from '../controllers/stock.controllers.js';
import express from 'express';

const StockRouter = express.Router();

StockRouter.get('/sync', allShares);
StockRouter.get('/all', getAllShares);
StockRouter.get('/daily/:symbol', sharePerSymboldaily);
StockRouter.get('/interday', sharePerSymbolInterday);
StockRouter.get('/:symbol', getsharebySymbol);

export default StockRouter;