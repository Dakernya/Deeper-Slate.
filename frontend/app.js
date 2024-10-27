let priceChart;

async function showTab(tab) {
    const content = document.getElementById('content');
    
    if (tab === 'markets') {
        content.innerHTML = `
            <h2>Live Market Prices</h2>
            <p>Bitcoin (BTC): <span id="btcPrice">$--.--</span></p>
            <p>Ethereum (ETH): <span id="ethPrice">$--.--</span></p>
            <p>SUI: <span id="suiPrice">$--.--</span></p>
            <canvas id="priceChart" width="400" height="300"></canvas>`;
        
        fetchAndRenderPrices();
        setInterval(fetchAndRenderPrices, 20000); // Refresh every 20 seconds
    } else {
        content.innerHTML = `<h2>${tab} coming soon...</h2>`;
    }
}

// Fetch live prices and update the chart
async function fetchAndRenderPrices() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,sui&vs_currencies=usd');
        const data = await response.json();
        
        document.getElementById('btcPrice').innerText = `$${data.bitcoin.usd.toFixed(2)}`;
        document.getElementById('ethPrice').innerText = `$${data.ethereum.usd.toFixed(2)}`;
        document.getElementById('suiPrice').innerText = `$${data.sui.usd.toFixed(2)}`;

        const historicalData = await fetchHistoricalData();
        renderPriceChart(historicalData);
    } catch (error) {
        console.error('Error fetching live prices:', error);
    }
}

// Fetch 24-hour historical data for BTC, ETH, and SUI
async function fetchHistoricalData() {
    const endpoints = [
        'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1',
        'https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=1',
        'https://api.coingecko.com/api/v3/coins/sui/market_chart?vs_currency=usd&days=1'
    ];

    const historicalData = await Promise.all(
        endpoints.map(async (url) => {
            const response = await fetch(url);
            const data = await response.json();
            return data.prices.map(([timestamp, price]) => ({ x: new Date(timestamp), y: price }));
        })
    );

    return {
        bitcoin: historicalData[0],
        ethereum: historicalData[1],
        sui: historicalData[2]
    };
}

// Render the price chart using Chart.js
function renderPriceChart(historicalData) {
    const ctx = document.getElementById('priceChart').getContext('2d');

    if (priceChart) {
        priceChart.destroy();
    }

    priceChart = new Chart(ctx, {
        type: 'line', // Change to candlestick if using the financial plugin
        data: {
            datasets: [
                {
                    label: 'Bitcoin (24h)',
                    data: historicalData.bitcoin,
                    borderColor: '#FF9900',
                    borderWidth: 1,
                    fill: false
                },
                {
                    label: 'Ethereum (24h)',
                    data: historicalData.ethereum,
                    borderColor: '#3C3CFF',
                    borderWidth: 1,
                    fill: false
                },
                {
                    label: 'SUI (24h)',
                    data: historicalData.sui,
                    borderColor: '#00CC66',
                    borderWidth: 1,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'hour'
                    },
                    grid: {
                        color: '#B0E0E6',
                        lineWidth: 1
                    },
                    title: {
                        display: true,
                        text: 'Time'
                    }
                },
                y: {
                    grid: {
                        color: '#B0E0E6',
                        lineWidth: 1
                    },
                    title: {
                        display: true,
                        text: 'Price (USD)'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#333',
                        font: {
                            size: 14
                        }
                    }
                }
            }
        }
    });
}
