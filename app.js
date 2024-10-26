// Check if MetaMask or SUI Wallet is installed
window.addEventListener('DOMContentLoaded', () => {
    if (typeof window.ethereum !== 'undefined') {
        console.log('Ethereum-compatible wallet is installed!');
    } else {
        alert('Please install MetaMask or SUI Wallet to use this feature.');
    }
});

// Connect Wallet
document.getElementById('connectButton').addEventListener('click', async () => {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            const walletAddress = accounts[0];
            document.getElementById('walletAddress').innerText = `Connected: ${walletAddress}`;
        } catch (error) {
            console.error(error);
            alert('Failed to connect wallet');
        }
    } else {
        alert('MetaMask or SUI Wallet is not installed. Please install to use this feature.');
    }
});

// Fetch Live SUI Coin Price (Using CoinGecko API as an example)
async function fetchSuiPrice() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=sui&vs_currencies=usd');
        const data = await response.json();
        const price = data.sui.usd;
        document.getElementById('suiPrice').innerText = `$${price.toFixed(2)}`;
    } catch (error) {
        console.error('Failed to fetch SUI price:', error);
    }
}

// Fetch price on load and refresh every minute
fetchSuiPrice();
setInterval(fetchSuiPrice, 60000); // Refresh every 60 seconds
