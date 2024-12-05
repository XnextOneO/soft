// eslint-disable-next-line unicorn/prefer-node-protocol,unicorn/prefer-module,@typescript-eslint/no-var-requires
const path = require("path");

// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ru"],
  },
  localePath: path.resolve("./translations"),
};
