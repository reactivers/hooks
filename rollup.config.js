import babel from '@rollup/plugin-babel';
import external from 'rollup-plugin-peer-deps-external';
import del from 'rollup-plugin-delete';
import pkg from './package.json';
import resolve from "rollup-plugin-node-resolve";

export default {
    input: pkg.source,
    output: [
        {file: pkg.main, format: 'cjs'},
        {file: pkg.module, format: 'esm'}
    ],
    watch: {
        include: [pkg.source, "src/*"],
        exclude: 'node_modules/**'
    },
    plugins: [
        external({
            includeDependencies: true
        }),
        resolve(),
        babel({
            exclude: 'node_modules/**',
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        }),
        del({targets: ['dist/*']}),
    ],
    external: Object.keys(pkg.peerDependencies || {})
};
