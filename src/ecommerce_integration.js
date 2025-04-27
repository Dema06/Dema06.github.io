// E-commerce integration with product database
class ProductDatabase {
    constructor() {
        // Mock product data
        this.products = {
            laptops: [
                { id: 1, name: "TechPro X5", description: "i9 processor, 32GB RAM, 1TB SSD", price: 1499, image: "https://via.placeholder.com/300x300?text=Laptop+TechPro+X5", stock: 15 },
                { id: 2, name: "UltraBook Pro", description: "Ryzen 9 processor, 16GB RAM, 512GB SSD", price: 1299, image: "https://via.placeholder.com/300x300?text=UltraBook+Pro", stock: 8 },
                { id: 3, name: "PowerStation 7", description: "i7 processor, 16GB RAM, 1TB SSD", price: 1199, image: "https://via.placeholder.com/300x300?text=PowerStation+7", stock: 12 }
            ],
            smartphones: [
                { id: 4, name: "UltraPhone", description: "AMOLED display, 256GB, 108MP camera", price: 899, image: "https://via.placeholder.com/300x300?text=Smartphone+UltraPhone", stock: 20 },
                { id: 5, name: "TechPhone Pro", description: "A15 processor, 128GB, Dual Camera", price: 799, image: "https://via.placeholder.com/300x300?text=TechPhone+Pro", stock: 25 },
                { id: 6, name: "SmartX 5G", description: "5G, 64GB, 5000mAh battery", price: 599, image: "https://via.placeholder.com/300x300?text=SmartX+5G", stock: 18 }
            ],
            accessories: [
                { id: 7, name: "SoundMax Headphones", description: "Noise cancellation, Bluetooth 5.2, 30h battery life", price: 249, image: "https://via.placeholder.com/300x300?text=SoundMax+Headphones", stock: 30 },
                { id: 8, name: "FitLife Smartwatch", description: "Fitness tracking, 7-day battery, Waterproof", price: 199, image: "https://via.placeholder.com/300x300?text=FitLife+Smartwatch", stock: 22 },
                { id: 9, name: "Ultra PowerBank", description: "20000mAh, Fast charging, 2 USB ports", price: 49, image: "https://via.placeholder.com/300x300?text=Ultra+PowerBank", stock: 40 }
            ]
        };
    }

    // Get all products in a category
    getProductsByCategory(category) {
        return this.products[category] || [];
    }

    // Get a specific product by ID
    getProductById(id) {
        for (const category in this.products) {
            const product = this.products[category].find(p => p.id === id);
            if (product) return product;
        }
        return null;
    }

    // Check product availability
    checkAvailability(id) {
        const product = this.getProductById(id);
        if (!product) return { available: false, message: "Product not found" };
        
        if (product.stock > 10) {
            return { available: true, message: "Available", stock: product.stock };
        } else if (product.stock > 0) {
            return { available: true, message: "Limited availability", stock: product.stock };
        } else {
            return { available: false, message: "Out of stock", stock: 0 };
        }
    }

    // Search products by keyword
    searchProducts(keyword) {
        keyword = keyword.toLowerCase();
        let results = [];
        
        for (const category in this.products) {
            const matches = this.products[category].filter(p => 
                p.name.toLowerCase().includes(keyword) || 
                p.description.toLowerCase().includes(keyword)
            );
            results = results.concat(matches);
        }
        
        return results;
    }

    // Get related products
    getRelatedProducts(productId) {
        const product = this.getProductById(productId);
        if (!product) return [];
        
        // Find the product category
        let productCategory = null;
        for (const category in this.products) {
            if (this.products[category].some(p => p.id === productId)) {
                productCategory = category;
                break;
            }
        }
        
        if (!productCategory) return [];
        
        // Return other products in the same category, excluding the current product
        return this.products[productCategory]
            .filter(p => p.id !== productId)
            .slice(0, 3); // Limit to 3 related products
    }
}

// Integration with order management system
class OrderManagementSystem {
    constructor() {
        // Mock order data
        this.orders = {
            "ORD-12345678": {
                customerId: "CUST-001",
                status: "In transit",
                shippingDate: "April 22, 2025",
                deliveryDate: "April 26, 2025",
                courier: "Express Delivery",
                trackingNumber: "EXP987654321",
                items: [
                    { id: 1, name: "TechPro X5", quantity: 1, price: 1499 },
                    { id: 7, name: "SoundMax Headphones", quantity: 1, price: 249 }
                ],
                totalAmount: 1748,
                paymentMethod: "Credit card",
                shippingAddress: "123 Main St, New York, NY 10001, USA"
            },
            "ORD-87654321": {
                customerId: "CUST-002",
                status: "Delivered",
                shippingDate: "April 15, 2025",
                deliveryDate: "April 18, 2025",
                courier: "Fast Shipping",
                trackingNumber: "FST123456789",
                items: [
                    { id: 4, name: "UltraPhone", quantity: 1, price: 899 }
                ],
                totalAmount: 899,
                paymentMethod: "PayPal",
                shippingAddress: "456 Oak Ave, Los Angeles, CA 90001, USA"
            },
            "ORD-23456789": {
                customerId: "CUST-003",
                status: "Processing",
                shippingDate: "Expected April 25, 2025",
                deliveryDate: "Expected April 28, 2025",
                courier: "Not assigned",
                trackingNumber: "Not available",
                items: [
                    { id: 8, name: "FitLife Smartwatch", quantity: 1, price: 199 },
                    { id: 9, name: "Ultra PowerBank", quantity: 2, price: 49 }
                ],
                totalAmount: 297,
                paymentMethod: "Bank transfer",
                shippingAddress: "789 Pine St, Chicago, IL 60007, USA"
            }
        };
    }

