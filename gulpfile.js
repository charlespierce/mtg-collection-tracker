const gulp = require('gulp');
const clean = require('gulp-clean');
const rollup = require('rollup');
const uglify = require('rollup-plugin-uglify');
const ts = require('gulp-typescript');

const tsProject = ts.createProject("tsconfig.json");

gulp.task("clean", function () {
    return gulp.src("./build/", { read: false }).pipe(clean());
});

gulp.task("ts-clean", function () {
    return gulp.src("./build-staging/", { read: false }).pipe(clean());
});

gulp.task("ts-build", ["ts-clean"], function () {
    return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("./build-staging/"));
});

gulp.task("copy-static", ["clean"], function () {
    return gulp.src("./static/**").pipe(gulp.dest("build/"));
});

function createBundle(isProd) {
    return rollup.rollup({
        entry: "./build-staging/index.js",
        external: [
            "react",
            "react-dom"
        ],
        plugins: [
            isProd && uglify()
        ]
    }).then((bundle) => {
        bundle.write({
            dest: "./build/bundle.js",
            format: "iife",
            globals: {
                "react": "React",
                "react-dom": "ReactDOM"
            }
        });
    });
}

gulp.task("build", ["copy-static", "ts-build"], function () {
    return createBundle(true);
});

gulp.task("build-dev", ["copy-static", "ts-build"], function () {
    return createBundle(false);
});
