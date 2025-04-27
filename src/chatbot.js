// Chatbot configuration
const chatbotConfig = {
    botName: "TechStyle Assistant",
    initialDelay: 1000,
    typingDelay: 50,
    thinkingTime: 1500
};

// Product database (simulated)
const products = {
    laptops: [
        { id: 1, name: "TechPro X5", description: "i9 Processor, 32GB RAM, 1TB SSD", price: 1499, image: "https://via.placeholder.com/300x300?text=Laptop+TechPro+X5" },
        { id: 2, name: "UltraBook Pro", description: "Ryzen 9 Processor, 16GB RAM, 512GB SSD", price: 1299, image: "https://via.placeholder.com/300x300?text=UltraBook+Pro" },
        { id: 3, name: "PowerStation 7", description: "i7 Processor, 16GB RAM, 1TB SSD", price: 1199, image: "https://via.placeholder.com/300x300?text=PowerStation+7" }
    ],
    smartphones: [
        { id: 4, name: "UltraPhone", description: "AMOLED Display, 256GB, 108MP Camera", price: 899, image: "https://via.placeholder.com/300x300?text=Smartphone+UltraPhone" },
        { id: 5, name: "TechPhone Pro", description: "A15 Processor, 128GB, Dual Camera", price: 799, image: "https://via.placeholder.com/300x300?text=TechPhone+Pro" },
        { id: 6, name: "SmartX 5G", description: "5G, 64GB, 5000mAh Battery", price: 599, image: "https://via.placeholder.com/300x300?text=SmartX+5G" }
    ],
    accessories: [
        { id: 7, name: "SoundMax Headphones", description: "Noise cancellation, Bluetooth 5.2, 30h battery life", price: 249, image: "https://via.placeholder.com/300x300?text=Headphones+SoundMax" },
        { id: 8, name: "FitLife Smartwatch", description: "Fitness tracking, 7-day battery, Waterproof", price: 199, image: "https://via.placeholder.com/300x300?text=Smartwatch+FitLife" },
        { id: 9, name: "PowerBank Ultra", description: "20000mAh, Fast charging, 2 USB ports", price: 49, image: "https://via.placeholder.com/300x300?text=PowerBank+Ultra" }
    ]
};

// Order database (simulated)
const orders = {
    "ORD-12345678": {
        status: "In transit",
        shippingDate: "April 22, 2025",
        deliveryDate: "April 26, 2025",
        courier: "Express Delivery",
        trackingNumber: "EXP987654321",
        items: [
            { id: 1, name: "TechPro X5", quantity: 1, price: 1499 },
            { id: 7, name: "SoundMax Headphones", quantity: 1, price: 249 }
        ]
    },
    "ORD-87654321": {
        status: "Delivered",
        shippingDate: "April 15, 2025",
        deliveryDate: "April 18, 2025",
        courier: "Fast Shipping",
        trackingNumber: "FST123456789",
        items: [
            { id: 4, name: "UltraPhone", quantity: 1, price: 899 }
        ]
    }
};

