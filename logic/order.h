#ifndef ORDER_H
#define ORDER_H
#include <string>

enum class Side{
    BUY,
    SELL
};
enum class OrderStatus{
    PENDING,
    COMPLETED,
    CANCELLED,
    PARTIALLY_COMPLETED,
    EXPIRED
};
struct order
{
    std::string orderId;
    std::string userId;
    std::string symbol;
    Side side;
    int quantity;
    OrderStatus status;
    double price;

    long timestamp;
};

#endif 
