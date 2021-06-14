const { watch, series, src, dest, task } = require("gulp");
const stylus = require("gulp-stylus");
const autoprefixer = require("autoprefixer-stylus");
const concat = require("gulp-concat");
const jsImport = require("gulp-js-import");
const babel = require("gulp-babel");
const minify = require("gulp-minify");
const clone = require("gulp-clone");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create("store"),
    proxyCheckout = require("browser-sync").create("checkout");

const paths = {
    DIST: "dist",
    PROXYLOCAL: "http://localhost:3000/",
    CSS: "src/styl",
};

let innerIp1 = "/auaha.bundle.css";

let innerIp2 = "css/app.min.css";

function browser() {
    browserSync.init({
        proxy: paths.PROXYLOCAL,
        port: 3000,
        serveStatic: [
            {
                route: "/rmb.bundle.css",
                dir: "./styles/rmb.bundle.css",
            },
            {
                route: "/app.bundle.css",
                dir: "./styles/rmb.bundle.css",
            },
            {
                route: "app.bundle.js",
                dir: "./styles/app.bundle.js",
            },
        ],
        rewriteRules: [
            {
                match: new RegExp(innerIp1, "gi"),
                fn: function (req, res, match) {
                    return "/rmb.bundle.css";
                },
            },
        ],
    });
}

function script() {
    return src(__dirname + "/src/js/**/*.js")
        .pipe(jsImport({ hideConsole: true }))
        .pipe(
            babel({
                presets: ["@babel/env"],
            })
        )
        .pipe(concat("app.bundle.js"))
        .pipe(
            minify({
                ext: {
                    src: ".js",
                    min: ".min.js",
                },
                exclude: ["tasks"],
                ignoreFiles: [".combo.js", "-min.js"],
            })
        )
        .pipe(dest("./styles"));
}

function style() {
    return src(__dirname + "./src/css/**/**.styl")
        .pipe(sourcemaps.init())
        .pipe(
            stylus({
                "include css": true,
                use: [autoprefixer("iOS >= 7", "last 1 Chrome version")],
                compress: true,
                linenos: true,
                import: __dirname + "/src/css/settings.styl",
            })
        )
        .pipe(concat("./rmb.bundle.css"))
        .pipe(sourcemaps.write())
        .pipe(dest("./styles"))
        .on("error", function (err) {
            console.log(err);
            this.emit("end");
        })
        .pipe(browserSync.stream());
}

function build() {
    var stream = src(__dirname + "/src/css/**/**.styl")
        .pipe(sourcemaps.init())
        .pipe(
            stylus({
                "include css": true,
                use: [autoprefixer("iOS >= 7", "last 1 Chrome version")],
                compress: true,
                linenos: true,
                import: __dirname + "/src/css/settings.styl",
            })
        )
        .pipe(concat("rmb.bundle.css"))
        .pipe(sourcemaps.write())
        .pipe(dest("./styles"));

    stream
        .pipe(clone())
        .pipe(cleanCSS({ compatibility: "ie8" }))
        .pipe(sourcemaps.write()) // write the sourcemap
        .pipe(rename("app.min.css")) // add .min to the filename
        .pipe(dest("./styles"))
        .on("error", function (err) {
            console.log(err);
            this.emit("end");
        });

    return stream;
}

exports.style = style;

exports.init = series(style, script);

exports.build = series(build);

exports.browser = series(browser);
exports.script = series(script);

exports.default = () => {
    browser();
    watch(__dirname + "/src/css/**/**.styl", series(style));
    watch(__dirname + "/src/js/**/**.js", series(script));
};
