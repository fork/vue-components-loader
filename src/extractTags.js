const compiler = require("vue-template-compiler");

const { strKebabCase } = require("./utils");

/**
 * Extract tags used by a Vue component
 *
 * @param {File} file - File descriptor of the Vue component
 * @returns {Set} Set of strings of all used tags, normalized to kebab-case
 */
const extractTags = file => {
  // load the vue component
  const component = compiler.parseComponent(file);

  // determine all tags used by the vue component
  const tags = new Set();
  if (component.template) {
    compiler.compile(component.template.content, {
      modules: [
        {
          postTransformNode: node => tags.add(strKebabCase(node.tag))
        }
      ]
    });
  }

  return tags;
};

module.exports = extractTags;
