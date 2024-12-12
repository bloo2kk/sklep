let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Aktualizacja wyświetlania koszyka
function updateCartDisplay() {
    const cartItemsContainer = document.querySelector(".cart-items");
    const totalContainer = document.getElementById("total");

    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Twój koszyk jest pusty!</p>";
        } else {
            cart.forEach((item, index) => {
                const div = document.createElement("div");
                div.className = "cart-item";
                div.innerHTML = `
                    ${item.title} - ${item.price.toFixed(2)}zł
                    <button class="remove-btn" data-index="${index}">Usuń</button>
                `;
                cartItemsContainer.appendChild(div);
                total += item.price;
            });
        }

        totalContainer.textContent = total.toFixed(2);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}

// Dodawanie produktu do koszyka
function addToCart(title, price) {
    const normalizedPrice = parseFloat(price.replace(/[$zł]/g, ""));
    cart.push({ title, price: normalizedPrice });
    updateCartDisplay();
    alert(`${title} został dodany do Twojego koszyka!`);
}

// Obsługa przycisków "Dodaj do koszyka"
document.querySelectorAll(".product button").forEach((button) => {
    button.addEventListener("click", () => {
        const product = button.closest(".product");
        const title = product.querySelector("h3").textContent;
        const price = product.querySelector("p").textContent;
        addToCart(title, price);
    });
});

// Obsługa przycisków "Usuń z koszyka"
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
        const index = e.target.dataset.index;
        cart.splice(index, 1);
        updateCartDisplay();
    }
});

// Inicjalizacja koszyka
updateCartDisplay();