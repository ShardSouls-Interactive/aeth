const i18next = require("i18next");
const resources = require("../../locales/resources");

function loadLanguages() {
  i18next.init({
    fallbackLng: "pt_br",
    defaultNS: "system",
    interpolation: {
      escapeValue: true,
    },
    resources,
  });
}
module.exports = { loadLanguages };
