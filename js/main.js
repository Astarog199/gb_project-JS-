const products = [
  { id: 1, foto: 'img src="style/pictures/catalog/AppleEarPods(1).jpg"', title: 'Apple BYZ S852I', price: 2927 },
  { id: 2, foto: 'img src="style/pictures/catalog/AppleEarPods(3).jpg"', title: 'Apple EarPods', price: 100 },
  { id: 3, foto: 'img src="style/pictures/catalog/AppleEarPods(2).jpg"', title: 'Apple EarPods', price: 2327 },
  { id: 4, foto: 'img src="style/pictures/catalog/AppleEarPods(1).jpg"', title: 'Apple BYZ S852I', price: 3527 },
  { id: 5, foto: 'img src="style/pictures/catalog/AppleEarPods(3).jpg"', title: 'Apple EarPods', price: 232 },
  { id: 6, foto: 'img src="style/pictures/catalog/AppleEarPods(2).jpg"', title: 'Apple EarPods', price: 2327 },
];

const renderProduct = (item) => `<div class="product-item">
            <img class="card_pictures" ${item.foto} alt="товар">
            <h3>${item.title} <span>${item.price} ₸</span></h3>
            
            <button class="by-btn">Добавить</button>
          </div>`;


const renderProducts = list => {
  document.querySelector('.products').insertAdjacentHTML('beforeend', list.map(item => renderProduct(item)).join(''));
};

renderProducts(products);
