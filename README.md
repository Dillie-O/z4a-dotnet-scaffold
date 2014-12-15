z4a-dotnet-scaffold
===================

###A scaffold for building an application with Zurb for Applications and .Net

####See [this article](https://dillieodigital.wordpress.com/2014/12/11/soup-to-nuts-using-zurb-foundation-for-apps-in-net/) for full details on how it was built and its structure.

#### NuGet package available [here](https://www.nuget.org/packages/z4a-dotnet-scaffold).

##Details
This scaffold provides a .Net solution built with the following components.

* Zurb Foundation For Apps (Z4A)
* .Net Framework 4.5
* WebAPI 2 (no OData)

You will need to make sure you have these libraries in place for Z4A builds:

* Node.js
* Node Package Manager (npm)
* Git
* Ruby
* Ruby bundler package
* Ruby sass package
* Gulp
* Bower

##Usage
Clone / Download the scaffold and load it up in Visual Studio. Give it a build and run the site. I've already done the in initial Z4A build so you can see the client side code in action. There is also a simple WebAPI method (visible on the news page) to demonstrate how to call the underlying API and how AngularJS's binding work.

Any front end changes need to be done with the files in the client folder. See note below regarding custom controllers. After making your UI changes, use the Task Runner Explorer or run `gulp build` from the command prompt to have your updates recompiled into the appropriate front end resources.

##Development Note
Currently if you want to build out any controller actions, you must do this within the `bower_components\foundation-apps\assets\js\controllers.js` file. I believe there are updates to the framework in place so that you won't lose your code with any subsequent framework updates.

##Feedback
I'm working on setting up a NuGet package for this, but I'd love it if an experienced NuGet packager can drop me a line or even build one, since I'm still getting my feet wet with that.

If you know a way to fix the custom controller issue mentioned above in the developer notes, please drop me a line as well. I'm no AngularJS guru and would love to know what I'm missing.

Feel free to post any other issues/comments/forks here. Hopefully this can be a great resource moving forward for others wanting to develop on these platforms!