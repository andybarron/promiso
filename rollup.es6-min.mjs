import uglifyPlugin from 'rollup-plugin-uglify-es';
import common from './rollup-common-config.mjs';

const config = common();
Object.assign(config.output, {
  file: './dist/promiso.min.mjs',
  format: 'es',
});
config.plugins.push(uglifyPlugin());

export default config;
