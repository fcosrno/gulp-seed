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

# Configuration

For the most part, tasks can be configured in the `config.json` file so you don't need to modify each module file directly. However, for custom behavior, feel free to modify modules directly.

## Callbacks (running modules sequentially)

Each module has a `runAfter` property. This is an array of gulp tasks that run asynchroniously before the task. It will be injected as the second parameter of `gulp.task()` (common gulp behavior).

Keep in mind that even though the `runAfter` property is an array, these tasks are not run in the array order you set them. If you want to run tasks sequentially, set one task to run after the other.

Here is an example if you want to run tasks in the following order: less->jade->javascript

    {
        "less":{
            "runAfter":[]
        },
        "jade":{
            "runAfter":["less"]
        },
        "javascript":{
            "runAfter":["jade"]
        }
    }

# Modules

## Copy

`gulp/tasks/copy.js`

Copies files from one place to the other. Works best in src->dest environments for fonts and other misc files like ".ico". Don't use this for images, though. Look for that module below.

Define target paths in `gulp/config.json`

    {
        "copy":{
          "from": ["./src/fonts/*","./src/favicon.ico"],
          "to": ["./dist/fonts","./dist"],
          "runAfter": ["images"]
        }
    }

## Clean

`gulp/tasks/clean.js`

Deletes files in target paths.

Install dependencies.

    npm install --save-dev gulp-clean

Define target paths in `gulp/config.json`

    {
        "clean": {
            "target": [
                "./app/js/**/*.js",
                "./app/**/*.html",
                "./app/css/**/*.css"
            ],
            "runAfter": []
        }
    }

## Inject

`gulp/tasks/inject.js`

Injects JS and CSS into your HTML. If you run inject you can skip watching javascript, css and jade.

Install dependencies.

    npm install --save-dev gulp-inject

Define source and destination paths in `gulp/config.json`

    {
        "inject": {
            "from": "./app/js/**/*.js",
            "to": "./app/index.html",
            "folder": "./app",
            "options":{
                "relative": false,
                "ignorePath":"dist"
            },
            "runAfter": ["javascript"]
        }
    }

Note `folder` is the folder where `to` resides. Seems redundant, but it's a requirement.

## Javascript

`gulp/tasks/javascript.js`

Concat, minify, rename, and rev. Should be used together with inject.

Install dependencies.

    npm install --save-dev gulp-uglify gulp-rev gulp-concat

 Define source and destination paths in `gulp/config.json`

     {
         "javascript": {
             "from": [
                 "./node_modules/angular/angular.js",
                 "./node_modules/angular-route/angular-route.js",
                 "./node_modules/angular-filter/dist/angular-filter.js",
                 "./node_modules/lodash/index.js",
                 "./src/ui-bootstrap-custom-build/ui-bootstrap-custom-tpls-0.14.3.js",
                 "./src/app.js",
                 "./src/DataService.js",
                 "./src/**/*.js"
             ],
             "to": "./app/js",
             "filename": "script.js",
             "runAfter": ["jade"]
         }
     }

## Jade

`gulp/tasks/jade.js`

Install dependencies

    npm install --save-dev gulp-jade

 Define source and destination paths in `gulp/config.json`

    {
        "jade": {
            "from": "./src/**/*.jade",
            "to": "./app",
            "runAfter": ["less"]
        }
    }

## Docker

`gulp/tasks/docker.js`

Install dependencies

    npm install --save-dev yargs

Define environment variables in `gulp/config.json`

    {
        "docker":{
                "project":"example",
                "machine":"default",
                "path_to_containers":"./containers"
        }
    }

`path_to_containers` is the location of your containers folder relative to the location of `gulpfile.js`

`project` is your project's slug. This is usually the name of your project folder that will be served with `.dev`. This should be the same value you put into your `docker-compose-dev.yml` file. [Read the Docker Seed documentation for more](https://github.com/fcosrno/docker-seed).

`machine` is the name of the active Docker Machine you're using to serve this project. You can see it by running `docker-machine ls`.

## BrowserSync
`gulp/tasks/browser-sync.js`

Install dependencies

    npm install --save-dev browser-sync

Define config in `gulp/config.json`

    {
        "browserSync": {
          "open": false,
          "proxy": "http://example.dev",
          "socket": {
              "domain": "http://172.31.98.43:3000"
          },
          "browser": ["google-chrome"],
          "notify": true
        },
    }

`browserSync` is the [options](http://www.browsersync.io/docs/options/) required when you initialize BrowserSync.


## browserSyncWatch

An abstractio of gulp-watch and browser-sync to get [browser reloading](https://www.browsersync.io/docs/gulp/#gulp-reload) working correctly, ie at the very end of the build. The config structure is the same as the watch module.
    {
        "browserSyncWatch": {
            "files": [
                "./src/**/*.js",
                "./src/**/*.jade",
                "./src/**/*.scss"
            ],
            "runAfter": ["inject"]
        }
    }

## Less

`gulp/tasks/less.js`

Install dependencies.

    npm install --save-dev gulp-autoprefixer gulp-less gulp-minify-css

Define config in `gulp/config.json`

    {
        "tasksPath": "./gulp/tasks",
        "less": {
            "from": "./src/style.less",
            "to": "./app/css",
            "runAfter": []
        }
    }

## Watch
`gulp/tasks/watch.js`

Install dependencies

    npm install --save-dev gulp-watch

Define config in `gulp/config.json`

    {
        "watch": {
            "files": [
                "./src/**/*.js",
                "./src/**/*.jade",
                "./src/style.less"
            ],
            "runAfter": []
        }
    }

## Images
`gulp/tasks/images.js`

Run lossless compression on all the images.

Install dependencies

    npm install --save-dev gulp-imagemin

Define config in `gulp/config.json`

    {
        "images": {
            "from": "./app/img/*",
            "to": "./app/build",
            "options": {
                "progressive": true,
                "interlaced": true,
                "svgoPlugins": [{
                    "removeUnknownsAndDefaults": false
                }, {
                    "cleanupIDs": false
                }]
            },
            "runAfter": []
        }
    }


## SASS
`gulp/tasks/sass.js`

Compile SASS to minified css.

Install dependencies

    npm install --save-dev gulp-sass gulp-rev gulp-autoprefixer gulp-minify-css

    Define config in `gulp/config.json`

        {
            "sass": {
              "from": "./src/sass/styles.scss",
              "to": "./dist",
              "options": {
                "outputStyle": "compressed"
              },
              "runAfter": ["images"]
            }
        }

# TODO

- Fix teardown with docker rm --force $(docker ps --filter "name=projectname" -q)
- Add [Angular2 related modules](http://blog.scottlogic.com/2015/12/24/creating-an-angular-2-build.html?utm_campaign=NG-Newsletter&utm_medium=email&utm_source=NG-Newsletter_129)
- Add [nodemon task](https://gist.github.com/fcosrno/71735ed85a8ce4e7b209)
- View tutum angular example gulpfile for ideas

# References

1. [Modular Gulp](https://www.packtpub.com/books/content/modular-gulp-tasks)
2. [Make your Gulp modular](http://makina-corpus.com/blog/metier/2015/make-your-gulp-modular)
