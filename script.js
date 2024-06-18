document.addEventListener('DOMContentLoaded', function() {
    fetch('quotes.json')
        .then(response => response.json())
        .then(data => {
            const quotes = data.quotes;
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const randomQuote = quotes[randomIndex];
            document.getElementById('quote').textContent = randomQuote;
        })
        .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));
});
