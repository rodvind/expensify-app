const path = require('path');
const webpack = require('webpack');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// Environment variable - stores the environment we are currently in
// This is automatically sets for us on Heroku. Heroku sets this value 
// to string production. To set it in our test environment. Its value
// either be test, which for test, or production which is for
// production, or undefined which is for development environment
// In order to set this value for our test environment, we should add
// the environment variable to our script in webpack.congig.js file for
// test property: "test": "cross-env NODE_ENV=test"
process.env.NODE_env = process.env.NODE_env || 'development';

if (process.env.NODE_env === 'test') {
  require('dotenv').config({ path: '.env.test' });
} else if (process.env.NODE_env === 'development') {
  require('dotenv').config({ path: '.env.development' });
}

module.exports = (env) => {
  const isProduction = env === 'production';
  //const CSSExtract = new ExtractTextPlugin('styles.css');
  const CSSExtract = new MiniCssExtractPlugin({ filename: 'styles.css' });
  console.log('env', env);
  return {
    entry: ['babel-polyfill', './src/app.js'],
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename:'bundle.js'
    },
    module: 
    {
      rules:
      [
        {
          loader: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/
        }, 
        {
          test: /\.s?css$/,
            use: [
              MiniCssExtractPlugin.loader, 
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          
          
          // use: CSSExtract.extract({
          //   use: [
          //     'css-loader',
          //     'sass-loader'
          //   ]
          // })
          // use: [
          //   'style-loader',
          //   'css-loader',
          //   'sass-loader'
          // ]
        }
    ]
    },
    plugins: [
      CSSExtract,
      new webpack.DefinePlugin({
        'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
      })
    ],
    //devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/'
    }
  };
};

// module.exports = {
//     entry: './src/app.js',
//     output: {
//         path: path.join(__dirname, 'public'),
//         filename:'bundle.js'
//     },
//     module: {
//         rules:[{
//             loader: 'babel-loader',
//             test: /\.js$/,
//             exclude: /node_modules/
//         }, {
//             test: /\.s?css$/,
//             use: [
//                 'style-loader',
//                 'css-loader',
//                 'sass-loader'
//             ]
//         }]
//     },
//     devtool: 'cheap-module-eval-source-map',
//     devServer: {
//         contentBase: path.join(__dirname, 'public'),
//         historyApiFallback: true
//     }
// };