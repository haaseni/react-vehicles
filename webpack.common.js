const path = require('path');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {       
   entry: { 'main': './src/index.js' },   
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',      
      publicPath: '/dist/'
   },
   optimization: {
      minimizer: [
         new UglifyJsPlugin({ 
            test: /\.js(\?.*)?$/i
         })
      ]
   },
   resolve: {
      extensions: ['*', '.js', '.jsx']
   },
   plugins: [
      new HtmlWebpackPlugin({
         title: 'Vehicles',
         template: './src/index.html',
         filename: 'index.html'
      })
   ],
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules)/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: [
                     '@babel/preset-env',
                     '@babel/preset-react'                     
                  ],
                  plugins: [
                      "@babel/plugin-syntax-dynamic-import",
                      "@babel/plugin-proposal-class-properties"
                  ]
               }
            }
         },
         {
            test: /\.css$/,             
            use: [
               { loader: "style-loader" },
               { loader: "css-loader" }
            ]
         }
      ]
   }
};