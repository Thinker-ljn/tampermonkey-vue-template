const vue = require('rollup-plugin-vue')
const { terser } = require("rollup-plugin-terser")
const commonjs = require('rollup-plugin-commonjs')
const banner = require('./banner')
const merge = require('webpack-merge')
const terserPlugin = terser({
  output: {
    comments: function(_node, comment) {
      var text = comment.value;
      return /@|==/i.test(text);
    }
  }
})
const base = {
  input: 'src/index.js',
  external: [
    'vue'
  ],
  output: {
    name: 'vt',
    file: 'dist/bundle.js',
    format: 'iife',
    sourcemap: true,
    globals: {
      vue: 'Vue'
    }
  },
  plugins: [
    commonjs(),
    vue()
  ]
}

const build = merge(base, {
  output: {
    banner: banner()
  },
  plugins: [
    terserPlugin
  ]
})

const watch = merge(base, {
  watch: {
    include: [
      'src/**'
    ]
  }
})

module.exports = {
  watch,
  build
}
