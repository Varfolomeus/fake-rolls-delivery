// проба підключення зовнішнього .js файлу із кодом
// console.log('Hello, world!');
let flipAlertBigOrder = false;
const alertQuantity = 15;
const freeDeliveryMark = 600;
const deliveryPrice = 50;
// додаємо слухача евентів до вікна
window.addEventListener('click', (event) => {
  // console.log('Hello, world! Window is clicked!');
  // console.log(event.target.dataset.action);
  // знаходимо у евенті елементи для взаємодії
  // створюємо змінну для кнопки
  const eventAction = event.target.dataset.action;
  // перевірка чи натиснуто кнопку плюс або мінус
  if (eventAction === 'minus' || eventAction === 'plus') {
    counterChanger(event, eventAction);

    //   console.log(counter.innerText);
  }
  if (eventAction === 'slide-left' || eventAction === 'slide-right') {
    
    sliderChanger(event, eventAction, productsArray);
  }
  if (event.target.hasAttribute('data-cart')) {
    cartChanger(event);
  }
});
const sliderTohCange = document.querySelector('.slider-slides');

function counterChanger(event, eventAction) {
  // створюємо змінну для лічильника
  let counter;
  counter = event.target
    .closest('.counter-wrapper')
    .querySelector('[data-counter]');

  // перевірка чи натиснуто плюс
  if (eventAction === 'plus') {
    // console.log(event.target.dataset.action);
    counter.innerText++;
    // перевірка на можливу помилку замовника та видача попередження
    if (!flipAlertBigOrder && parseInt(counter.innerText) >= alertQuantity) {
      alert(
        'Замовлено товару ' +
          counter.innerText +
          '.шт. Замовлення набуває великого розміру, просимо уважніше слідкувати за кількістю товарів, до оформлення замовлення!'
      );
      flipAlertBigOrder = !flipAlertBigOrder;
    }
  } else if (eventAction === 'minus') {
    // перевірка чи натиснуто мінус
    // console.log(event.target.dataset.action);
    if (parseInt(counter.innerText) > 1) {
      // зменшення значення лічильника на 1
      counter.innerText--;
      calcCartTotalCost();
    } else if (
      counter.closest('.cart-wrapper') &&
      parseInt(counter.innerText) === 1
    ) {
      // console.log('In cart!');
      counter.closest('.cart-item').remove();
      toggleCartStatus();
      calcCartTotalCost();
    }
    if (flipAlertBigOrder && parseInt(counter.innerText) < alertQuantity) {
      // зменшення значення лічильника на 1
      alert(
        'Дякуємо що приділили увагу до кількості товарів, до оформлення замовлення!'
      );
      flipAlertBigOrder = !flipAlertBigOrder;
    }
  }
  if (
    event.target.hasAttribute('data-action') &&
    event.target.closest('.cart-wrapper')
  ) {
    calcCartTotalCost();
  }
}

const productsContainer = document.querySelector('#products-wrapper');
const productsSlider = document.querySelector('#products-slider');
let productsArray;
// Запускаем getProducts
getProducts();
// Асинхронная функция получения данных из файла products.json
async function getProducts() {
  // Получаем данные из products.json
  const response = await fetch('./js/products.json');
  // Парсим данные из JSON формата в JS
 productsArray = await response.json();
  // Запускаем ф-ю рендера (отображения товаров)
  renderProducts(productsArray);
  renderSlider(productsArray);
}

function renderProducts(productsArray) {
  productsArray.forEach(function (item) {
    const productHTML = `<div class="col-md-6">
						<div class="card mb-4" data-id="${item.id}">
							<img class="product-img" src="img/rol/${item.imgSrc}" alt="">
							<div class="card-body text-center">
								<h4 class="item-title">${item.title}</h4>
								<p><small data-items-in-box class="text-muted">${item.itemsInBox} шт.</small></p>

								<div class="details-wrapper">

									<!-- Лічильник -->
									<div class="items counter-wrapper">
										<div class="items__control" data-action="minus">-</div>
										<div class="items__current" data-counter>1</div>
										<div class="items__control" data-action="plus">+</div>
									</div>
									<!-- // Лічильник -->

									<div class="price">
										<div class="price__weight">${item.weight} г.</div>
										<div class="price__currency">${item.price} ₴</div>
									</div>
								</div>

								<button data-cart type="button" class="btn btn-block btn-outline-warning">
									+ в кошик
								</button>
							</div>
						</div>
					</div>`;
    productsContainer.insertAdjacentHTML('beforeend', productHTML);
  });
}

function renderSlider(productsArray) {
  productsArray.forEach(function (item) {
    const productHTML = `
      <div class="products-slider-item">
        <div class="card mb-4" data-id="${item.id}">
          <img class="product-img" src="img/rol/${item.imgSrc}" alt="roll photo">
          <div class="card-body text-center">
            <h4 class="item-title">${item.title}</h4>
            <p class="text-muted">${item.itemsInBox} шт. Вага: ${item.weight} г.</p>
                <div class="price__currency">Ціна: ${item.price} ₴</div>
              </div>
            </div>
        </div>`;
    productsSlider.insertAdjacentHTML('beforeend', productHTML);
  });
}
// знаходимо у html елементи для взаємодії

// const btnMinus = document.querySelector('[data-action="minus"]');
// const btnPlus = document.querySelector('[data-action="plus"]');
// const counter = document.querySelector('[data-counter]');

// вивід у консоль для тесту взаємодії

// console.log(btnMinus);
// console.log(btnPlus);
// console.log(counter);

// відслідковуємо клік по кнопці мінус "-" btnMinus
// btnMinus.addEventListener('click', () => {
//   // console.log('Plus button click');
//   // якщо замовник зменшив кількість товару нижче критичної - дякуємо
//   if (flipAlertBigOrder && parseInt(counter.innerText) < alertQuantity) {
//     // зменшення значення лічильника на 1
//     alert(
//       'Дякуємо що приділили увагу до кількості товарів, до оформлення замовлення!'
//     );
//     flipAlertBigOrder = !flipAlertBigOrder;
//   }

//   // перевірка лічильника на значення більше ніж 1
//   if (parseInt(counter.innerText) > 1) {
//     // зменшення значення лічильника на 1
//     counter.innerText--;
//   }
// });

// // відслідковуємо клік по кнопці плюс "+" btnPlus
// btnPlus.addEventListener('click', () => {
//   // console.log('Plus button click');
//   // перевірка на можливу помилку замовника та видача попередження
//   if (!flipAlertBigOrder && parseInt(counter.innerText) >= alertQuantity) {
//     alert(
//       'Замовлено товару ' +
//         counter.innerText +
//         '.шт. Замовлення набуває великого розміру, просимо уважніше слідкувати за кількістю товарів, до оформлення замовлення!'
//     );
//     flipAlertBigOrder = !flipAlertBigOrder;
//   }
//   // збільшення значення лічильника на 1
//   counter.innerText++;
// });
