# README - E-commerce Chatbot Demo

This repository contains a complete example of an e-commerce chatbot, designed to demonstrate how a virtual assistant can enhance the online shopping experience.
## Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Implemented Features](#implemented-features)
- [Getting Started](#getting-started)
- [Customization](#customization)
- [Documentation](#documentation)

## Overview

This demo chatbot was developed as an example implementation of a virtual assistant for e-commerce. It implements the main conversation flows necessary for an online store, including product search, order tracking, returns management, and payment assistance.

The chatbot is designed for easy integration with Tidio, a user-friendly chatbot platform, but can also be adapted to other platforms.

## Project Structure

```
chatbot_ecommerce/
├── index.html                  # Main e-commerce page with integrated chatbot
├── styles.css                  # CSS styles for the user interface
├── chatbot.js                  # Main chatbot logic and conversation flows
├── ecommerce_integration.js    # Simulation of integrations with e-commerce systems
├── chatbot_integration.js      # Link between chatbot and e-commerce systems
├── technical_documentation.md  # Detailed technical documentation
└── user_guide.md               # User guide for end-users and developers
```

## Implemented Features

- **Welcome and Main Menu**: Initial interface with navigation options
- **Product Search**: Navigation by categories and features
- **Order Tracking**: Status check and shipping details
- **Returns Management**: Guided procedure to initiate a return
- **Payment Assistance**: Troubleshooting and discount code verification
- **Intelligent Upselling**: Suggestion of related products
- **Sentiment Analysis**: Detection of the emotional tone of messages
- **Human Operator Transfer**: Escalation for complex issues

## Getting Started

### Requirements

- A modern web browser
- A local web server (optional for testing)

### Installation

1. Clone or download this repository
2. Start a local web server in the project directory
   ```
   python -m http.server 8000
   ```
3. Open a browser and navigate to `http://localhost:8000`

### Quick Test

To quickly test the chatbot:

1. Click the chatbot icon in the bottom right corner
2. Select "Search for products" from the main menu
3. Choose a category and follow the conversation flow
4. Also try other flows like "Track an order" (use ORD-12345678 as an example)

## Customization

### Modifying Products

Edit the `ecommerce_integration.js` file to add or modify available products.

### Modifying Conversation Flows

Edit the `chatbot.js` file to customize conversation flows according to your needs.

### Tidio Integration

Consult the [User Guide](user_guide.md) for detailed instructions on how to implement this chatbot using Tidio.

## Documentation

For more detailed information, consult:

- [Technical Documentation](technical_documentation.md): System architecture, conversation flows, and integrations
- [User Guide](user_guide.md): Instructions for end-users and developers

## License

This project is provided as an educational example and can be freely used for learning and demonstration purposes.

