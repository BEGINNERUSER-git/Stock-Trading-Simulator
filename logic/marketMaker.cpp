#include "marketMaker.h"

#include <thread>
#include <chrono>
#include <ctime>
#include <cstdlib>
#include <iostream>

void marketMaker(MatchingEngine& engine)
{   
    const double spread = 0.5;
    const int quantity = 200;

    while(true)
    {
        auto& prices = engine.getPriceFeed().getAllPrices();

        for(auto& p : prices)
        {
            std::string symbol = p.first;
            double midPrice = p.second;

            double buyPrice = midPrice - spread;
            double sellPrice = midPrice + spread;

            order buy;

            buy.orderId = std::to_string(rand());
            buy.userId   = "BOT";
            buy.symbol = symbol;
            buy.side = Side::BUY;
            buy.price = buyPrice;
            buy.quantity = quantity;
            buy.timestamp = time(NULL);

            engine.placeorder(buy);

            order sell;

            sell.orderId = std::to_string(rand());
            sell.userId   = "BOT";
            sell.symbol = symbol;
            sell.side = Side::SELL;
            sell.price = sellPrice;
            sell.quantity = quantity;
            sell.timestamp = time(NULL);

            engine.placeorder(sell);

            std::cout << "BOT quotes "
                      << symbol
                      << " BUY:" << buyPrice
                      << " SELL:" << sellPrice
                      << std::endl;
        }

        std::this_thread::sleep_for(std::chrono::seconds(3));
    }
}