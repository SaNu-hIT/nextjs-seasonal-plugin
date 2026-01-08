import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/index.js',
            format: 'cjs',
            sourcemap: true,
            banner: "'use client';",
        },
        {
            file: 'dist/index.esm.js',
            format: 'esm',
            sourcemap: true,
            banner: "'use client';",
        },
    ],
    plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        typescript({
            tsconfig: './tsconfig.json',
            declaration: true,
            declarationDir: 'dist',
        }),
        postcss({
            extract: false,
            modules: false,
            inject: true,
        }),
    ],
    external: ['react', 'react-dom', 'next'],
};
