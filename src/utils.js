/**
 * Flatten a two-level array
 *
 * @param {Array} arr - Input array
 * @returns {Array} `arr` with one less depth
 */
const arrFlat = arr => arr.reduce((acc, cur) => acc.concat(cur));

/**
 * Capitalize a string
 *
 * @param {String} str - Input string
 * @returns {String} `str` with the first letter capitalized
 */
const strCapitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * CamelCase a kebab-cased string
 *
 * @param {String} str - kebab-cased string
 * @returns {String} CamelCased string
 */
const strCamelCase = str =>
  strCapitalize(str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : "")));

/**
 * kebab-case a CamelCased string
 *
 * @param {String} str - CamelCased string
 * @returns {String} kebab-cased string
 */
const strKebabCase = str => str.replace(/\B([A-Z])/g, "-$1").toLowerCase();

/**
 * Ensure a string starts with a prefix
 *
 * @param {String} str - String that should be prefixed
 * @param {String} prefix - Prefix
 * @returns {String} `str` prefixed with `prefix` if not already present
 */
const strPrefix = (str, prefix) =>
  str.startsWith(prefix) ? str : `${prefix}${str}`;

module.exports = {
  arrFlat,
  strCapitalize,
  strCamelCase,
  strKebabCase,
  strPrefix
};
