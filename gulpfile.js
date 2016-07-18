"use strict";

var gulp = require("gulp");
var connect = require("gulp-connect");
var open = require("gulp-open");
var browserify = require("browserify");
var reactify = require("reactify");
var source = require("vinyl-source-stream");
var concat = require("gulp-concat");

var config = {
	port: 9050,
	devBaseUrl: "http://localhost",
	paths: {
		html: "./client/src/*.html",
		js: "./client/src/**/*.js",
		mainJs: "./client/src/main.js",
		images: "./client/src/images/*",
		css: [
			"node_modules/bootstrap/dist/css/bootstrap.min.css",
			"node_modules/bootstrap/dist/css/bootstrap-theme.min.css",
			"node_modules/toastr/build/toastr.css",
			"./client/src/*.css"
		],
		dist: './dist',
	}
}
// creates the dev server with terminal
gulp.task("connect", function() {
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devbaseUrl,
		livereload: true
	});
});
gulp.task("open", function() {
	gulp.src("dist/index.html")
		.pipe(open({uri: config.devBaseUrl + ":" + config.port + "/"}))
})

gulp.task("html", function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

gulp.task("css", function() {
	gulp.src(config.paths.css)
		.pipe(concat("bundle.css"))
		.pipe(gulp.dest(config.paths.dist + "/css"))
		.pipe(connect.reload());
});

gulp.task("images", function() {
	gulp.src(config.paths.images)
		.pipe(gulp.dest(config.paths.dist + "/images"))
		.pipe(connect.reload());
});

gulp.task("js", function() {
	browserify(config.paths.mainJs)
		.transform(reactify)
		.bundle()
		.on("error", console.error.bind(console))
		.pipe(source("bundle.js"))
		.pipe(gulp.dest(config.paths.dist + "/scripts"))
		.pipe(connect.reload());
});

gulp.task("watch", function() {
	gulp.watch(config.paths.html, ["html"]);
	gulp.watch(config.paths.js, ["js"]);
	gulp.watch(config.paths.css, ["css"]);
});

gulp.task("default", ["html", "css", "js", "images", "open", "watch"])