const API = 'https://raw.githubusercontent.com/Astarog199/online-store-api/main/';

class ProductList {
  #goods;
  #allProducts;

  constructor(container = '.products') {
    this.container = container;
    this.#goods = [];
    this.#allProducts = [];

    this.#fetchGoods()
  }

  #fetchGoods() {

    const promise = new Promise(function (resolve) {
      function getRequest(url, callback) {
        var xhr;
        if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            callback(xhr.responseText);
          }
        }
        xhr.open('GET', url, true);
        xhr.send();
      }

      getRequest(`${API}catalogDATA.json`, (data) => {
        let goods = JSON.parse(data);
        resolve(goods)
      });
    })

    promise.then((goods) => {
      this.#goods = goods
      this.#render();
    })
  }

  /**
   * метод перебирает массив товаров и добавляет  на страницу
   */
  #render() {
    const block = document.querySelector(this.container);
    for (let product of this.#goods) {
      const productObject = new ProductItem(product); //передаёт параметры экзеземпляра в объект конструктора ProductItem

      this.#allProducts.push(productObject); // добавляет полученный экземпляр в переменную
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

//1. вызываем конструктор
const list = new ProductList();