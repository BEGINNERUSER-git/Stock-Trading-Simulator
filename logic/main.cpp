#include <iostream>
using namespace std;
#include "sendEvent.h"
#include "marketMaker.h"
#include <thread>

int main()
{   MatchingEngine engine;
    sendEvent sendEvent(9000, engine );
    thread bot(marketMaker, ref(sendEvent.getEngine()));
    bot.detach();
    sendEvent.start();

    return 0;
}