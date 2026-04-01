#include <iostream>
#include "OrderBook.h"
using namespace std;
#include<algorithm>

std::vector<Trade> OrderBook::addOrder(const order &newOrder) {
    if (newOrder.side == Side::BUY) buyOrders.push(newOrder);
    else sellOrders.push(newOrder);

    std::vector<Trade> trades;

    while (!buyOrders.empty() && !sellOrders.empty()) {
        order buy = buyOrders.top();
        order sell = sellOrders.top();

        if (buy.price >= sell.price) {
            buyOrders.pop();
            sellOrders.pop();

            int matchedQty = min(buy.quantity, sell.quantity);

            Trade t;
            t.buyerId = buy.userId;
            t.sellerId = sell.userId;
            t.symbol = buy.symbol;
            t.quantity = matchedQty;
            t.price = sell.price; // Seller sets the execution price
            
            trades.push_back(t);
            priceHistory.push_back(t.price);

            buy.quantity -= matchedQty;
            sell.quantity -= matchedQty;

            if (buy.quantity > 0) buyOrders.push(buy);
            if (sell.quantity > 0) sellOrders.push(sell);
        } 
        else break;
    }
    return trades;
}
const vector<double> &OrderBook::getHistory() const{
      return priceHistory;
}