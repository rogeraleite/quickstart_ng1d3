# prototype-template (multivariate cycle plot)

This project is initially supported by [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

Try it online: http://rogeraleite.github.io/vis_prototype_template

## Build & development

After creating a clone of the repository in your local environment run...

..install dependencies: 
- bower install
- npm install

..build grunt:
- grunt (for building)

..run project preview:
- grunt serve


## Testing

Running `grunt test` will run the unit tests with karma.

## Suggested Development Environment

- Sublime
- SourceTree

## Making the project available in gh-pages

You will need to:
   (1) copy the bower_components folder to the "/app" folder.
		- it will be probably needed to redo this process each time a new library is added.
   (2) deploy the subfolder "/app" to GitHub Pages.
		- grunt push-pages

(future complications in this topic can be studied in this thread: https://gist.github.com/cobyism/4730490)