    // Get an order by number
    getOrder(orderNumber) {
        return this.orders[orderNumber] || null;
    }

    // Get all orders for a customer
    getCustomerOrders(customerId) {
        const customerOrders = {};
        for (const orderNumber in this.orders) {
            if (this.orders[orderNumber].customerId === customerId) {
                customerOrders[orderNumber] = this.orders[orderNumber];
            }
        }
        return customerOrders;
    }

    // Update order status
    updateOrderStatus(orderNumber, newStatus) {
        if (this.orders[orderNumber]) {
            this.orders[orderNumber].status = newStatus;
            return true;
        }
        return false;
    }

    // Register a new return
    createReturn(orderNumber, items, reason) {
        if (!this.orders[orderNumber]) return null;
        
        const returnId = `RET-${Math.floor(Math.random() * 10000000)}`;
        
        // Return creation simulation
        const returnData = {
            id: returnId,
            orderNumber: orderNumber,
            items: items,
            reason: reason,
            status: "Awaiting receipt",
            createdDate: new Date().toLocaleDateString('en-US'),
            refundAmount: items.reduce((total, item) => {
                const orderItem = this.orders[orderNumber].items.find(i => i.id === item.id);
                return total + (orderItem ? orderItem.price * item.quantity : 0);
            }, 0)
        };
        
        return returnData;
    }

    // Generate return label
    generateReturnLabel(returnId) {
        // Label generation simulation
        return {
            returnId: returnId,
            labelUrl: "https://example.com/return-labels/" + returnId,
            instructions: "Print the label and attach it to the package. Deliver the package to the courier or take it to the nearest collection point within 14 days."
        };
    }
}

// Integration with payment system
class PaymentSystem {
    constructor() {
        // Mock payment methods
        this.paymentMethods = [
            { id: "cc", name: "Credit card", enabled: true },
            { id: "paypal", name: "PayPal", enabled: true },
            { id: "bank", name: "Bank transfer", enabled: true },
            { id: "cod", name: "Cash on delivery", enabled: false }
        ];
        
        // Mock transactions
        this.transactions = {
            "TRX-12345": {
                orderId: "ORD-12345678",
                amount: 1748,
                status: "Completed",
                method: "cc",
                date: "April 21, 2025"
            },
            "TRX-67890": {
                orderId: "ORD-87654321",
                amount: 899,
                status: "Completed",
                method: "paypal",
                date: "April 14, 2025"
            },
            "TRX-54321": {
                orderId: "ORD-23456789",
                amount: 297,
                status: "Pending",
                method: "bank",
                date: "April 23, 2025"
            }
        };
        
        // Mock discount codes
        this.discountCodes = {
            "WELCOME10": { discount: 10, type: "percentage", minOrder: 0, valid: true },
            "SUMMER25": { discount: 25, type: "percentage", minOrder: 100, valid: true },
            "DISCOUNT50": { discount: 50, type: "fixed", minOrder: 200, valid: true },
            "PROMO15": { discount: 15, type: "percentage", minOrder: 0, valid: false }
        };
    }

    // Get available payment methods
    getAvailablePaymentMethods() {
        return this.paymentMethods.filter(m => m.enabled);
    }

    // Verify transaction
    getTransaction(transactionId) {
        return this.transactions[transactionId] || null;
    }

    // Verify transaction by order
    getTransactionByOrder(orderId) {
        for (const txId in this.transactions) {
            if (this.transactions[txId].orderId === orderId) {
                return this.transactions[txId];
            }
        }
        return null;
    }

    // Verify discount code validity
    validateDiscountCode(code, orderAmount) {
        const discountCode = this.discountCodes[code];
        
        if (!discountCode) {
            return { valid: false, message: "Discount code not found" };
        }
        
        if (!discountCode.valid) {
            return { valid: false, message: "Discount code expired or no longer valid" };
        }
        
        if (orderAmount < discountCode.minOrder) {
            return { 
                valid: false, 
                message: `This code is valid only for orders over $${discountCode.minOrder}` 
            };
        }
        
        // Calculate discount
        let discountAmount;
        if (discountCode.type === "percentage") {
            discountAmount = (orderAmount * discountCode.discount) / 100;
        } else {
            discountAmount = discountCode.discount;
        }
        
        return {
            valid: true,
            discount: discountCode.discount,
            type: discountCode.type,
            discountAmount: discountAmount,
            finalAmount: orderAmount - discountAmount
        };
    }

