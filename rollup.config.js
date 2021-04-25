import external from 'rollup-plugin-peer-deps-external';
import del from 'rollup-plugin-delete';
import pkg from './package.json';
import resolve from "rollup-plugin-node-resolve";
import typescript from 'rollup-plugin-typescript2';

export default {
    input: pkg.source,
    output: [
        { file: pkg.maines, format: 'es', },
        { file: pkg.main, format: 'cjs', },
        { file: pkg.module, format: 'esm' }
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
        typescript({
            useTsconfigDeclarationDir: true,
            tsconfigOverride: {
                exclude: ['**/*.stories.*'],
            },
        }),
        del({ targets: ['dist/*'] }),
    ],
    external: Object.keys(pkg.peerDependencies || {})
};
