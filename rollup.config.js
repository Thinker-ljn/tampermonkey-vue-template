import vue from 'rollup-plugin-vue';
import { terser } from "rollup-plugin-terser";
import commonjs from 'rollup-plugin-commonjs';
import banner from './banner'
 
export default {
  input: 'src/index.js',
  external: [
    'vue'
  ],
  output: {
    name: 'vt',
    banner: banner(),
    file: 'dist/bundle.js',
    format: 'iife',
    globals: {
      vue: 'Vue'
    }
  },
  watch: {
    include: 'src/**'
  },
  plugins: [
    commonjs(),
    vue(),
    terser({
      output: {
        comments: function(_node, comment) {
          var text = comment.value;
          return /@|==/i.test(text);
        }
      }
    })
  ]
}