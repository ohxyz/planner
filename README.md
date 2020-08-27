# Basic setup of a React project

This is _NOT_ a npm package intended for installation. So do _NOT_ install it, e.g. by `npm i react-get-started`.

This is a basic setup of React with Babel, Webpack. If you don't like `create-react-app`, it's probably the way you could go.

# Get started
Go to https://github.com/ohxyz/react-get-started

1. Create a folder e.g. `my-react-project`.
2. Copy all<sup>[1]</sup> content of this repo to the folder created.<sup>[2]</sup>
3. Go to `my-react-project`, run `npm i`.
4. Run `npm run dev`.

### Foot notes
[1] If you are not using Git, then don't copy `.gitignore`.

[2] Click the green button `Clone or download` in this Github page and select `Download ZIP`. Unzip the file, and you'll get e.g. `react-get-started-master`. Copy all the content in `react-get-started-master` to `my-react-project`.

### Tips
If you don't like the browser auto-reloads every time you change the code, then add `inline: false` to `devServer` property in `webpack.dev.config.js`.

```
...
devServer: {
    contentBase: outputPath,
    compress: true,
    port: 5000,
    inline: false
}
...
```

# Develop with `less`
```
npm i --save-dev less less-loader
```

In `webpack.dev.config.js`, add settings of plugins in `rules`.
```
rules: [
    ...,
    
    {
        test: /\.less$/,
        use: [ 
            { loader: "style-loader" },
            { loader: "css-loader" },
            { loader: "less-loader" }
        ]
    }
]
```

Then, you can add paths of `less` files in your source code, e.g.
```
import React from 'react';
require( './less/main.less' );
```
