'use strict';

console.log(document.body.innerHTML); // читаем текущее содержимое
setTimeout(function () {
  document.body.innerHTML = 'Новый <strong>BODY!</strong>'
}, 3000); // заменяем содержимое