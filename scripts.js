document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling per link interni
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header sticky al scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Gestione form di contatto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulazione invio form
            const submitButton = this.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Invio in corso...';
            submitButton.disabled = true;
            
            setTimeout(function() {
                submitButton.textContent = 'Inviato con successo!';
                
                // Reset form
                contactForm.reset();
                
                // Ripristina testo originale dopo 3 secondi
                setTimeout(function() {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // Animazione per le testimonianze
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    function showNextTestimonial() {
        testimonials.forEach(testimonial => {
            testimonial.style.opacity = '0.3';
            testimonial.style.transform = 'scale(0.9)';
        });
        
        testimonials[currentTestimonial].style.opacity = '1';
        testimonials[currentTestimonial].style.transform = 'scale(1)';
        
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    }
    
    if (testimonials.length > 0) {
        showNextTestimonial();
        setInterval(showNextTestimonial, 5000);
    }

    // Animazione per i numeri nelle card dei benefici
    const benefitCards = document.querySelectorAll('.benefit-card');
    
    function animateBenefitCards() {
        benefitCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animated');
            }, index * 200);
        });
    }
    
    // Osservatore per animare le card quando sono visibili
    if (benefitCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateBenefitCards();
                observer.disconnect();
            }
        });
        
        observer.observe(document.querySelector('.benefits'));
    }

    // Simulazione chatbot demo
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotContainer = document.getElementById('chatbot-container');
    
    if (chatbotToggle && chatbotContainer) {
        chatbotToggle.addEventListener('click', function() {
            chatbotContainer.classList.toggle('open');
            this.classList.toggle('active');
        });
        
        // Chiudi chatbot
        document.getElementById('close-chatbot').addEventListener('click', function() {
            chatbotContainer.classList.remove('open');
            chatbotToggle.classList.remove('active');
        });
        
        // Minimizza chatbot
        document.getElementById('minimize-chatbot').addEventListener('click', function() {
            chatbotContainer.classList.toggle('minimized');
        });
    }

    // Aggiunta classe attiva ai link di navigazione in base alla sezione visibile
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    function highlightNavLink() {
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink();
});

// Simulazione chatbot per la pagina di progetto ModaTech
function initChatbotDemo() {
    const chatMessages = document.getElementById('chatbot-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-message');
    
    if (!chatMessages || !userInput || !sendButton) return;
    
    // Messaggi predefiniti
    const botResponses = {
        'default': "Mi dispiace, non ho capito. Posso aiutarti con informazioni sui prodotti, tracciamento ordini, resi o pagamenti.",
        'saluto': "Ciao! Sono l'assistente virtuale di ModaTech. Come posso aiutarti oggi?",
        'prodotti': "Che tipo di prodotto stai cercando? Abbiamo laptop, smartphone, accessori e molto altro.",
        'laptop': "Abbiamo diversi modelli di laptop. Stai cercando un modello per lavoro, gaming o uso quotidiano?",
        'smartphone': "I nostri smartphone più popolari sono l'UltraPhone con display AMOLED e il PowerPhone con batteria a lunga durata. Quale ti interessa?",
        'ordine': "Per tracciare il tuo ordine, avrei bisogno del numero d'ordine. Puoi fornirmi il codice che inizia con ORD-?",
        'ORD-12345678': "Il tuo ordine ORD-12345678 è stato spedito ieri e dovrebbe arrivare entro 2 giorni lavorativi. Il corriere è GLS con numero di tracciamento TR123456789.",
        'reso': "Mi dispiace per l'inconveniente. Per avviare un reso, avrei bisogno di sapere il motivo. Il prodotto è difettoso, non soddisfa le tue aspettative o hai cambiato idea?",
        'pagamento': "Quali problemi stai riscontrando con il pagamento? Posso aiutarti con carte di credito, PayPal o altri metodi di pagamento.",
        'grazie': "Prego! Sono qui per aiutarti. C'è altro di cui hai bisogno?",
        'operatore': "Ti metterò in contatto con un operatore umano. Per favore, attendi qualche istante mentre ti trasferisco."
    };
    
    // Aggiunta messaggio di benvenuto
    addBotMessage(botResponses.saluto);
    
    // Gestione invio messaggio
    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;
        
        // Aggiungi messaggio utente
        addUserMessage(message);
        userInput.value = '';
        
        // Simula risposta del bot dopo un breve ritardo
        setTimeout(() => {
            let response = getBotResponse(message.toLowerCase());
            addBotMessage(response);
        }, 1000);
    }
    
    // Evento click sul pulsante di invio
    sendButton.addEventListener('click', sendMessage);
    
    // Evento pressione tasto Enter nell'input
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Funzione per ottenere la risposta del bot
    function getBotResponse(message) {
        if (message.includes('ciao') || message.includes('salve') || message.includes('buongiorno')) {
            return botResponses.saluto;
        } else if (message.includes('prodott') || message.includes('cerco') || message.includes('acquistare')) {
            return botResponses.prodotti;
        } else if (message.includes('laptop') || message.includes('computer') || message.includes('portatile')) {
            return botResponses.laptop;
        } else if (message.includes('smartphone') || message.includes('telefono') || message.includes('cellulare')) {
            return botResponses.smartphone;
        } else if (message.includes('ordine') || message.includes('tracciare') || message.includes('spedizione')) {
            return botResponses.ordine;
        } else if (message.includes('ORD-12345678')) {
            return botResponses.ORD12345678;
        } else if (message.includes('reso') || message.includes('restituire') || message.includes('rimborso')) {
            return botResponses.reso;
        } else if (message.includes('pagamento') || message.includes('carta') || message.includes('pagare')) {
            return botResponses.pagamento;
        } else if (message.includes('grazie') || message.includes('ok') || message.includes('capito')) {
            return botResponses.grazie;
        } else if (message.includes('operatore') || message.includes('umano') || message.includes('persona')) {
            return botResponses.operatore;
        } else {
            return botResponses.default;
        }
    }
    
    // Funzione per aggiungere messaggio utente
    function addUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'user-message';
        messageElement.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
                <span class="message-time">${getCurrentTime()}</span>
            </div>
        `;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Funzione per aggiungere messaggio bot
    function addBotMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'bot-message';
        messageElement.innerHTML = `
            <div class="bot-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
                <span class="message-time">${getCurrentTime()}</span>
            </div>
        `;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Funzione per ottenere l'ora corrente
    function getCurrentTime() {
        const now = new Date();
        return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    }
}

// Inizializza il chatbot demo quando la pagina è caricata
document.addEventListener('DOMContentLoaded', initChatbotDemo);
