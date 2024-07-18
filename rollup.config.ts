// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/formValidation/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    }
  ],
  plugins: [
    typescript(),
    babel({ babelHelpers: 'bundled' })
  ],
  external: ['react']
};
