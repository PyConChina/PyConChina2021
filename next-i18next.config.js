const path = require('path')

/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
  },
  localePath: path.resolve('./data/locales')
};
