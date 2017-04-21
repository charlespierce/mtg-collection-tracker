import rollupTs from 'rollup-plugin-typescript';
import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import typescript from 'typescript';

const isProd = process.env.NODE_ENV === "production";

export default {
    entry: "src/index.tsx",
    external: [
        "react",
        "react-dom"
    ],
    plugins: [
        nodeResolve(),
        rollupTs({ typescript }),
        isProd && uglify()
    ],
    dest: "dist/bundle.js",
    format: "iife",
    globals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};
