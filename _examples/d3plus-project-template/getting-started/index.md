---
title: Getting Started
width: 100
height: 100
---

[width]: 100
[height]: 100

# Getting Started

This is the place to be if you want to create your own D3plus module. Here are the steps to get your module up and running:

1. Copy the contents of this repo into your new repository.
2. Install the Node Package Manager (NPM).
> <sub>If on a Mac, we suggest using [Homebrew](http://brew.sh/) to install packages on your machine. Once that's installed, you can install node (which includes npm) by running: `brew install node`</sub>
3. Install all current dependencies:
```sh
npm i
```

And that's it! Now your environment should be all set up and ready to go.

### Writing Code

With the introduction of modules in D3plus 2.0, all code is transpiled using [buble](http://buble.surge.sh/), which allows usage of most of good bits from ES6. If you are unfamiliar with ES6, then normal vanilla javascript works fine as well. All source code lives in the `/src/` director.

### Running the Development Server

To test your code live in a browser, with auto-compiling and hot reloading, type this into your shell:

```sh
npm run dev
```

You can then go to `http://localhost:4000/test/` in your preferred browser to test your code live.

### Code Documentation

All of the Documentation you see in the README file is generated automagically based on the [JSDoc](http://usejsdoc.org/) formatted comments within each source file. This removes the nuscence of having to write documentation after the fact, and enforces strict code commenting. To regenerate the documentation, simply run:

```sh
npm run docs
```

### Tests

Any time you write a new feature in your module, you should also be writing tests. D3plus modules come bundled with a test suite that let's you write [tape](https://github.com/substack/tape) tests using full ES6, which are then run directly in a headless Electron browser.

All tests need to be placed in the `/test/` directory, and the filenames should match up to the components in `/src/`. To run all tests, run:

```sh
npm test
```

### Examples

All D3plus 2.0 examples seen on [d3plus.org](https://d3plus.org) are created from within their respective repositories. The examples are parsed from any markdown files placed in the `/example/` directory, with the following rules:

#### Title

Example titles are extracted from the first H1 present in the file. Generally, the first line of the file will be the title:

```md
# My Cool Example
```

#### Slug

The slug used in the URL on [d3plus.org](https://d3plus.org) is taken directly from the filename. A file with the following path:

```sh
/example/my-cool-example.md
```

Would end up at the following URL:

```sh
https://d3plus.org/examples/d3plus-project-template/my-cool-example/
```

#### HTML

Any `css`, `html`, or `js` code block present in an example will be extracted and rendered into a static HTML file. This is what gets used on [d3plus.org](https://d3plus.org), and also let's us take screenshots!

#### Screenshots

A screenshot of each example is generated from the rendered HTML. By default, each screenshot is 990x400 in size, but specific dimensions can be given using markdown relative links:

```md
[width]: 100
[height]: 100
```

For the purposes of this example, let's make a red square that will be rendered in HTML.

```css
.square {
  background-color: red;
  height: 100px;
  width: 100px;
}
```

```html
<div class="square"></div>
```
