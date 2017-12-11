import uglifyPlugin from 'rollup-plugin-uglify-es';
import common from './rollup-common-config.mjs';

const config = common();
Object.assign(config.output, {
  file: './dist/promiso.min.js',
  format: 'umd',
  name: 'promiso',
});
config.plugins.push(uglifyPlugin());

export default config;
