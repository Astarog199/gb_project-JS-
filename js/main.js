class ProductList {
  constructor(container = '.products') {
    this.container = container;
    this._goods = [];
    this._allProducts = [];

    this._fetchGoods();
    this._render();
  }

  _fetchGoods() {
    this.#goods = [
      { id: 1, foto: 'img src="style/pictures/catalog/AppleEarPods(1).jpg"', title: 'Apple BYZ S852I', price: 2927 },
      { id: 2, foto: 'img src="style/pictures/catalog/AppleEarPods(3).jpg"', title: 'Apple EarPods', price: 100 },
      { id: 3, foto: 'img src="style/pictures/catalog/AppleEarPods(2).jpg"', title: 'Apple EarPods', price: 2327 },
      { id: 4, foto: 'img src="style/pictures/catalog/AppleEarPods(1).jpg"', title: 'Apple BYZ S852I', price: 3527 },
      { id: 5, foto: 'img src="style/pictures/catalog/AppleEarPods(3).jpg"', title: 'Apple EarPods', price: 232 },
      { id: 6, foto: 'img src="style/pictures/catalog/AppleEarPods(2).jpg"', title: 'Apple EarPods', price: 2327 },
    ];
  }

  _render() {
    const block = document.querySelector(this.container);

    for (let product of this._goods) {
      const productObject = new ProductItem(product);

      this._allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
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

  render() {
    return `<div class="product-item" data-id="${this.id}">
    <img class="card_pictures" ${this.foto} alt="товар">
              <div class="desc">
              <h3>${this.title} <span>${this.price} ₸</span></h3>
                  <button class="buy-btn">Купить</button>
              </div>
          </div>`;
  }
}

const list = new ProductList();
