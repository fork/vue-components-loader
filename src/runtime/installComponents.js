/**
 * Runtime utility for cleaner component module output
 *
 * IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
 * This module is a runtime utility for cleaner component module output and will
 * be included in the final webpack user bundle.
 *
 * @see https://github.com/vuetifyjs/vuetify-loader
 * @copyright 2016-2019 John Jeremy Leider
 */
module.exports = function installComponents(component, components) {
  var options =
    typeof component.exports === "function"
      ? component.exports.extendOptions
      : component.options;

  if (typeof component.exports === "function") {
    options.components = component.exports.options.components;
  }

  options.components = options.components || {};

  for (var i in components) {
    options.components[i] = options.components[i] || components[i];
  }
};
