import common from './rollup-common-config.mjs';

const config = common();
Object.assign(config.output, {
  file: './dist/promiso.mjs',
  format: 'es',
});

export default config;
