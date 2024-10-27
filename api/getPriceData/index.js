module.exports = async function (context, req) {
    context.log('Fetching price data...');
    const prices = { BTC: 50000, ETH: 4000, SUI: 1 }; // Placeholder values
    context.res = {
        body: prices
    };
};
