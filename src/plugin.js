const RuleSet = require("webpack/lib/RuleSet");
const validateOptions = require("schema-utils");

const schema = require("./schema");

const isVueLoader = use =>
  use.ident === "vue-loader-options" || use.loader === "vue-loader";

class VueComponentsLoaderPlugin {
  constructor(options = {}) {
    validateOptions(schema, options, {
      name: VueComponentsLoaderPlugin.name,
      baseDataPath: "options"
    });

    this.options = options;
  }

  apply(compiler) {
    // prepend our loader before vue loaders
    const { rules } = new RuleSet(compiler.options.module.rules);

    for (const ruleIdx in rules) {
      const vueLoaderIdx = (rules[ruleIdx].use || []).findIndex(isVueLoader);
      if (vueLoaderIdx > -1) {
        rules[ruleIdx].use.splice(vueLoaderIdx, 0, {
          loader: require.resolve("./loader"),
          options: this.options
        });
      }
    }

    compiler.options.module.rules = rules;
  }
}

module.exports = VueComponentsLoaderPlugin;
