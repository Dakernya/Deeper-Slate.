// Check if MetaMask or compatible wallet is installed
window.addEventListener('DOMContentLoaded', () => {
    if (typeof window.ethereum !== 'undefined') {
        console.log('Ethereum-compatible wallet is installed!');
    } else {
        alert('Please install MetaMask or SUI Wallet to use this feature.');
    }

    // Fetch live prices and historical data for chart on load
    fetchLivePrices();
    fetchHistoricalData();
});

// Tab switching function
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');

    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`.tab[onclick="showSection('${sectionId}')"]`).classList.add('active');
}

// Connect Wallet and show balance
document.getElementById('connectButton').addEventListener('click', async () => {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            const walletAddress = accounts[0];
            const walletAbbreviation = walletAddress.slice(0, 6) + '...' + walletAddress.slice(-4);
            document.getElementById('walletAbbreviation').innerText = walletAbbreviation;

            const web3 = new Web3(window.ethereum);
            const balance = await web3.eth.getBalance(walletAddress);
            document.getElementById('walletBalance').innerText = `Balance: ${web3.utils.fromWei(balance, 'ether')} ETH`;
        } catch (error) {
            console.error(error);
            alert('Failed to connect wallet');
        }
    } else {
        alert('MetaMask or SUI Wallet is not installed. Please install to use this feature.');
    }
});

// Fetch live prices for Bitcoin, Ethereum, and SUI from CoinGecko
async function fetchLivePrices() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,sui&vs_currencies=usd');
        const data = await response.json();
        
        document.getElementById('btcPrice').innerText = `$${data.bitcoin.usd.toFixed(2)}`;
        document.getElementById('ethPrice').innerText = `$${data.ethereum.usd.toFixed(2)}`;
        document.getElementById('suiPrice').innerText = `$${data.sui.usd.toFixed(2)}`;
    } catch (error) {
        console.error('Failed to fetch live prices:', error);
    }
}

// Fetch historical data for the price chart
async function fetchHistoricalData() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7');
        const data = await response.json();
        const prices = data.prices.map(price => price[1]);
        const labels = data.prices.map(price => new Date(price[0]).toLocaleDateString());

        createPriceChart(labels, prices);
    } catch (error) {
        console.error('Failed to fetch historical data:', error);
    }
}

// Create price chart using Chart.js
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
            scales
