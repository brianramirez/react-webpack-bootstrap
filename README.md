# Custom Webpack Setup for React

One of the most complex parts I've found with working with React is often setting up the project just to get started. 
Most tutorials and people just tell you to use `create-react-app`, which is great but often leaves you missing a critical 
customization and control over your project as it grows.

This repository is a "bootstrap" of sorts, aimed at helping React developers start building a React app with all the power of a custom Webpack infrastructure, without 
all the manual setup, without having to do much.

Keep in mind that this is project does not mean it will always work right out of the box for all projects and you will likely need to tweak the 
Webpack loaders and configuration as your project and it's dependencies grow. It's just to get you started.

## How to Use

1. Clone or download this repo.
2. In a CLI, open this repo's root directory (there should be a `package.json` visible)
3. Run `yarn install` or `npm install` to install node module dependencies.
4. Run `yarn start` or `npm run start` to load the project.
5. A new browser will launch at `http://localhost:3000`
6. You should see the text "Hello, World"
7. Begin crafting your ReactJS project!

## Project Structure

Since this is not a `create-react-app` built project, it has a bit different directory structure than you might be used to. 

```bash
+ dist
+ node_modules
+ public
|---- index.html
+ src
|---- App.js
|---- index.js
+ webpack
|---- devServer.js
|---- paths.js
|---- reporter.js
|---- webpack.common.js
|---- webpack.dev.js
|---- webpack.parts.js
.babelrc
.package.json
```

### SRC Directory
The `src` directory is pretty self-explanatory; it's where all your React project files go.

### Webpack Directory

This directory houses all the files related to the project's Webpack configuration.

`devServer.js`
This file creates a simple `express` node server for running your React project in your local browser for development. It sets up the port, HMR, and other basic configurations for
the local browser.

`paths.js`
This is a simple folder that exports out the relative paths for your project to be used by Webpack easier.

`reporter.js`
This file is for providing your project with a visual overlay as webpack works or encounters errors.

`webpack.common.js`
As your project grows, you may have multiple configurations for Webpack and they all might share a set of common loaders, configuration, or "parts". This file
creates a common scheme that can be shared by multiple configurations. It loads paths, Javascript, and CSS for starters.

`webpack.dev.js`
This is the basic configuration for your local development that merges with the `webpack.common` configuration. It provides the support loaders required
to run your React project in a local browser as a development configuration. You'll notice that it expands on the `webpack.common` by loading images, fonts, and generating sourcemaps.

`webpack.parts.js`
This is where you add and customize the loaders and configuration items your webpack config could use. The basics have been covered such as loading Javascript, CSS/SCSS/SASS, Fonts, Images, etc.

## License

MIT. Feel free to use this project anyway you'd like and customize it to meet your project's needs. If you like it, just star the repo.