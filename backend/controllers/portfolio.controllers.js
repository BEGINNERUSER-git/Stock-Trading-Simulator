import Portfolio from "../models/portfolio.models.js";
import User from "../models/user.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Stock from "../models/stock.models.js";

export const createPortfolio = async (req, res) => {
    try {
        const { userId } = req.params;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        // Check if the user already has a portfolio
        const existingPortfolio = await Portfolio.findOne({ userId });
        if (existingPortfolio) {
            throw new ApiError(400, "User already has a portfolio");
        }

        // Create a new portfolio
        const portfolio = new Portfolio({ userId, stocks: [] });
        await portfolio.save();

        res.status(201).json(new ApiResponse(201, "Portfolio created successfully", portfolio));
    } catch (error) {
        throw new ApiError(500, error.message || "Failed to create portfolio");
    }
};

export const getPortfolio = async (req, res) => {
    try {
        const { userId } = req.params;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        // Get the user's portfolio
        const portfolio = await Portfolio.findOne({ userId });
        if (!portfolio) {
            portfolio=await Portfolio.create({ userId, stocks: [] });
        }

        res.status(200).json(new ApiResponse(200, "Portfolio fetched successfully", portfolio));
    } catch (error) {
        throw new ApiError(500, error.message || "Failed to fetch portfolio");
    }
};



export const deletePortfolio = async (req, res) => {
    try {
        const { userId } = req.params;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        // Delete the user's portfolio
        const portfolio = await Portfolio.findOneAndDelete({ userId });
        if (!portfolio) {
            throw new ApiError(404, "Portfolio not found");
        }

       res.status(200).json(new ApiResponse(200, "Portfolio deleted successfully", portfolio));
    } catch (error) {
        throw new ApiError(500, error.message || "Failed to delete portfolio");
    }
};

export const getPortfolioValue = async (req, res) => {
    try {
        const { userId } = req.params;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        // Get the user's portfolio
        const portfolio = await Portfolio.findOne({ userId });
        if (!portfolio) {
            throw new ApiError(404, "Portfolio not found");
        }

        // Calculate the total value of the portfolio
        let totalValue = 0;
        for (const stock of portfolio.stocks) {
            const stockData = await Stock.findOne({ symbol: stock.stockSymbol });
            if (stockData) {
                totalValue += stock.quantity * stockData.currentPrice;
            }
        }

        res.status(200).json(new ApiResponse(200, "Portfolio value calculated successfully", { totalValue }));
    } catch (error) {
        throw new ApiError(500, error.message || "Failed to calculate portfolio value");
    }
};

export const getStockPosition = async (req, res) => {
    try {
        const { userId, stockSymbol } = req.params;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        // Get the user's portfolio
        const portfolio = await Portfolio.findOne({ userId });
        if (!portfolio) {
            throw new ApiError(404, "Portfolio not found");
        }

        // Find the stock position in the portfolio
        const stockPosition = portfolio.stocks.find(stock => stock.stockSymbol === stockSymbol);
        if (!stockPosition) {
            throw new ApiError(404, "Stock position not found in portfolio");
        }

        res.status(200).json(new ApiResponse(200, "Stock position fetched successfully", stockPosition));
    } catch (error) {
        throw new ApiError(500, error.message || "Failed to fetch stock position");
    }   

};