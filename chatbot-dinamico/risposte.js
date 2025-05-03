module.exports = function(message) {
    const msg = message.toLowerCase();
  
    if (msg.includes('ciao')) return 'Ciao! Come posso aiutarti?';
    if (msg.includes('orari')) return 'Siamo aperti dalle 9 alle 18 dal lunedì al venerdì.';
    if (msg.includes('servizi')) return 'Offriamo chatbot personalizzati e assistenza digitale.';
    if (msg.includes('grazie')) return 'Prego! Sono qui per aiutarti.';
  
    return 'Non ho capito bene... puoi riformulare?';
  };
  