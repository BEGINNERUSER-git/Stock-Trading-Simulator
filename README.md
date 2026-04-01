# Real-Time Stock Trading Simulator

A full-stack trading simulator with a custom C++ matching engine.

## Architecture

Frontend: React  
Backend: Node.js + Express  
Database: MongoDB  
Matching Engine: C++ (TCP socket)

## Features

- Real-time stock trading
- Order matching engine
- Portfolio tracking
- Transaction history
- Order cancellation
- Market order book

## System Flow

User → React UI  
React → Node Backend API  
Node → C++ Matching Engine  
Engine → Trade Execution  
Node → MongoDB (transactions, portfolio)

## Tech Stack

React
Node.js
Express
MongoDB
C++
Docker

## Run Locally
frontend + backend integration : stock-trading-simulator-gamma.vercel.app

for C++ to work run it locally : ./engine 