// Conversation flows
const conversationFlows = {
    // Welcome flow
    welcome: {
        messages: [
            "Welcome to TechStyle store! I'm your virtual assistant and I'm here to help you. How can I assist you today?"
        ],
        options: [
            { text: "Search for products", value: "search_products" },
            { text: "Track an order", value: "track_order" },
            { text: "Returns and refunds information", value: "returns_info" },
            { text: "Payment assistance", value: "payment_help" },
            { text: "Speak with a human agent", value: "human_operator" }
        ]
    },
    
    // Product search flow
    search_products: {
        messages: [
            "Great choice! What are you looking for today?"
        ],
        options: [
            { text: "Laptops", value: "search_laptops" },
            { text: "Smartphones", value: "search_smartphones" },
            { text: "Accessories", value: "search_accessories" },
            { text: "Other", value: "search_other" }
        ]
    },
    
    // Category search subflows
    search_laptops: {
        messages: [
            "Perfect! To help you find the ideal laptop, could you tell me which features are most important to you?"
        ],
        options: [
            { text: "High performance", value: "laptop_performance" },
            { text: "Lightweight and portable", value: "laptop_portability" },
            { text: "Battery life", value: "laptop_battery" },
            { text: "Affordable price", value: "laptop_price" }
        ]
    },
    
    laptop_performance: {
        messages: [
            "Thanks for the information! Here are some of our high-performance laptops:"
        ],
        products: "laptops",
        followUp: {
            message: "Would you like more details about any of these models?",
            options: [
                { text: "TechPro X5", value: "product_details_1" },
                { text: "UltraBook Pro", value: "product_details_2" },
                { text: "PowerStation 7", value: "product_details_3" },
                { text: "No, thanks", value: "welcome" }
            ]
        }
    },
    
    // Product details
    product_details_1: {
        messages: [
            "The **TechPro X5** is our flagship laptop, designed for professionals and creatives who need exceptional performance.",
            "**Technical specifications:**\n- Latest generation Intel Core i9 processor\n- 32GB DDR4 RAM\n- Ultra-fast 1TB SSD\n- Dedicated NVIDIA RTX graphics card\n- 15.6\" 4K display with HDR technology\n- Up to 8 hours of battery life\n- Advanced cooling system",
            "The price is **$1,499** and includes free shipping and a 2-year warranty."
        ],
        options: [
            { text: "Add to cart", value: "add_to_cart_1" },
            { text: "See similar products", value: "search_laptops" },
            { text: "Return to main menu", value: "welcome" }
        ]
    },
    
    add_to_cart_1: {
        messages: [
            "Excellent choice! I've added the TechPro X5 to your cart.",
            "👉 **Expert tip**: Customers who purchase this laptop often add a protective case and a wireless mouse for an optimal user experience. Would you like to see some options?"
        ],
        options: [
            { text: "Yes, show me accessories", value: "search_accessories" },
            { text: "No, thanks", value: "welcome" }
        ]
    },
    
    // Order tracking flow
    track_order: {
        messages: [
            "I'll be happy to help you track your order. Could you provide me with the order number? You can find it in the confirmation email you received after your purchase."
        ],
        input: true,
        inputHandler: "handleOrderTracking"
    },
    
    // Returns management flow
    returns_info: {
        messages: [
            "I'm sorry you need to return a product. I can help you with the return process. Could you tell me the reason for the return?"
        ],
        options: [
            { text: "Damaged product", value: "return_damaged" },
            { text: "Product doesn't match description", value: "return_mismatch" },
            { text: "Received wrong item", value: "return_wrong" },
            { text: "Don't like it/doesn't fit", value: "return_dislike" },
            { text: "Other", value: "return_other" }
        ]
    },
    
    return_damaged: {
        messages: [
            "I'm sorry for the inconvenience. To proceed with returning a damaged product, I'll need some information:",
            "1. Order number\n2. Name of the product to return\n3. A brief description of the damage",
            "Additionally, it would be helpful if you could upload a photo of the damaged product in the appropriate section of your account."
        ],
        options: [
            { text: "Provide information", value: "return_info_form" },
            { text: "Speak with an agent", value: "human_operator" },
            { text: "Return to main menu", value: "welcome" }
        ]
    },
    
    return_info_form: {
        messages: [
            "Please enter your order number:"
        ],
        input: true,
        inputHandler: "handleReturnForm"
    },
    
    // Payment assistance flow
    payment_help: {
        messages: [
            "I'm sorry you're having issues with payment. I can help you resolve them. What problem are you experiencing?"
        ],
        options: [
            { text: "Credit card declined", value: "payment_card_declined" },
            { text: "Payment charged but order not confirmed", value: "payment_charged_no_order" },
            { text: "Apply a discount code", value: "payment_discount" },
            { text: "Billing questions", value: "payment_invoice" },
            { text: "Other", value: "payment_other" }
        ]
    },
    
    payment_card_declined: {
        messages: [
            "I'm sorry for the inconvenience. There are several reasons why a credit card might be declined:",
            "1. Insufficient funds\n2. Spending limits reached\n3. Incorrect information entered\n4. Temporary issues with the bank",
            "I recommend:\n- Verifying that your card details are correct\n- Contacting your bank to ensure there are no blocks\n- Trying an alternative payment method"
        ],
        options: [
            { text: "Try another payment method", value: "payment_alternatives" },
            { text: "Speak with an agent", value: "human_operator" },
            { text: "Return to main menu", value: "welcome" }
        ]
    },
    
    // Human operator transfer flow
    human_operator: {
        messages: [
            "I understand that sometimes it's preferable to speak with a human agent. I'll be happy to connect you with one of our customer service representatives.",
            "To help you more quickly, could you briefly indicate the reason for your request?"
        ],
        input: true,
        inputHandler: "handleHumanTransfer"
    },
    
    // Feedback and closing flow
    feedback: {
        messages: [
            "It's been a pleasure helping you! Your satisfaction is our priority.",
            "Before we say goodbye, would you mind rating your experience with me today? This will help us improve our service."
        ],
        options: [
            { text: "⭐⭐⭐⭐⭐ Excellent", value: "feedback_5" },
            { text: "⭐⭐⭐⭐ Very good", value: "feedback_4" },
            { text: "⭐⭐⭐ Good", value: "feedback_3" },
            { text: "⭐⭐ Fair", value: "feedback_2" },
            { text: "⭐ Needs improvement", value: "feedback_1" }
        ]
    },
    
    feedback_5: {
        messages: [
            "Thank you so much for your positive feedback! I'm glad I was able to help you today.",
            "If you have any other questions in the future, don't hesitate to come back. Have a wonderful day and happy shopping at TechStyle!"
        ],
        end: true
    }
};

