const en = require('./translations.en.json');
const zh = require('./translations.zh.json');

const i18n = {
  translations: {
    en,
    zh,
  },
  defaultLang: 'zh',
  useBrowserDefault: true,
};

module.exports = i18n;
