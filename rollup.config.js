import { defineConfig } from 'rollup';
import vue from 'rollup-plugin-vue';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import scss from 'rollup-plugin-scss'
import image from '@rollup/plugin-image';

export default defineConfig({
    input: 'src/main.js',
    output: [{
        file: 'dist/bundle.js',
        format: 'es',
        sourcemap: false
    }],
    plugins: [
      vue(),
      babel(),
      commonjs(),
      scss(),
      image()
    ]
});
