
const config = {
    
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: __dirname + '/public',
        compress: true,
        port: 5000,
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
                                localIdentName: '[local]---[hash:base64:5]',
                            }
                        }
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [ 
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {   
                test: /\.(png|woff|woff2|eot|ttf|otf|svg)$/, 
                use: {
                    loader: 'file-loader',
                }
            }
        ]
    }
};

module.exports = config;