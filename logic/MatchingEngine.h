#ifndef MATCHINGENGINE_H
#define MATCHINGENGINE_H
#include "OrderBook.h"
#include<map>
#include "pricefeed.h"
using namespace std;
class MatchingEngine
{
private:
    map<string ,OrderBook>books;
 pricefeed feed;
 map<string , order*>orderIndex;
    vector<order>storedOrders;
public:
    
   vector<Trade> placeorder( order order);
   pricefeed &getPriceFeed() {
        return feed;
    }
    map<string, OrderBook>& getBooks() {
        return books;
    }

    bool cancelOrder(const string& orderId);
    bool modifyOrder(const string& orderId, int newQuantity, double newPrice);
    
};

#endif

