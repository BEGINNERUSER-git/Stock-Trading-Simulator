#include<iostream>
#include<vector>
#include "indicator.h"
#include <map>
using namespace std;

double calculateSMA( int period,vector<double> &data)
{    

    int sum = 0;
    for (int i = 0; i < period; i++) {
        sum += data[i];
    }
    return sum / period;
}

double calculateRSI(int period, vector<double> &data)
{
    
    int gain = 0;
    int loss = 0;
    for (int i = 1; i < period; i++) {
        int change = data[i] - data[i - 1];
        if (change > 0) {
            gain += change;
        } else {
            loss -= change;
        }
    }
    if (loss == 0) {
        return 100; 
    }
    double rs = static_cast<double>(gain) / loss;
    return 100 - (100 / (1 + rs));
}

double calculateEMA(int period, vector<double> &data)
{
    if(data.empty()) {
        cerr << "Error: No price data available" << endl;
        return -1;
    }

    double multiplier = 2.0 / (period + 1);
    double ema = data[0]; 
    for (size_t i = 1; i < data.size(); i++) {
        ema = (data[i] - ema) * multiplier + ema;
    }
    return (ema);
}

double calculateMACD(  vector<double> &data)
{
    double ema12 = calculateEMA(12,data);
    double ema26 = calculateEMA(26, data);
    return ema12 - ema26;
}



