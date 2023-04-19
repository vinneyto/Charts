// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';

export default {
    input: 'src/main.tsx',
    output: {
        file: 'bundle.js',
        format: 'cjs'
    },
    plugins: [
        resolve({
            // pass custom options to the resolve plugin
            moduleDirectories: ['node_modules']
        })
    ],
    // indicate which modules should be treated as external
    external: ['@amcharts']
};
