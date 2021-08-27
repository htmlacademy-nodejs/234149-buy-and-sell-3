'use strict';

/**
 * Возвращает случайное число в диапазоне
 * `min` и `max`.
 *
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 */
module.exports.getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Реализует алгоритмом тасования Фишера-Йетса
 * @param {Array} someArray
 * @return {Array}
 * */
module.exports.shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

/**
 * Генерирует имя файла картинки
 * @param {Number} num
 * @return {String}
 * */
module.exports.getPictureFileName = (num) => {
  return `image${num < 10 ? `0${num}` : `${num}`}.jpg`;
};
