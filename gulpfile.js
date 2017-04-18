const path = require('path');
const gulp = require('gulp');
const clean = require('gulp-clean');
const rollup = require('rollup');
const uglify = require('rollup-plugin-uglify');
const nodeResolve = require('rollup-plugin-node-resolve');
const ts = require('gulp-typescript');

const dist_folder = "./dist/";
const staging_folder = "./dist-staging/";
const static_folder = "./static/";

const tsProject = ts.createProject("tsconfig.json");

function createBundle(isProd) {
    return rollup.rollup({
        entry: path.join(staging_folder, "index.js"),
        external: [
            "react",
            "react-dom"
        ],
        plugins: [
            nodeResolve(),
            isProd && uglify()
        ]
    }).then((bundle) => {
        bundle.write({
            dest: path.join(dist_folder, "bundle.js"),
            format: "iife",
            globals: {
                "react": "React",
                "react-dom": "ReactDOM"
            }
        });
    });
}

gulp.task("clean", function () {
    return gulp.src([dist_folder, staging_folder], { read: false }).pipe(clean());
});

gulp.task("compile", function () {
    return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest(staging_folder));
});

gulp.task("copy-static", function () {
    return gulp.src(path.join(static_folder, "**")).pipe(gulp.dest(dist_folder));
});

gulp.task("build", ["copy-static", "compile"], function () {
    return createBundle(true);
});

gulp.task("build-dev", ["copy-static", "compile"], function () {
    return createBundle(false);
});

gulp.task("watch", ["build-dev"], function () {
    gulp.watch(tsProject.config.include.concat(path.join(static_folder, "**")), ["build-dev"]);
});
