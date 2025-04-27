// E-commerce module integration with the chatbot
document.addEventListener('DOMContentLoaded', function() {
    // Load the e-commerce integration module
    const script = document.createElement('script');
    script.src = 'ecommerce_integration.js';
    script.onload = function() {
        // Initialize the integration with the chatbot
        initEcommerceIntegration();
    };
    document.head.appendChild(script);
});

// Function to initialize e-commerce integration
function initEcommerceIntegration() {
    // Verify that the module has been loaded correctly
    if (typeof ecommerceIntegration === 'undefined') {
        console.error('E-commerce integration module not found');
        return;
    }
    
    // Extend chatbot input handlers with e-commerce functionality
    Object.assign(inputHandlers, {
        // Advanced handler for order tracking
        handleOrderTracking: function(input) {
            const order = ecommerceIntegration.orderSystem.getOrder(input);
            
            if (order) {
                // Also get transaction details
                const transaction = ecommerceIntegration.paymentSystem.getTransactionByOrder(input);
                
                return {
                    messages: [
                        `Thank you! I found your order ${input}.`,
                        `Status: **${order.status}**\nShipping date: ${order.shippingDate}\nExpected delivery date: ${order.deliveryDate}\nCourier: ${order.courier}\nTracking number: ${order.trackingNumber}`,
                        `Your order contains ${order.items.length} product(s) for a total of $${order.totalAmount}.`,
                        transaction ? `Payment: ${transaction.status} (${transaction.method === 'cc' ? 'Credit card' : transaction.method === 'paypal' ? 'PayPal' : 'Bank transfer'})` : 'Payment information not available',
                        `You can follow the detailed path of your package by clicking on this link: [Track shipment](https://tracking.example.com)`
                    ],
                    options: [
                        { text: "I have a problem with this order", value: "order_problem" },
                        { text: "I would like to return a product", value: "returns_info" },
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
        
        // Advanced handler for product availability verification
        handleProductAvailability: function(productId) {
            const product = ecommerceIntegration.productDB.getProductById(parseInt(productId));
            if (!product) {
                return {
                    messages: ["I'm sorry, I can't find information about this product."],
                    options: [
                        { text: "Search for another product", value: "search_products" },
                        { text: "Return to main menu", value: "welcome" }
                    ]
                };
            }
            
            const availability = ecommerceIntegration.productDB.checkAvailability(parseInt(productId));
            
            // Get related products
            const relatedProducts = ecommerceIntegration.productDB.getRelatedProducts(parseInt(productId));
            
            let messages = [
                `Here is the availability information for **${product.name}**:`,
                `Status: **${availability.message}**${availability.stock ? ` (${availability.stock} units available)` : ''}`,
                `Price: $${product.price}`
            ];
            
            if (relatedProducts.length > 0) {
                messages.push("You might also be interested in these similar products:");
            }
            
            return {
                messages: messages,
                products: relatedProducts.length > 0 ? relatedProducts : null,
                options: [
                    { text: "Add to cart", value: `add_to_cart_${productId}` },
                    { text: "Return to search", value: "search_products" },
                    { text: "Return to main menu", value: "welcome" }
                ]
            };
        },
        
        // Advanced handler for discount code verification
        handleDiscountCode: function(code) {
            const discountCheck = ecommerceIntegration.paymentSystem.validateDiscountCode(code, 200); // Simulate a $200 order
            
            if (discountCheck.valid) {
                let discountDescription;
                if (discountCheck.type === "percentage") {
                    discountDescription = `${discountCheck.discount}% discount`;
                } else {
                    discountDescription = `$${discountCheck.discount} fixed discount`;
                }
                
                return {
                    messages: [
                        `Great! The code **${code}** is valid.`,
                        `This code gives you ${discountDescription}.`,
                        `On a $200 order, you would save $${discountCheck.discountAmount.toFixed(2)}, for a total of $${discountCheck.finalAmount.toFixed(2)}.`,
                        "The code will be automatically applied at checkout."
                    ],
                    options: [
                        { text: "Continue shopping", value: "search_products" },
                        { text: "Proceed to checkout", value: "checkout" },
                        { text: "Return to main menu", value: "welcome" }
                    ]
                };
            } else {
                return {
                    messages: [
                        `I'm sorry, the code **${code}** is not valid.`,
                        `Reason: ${discountCheck.message}`,
                        "You can try another code or continue without a discount."
                    ],
                    options: [
                        { text: "Try another code", value: "payment_discount" },
                        { text: "Continue without discount", value: "checkout" },
                        { text: "Return to main menu", value: "welcome" }
                    ]
                };
            }
        },
        
        // Advanced handler for returns creation
        handleReturnForm: function(input) {
            // Check if the order exists
            const order = ecommerceIntegration.orderSystem.getOrder(input);
            
            if (order) {
                // Store the order number for subsequent steps
                sessionStorage.setItem('returnOrderNumber', input);
                
                // Show the order products that can be returned
                let productOptions = order.items.map((item, index) => {
                    return { text: `${item.name} ($${item.price})`, value: `return_item_${item.id}` };
                });
                
                return {
                    messages: [
                        `Thank you for providing the order number ${input}.`,
                        "Here are the products you can return from this order. Which one would you like to return?"
                    ],
                    options: [
                        ...productOptions,
                        { text: "Cancel", value: "welcome" }
                    ]
                };
            } else {
                return {
                    messages: [
                        "I'm sorry, I can't find an order with this number. Could you verify that the number is correct?"
                    ],
                    options: [
                        { text: "Enter another number", value: "returns_info" },
                        { text: "Speak with an agent", value: "human_operator" },
                        { text: "Return to main menu", value: "welcome" }
                    ]
                };
            }
        },
        
        // Handler for sentiment analysis
        handleCustomerFeedback: function(input) {
            // Analyze the sentiment of the feedback
            const sentimentAnalysis = ecommerceIntegration.crm.analyzeSentiment(input);
            
            // Record the interaction (in a real application we would use the customer ID)
            ecommerceIntegration.crm.recordInteraction("GUEST", "feedback", input);
            
            if (sentimentAnalysis.sentiment === "positive") {
                return {
                    messages: [
                        "Thank you so much for your positive feedback! We're happy that you're satisfied with our assistance.",
                        "Is there anything else we can help you with today?"
                    ],
                    options: conversationFlows.welcome.options
                };
            } else if (sentimentAnalysis.sentiment === "negative") {
                return {
                    messages: [
                        "I'm sorry that your experience wasn't optimal. We appreciate your feedback and will use it to improve our service.",
                        "I would like to connect you with one of our customer service managers to best resolve the situation. Would that be okay?"
                    ],
                    options: [
                        { text: "Yes, I want to speak with a manager", value: "human_operator" },
                        { text: "No, thanks", value: "welcome" }
                    ]
                };
            } else {
                return {
                    messages: [
                        "Thank you for your feedback. Your opinion is important to us.",
                        "Is there anything else we can help you with today?"
                    ],
                    options: conversationFlows.welcome.options
                };
            }
        },
        
        // Handler for lead collection
        handleLeadCapture: function(email) {
            // Verify email format (simplified)
            if (!email.includes('@') || !email.includes('.')) {
                return {
                    messages: [
                        "The email address you entered doesn't seem valid. Could you verify it and try again?"
                    ],
                    input: true,
                    inputHandler: "handleLeadCapture"
                };
            }
            
            // Register the lead
            const leadResult = ecommerceIntegration.crm.createLead(email, "chatbot", ["new collection"]);
            
            if (leadResult.success) {
                return {
                    messages: [
                        `Thank you for providing your email: ${email}`,
                        "We have successfully registered you! You will receive a notification when the new collection is available.",
                        "As a token of appreciation, here's a 10% discount code for your next purchase: **WELCOME10**"
                    ],
                    options: [
                        { text: "Thank you!", value: "feedback" },
                        { text: "Return to main menu", value: "welcome" }
                    ]
                };
            } else {
                return {
                    messages: [
                        `I'm sorry, there was a problem with the registration: ${leadResult.message}`,
                        "You can try with another email or continue browsing."
                    ],
                    options: [
                        { text: "Try with another email", value: "lead_capture" },
                        { text: "Return to main menu", value: "welcome" }
                    ]
                };
            }
        }
    });
    
    // Add new conversation flows specific to e-commerce
    Object.assign(conversationFlows, {
        // Flow for availability verification
        check_availability: {
            messages: [
                "I can check the availability of any product for you. Enter the ID of the product you're interested in:"
            ],
            input: true,
            inputHandler: "handleProductAvailability"
        },
        
        // Flow for applying discount codes
        payment_discount: {
            messages: [
                "I can help you apply a discount code to your order. Enter the code you would like to use:"
            ],
            input: true,
            inputHandler: "handleDiscountCode"
        },
        
        // Flow for lead collection
        lead_capture: {
            messages: [
                "I'll be happy to notify you when the new collection is available! To do so, I need your email address:"
            ],
            input: true,
            inputHandler: "handleLeadCapture"
        },
        
        // Flow for customer feedback
        customer_feedback: {
            messages: [
                "We greatly appreciate your feedback. Can you tell us what you think of our service or products?"
            ],
            input: true,
            inputHandler: "handleCustomerFeedback"
        },
        
        // Flow for selecting a product to return
        return_item_1: {
            messages: [
                "You have selected to return the TechPro X5.",
                "Could you indicate the reason for the return?"
            ],
            options: [
                { text: "Damaged product", value: "return_reason_damaged" },
                { text: "Doesn't match description", value: "return_reason_mismatch" },
                { text: "Received wrong item", value: "return_reason_wrong" },
                { text: "Don't like it/doesn't fit", value: "return_reason_dislike" },
                { text: "Other", value: "return_reason_other" }
            ]
        },
        
        // Flow for handling return reason
        return_reason_damaged: {
            messages: [
                "I'm sorry that the product is damaged. Could you briefly describe the damage?"
            ],
            input: true,
            inputHandler: "handleReturnDescription"
        }
    });
    
    console.log('E-commerce integration successfully initialized');
}
