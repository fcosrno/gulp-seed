# Gulp Seed

Modular Gulp tasks for common web development.

# Setup

Clone this repo into your project. In most cases you'll need to clone it into a folder called gulp at your project's root.

    git clone https://github.com/fcosrno/gulp-seed gulp

cd into the new folder and install dependencies with NPM.

    cd gulp && npm install

Copy gulpfile.js.example into your root project folder. 

    cp gulpfile.js.example ../gulpfile.js

Add your configuration to `config.json`. Comment out or delete the lines of tasks you don't need to run in `gulpfile.js` and `gulp/tasks/watch.js` (should document this more).

# Modules

## Watch
`gulp/tasks/watch.js` To be documented.
## Image Minification
`gulp/tasks/image-minification.js` To be documented.
## JS Uglify
`gulp/tasks/js-uglify.js` To be documented.
## SASS Compile
`gulp/tasks/sass-compile.js` To be documented.
## Jade Convert
`gulp/tasks/jade-convert.js` To be documented.
## Less Compile
`gulp/tasks/less-compile.js` To be documented.
## Refresh Browser with BrowserSync
`gulp/tasks/browser-sync.js` To be documented.
## Docker
`gulp/tasks/docker.js` To be documented.


# TODO

- Add [nodemon task](https://gist.github.com/fcosrno/71735ed85a8ce4e7b209)
- View tutum angular example gulpfile for ideas

# References

1. [Modular Gulp](https://www.packtpub.com/books/content/modular-gulp-tasks)
2. [Make your Gulp modular](http://makina-corpus.com/blog/metier/2015/make-your-gulp-modular)
