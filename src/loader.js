const { getOptions } = require("loader-utils");

const { strCamelCase } = require("./utils");
const extractTags = require("./extractTags");
const scan = require("./scan");

module.exports = async function(content, sourceMap, meta) {
  this.async();

  const options = getOptions(this) || {};

  /* do nothing when:
   * - invoked via resource query
   * - we have no paths
   */
  if (this.resourceQuery || !options.paths) {
    return this.callback(null, content, sourceMap, meta);
  }

  // promisify this.fs.readFile
  const readFile = (...args) =>
    new Promise((resolve, reject) =>
      this.fs.readFile(...args, (err, data) =>
        err ? reject(err) : resolve(data.toString("utf8"))
      )
    );

  // promisify this.resolve
  const resolve = (...args) =>
    new Promise((resolve, reject) =>
      this.resolve(...args, (err, result) =>
        err ? reject(err) : resolve(result)
      )
    );

  // scan for available vue components
  const availableComponents = await scan(this.rootContext, options.paths);

  // add the vue component as a dependency of the loader result in order to make it watchable
  this.addDependency(this.resourcePath);

  // determine all tags used by the vue component
  const tags = extractTags(await readFile(this.resourcePath));

  // determine component imports for tags used by the vue component
  const components = await Promise.all(
    Array.from(tags)
      .filter(tag => availableComponents.has(tag))
      .map(async tag => {
        const camelTag = strCamelCase(tag);
        const importPath = await resolve(
          this.rootContext,
          availableComponents.get(tag)
        );
        return [camelTag, importPath];
      })
  );

  if (components.length > 0) {
    // add components to output
    let newContent = "/* vue-components-loader */\n";
    newContent += `import vclInstallComponents from '${require.resolve(
      "./runtime/installComponents.js"
    )}';\n`;
    newContent += components.reduce(
      (acc, [tag, importPath]) => `${acc}import ${tag} from '${importPath}';\n`,
      ""
    );
    newContent += `vclInstallComponents(component, {${components
      .map(([tag]) => tag)
      .join(", ")}})\n`;

    // insert our code before the HMR code
    const hmrIdx = content.indexOf("/* hot reload */");
    if (hmrIdx > -1) {
      content = `${content.slice(0, hmrIdx)}${newContent}\n\n${content.slice(
        hmrIdx
      )}`;
    } else {
      content += `\n\n${newContent}`;
    }
  }

  this.callback(null, content, sourceMap, meta);
};
