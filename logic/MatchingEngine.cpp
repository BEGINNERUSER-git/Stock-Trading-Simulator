#include <iostream>
#include <vector>
#include "MatchingEngine.h"
using namespace std;

vector<Trade> MatchingEngine::placeorder(order newOrder)
{
    newOrder.status = OrderStatus::PENDING;

    OrderBook &book = books[newOrder.symbol];

    storedOrders.push_back(newOrder);

    order &stored = storedOrders.back();

    orderIndex[stored.orderId] = &stored;

    return book.addOrder(stored);
}
bool MatchingEngine::cancelOrder(const string& orderId) {
    auto it = orderIndex.find(orderId);
    if (it != orderIndex.end()) {
        order* orderPtr = it->second;
        orderPtr->status = OrderStatus::CANCELLED;
        orderIndex.erase(it);
        return true;
    }
    return false;
}

bool MatchingEngine::modifyOrder(const string& orderId, int newQuantity, double newPrice) {
    auto it = orderIndex.find(orderId);
    if (it != orderIndex.end()) {
        order* orderPtr = it->second;
        if (orderPtr->status == OrderStatus::PENDING) {
            orderPtr->quantity = newQuantity;
            orderPtr->price = newPrice;
            placeorder(*orderPtr);
            return true;
        }
    }
    return false;
}

