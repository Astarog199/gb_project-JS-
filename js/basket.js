'use strict'
const basketCounterEl = document.querySelector('.rightHeader .cartIcon span');
console.log(basketCounterEl);

/**
 * Функция увеличивает счетчик количества товаров рядом с иконкой корзины.
 */
function increaseProductsCount() {
    basketCounterEl.textContent++;
}

class Cart_List {
    constructor(productId) {
        this.id = productId
    }
}

function addProductIntoCart(productId) {
    increaseProductsCount();
    new Cart_List(productId);
    // addProductToObject(productId);
    // renderProductInBasket(productId);
    // calculateAndRenderTotalBasketSum();
}