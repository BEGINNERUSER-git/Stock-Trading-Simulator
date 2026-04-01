#ifndef PRICEFEED_H
#define PRICEFEED_H
#include <map>
#include <string>
using namespace std;
class pricefeed
{
private:
    map<string, double> prices;
public:
    void updatePrice(const std::string& symbol, double price) {
        prices[symbol] = price;
    }
    double getPrice(const std::string& symbol) {
        if (prices.find(symbol) != prices.end()) {
            return prices[symbol];
        }
        return -1;
    }
    map<string, double> &getAllPrices() {
        return prices;
    }
};
#endif
