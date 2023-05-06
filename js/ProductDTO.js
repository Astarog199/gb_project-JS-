const API = 'https://raw.githubusercontent.com/Astarog199/online-store-api/main/';

class List {
  constructor(url, container, list = ListContext) {
    this.container = container;
    this.list = list;  //словарь 246 строка
    this.url = url; //название файла.json
    this.goods = []; //ответ от сервера со списком товаров
    this.allProducts = []; //товары полученные от сервера и добавленные на страницу
    this.filtered = [];
    this._init();
  }

  /**
   *  получение данных с сервера
   * @param  url название файла json
   */
  getJson(url) {
    return fetch(url ? url : `${API + this.url}`)
      .then(result => result.json())
      .catch(error => {
        console.log(error);
      })
  }

  handleData(data) {
    this.goods = data; //св-во хранит ответ от сервера
    this.render();
  }


  calcSum() {
    return this.allProducts.reduce((accum, item) => accum + item.price, 0)
  }

  /**
   * метод перебирает массив товаров и добавляет  на страницу
   */
  render() {
    const block = document.querySelector(this.container);//сохраняем в переменную контейнер
    for (let product of this.goods) {                   //перебираем массив
      let productObject = null; //в эту переменную добавляется элемент списка товаров или списка корзины

      if (this.constructor.name === 'ProductList') productObject = new ProductItem(product);
      if (this.constructor.name === 'Cart') productObject = new CartItem(product);
      if (!productObject) return;

      this.allProducts.push(productObject); // в массив allProducts добавляются товары полученные от сервера
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
  }

  /**
   *  метод поиска товаров
   * @param  value - поисковый запрос
   */
  filter(value) {
    const regexp = new RegExp(value, 'i');
    this.filtered = this.allProducts.filter(product => regexp.test(product.product_name));
    this.allProducts.forEach(el => {
      const block = document.querySelector(`.product-item[data-id="${el.id}"]`);
      if (!this.filtered.includes(el)) {
        block.classList.remove('show');
        block.classList.add('invisible');
      } else {
        block.classList.remove('invisible');
        block.classList.add('show');
      }
    })
  }
  _init() {
    return null;
  }
}

class Item {
  constructor(el) {
    this.id = el.id;
    this.img = el.foto;
    this.product_name = el.title;
    this.price = el.price;
  }

  /**
   * разметка блока товара(экземпляра)
   * @returns 
   */
  render() {
    return ``;
  }
}

/**
 * наследование от базовых классов
 */

class ProductList extends List {
  constructor(cart, container = '.products', url = "catalogDATA.json") {
    super(url, container);
    this.cart = cart;
    this.getJson()
      .then(data => this.handleData(data));
  }

  _init() {
    // setTimeout(() => {
    //   const product_btn = document.querySelectorAll('button[data-productId]');
    //   console.log(product_btn);
    //   product_btn.forEach(element => element.addEventListener('click', function (event) {
    //     const productId = event.currentTarget.getAttribute('data-productId');
    //     this.cart.addProduct(productId, event);
    //   }));

    // }, 1000);

    document.querySelector(this.container).addEventListener('click', e => {
      if (e.target.classList.contains('buy-btn')) {
        this.cart.addProduct(e.target);
      }
    });
    document.querySelector('.search-field').addEventListener('input', e => {
      e.preventDefault();
      this.filter(document.querySelector('.search-field').value)
    })
  }
}

class ProductItem extends Item {
  render() {
    return `<div class="product-item show" data-id="${this.id}">
    <div class="dont like"></div>
    <img class="card_pictures" ${this.img} alt="товар">
      <div class="desc">
      <h3 class = "item_title">${this.product_name} </h3> 
      <span class = "item_price">${this.price} </span> ₽
      <button data-productId="${this.id}" class="buy-btn"
      data-img ="${this.img}"
      data-id="${this.id}"
      data-name="${this.product_name}"
      data-price="${this.price}">Купить</button>
      </div>
    </div>`;
  }
}


class Cart extends List {
  constructor(container = ".cart-block", url = "getBasket.json") {
    super(url, container);
    this.getJson()
      .then(data => {
        this.handleData(data.contents);
      });
  }

  /**
  * добавление товара
  * @param element
  */
  addProduct(element) {
    this.getJson(`${API}addToBasket.json`)
      .then(data => {
        if (data.result === 1) {
          let productId = +element.dataset['id'];
          let find = this.allProducts.find(product => product.id === productId);
          if (find) {
            find.quantity++;
            this._updateCart(find);
          } else {
            let product = {
              id: productId,
              foto: element.dataset['img'],
              price: +element.dataset['price'],
              title: element.dataset['name'],
              quantity: 1
            };
            // goods - это своего рода "опорный" массив, отражающий список товаров, которые нужно отрендерить.
            // При добавлении нового товара, нас интересует только он один.
            this.goods = [product];
            // далее вызывая метод render, мы добавим в allProducts только его, тем самым избегая лишнего перерендера.
            this.render();
          }
        } else {
          alert('Error');
        }
      })
  }

  /**
   * удаление товара
   * @param element
   */
  removeProduct(element) {
    this.getJson(`${API}deleteFromBasket.json`)
      .then(data => {
        if (data.result === 1) {
          let productId = +element.dataset['id'];
          let find = this.allProducts.find(product => product.id === productId);
          if (find.quantity > 1) { // если товара > 1, то уменьшаем количество на 1
            find.quantity--;
            this._updateCart(find);
          } else { // удаляем
            this.allProducts.splice(this.allProducts.indexOf(find), 1);
            document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
          }
        } else {
          alert('Error');
        }
      })
  }

  /**
   * обновляем данные корзины
   * @param product
   * @private
   */
  _updateCart(product) {
    let block = document.querySelector(`.cart-item[data-id="${product.id}"]`);
    block.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
    block.querySelector('.product-price').textContent = `${product.quantity * product.price} ₽`;
  }
  _init() {
    document.querySelector('.cartIcon').addEventListener('click', () => {
      document.querySelector(this.container).classList.toggle('invisible');
    });
    document.querySelector(this.container).addEventListener('click', e => {
      if (e.target.classList.contains('del-btn')) {
        this.removeProduct(e.target);
      }
    })
  }
}

class CartItem extends Item {
  constructor(el) {
    super(el);
    this.quantity = el.quantity;
  }
  render() {
    return `<div class="cart-item" data-id="${this.id}">
              <div class="product-bio">
                <img class="cart_pictures" "${this.img}" alt="Some image">
                  <div class="product-desc">
                    <p class="product-title">${this.product_name}</p>
                    <p class="product-quantity">Количество: ${this.quantity}</p>
                    <p class="product-single-price">${this.price} ₽ за ед.</p>
                  </div>
              </div>
              <div class="right-block">
                  <p class="product-price">${this.quantity * this.price} ₽</p>
                  <button class="del-btn" data-id="${this.id}">&times;</button>
              </div>
            </div>`
  }
}

const ListContext = {
  ProductList: ProductItem,
  Cart: CartItem,
};

//1. вызываем конструктор
new ProductList(new Cart());