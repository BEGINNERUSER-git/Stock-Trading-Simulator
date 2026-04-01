#ifndef TRADE_H
#define TRADE_H
#include<sstream>
#include <string>

struct Trade {
    std::string buyerId;
    std::string sellerId;
    std::string symbol;
    int quantity;
    double price;

    std:: string toJson() const {
        std::stringstream ss;
        ss<<"{";
        ss<<"\"buyerId\":\""<<buyerId<<"\",";
        ss<<"\"sellerId\":\""<<sellerId<<"\",";
        ss<<"\"symbol\":\""<<symbol<<"\",";
        ss<<"\"quantity\":"<<quantity<<",";
        ss<<"\"price\":"<<price;
        ss<<"}";
        return ss.str();
    }
};



#endif 