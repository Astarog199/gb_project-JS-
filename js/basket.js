'use strict'
const basketCounterEl = document.querySelector('.rightHeader .cartIcon span');

/**
 * Функция увеличивает счетчик количества товаров рядом с иконкой корзины.
 */
function increaseProductsCount() {
    basketCounterEl.textContent++;
}

// function addProductToCart_List(productId, event) {
//     const title = event.currentTarget.parentNode.querySelector('.item_title').innerText;
//     const price = event.currentTarget.parentNode.querySelector('.item_price').innerText;
//     // const foto = event.currentTarget.parentNode.querySelector('.list_products');
//     new Cart_List(productId, title, price);
// }

// class Cart_List {
//     constructor(productId, title, price,) {
//         this.id = productId;
//         this.title = title;
//         this.price = price;

//         this.productToCart = [];

//         this.myfunc()
//         this.calculateAndRenderTotalBasketSum()
//     }
//     myfunc() {
//         console.log(this.title);
//         console.log(this.price);
//     }

//     /**
//  * Функция пересчитывает общую стоимость корзины и выводит это значение на страницу.
//  */
//     calculateAndRenderTotalBasketSum() {
//         let totalSum = 0;
//         for (let productId in basket) {
//             totalSum += basket[productId] * products[productId].price;
//         }
//         basketTotalValueEl.textContent = totalSum.toFixed(2);

//     }

// }

function addProductIntoCart(event) {
    increaseProductsCount();
    new Cart_List();

    // addProductToObject(productId);
    // renderProductInBasket(productId);
    // calculateAndRenderTotalBasketSum();
}