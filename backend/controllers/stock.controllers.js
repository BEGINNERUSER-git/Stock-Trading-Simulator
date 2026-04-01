import axios from 'axios';
import csvtojson from 'csvtojson';
import Stock from '../models/stock.models.js';
import ApiError from '../utils/ApiError.js';



const stockCache={};
const allShares = async (req,res,next) => {
  try {
    const url_all_shares = `https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=${process.env.API_KEY}`;
    
    const response=await axios.get(url_all_shares);
    
    const jsonArray = await csvtojson().fromString(response.data);
    const filteredData = jsonArray.map(item => ({
      updateOne:
      {
        filter: { symbol: item.symbol },
        update: {
          $set: {
            symbol: item.symbol,
            name: item.name
          }
        },
        upsert: true,

      }

    }));
    const result = await Stock.bulkWrite(filteredData);
    console.log(`Sync Complete! New: ${result.upsertedCount}, Updated: ${result.modifiedCount}`);

  } catch (error) {
    next( new ApiError(500, "Failed to sync Data."));
  }


}

export const getAllShares = async (req, res) => {
  try {
    const stocks = await Stock.find({},{ _id: 0, symbol: 1, name: 1 });
    return res.status(200).json({
        success: true,
        data: stocks
    });
  } catch (error) {
    throw new ApiError(500, 'Failed to fetch stocks');
  }
}


const sharePerSymboldaily = async (req, res) => {
  try {
    const { symbol } = req.params;
    if(stockCache[symbol] && (Date.now() - stockCache[symbol].timestamp < 60 * 1000)) {
      return res.json(stockCache[symbol].data);
    } 
    var url_daily = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.API_KEY}`;
    const response = await axios.get(url_daily);
  
    if(!response.data || response.data["Note"]){
        return res.json({
          symbol,
          price: 0,
          history: [],
          message: response.data["Note"] || "Alpha Vantage API limit reached. Please wait a minute."
        })
    } 

    const series=response.data['Time Series (Daily)'];

    if (!series) throw new ApiError(404, "Symbol not found or API limit reached");
    const dates=Object.keys(series);
    const latest=series[dates[0]];
    const price=parseFloat(latest['4. close']);
    const history=dates.slice(0, 30).map(date => ({
      time: date,
      price: parseFloat(series[date]['4. close'])
    }));
    const result={ symbol, price, history };
    stockCache[symbol] = { data: result, timestamp: Date.now() };
    setTimeout(() => { delete stockCache[symbol]; }, 60 * 1000); // Cache expires after 1 minute
    return res.json(result);
  } catch (error) {
    throw new ApiError(500, 'No DAILY data available for this symbol');
  }


}



const sharePerSymbolInterday = async (req, res,next) => {
  try {
    const {symbol} = req.query;
    if (!symbol) {
        throw new ApiError(400, "Symbol is required in query parameters");
    }
    var url_daily = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${process.env.API_KEY}`;
   
    const csvfile=await axios.get(url_daily);
    
    const data = csvfile.data;
    console.log(data);
    if (data["Note"]) {
        throw new ApiError(429, "Alpha Vantage API limit reached. Please wait a minute.");
    }
    const timeSeries = data['Time Series (5min)'];
    if (!timeSeries) throw new ApiError(404, "Symbol not found or API limit reached");
    const latestDate = Object.keys(timeSeries);
    const latestPrice = parseFloat(timeSeries(latestDate['4. close']));
    const history=latestDate.slice(0, 20).map(date => ({
      time:date,
      price: parseFloat(timeSeries[date]['4. close'])
    }));
    // await Stock.findOneAndUpdate({ symbol }, { upsert: true });
    res.json( { symbol, price: latestPrice, date: latestDate, history } );
  } catch (error) {
    throw new ApiError(500, error);
  }


}

const getsharebySymbol = async (req, res) => {
  try {
    const { symbol } = req.params;
    const stock = await Stock.findOne({ symbol });
    if (!stock) {
      throw new ApiError(404, 'Stock not found');
    }
    return res.status(200).json({
        success: true,
        data: stock
    });
  } catch (error) {
    throw new ApiError(500, 'Failed to fetch stock data');
  }
}

export { allShares, sharePerSymboldaily, sharePerSymbolInterday, getsharebySymbol };