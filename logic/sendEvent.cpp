#include "sendEvent.h"

#include <iostream>
#include <sstream>
#include <vector>
#include <netinet/in.h>
#include <unistd.h>
#include <cstring>

sendEvent::sendEvent(int p, MatchingEngine &engine) : engine(engine), port(p)
{
    
}

order sendEvent::parseOrder(const std::string& msg) {
    std::stringstream ss(msg);
    std::string side, symbol, user, mongoId;
    double price;
    int quantity;

    
    ss >> side >> symbol >> price >> quantity >> user >> mongoId;

    order newOrder;
    newOrder.symbol = symbol;
    newOrder.price = price;
    newOrder.quantity = quantity;
    newOrder.userId = user;
    newOrder.orderId = mongoId; 
    newOrder.timestamp = time(NULL);
    newOrder.side = (side == "BUY") ? Side::BUY : Side::SELL;

    return newOrder;
}

void sendEvent::start() {
    int server_fd = socket(AF_INET, SOCK_STREAM, 0);
    
    // CRITICAL: This allows you to restart the engine immediately
    int opt = 1;
    setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));

    sockaddr_in address;
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY; // Listen on all interfaces
    address.sin_port = htons(port);

    if (::bind(server_fd, (struct sockaddr *)&address, sizeof(address)) < 0) {
        perror("Bind failed"); 
        return;
    }

    if (listen(server_fd, 10) < 0) {
        perror("Listen failed");
        return;
    }

    std::cout << "SUCCESS: Engine listening on port " << port << std::endl;

    while(true) {
        int client = accept(server_fd, NULL, NULL);
        if (client < 0) {
            perror("Accept failed");
            continue;
        }

  

        char buffer[1024] = {0};

        read(client,buffer,1024);

        std::string msg(buffer);

        std::stringstream ss(msg);

        std::string type;

        ss >> type;

        if(type=="PRICE")
        {

            std::string symbol;
            double price;

            ss >> symbol >> price;

            engine.getPriceFeed().updatePrice(symbol,price);

            std::cout<<"Price updated "<<symbol<<" "<<price<<std::endl;

        }
        else if(type=="CANCEL")
        {

            std::string orderId;

            ss >> orderId;

            bool result = engine.cancelOrder(orderId);

            if (result) {
                std::cout<<"Order cancelled "<<orderId<<std::endl;
            } else {
                std::cout<<"Order not found "<<orderId<<std::endl;
            }

        }
        else if(type=="MODIFY")
        {

            std::string orderId;
            int quantity;
            double price;

            ss >> orderId >> quantity >> price;

            bool result = engine.modifyOrder(orderId,quantity,price);

            if (result) {
                std::cout<<"Order modified "<<orderId<<" "<<quantity<<" @ "<<price<<std::endl;
            } else {
                std::cout<<"Order not found "<<orderId<<std::endl;
            }

        }
        else
        {

            order order = parseOrder(msg);

            auto trades = engine.placeorder(order);

            for(auto& t:trades)
            {

                std::string json = t.toJson() + "\n";

                send(client,json.c_str(),json.size(),0);

                std::cout<<"Trade "<<json<<std::endl;

            }

        }

        close(client);

    }

}