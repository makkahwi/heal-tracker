module.exports = {
  locales: ["en", "ar"],
  output: "src/assets/locales/$LOCALE/$NAMESPACE.json",
  defaultNamespace: "translation",
  keySeparator: ".",
  namespaceSeparator: false,
  createOldCatalogs: true,
  useKeysAsDefaultValue: true,
  failOnWarnings: false,
};
