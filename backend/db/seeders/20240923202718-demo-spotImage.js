'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/8efb200c-6dcb-460d-a367-caa511506077.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/82c577ee-3422-4fda-ae09-6716d76e8bef.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/ml/photo_enhancement/pictures/miso/Hosting-46695796/original/9bd67185-dc83-4473-a191-9486c62aec66.jpeg?im_w=1440',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/ml/photo_enhancement/pictures/323b2430-a7fa-44d7-ba7a-6776d8e682df.jpg?im_w=1440',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-42388319/original/0d34f7da-14ad-469b-a218-1a2668acd428.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/ml/photo_enhancement/pictures/miso/Hosting-36767861/original/ffcc6215-0b1c-4e8c-b2e0-473b3c801014.jpeg?im_w=1200',
        preview: true
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2] }
    }, {});
  }
};
