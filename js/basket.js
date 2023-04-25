'use strict'
const basketCounterEl = document.querySelector('.rightHeader .cartIcon span');

/**
 * Функция увеличивает счетчик количества товаров рядом с иконкой корзины.
 */
function increaseProductsCount() {
    basketCounterEl.textContent++;
}



class Cart_List {
    constructor(productId, title, price) {
        this.productId = productId;
        this.title = title;
        this.price = price;
        this.productToCart = [];
        this.basket = {};
        this.totalSum = 0;

        this.myfunc(productId)
        this.calculateAndRenderTotalBasketSum(productId)
    }

    myfunc(productId) {
        if (!(productId in this.basket)) {
            this.basket[productId] = 1;
        } else {
            this.basket[productId]++;
        }

        console.log(this.title);
        console.log(this.price);
    }

    /**
    * Функция пересчитывает общую стоимость корзины и выводит это значение на страницу.
    */
    calculateAndRenderTotalBasketSum(productId) {
        //let totalSum = 0;
        for (let productId in this.basket) {
            this.totalSum += this.basket[productId] * this.price;
        }
        // basketTotalValueEl.textContent = totalSum.toFixed(2);
        console.log(this.totalSum);
    }
}

class CartItem {
    constructor(product) {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.foto = product.foto;
    }

    /**
     * разметка блока товара(экземпляра)
     * @returns 
     */
    render() {
        return `<div class="product-item" data-id="${this.id}">
                <div class="desc">
                <h3 class = "item_title">${this.title} </h3> <span class = "item_price">${this.price} </span> ₸
                </div>
            </div>`;
    }
}

let productToCart = [];
function addProductToCart_List(event) {
    let productId = event.currentTarget.getAttribute('data-productId');
    let title = event.currentTarget.parentNode.querySelector('.item_title').innerText;
    let price = +event.currentTarget.parentNode.querySelector('.item_price').innerText;

    new Cart_List(productId, title, price);

    // productToCart.push({
    //     title,
    //     price
    // });
}
console.log(productToCart);

function addProductIntoCart(productId, event) {
    increaseProductsCount();
    addProductToCart_List(event)

    // addProductToObject(productId);
    // renderProductInBasket(productId);
    // calculateAndRenderTotalBasketSum();
}