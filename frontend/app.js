async function showTab(tab) {
    const content = document.getElementById('content');
    
    if (tab === 'markets') {
        content.innerHTML = `<h2>Live Market Prices</h2>
            <p>Bitcoin (BTC): <span id="btcPrice">$--.--</span></p>
            <p>Ethereum (ETH): <span id="ethPrice">$--.--</span></p>
            <p>SUI: <span id="suiPrice">$--.--</span></p>
            <canvas id="priceChart" width="300" height="200"></canvas>`;
        
        fetchLivePrices();
        fetchHistoricalData();
    } else {
        content.innerHTML = `<h2>${tab} coming soon...</h2>`;
    }
}

// Fetch live prices for Bitcoin, Ethereum, and SUI
async function fetchLivePrices() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,sui&vs_currencies=usd');
        const data = await response.json();
        
        document.getElementById('btcPrice').innerText = `$${data.bitcoin.usd.toFixed(2)}`;
        document.getElementById('ethPrice').innerText = `$${data.ethereum.usd.toFixed(2)}`;
        document.getElementById('suiPrice').innerText = `$${data.sui.usd.toFixed(2)}`;
    } catch (error) {
        console.error('Error fetching live prices:', error);
    }
}

// Fetch historical data for Bitcoin price (7-day)
async function fetchHistoricalData() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7');
        const data = await response.json();
        
        const prices = data.prices.map(price => price[1]);
        const labels = data.prices.map(price => new Date(price[0]).toLocaleDateString());

        createPriceChart(labels, prices);
    } catch (error) {
        console.error('Error fetching historical data:', error);
    }
}

// Display price chart using Chart.js
function createPriceChart(labels, prices) {
    const ctx = document.getElementById('priceChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Bitcoin Price (7 Days)',
                data: prices,
                borderColor: '#4CAF50',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { title: { display: true, text: 'Date' }},
                y: { title: { display: true, text: 'Price (USD)' }}
            }
        }
    });
}
