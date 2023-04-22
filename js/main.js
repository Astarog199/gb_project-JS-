const products = [
  { id: 1, foto: 'img src="style/pictures/Notebook.jpg"', title: 'Notebook', price: 1000 },
  { id: 2, foto: 'img src="style/pictures/Notebook.jpg"', title: 'Mouse', price: 100 },
  { id: 3, foto: 'img src="style/pictures/Notebook.jpg"', title: 'Keyboard', price: 250 },
  { id: 4, foto: 'img src="style/pictures/Notebook.jpg"', title: 'Gamepad', price: 150 },
];

const renderProduct = (foto, title, price) => {
  return `<div class="product-item">
            <img class="card_pictures" ${foto} alt="товар">
            <h3>${title}</h3>
            <p>${price}</p>
            <button class="by-btn">Добавить</button>
          </div>`;
};

const renderProducts = list => {
  const productList = list.map(item => renderProduct(item.foto, item.title, "price: " + item.price + '$'));
  console.log(productList);
  document.querySelector('.products').innerHTML = productList.join();
};

renderProducts(products);
