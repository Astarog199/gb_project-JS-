'use strict'

/**
* Функция назначает обработку клика на все кнопки добавления товара в корзину
*/

function addEventListenersForAddToCartButtons() {
    const product_btn = document.querySelectorAll('button[data-productId]');
    product_btn.forEach(element => element.addEventListener('click', add_product_to_cart));
}


function add_product_to_cart(event) {
    const productId = event.currentTarget.getAttribute('data-productId');
    addProductIntoCart(productId);
};

addEventListenersForAddToCartButtons()