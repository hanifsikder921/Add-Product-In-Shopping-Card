
const ringButtons = document.querySelectorAll('.ring-button');

for (const ringBtn of ringButtons) {
    ringBtn.addEventListener("click", function (event) {

        const color = event.target.id.replace("-color", "");


        for (const ring of ringButtons) {
            ring.classList.remove("border-purple-600");
            ring.classList.add("border-gray-300");
        }

        event.target.classList.add("border-purple-600");
        event.target.classList.remove("border-gray-300");


        const productImage = document.getElementById("product-image");
        productImage.src = `../images/${color}.png`;

    });
}


function selectWristSize(size) {

    const sizes = ["S", "M", "L", "XL"];
    for (const element of sizes) {


        const button = document.getElementById("size-" + element);


        if (size === element) {

            button.classList.add("border-purple-600");
            button.classList.add('bg-purple-100');
        } else {
            button.classList.remove("border-purple-600");
            button.classList.remove('bg-purple-100');
        }

    }


}


const quantityElement = document.querySelectorAll(".quantity-button");
for (const btn of quantityElement) {
    btn.addEventListener('click', function (event) {

        const amount = event.target.innerText === "+" ? 1 : -1;
        const qunatityNumber = document.getElementById('quantity');
        const currentQuantity = parseInt(qunatityNumber.innerText);
        const newQuantity = Math.max(0, currentQuantity + amount);
        qunatityNumber.innerText = newQuantity;



    })

}

// Add to cart 
let cardCount = 0;
let cardItem = [];
document.getElementById('add-to-cart').addEventListener('click', function () {

    const quantity = parseInt(document.getElementById('quantity').innerText);

    if (quantity > 0) {

        document.getElementById("checkout-container").classList.remove('hidden')
        cardCount = cardCount + quantity;
        document.getElementById('cart-count').innerText = cardCount;

        const selecteColorButton = document.querySelector('.border-purple-600.w-6');
        const selecteColor = selecteColorButton.id.split("-")[0];



        const selecteSizeButton = document.querySelector('.border-purple-600:not(.w-6)');
        const divites = selecteSizeButton.innerText.split(" ");
        const selecteSize = divites[0];
        const selectePrice = parseInt(divites[1].split("$")[1]);



        cardItem.push({
            imge: selecteColor + '.png',
            title: 'Classy Modern Smart Watch',
            color: selecteColor,
            size: selecteSize,
            quantity: quantity,
            price: quantity * selectePrice

        });




    } else {

        alert('Please Add item to card')

    }

});



document.getElementById("checkout-btn").addEventListener("click", function () {
    const cartModal = document.getElementById("cart-modal");
    const cardContainer = document.getElementById("cart-items");

    cardContainer.innerHTML = "";

    let totalPrice = 0;

    for (const item of cardItem) {
        const row = document.createElement("tr");
        row.classList.add("border-b");

        row.innerHTML = `
        <td class="py-2">
            <div class="flex items-center space-x-2">
                <img class="w-15 h-12 rounded-md object-cover" src="images/${item.imge}" alt="">
                <span class="font-semibold">${item.title}</span>
            </div>
        </td>
        <td class="font-semibold py-2 px-4 text-center">${item.color}</td>
        <td class="font-semibold py-2 px-4 text-center">${item.size}</td>
        <td class="font-semibold py-2 px-4 text-center">${item.quantity}</td>
        <td class="font-semibold py-2 px-4 text-center">$${item.price}</td>
        `;



        cardContainer.appendChild(row);


        totalPrice = totalPrice + item.price;
    }


    const priceRow = document.createElement("tr");
    priceRow.innerHTML = `
        <td colspan="4" class="py-2 text-right text-lg font-semibold">Total:</td>
        <td class="py-2 px-4 text-center text-lg font-semibold">$${totalPrice}</td>
    `;

    cardContainer.appendChild(priceRow);

    cartModal.classList.remove("hidden");
});



document.getElementById("continue-shopping").addEventListener("click", function () {

    const cartModal = document.getElementById("cart-modal");
    cartModal.classList.add("hidden")


});
document.getElementById("checkout").addEventListener("click", function () {

    alert('Your Order is placed successfully');
    cardItem = [];
    document.getElementById('cart-count').innerText = 0;
    document.getElementById('checkout-container').classList.add('hidden');
    document.getElementById('cart-modal').classList.add("hidden");



});