// Input handlers
const inputHandlers = {
    // Order tracking handler
    handleOrderTracking: function(input) {
        if (orders[input]) {
            const order = orders[input];
            return {
                messages: [
                    `Thank you! I found your order ${input}.`,
                    `Status: **${order.status}**\nShipping date: ${order.shippingDate}\nExpected delivery date: ${order.deliveryDate}\nCourier: ${order.courier}\nTracking number: ${order.trackingNumber}`,
                    `You can follow the detailed path of your package by clicking on this link: [Track shipment](https://tracking.example.com)`
                ],
                options: [
                    { text: "I have a problem with this order", value: "order_problem" },
                    { text: "Thanks for the information", value: "feedback" }
                ]
            };
        } else {
            return {
                messages: [
                    "I'm sorry, I can't find an order with this number. Could you verify that the number is correct?",
                    "If you're having trouble finding your order number, I can connect you with an agent who can help you."
                ],
                options: [
                    { text: "Enter another number", value: "track_order" },
                    { text: "Speak with an agent", value: "human_operator" },
                    { text: "Return to main menu", value: "welcome" }
                ]
            };
        }
    },
    
    // Return form handler
    handleReturnForm: function(input) {
        // We simulate that any input is valid for the demo
        return {
            messages: [
                `Thank you for providing the order number ${input}.`,
                "Now, could you indicate which product you wish to return?"
            ],
            input: true,
            inputHandler: "handleReturnProduct"
        };
    },
    
    // Return product handler
    handleReturnProduct: function(input) {
        return {
            messages: [
                `You've indicated that you wish to return: ${input}.`,
                "Could you briefly describe the damage or issue encountered?"
            ],
            input: true,
            inputHandler: "handleReturnDescription"
        };
    },
    
    // Problem description handler
    handleReturnDescription: function(input) {
        return {
            messages: [
                "Thank you for the information provided. I've registered your return request.",
                "You will soon receive an email with a prepaid return label and detailed shipping instructions.",
                "Once we receive the product at our returns center, we will process your refund within 5-7 business days."
            ],
            options: [
                { text: "I have more questions about returns", value: "returns_info" },
                { text: "Thanks for your assistance", value: "feedback" }
            ]
        };
    },
    
    // Human transfer handler
    handleHumanTransfer: function(input) {
        return {
            messages: [
                `Thank you for the information: "${input}".`,
                "I'm transferring your chat to a specialized agent. The estimated wait time is about 2 minutes.",
                "In the meantime, you could prepare your order number and problem details to speed up assistance when the agent connects.",
                "[Transfer in progress...]"
            ],
            options: [
                { text: "Cancel and return to menu", value: "welcome" },
                { text: "Continue waiting", value: "human_waiting" }
            ]
        };
    }
};

// DOM elements
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotContainer = document.getElementById('chatbot-container');
const minimizeChatbot = document.getElementById('minimize-chatbot');
const closeChatbot = document.getElementById('close-chatbot');
const chatbotMessages = document.getElementById('chatbot-messages');
const userInput = document.getElementById('user-input');
const sendMessage = document.getElementById('send-message');

// Chatbot state
let chatbotState = {
    currentFlow: 'welcome',
    waitingForInput: false,
    currentInputHandler: null,
    conversationHistory: []
};

// Initialization
document.addEventListener('DOMContentLoaded', function() {
    // Event listeners
    chatbotToggle.addEventListener('click', toggleChatbot);
    minimizeChatbot.addEventListener('click', toggleChatbot);
    closeChatbot.addEventListener('click', toggleChatbot);
    sendMessage.addEventListener('click', handleSendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });
    
    // Initialize chatbot with welcome message after a short delay
    setTimeout(function() {
        displayBotMessage(conversationFlows.welcome.messages[0]);
        displayOptions(conversationFlows.welcome.options);
    }, chatbotConfig.initialDelay);
});

// Toggle chatbot visibility
function toggleChatbot() {
    if (chatbotContainer.style.display === 'flex') {
        chatbotContainer.style.display = 'none';
    } else {
        chatbotContainer.style.display = 'flex';
    }
}

// Handle send message button click
function handleSendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;
    
    // Display user message
    displayUserMessage(message);
    userInput.value = '';
    
    // Process user input
    if (chatbotState.waitingForInput && chatbotState.currentInputHandler) {
        const handler = inputHandlers[chatbotState.currentInputHandler];
        if (handler) {
            const response = handler(message);
            processResponse(response);
        }
    }
}

