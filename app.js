// Check if MetaMask or compatible wallet is installed
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
