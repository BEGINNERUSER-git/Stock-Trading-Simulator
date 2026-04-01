import Portfolio from "../models/portfolio.models.js";
import User from "../models/user.models.js";

export async function updatePortfolioUser(userId, sellId, quantity, price,symbol) {
    try {
     const totalPrice=quantity*price;
     const buyer=await User.findById(userId);
        const seller=await User.findById(sellId);
        buyer.balance -= totalPrice;
        seller.balance += totalPrice;
        await buyer.save();
        await seller.save();
        const buyerPortfolio = await Portfolio.findOne({ where: { userId } });
        const sellerPortfolio = await Portfolio.findOne({ where: { userId: sellId } });
        const buyerStock = buyerPortfolio.stocks.find(stock => stock.stockSymbol === symbol);
        if (buyerStock) {
            buyerStock.quantity += quantity;
        } else {
            buyerPortfolio.stocks.push({ stockSymbol: symbol, quantity,averagePrice: price });
        }
        const sellerStock = sellerPortfolio.stocks.find(stock => stock.stockSymbol === symbol);
        if (sellerStock) {
            sellerStock.quantity -= quantity;
            if (sellerStock.quantity <= 0) {
                sellerPortfolio.stocks = sellerPortfolio.stocks.filter(stock => stock.stockSymbol !== symbol);
            }
        }
        await buyerPortfolio.save();
        await sellerPortfolio.save();

    }
        catch (error) { 
            console.error("Error updating portfolios:", error);
        }
};