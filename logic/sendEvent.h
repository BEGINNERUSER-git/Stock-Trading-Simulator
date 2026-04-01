#ifndef SENDEVENT_H
#define SENDEVENT_H
#include "MatchingEngine.h"
#include "order.h"
class sendEvent
{private:
    MatchingEngine &engine;
    int port;
public:
    sendEvent(int port, MatchingEngine &engine);
    order parseOrder(const std::string& msg);
    void start();
    MatchingEngine& getEngine() {
        return engine;
    }
};

#endif