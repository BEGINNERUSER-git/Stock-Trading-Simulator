#ifndef INDICATOR_H
#define INDICATOR_H
#include <vector>
using namespace std;
class indicator
{

public:
   
 double calculateSMA(int period, vector<int> & data);
 double calculateRSI(int period, vector<int> &data);
 double calculateEMA(int period, vector<int> &data);
 double calculateMACD(vector<int>& data);
};




#endif