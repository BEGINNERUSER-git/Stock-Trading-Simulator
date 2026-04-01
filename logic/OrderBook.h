#ifndef ORDERBOOK_H
#define ORDERBOOK_H

#include <vector>
#include <queue>
#include "order.h"
#include "Trade.h"
struct BuyComparator {
    bool operator()(const order& a, const order& b) {
        if (a.price == b.price) {
            return a.timestamp > b.timestamp; 
        }
        return a.price < b.price; 
    }
};
struct SellComparator {
bool operator()(const order& a, const order& b) {
    if (a.price == b.price) {
        return a.timestamp < b.timestamp; 
    }
    return a.price > b.price; 
}
};
class OrderBook
{
  std::priority_queue<order, std::vector<order>, BuyComparator> buyOrders;
  std::priority_queue<order, std::vector<order>, SellComparator> sellOrders;
  std::vector<double>priceHistory;
public:

  std::vector<Trade> addOrder(const order& newOrder);
 const std::vector<double> &getHistory() const;
};




#endif 