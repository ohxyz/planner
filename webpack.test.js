module.exports = {
    
    mode: 'development',
    entry: './test/index.js',
    output: {
        path: __dirname + '/test',
        filename: 'bundle.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: __dirname + '/test',
        compress: true,
        port: 5010,
        open: true
    },
    resolve: {
        alias: {
            ['~']: __dirname + '/src'
        }
    },
    module: {
        rules: [ 
            {
                test: /\.js[x]{0,1}$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { 
                        loader: "css-loader",
                        options: { 
                            modules: { 
                                auto: true,
                                localIdentName: '[local]--[hash:base64:5]',
                            }
                        }
                    }
                ]
            }
        ]
    }
};