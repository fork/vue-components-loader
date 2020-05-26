const glob = require("glob");
const path = require("path");

const { arrFlat, strKebabCase, strPrefix } = require("./utils");

const asyncGlob = (...args) =>
  new Promise((resolve, reject) =>
    glob(...args, (err, matches) => (err ? reject(err) : resolve(matches)))
  );

/**
 * Scan folders for components
 *
 * The component name is deferred from the file basename.
 *
 * Path definition:
 * {
 *   path: "",
 *   prefix: "",
 *   ignore: "",
 * }
 *
 * @param {Array} paths - Array of strings or paths as specified above. Strings are turned into { path: str }
 * @returns {Map} Map where the keys are the component names and the values the paths
 */
const scan = async (cwd, paths) => {
  // turn string paths into objects with path property
  const objPaths = paths.map(path =>
    typeof path === "string" ? { path } : path
  );

  // turn path globs into a flat file array
  const files = arrFlat(
    await Promise.all(
      objPaths.map(async ({ path: globPath, ignore, prefix = "" }) => {
        const files = await asyncGlob(globPath, { cwd, ignore });

        // preserve the specified prefix so we can apply it within the next step
        return files.map(file => {
          const basename = path.basename(file, path.extname(file));
          const kebabTag = strKebabCase(strPrefix(basename, prefix));

          return [kebabTag, file];
        });
      })
    )
  );

  return new Map(files);
};

module.exports = scan;