// Display bot message
function displayBotMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message bot-message';
    // Simulate typing
    simulateTyping(messageElement, message);
    
    chatbotMessages.appendChild(messageElement);
    scrollToBottom();
}

// Simulate typing effect
function simulateTyping(element, message) {
    let i = 0;
    element.innerHTML = '<span class="typing-indicator">...</span>';
    
    setTimeout(() => {
        element.innerHTML = '';
        const interval = setInterval(() => {
            if (i < message.length) {
                element.innerHTML += message.charAt(i);
                i++;
            } else {
                clearInterval(interval);
                // Add timestamp
                const timestamp = document.createElement('div');
                timestamp.className = 'message-time';
                timestamp.textContent = getCurrentTime();
                element.appendChild(timestamp);
            }
            scrollToBottom();
        }, chatbotConfig.typingDelay);
    }, chatbotConfig.thinkingTime);
}

// Display user message
function displayUserMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message user-message';
    messageElement.textContent = message;
    
    // Add timestamp
    const timestamp = document.createElement('div');
    timestamp.className = 'message-time';
    timestamp.textContent = getCurrentTime();
    messageElement.appendChild(timestamp);
    
    chatbotMessages.appendChild(messageElement);
    scrollToBottom();
    
    // Add to conversation history
    chatbotState.conversationHistory.push({
        role: 'user',
        message: message
    });
}

// Display options buttons
function displayOptions(options) {
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'chatbot-options';
    
    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'chatbot-option';
        button.textContent = option.text;
        button.addEventListener('click', () => {
            // Display user selection
            displayUserMessage(option.text);
            
            // Process the selected option
            processOption(option.value);
        });
        optionsContainer.appendChild(button);
    });
    
    chatbotMessages.appendChild(optionsContainer);
    scrollToBottom();
}

// Process selected option
function processOption(optionValue) {
    const flow = conversationFlows[optionValue];
    if (flow) {
        chatbotState.currentFlow = optionValue;
        
        // Display bot messages
        setTimeout(() => {
            flow.messages.forEach(message => {
                displayBotMessage(message);
            });
            
            // If there are product suggestions
            if (flow.products) {
                displayProductSuggestions(flow.products);
            }
            
            // If there's a follow-up message with options
            if (flow.followUp) {
                setTimeout(() => {
                    displayBotMessage(flow.followUp.message);
                    displayOptions(flow.followUp.options);
                }, flow.messages.length * chatbotConfig.thinkingTime * 1.5);
            }
            // If there are options
            else if (flow.options) {
                displayOptions(flow.options);
            }
            // If waiting for input
            else if (flow.input) {
                chatbotState.waitingForInput = true;
                chatbotState.currentInputHandler = flow.inputHandler;
            }
        }, chatbotConfig.thinkingTime);
    }
}

// Process response from input handler
function processResponse(response) {
    if (response) {
        // Reset input state
        chatbotState.waitingForInput = false;
        
        // Display bot messages
        setTimeout(() => {
            response.messages.forEach(message => {
                displayBotMessage(message);
            });
            
            // If there are options
            if (response.options) {
                displayOptions(response.options);
            }
            // If waiting for more input
            else if (response.input) {
                chatbotState.waitingForInput = true;
                chatbotState.currentInputHandler = response.inputHandler;
            }
        }, chatbotConfig.thinkingTime);
    }
}

// Display product suggestions
function displayProductSuggestions(productCategory) {
    const productsToShow = products[productCategory];
    if (productsToShow) {
        productsToShow.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product-suggestion';
            
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-suggestion-info">
                    <h4>${product.name}</h4>
                    <p>${product.description}</p>
                    <p class="product-suggestion-price">$${product.price}</p>
                    <button class="product-suggestion-button">View details</button>
                </div>
            `;
            
            // Add event listener to the button
            const button = productElement.querySelector('.product-suggestion-button');
            button.addEventListener('click', () => {
                // Display user selection
                displayUserMessage(`I'm interested in the ${product.name}`);
                
                // Process the product details option
                const productDetailFlow = `product_details_${product.id}`;
                if (conversationFlows[productDetailFlow]) {
                    processOption(productDetailFlow);
                } else {
                    // Fallback if specific product details not defined
                    displayBotMessage(`The ${product.name} is one of our most popular products. Would you like to add it to your cart?`);
                    displayOptions([
                        { text: "Add to cart", value: `add_to_cart_${product.id}` },
                        { text: "No, thanks", value: "welcome" }
                    ]);
                }
            });
            
            chatbotMessages.appendChild(productElement);
        });
        scrollToBottom();
    }
}

// Get current time for message timestamps
function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    return hours + ':' + minutes + ' ' + ampm;
}

// Scroll chat to bottom
function scrollToBottom() {
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}
