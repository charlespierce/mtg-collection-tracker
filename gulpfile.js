const gulp = require('gulp');
const clean = require('gulp-clean');
const rollup = require('rollup');
const rollupTs = require('rollup-plugin-typescript2');

gulp.task("clean", function () {
    return gulp.src("./build/", { read: false }).pipe(clean());
});

gulp.task("copy-static", function () {
    return gulp.src("./static/**").pipe(gulp.dest("build/"));
});

gulp.task("build", ["copy-static"], function () {
    return rollup.rollup({
        entry: "./src/index.tsx",
        external: [
            "react",
            "react-dom"
        ],
        plugins: [
            rollupTs()
        ]
    }).then((bundle) => {
        bundle.write({
            format: "iife",
            dest: "./build/bundle.js",
            globals: {
                react: "React",
                "react-dom": "ReactDOM"
            }
        });
    });
});
