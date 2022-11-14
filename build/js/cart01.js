// проба підключення зовнішнього .js файлу із кодом
// console.log('Hello, world! Cart02.js');
function cartChanger(event) {
  // console.log('Hello, world! cartChanger()');
  // console.log(event.target.closest('.card'));
  const cart = event.target.closest('.card');
  cartWrapper = document.querySelector('.cart-wrapper');
  const productInfo = {
    itemId: cart.dataset.id,
    itemImgSrc: cart.querySelector('.product-img').getAttribute('src'),
    itemTitle: cart.querySelector('.item-title').innerText,
    itemsInBox: cart.querySelector('[data-items-in-box]').innerText,
    itemWeight: cart.querySelector('.price__weight').innerText,
    itemPrice: cart.querySelector('.price__currency').innerText,
    itemCost: () => {
      return (
        parseInt(productInfo.itemOrdered) * parseInt(productInfo.itemPrice)
      );
    },
    itemOrdered: cart.querySelector('[data-counter]').innerText,
  };

  // const itemInCart=cartWrapper.querySelector(`[data-id="${productInfo.itemId}"]`);
  // console.log(itemInCart);
  if (cartWrapper.querySelector(`[data-id="${productInfo.itemId}"]`)) {
    let foundElement = cartWrapper
      .querySelector(`[data-id="${productInfo.itemId}"]`)
      .querySelector('[data-counter]');
    foundElement.innerText =
      parseInt(foundElement.innerText) + parseInt(productInfo.itemOrdered);
  } else {
    const cartItemHTML = `<!-- Cart item -->
  <div class="cart-item" data-id="${productInfo.itemId}">
      <div class="cart-item__top">
          <div class="cart-item__img">
              <img src="${productInfo.itemImgSrc}" alt="${productInfo.itemTitle}">
          </div>
          <div class="cart-item__desc">
              <div class="cart-item__title">${productInfo.itemTitle}</div>
              <div class="cart-item__weight">${productInfo.itemsInBox} / ${productInfo.itemWeight} </div>
              <!-- cart-item__details -->
              <div class="cart-item__details">
                  <div class="items items--small counter-wrapper">
                      <div class="items__control" data-action="minus">-</div>
                      <div class="items__current" data-counter="">${productInfo.itemOrdered} </div>
                      <div class="items__control" data-action="plus">+</div>
                  </div>
                  <div class="price">
                      <div class="price__currency">${productInfo.itemPrice} </div>
                  </div>
              </div>
              <!-- // cart-item__details -->
          </div>
      </div>
  </div>
  <!-- // Cart item -->`;
    cartWrapper.insertAdjacentHTML('beforeEnd', cartItemHTML);
  }
  cart.querySelector('[data-counter]').innerText = '1';
  toggleCartStatus();
  calcCartTotalCost();
}
function toggleCartStatus() {
  // console.log('toggleCartStstus');
  const cartWrapper = document.querySelector('.cart-wrapper');
  const cartEmptyBage = document.querySelector('[data-cart-empty]');
  const orderForm = document.querySelector('.cart-total');
  const orderPlace = document.querySelector('#order-form');
  if (cartWrapper.children.length) {
    // console.log("has goods");
    cartEmptyBage.classList.add('none');
    orderForm.classList.remove('none');
    orderPlace.classList.remove('none');
  } else {
    // console.log('empty');
    cartEmptyBage.classList.remove('none');
    orderForm.classList.add('none');
    orderPlace.classList.add('none');
  }
}
function calcCartTotalCost() {
  let totalCost = 0;
  const cartWrapper = document.querySelector('.cart-wrapper');
  const cartGoods = cartWrapper.querySelectorAll('.cart-item');
  const deliveryCost = document.querySelector('.delivery-cost');
  cartGoods.forEach((item) => {
    totalCost +=
      parseInt(item.querySelector('[data-counter]').innerText) *
      parseInt(item.querySelector('.price__currency').innerText);
  });
  
  if (totalCost < freeDeliveryMark) {
    deliveryCost.classList.remove('free');
    deliveryCost.innerHTML = `${deliveryPrice} ₴ <br/><small class="delivery-mark">Безкоштовно при замовленні від ${freeDeliveryMark}  ₴</small>`;
    document
    .querySelector('.cart-total')
    .querySelector('.total-price').innerHTML = totalCost+ ' ₴, <span class="delivery-mark"> з доставкою '+ (totalCost+deliveryPrice)+'</span>';
    document.querySelector('.hryvna').classList='delivery-mark'
  } else {
    deliveryCost.classList.add('free');
    deliveryCost.innerText = 'безкоштовно';
    document
    .querySelector('.cart-total')
    .querySelector('.total-price').innerText = totalCost;
    document.querySelector('.delivery-mark').classList='hryvna'
  }
}