    // Simulate a payment issue for testing
    simulatePaymentIssue(paymentMethod) {
        const issues = {
            "cc": [
                "The card was declined by the issuing bank",
                "The CVV entered is incorrect",
                "The card has expired",
                null // No problem
            ],
            "paypal": [
                "The PayPal account has insufficient funds",
                "There was a connection problem with PayPal",
                null // No problem
            ],
            "bank": [
                "The bank transfer has not been received yet",
                null // No problem
            ]
        };
        
        const methodIssues = issues[paymentMethod] || [null];
        return methodIssues[Math.floor(Math.random() * methodIssues.length)];
    }
}

// Integration with CRM
class CustomerRelationshipManagement {
    constructor() {
    // Mock customer data
        this.customers = {
            "CUST-001": {
                name: "John Smith",
                email: "john.smith@example.com",
                phone: "+1 123 456 7890",
                registrationDate: "January 10, 2024",
                lastLogin: "April 22, 2025",
                orderCount: 5,
                totalSpent: 3245,
                preferences: {
                    categories: ["laptops", "accessories"],
                    contactPreference: "email",
                    newsletter: true
                }
            },
            "CUST-002": {
                name: "Emily Johnson",
                email: "emily.johnson@example.com",
                phone: "+1 234 567 8901",
                registrationDate: "March 5, 2024",
                lastLogin: "April 18, 2025",
                orderCount: 2,
                totalSpent: 1100,
                preferences: {
                    categories: ["smartphones"],
                    contactPreference: "phone",
                    newsletter: false
                }
            },
            "CUST-003": {
                name: "Michael Brown",
                email: "michael.brown@example.com",
                phone: "+1 345 678 9012",
                registrationDate: "February 20, 2025",
                lastLogin: "April 23, 2025",
                orderCount: 1,
                totalSpent: 297,
                preferences: {
                    categories: ["accessories"],
                    contactPreference: "email",
                    newsletter: true
                }
            }
        };
        
        // Mock chatbot interactions
        this.interactions = [];
    }

    // Get customer profile
    getCustomer(customerId) {
        return this.customers[customerId] || null;
    }

    // Record a new interaction
    recordInteraction(customerId, type, content) {
        const interaction = {
            id: `INT-${this.interactions.length + 1}`,
            customerId: customerId,
            type: type,
            content: content,
            timestamp: new Date().toISOString()
        };
        
        this.interactions.push(interaction);
        return interaction;
    }

    // Get customer interactions
    getCustomerInteractions(customerId) {
        return this.interactions.filter(i => i.customerId === customerId);
    }

    // Register a new lead
    createLead(email, source, interests) {
        // Check if email already exists
        for (const custId in this.customers) {
            if (this.customers[custId].email === email) {
                return { success: false, message: "Email already registered" };
            }
        }
        
        const leadId = `LEAD-${Math.floor(Math.random() * 10000)}`;
        
        // Lead creation simulation
        const lead = {
            id: leadId,
            email: email,
            source: source,
            interests: interests,
            createdDate: new Date().toISOString(),
            status: "New"
        };
        
        return { success: true, lead: lead };
    }

    // Analyze message sentiment
    analyzeSentiment(message) {
        // Simple sentiment analysis simulation
        const positiveWords = ["thanks", "great", "fantastic", "excellent", "perfect", "satisfied"];
        const negativeWords = ["problem", "unsatisfied", "disappointed", "angry", "terrible", "awful", "complaint"];
        
        message = message.toLowerCase();
        
        let positiveCount = 0;
        let negativeCount = 0;
        
        positiveWords.forEach(word => {
            if (message.includes(word)) positiveCount++;
        });
        
        negativeWords.forEach(word => {
            if (message.includes(word)) negativeCount++;
        });
        
        if (positiveCount > negativeCount) {
            return { sentiment: "positive", score: 0.5 + (positiveCount * 0.1) };
        } else if (negativeCount > positiveCount) {
            return { sentiment: "negative", score: 0.5 - (negativeCount * 0.1) };
        } else {
            return { sentiment: "neutral", score: 0.5 };
        }
    }
}

// Export classes for use in the chatbot
const ecommerceIntegration = {
    productDB: new ProductDatabase(),
    orderSystem: new OrderManagementSystem(),
    paymentSystem: new PaymentSystem(),
    crm: new CustomerRelationshipManagement()
};

// Usage example:
// 
// // Check product availability
// const availability = ecommerceIntegration.productDB.checkAvailability(1);
// console.log(availability);
// 
// // Get an order
// const order = ecommerceIntegration.orderSystem.getOrder("ORD-12345678");
// console.log(order);
// 
// // Verify discount code
// const discountCheck = ecommerceIntegration.paymentSystem.validateDiscountCode("WELCOME10", 200);
// console.log(discountCheck);
// 
// // Analyze sentiment
// const sentiment = ecommerceIntegration.crm.analyzeSentiment("I'm very satisfied with the product, thanks!");
// console.log(sentiment);
