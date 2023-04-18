const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: './index.js',
    output: {
        clean: true,
        path: __dirname + '/dist',
        filename: 'bundle.js',
    },
    module: {
        rules: [
            { test: /.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /.js$/, use: ['babel-loader'] },
            {
                test: /\.html$/i,
                loader: "html-loader",
                options: {
                    sources: {
                        list: [
                            {
                                tag: "img",
                                attribute: "src",
                                type: "src",
                            }
                        ]
                    },
                },
            },
            { test: /\.(jpg|png)$/, type: 'asset/resource', generator: { filename: 'images/[name][ext]' } }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({ template: 'index.html', filename: 'index.html' }),
        new HTMLWebpackPlugin({ template: 'templates/marketplace-page.html', filename: 'templates/marketplace-page.html' }),
        new HTMLWebpackPlugin({ template: 'templates/inventory-page.html', filename: 'templates/inventory-page.html' }),
        new HTMLWebpackPlugin({ template: 'templates/pending-orders-page.html', filename: 'templates/pending-orders-page.html' }),
        new HTMLWebpackPlugin({ template: 'templates/my-orders-page.html', filename: 'templates/my-orders-page.html' })
    ],
    devServer: {
        hot: false,
        liveReload: true
    }
}