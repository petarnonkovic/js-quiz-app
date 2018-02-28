
# js-quiz-app

Simple Javascript Quiz App. One of small show of code projects.

## Prerequisites

To run this app youll need properlly installed
* [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
* [Node.js](http://nodejs.org/) (with NPM)
 |or|
* [Yarn](https://yarnpkg.com/en/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `yarn install` or `npm install`

## Running / Development

> JSONPlaceholder Server
* `json-server --watch server/db.json --port 3001`

> with Yarn

 Compile scss to css and start browserSync --watch developlment server
* `yarn run start:dev`

 Build dist/ directory with compiled and minificated assets
 * `yarn run build:dist`

 Start server from dist directory
  * `yarn run start:dist`

 Clean dist directory
 * `yarn run clean`

> with Gulp

 Compile scss to css and start browserSync --watch developlment server
* `gulp`

Build dist/ directory with compiled and minificated assets
* `gulp build`

 Start server from dist directory
 * `gulp serve`

 Clean dist directory
 * `gulp clean:dist`


### Running Tests
>
