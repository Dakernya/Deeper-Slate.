// Check if MetaMask is installed
window.addEventListener('DOMContentLoaded', () => {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
    } else {
        alert('Please install MetaMask to use this feature.');
    }
});

// Connect to wallet and fetch balance
document.getElementById('connectButton').addEventListener('click', async () => {
    if (window.ethereum) {
        try {
            // Request wallet connection
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            const walletAddress = accounts[0];
            document.getElementById('walletAddress').innerText = `Connected: ${walletAddress}`;

            // Initialize Web3
            const web3 = new Web3(window.ethereum);

            // Fetch and display balance
            const balanceWei = await web3.eth.getBalance(walletAddress);
            const balanceEther = web3.utils.fromWei(balanceWei, 'ether');
            document.getElementById('balance').innerText = `Balance: ${balanceEther} ETH`;
        } catch (error) {
            console.error(error);
            alert('Failed to connect wallet');
        }
    } else {
        alert('MetaMask is not installed. Please install it to use this feature.');
    }
});
