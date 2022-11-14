// проба підключення зовнішнього .js файлу із кодом
// console.log('Hello, world!');

// знаходимо у html едементи для взаємодії
let flipAlertBigOrder = false;
const alertQuantity = 15;
const btnMinus = document.querySelector('[data-action="minus"]');
const btnPlus = document.querySelector('[data-action="plus"]');
const counter = document.querySelector('[data-counter]');

// вивід у консоль для тесту взаємодії

// console.log(btnMinus);
// console.log(btnPlus);
// console.log(counter);

// відслідковуємо клік по кнопці мінус "-" btnMinus
btnMinus.addEventListener('click', () => {
  // console.log('Plus button click');
  // якщо замовник зменшив кількість товару нижче критичної - дякуємо
  if (flipAlertBigOrder && parseInt(counter.innerText) < alertQuantity) {
    // зменшення значення лічильника на 1
    alert(
      'Дякуємо що приділили увагу до кількості товарів, до оформлення замовлення!'
    );
    flipAlertBigOrder = !flipAlertBigOrder;
  }

  // перевірка лічильника на значення більше ніж 1
  if (parseInt(counter.innerText) > 1) {
    // зменшення значення лічильника на 1
    counter.innerText--;
  }
});

// відслідковуємо клік по кнопці плюс "+" btnPlus
btnPlus.addEventListener('click', () => {
  // console.log('Plus button click');
  // перевірка на можливу помилку замовника та видача попередження
  if (!flipAlertBigOrder && parseInt(counter.innerText) >= alertQuantity) {
    alert(
      'Замовлено товару ' +
        counter.innerText +
        '.шт. Замовлення набуває великого розміру, просимо уважніше слідкувати за кількістю товарів, до оформлення замовлення!'
    );
    flipAlertBigOrder = !flipAlertBigOrder;
  }
  // збільшення значення лічильника на 1
  counter.innerText++;
});
