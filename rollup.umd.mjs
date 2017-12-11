import common from './rollup-common-config.mjs';

const config = common();
Object.assign(config.output, {
  file: './dist/promiso.js',
  format: 'umd',
  name: 'promiso',
});

export default config;
