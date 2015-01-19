# Foundation for Apps .Net Scaffold

This is the default template project for Foundation for Apps for .Net. It's powered by Node, Gulp, Angular, and libsass. It also runs off the .Net WebAPI architecture for service processing. It provides you with a basic template to get started with Angular and Foundation for Apps.

## Details
More information about this scaffold can be found through [this blog post](https://dillieodigital.wordpress.com/2014/12/11/soup-to-nuts-using-zurb-foundation-for-apps-in-net/).

## Requirements

You'll need the following software installed to get started.

  * [Node.js](http://nodejs.org): Use the installer provided on the NodeJS website.
  * [Git](http://git-scm.com/downloads): Use the installer for your OS.
    * Windows users can also try [Git for Windows](http://git-for-windows.github.io/).
  * [Ruby](https://www.ruby-lang.org/en/): Use the installer for your OS. For Windows users, [JRuby](http://jruby.org/) is a popular alternative.
    * With Ruby installed, run `gem install bundler sass`.
  * [Gulp](http://gulpjs.com/) and [Bower](http://bower.io): Run `[sudo] npm install -g gulp bower`

## Get Started

Once you've added this NuGet package to an empty solution, you need to rebuild the client side assets by running the following commands from the project root (not solution root):

```npm install
bower install
bundle
gulp build```

## Configuration Complete
From here you should be able to build and run the app. Anytime you make changes to your front end, make sure to do so from the client folder and then run `gulp build` again.

Build your app and enjoy!