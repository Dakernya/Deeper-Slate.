function showTab(tab) {
    document.getElementById('content').innerHTML = `<h2>${tab} coming soon...</h2>`;
}

// Placeholder for API calls
async function fetchPriceData() {
    const response = await fetch('/api/getPriceData');
    const data = await response.json();
    console.log(data);
}
