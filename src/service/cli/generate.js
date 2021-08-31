'use strict';

const fs = require(`fs`);

const {
  getRandomInt,
  shuffle,
  getPictureFileName
} = require(`../../utils`);

const {
  CATEGORIES,
  SENTENCES,
  TITLES,
  OfferType,
  PictureRestrict,
  SumRestrict,
  OfferCount,
  FILE_NAME,
  ExitCode
} = require(`../../constants`);

/**
 * Генерирует массив с моковыми данными для mocks.json
 * @param {Number} count
 * @return {Array}
 * */
const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
    description: shuffle(SENTENCES).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    type: OfferType[Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)]],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
  }))
);

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;

    if (!isNaN(count) && Number.parseInt(count, 10) > OfferCount.max) {
      console.error(`Не больше 1000 объявлений`);
      process.exit(ExitCode.error);
    }

    const countOffer = Number.parseInt(count, 10) || OfferCount.min;
    const content = JSON.stringify(generateOffers(countOffer));
    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        console.error(`Can't write data to file...`);
        process.exit(ExitCode.error);
      }

      console.info(`Operation success. File created.`);
      process.exit();
    });
  }
};
