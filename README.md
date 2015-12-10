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

## Javascript

`gulp/tasks/javascript.js`

Concat, minify, rename, and rev. Should be used together with inject.

Install dependencies.

    npm install --save-dev gulp-uglify gulp-rev gulp-concat

 Define source and destination paths in `gulp/config.json`

     {
         "tasksPath": "./gulp/tasks",
         "jsSrcPath":["./node_modules/angular/angular.js","./src/**/*.js"],
         "jsDistPath":"./app/js",
     }

## Jade

`gulp/tasks/jade.js`

Install dependencies

    npm install --save-dev gulp-jade

 Define source and destination paths in `gulp/config.json`

    {
        "tasksPath": "./gulp/tasks",
        "jadeSrcPath": "./src/**/*.jade",
        "jadeDistPath": "./app"
    }

## Docker

`gulp/tasks/docker.js`

Install dependencies

    npm install --save-dev yargs

Define environment variables in `gulp/config.json`

    {
        "tasksPath": "./gulp/tasks",
        "dockerContainersPath": "./containers",
        "dockerProject":"project_slug",
        "dockerMachine":"default"
    }

`dockerContainersPath` is the location of your containers folder relative to the location of `gulpfile.js`

`dockerProject` is your project's slug. This is usually the name of your project folder that will be served with `.dev`. This should be the same value you put into your `docker-compose-dev.yml` file. [Read the Docker Seed documentation for more](https://github.com/fcosrno/docker-seed).

`dockerMachine` is the name of the active Docker Machine you're using to serve this project. You can see it by running `docker-machine ls`.

## BrowserSync
`gulp/tasks/browser-sync.js`

Install dependencies

    npm install --save-dev browser-sync

Define config in `gulp/config.json`

    {
        "tasksPath": "./gulp/tasks",
        "browserSync": {
            "open": false,
            "proxy": "http://example.dev",
            "socket": {
                "domain": "http://192.168.1.127:3000"
            },
            "browser": ["google-chrome"],
            "notify": true
        },
        "browserSyncWatch":["./app/**/*.*"]
    }

`browserSync` is the [options](http://www.browsersync.io/docs/options/) required when you initialize BrowserSync.

`browserSyncWatch` is the location that will trigger the browser refresh.

## Watch
`gulp/tasks/watch.js`

Install dependencies

    npm install --save-dev gulp-watch

## Image Minification
`gulp/tasks/image-minification.js` To be documented.
## JS Uglify
`gulp/tasks/js-uglify.js` To be documented.
## SASS Compile
`gulp/tasks/sass-compile.js` To be documented.
## Less Compile
`gulp/tasks/less-compile.js` To be documented.

# TODO

- Add [nodemon task](https://gist.github.com/fcosrno/71735ed85a8ce4e7b209)
- View tutum angular example gulpfile for ideas

# References

1. [Modular Gulp](https://www.packtpub.com/books/content/modular-gulp-tasks)
2. [Make your Gulp modular](http://makina-corpus.com/blog/metier/2015/make-your-gulp-modular)
