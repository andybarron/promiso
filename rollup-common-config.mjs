import typescriptPlugin from 'rollup-plugin-typescript2';
import typescript from 'typescript';
 
export default () => ({

  input: './src/index.ts',

  output: {
    sourcemap: true,
  },
  
  plugins: [
    typescriptPlugin({
      typescript,
    }),
  ],

});
