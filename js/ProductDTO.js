class ProductList {
  constructor(container = '.products') {
    this.container = container;
    this._goods = [];
    this._allProducts = [];

    this._fetchGoods(); //2.обращаемся к массиву с товарами
    this._render(); //3. обращаемся к функции render
  }

  _fetchGoods() {
    this._goods = [
      { id: 1, foto: 'img src="style/pictures/catalog/AppleEarPods(1).jpg"', title: 'Apple BYZ S852I', price: 2927 },
      { id: 2, foto: 'img src="style/pictures/catalog/AppleEarPods(3).jpg"', title: 'Apple EarPods', price: 100 },
      { id: 3, foto: 'img src="style/pictures/catalog/AppleEarPods(2).jpg"', title: 'Apple EarPods', price: 2327 },
      { id: 4, foto: 'img src="style/pictures/catalog/AppleEarPods(1).jpg"', title: 'Apple BYZ S852I', price: 3527 },
      { id: 5, foto: 'img src="style/pictures/catalog/AppleEarPods(3).jpg"', title: 'Apple EarPods', price: 232 },
      { id: 6, foto: 'img src="style/pictures/catalog/AppleEarPods(2).jpg"', title: 'Apple EarPods', price: 2327 },
    ];
  }

  /**
   * метод перебирает массив товаров и добавляет  на страницу
   */
  _render() {
    const block = document.querySelector(this.container);
    for (let product of this._goods) {
      const productObject = new ProductItem(product); //передаёт параметры экзеземпляра в объект конструктора ProductItem

      this._allProducts.push(productObject); // добавляет полученный экземпляр в переменную
      block.insertAdjacentHTML('beforeend', productObject.render()); //добавляет экземпляр на страницу
    }
  }


}

class ProductItem {
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
    <div class="dont like"></div>
    <img class="card_pictures" ${this.foto} alt="товар">
              <div class="desc">
              <h3 class = "item_title">${this.title} </h3> <span class = "item_price">${this.price} </span> ₸
                  <button data-productId="${this.id}" class="buy-btn">Купить</button>
              </div>
          </div>`;
  }
}


class Cart_List extends ProductItem {
  constructor(title, price, id, foto) {

    this.myfunc()
    this.calculateAndRenderTotalBasketSum()
  }
  myfunc() {
    console.log(this.title);
    console.log(this.price);
  }

  /**
* Функция пересчитывает общую стоимость корзины и выводит это значение на страницу.
*/
  calculateAndRenderTotalBasketSum() {
    let totalSum = 0;
    for (let productId in basket) {
      totalSum += basket[productId] * products[productId].price;
    }
    basketTotalValueEl.textContent = totalSum.toFixed(2);

  }

}



//1. вызываем конструктор
const list = new ProductList();