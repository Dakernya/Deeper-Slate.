// Check if MetaMask or compatible wallet is installed
window.addEventListener('DOMContentLoaded', () => {
    if (typeof window.ethereum !== 'undefined') {
        console.log('Ethereum-compatible wallet is installed!');
    } else {
        alert('Please install MetaMask or SUI Wallet to use this feature.');
    }

    // Fetch live prices for the Markets section on load
    fetchLivePrices();
});

// Tab switching function
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';

    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`.tab[onclick="showSection('${sectionId}')"]`).classList.add('active');
}

// Connect Wallet
document.getElementById('connectButton').addEventListener('click', async () => {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            const walletAddress = accounts[0];
            const walletAbbreviation = walletAddress.slice(0, 6) + '...' + walletAddress.slice(-4);
            document.getElementById('walletAbbreviation').innerText = walletAbbreviation;
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
