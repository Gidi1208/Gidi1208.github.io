document.getElementById('placeOrderBtn').addEventListener('click', function() {
    // Prices of cakes
    const prices = {
        rainbow: 300,
        chocolate: 200,
        redvelvet: 250,
        blackforest: 350
    };

    // Get quantities from inputs
    const rainbowQty = parseInt(document.getElementById('rainbowQty').value) || 0;
    const chocolateQty = parseInt(document.getElementById('chocolateQty').value) || 0;
    const redvelvetQty = parseInt(document.getElementById('redvelvetQty').value) || 0;
    const blackforestQty = parseInt(document.getElementById('blackforestQty').value) || 0;

    // Calculate total price
    const totalPrice = (rainbowQty * prices.rainbow) +
                       (chocolateQty * prices.chocolate) +
                       (redvelvetQty * prices.redvelvet) +
                       (blackforestQty * prices.blackforest);

    // Display the bill section and total price
    const billSection = document.getElementById('billSection');
    const totalPriceElem = document.getElementById('totalPrice');

    totalPriceElem.textContent = 'Total Price: Rs. ' + totalPrice;
    billSection.style.display = 'block';
});
