Every Letter Art
================

Repository for the Every Letter Art site.



Setup
-----
To run this you'll need [node](https://nodejs.org/) and [gulp](http://gulpjs.com/) installed.
Run `npm install` in the root of the project to install all needed dependencies.



Compiling for Development
-------------------------
By default, `gulp` is running all tasks in development mode. The default task is
linked to `gulp build`. After deleting the `dist` folder, it compiles and copies
all files from the `src` folder to the `dist` folder.

Once it's done compiling it launches a `browserSync` session so you don't have to
press F5 all the time.



Compiling for Production
------------------------
Running `gulp --production` will clean the `dist` folder and minifies
and optimizes all the code so it's ready to deploy on a production server.

The `--production` flag marks a `gulp` task for production.