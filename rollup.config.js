import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
    input: 'src/index.js',
    output: {
        file: 'index.js',
        format: 'cjs',
        path: 'dist',
    },
    plugins: [
        resolve(),
        babel({
            exclude: 'node_modules/**', // only transpile our source code
        }),
    ],
};
