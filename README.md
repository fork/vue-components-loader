# @4rk/vue-components-loader

A webpack loader for treeshaking and auto importing Vue components.

## Features

- Based on and heavily inspired by [vuetify-loader](https://github.com/vuetifyjs/vuetify-loader) and [@nuxt/components](https://github.com/nuxt/components)
- Works for _every_ Vue project using webpack, no vuetify or nuxt needed!
- Scans and auto-imports components, no more `components: {}`!
- May make your bundle smaller compared to global `Vue.registerComponent()`!

## Usage

Create your components:

```
components/
  ComponentFoo.vue
  ComponentBar.vue
```

Use them whenever you want, they will be auto imported in .vue files :

```html
<template>
  <ComponentFoo />
  <component-bar />
</template>
```

No need anymore to manually import them in the script section! The component name gets infered from the filename.

## Setup

Add the plugin to your `webpack.config.js` and configure where your Vue components can be found:

```javascript
// webpack.config.js

const VueComponentsLoaderPlugin = require("vue-components-loader");

module.exports = {
  ...

  plugins: [
    new VueComponentsLoaderPlugin({
      paths: ["./components/**/*.vue"]
    })
  ],

  ...
};
```

## Options

### `paths`

- Type: `Array<String>` or `Path` object (see below)

List of directories to scan, with customizable options when using Object syntax.

String items are shortcut to Object with only path provided :

```javascript
"./src/**/*.vue" === { path: "./src/**/*.vue" };
```

#### `Path` object properties

##### `path`

- Type: `String`
- Required

Path glob to your components. Must follow the [node-glob pattern style](https://github.com/isaacs/node-glob#glob-primer).

##### `ignore`

- Type: `String` or `Array<String>`

Ignore glob patterns.

##### `prefix`

- Type: `String`

Prefix component names.

## License

[MIT License](LICENSE)
