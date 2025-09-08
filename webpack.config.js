const

  webpack = require("webpack"),
  CopyPlugin = require("copy-webpack-plugin"),
  dotenv = require('dotenv').config({ path: __dirname + '/.env' }),
  TerserPlugin = require("terser-webpack-plugin"),
  ProgressPlugin = require('progress-webpack-plugin'),

  path = require('path'),
  packs = require('./package.json')

module.exports = (env, args) => {

  env.LOCAL = dotenv.parsed.LOCAL === 'true'
  env.NODE_ENV = JSON.stringify(args.mode)
  env.BABEL_ENV = JSON.stringify(args.mode)
  env.DEBUG = args.mode === 'development' ? true : false

  console.debug(
    {
      version: packs.version,
      appName: packs.app.title,
      ...env
    }
  )

  return {

    mode: env.mode,
    devtool: env.DEBUG ? 'inline-source-map' : false,
    cache: !env.DEBUG,
    stats: {
      errorDetails: env.DEBUG,
      errorStack: env.DEBUG
    },
    infrastructureLogging: { level: 'error' },
    target: 'web',
    profile: true,

    devServer: {

      port: packs.appPort,
      compress: !env.DEBUG,
      magicHtml: env.DEBUG,
      liveReload: env.DEBUG,
      hot: env.DEBUG,
      open: false,

      server: {
        options: {
          spdy: true,
          http2: true
        }
      },

      static: {
        directory: path.join(__dirname, 'dist'),
        publicPath: '/'
      },

      historyApiFallback: {
        rewrites: [
          { from: /^\/$/, to: '/' }
        ]
      },

      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        'Author': packs.author.name
      },

      webSocketServer: 'ws',

      client: {
        overlay: env.DEBUG,
        webSocketTransport: 'ws',
        //progress: env.DEBUG,
      },

    },

    entry: {
      index: ['./index.tsx']
    },

    output: {
      clean: true,
      // filename: `[name]_${Math.floor(100000000 + Math.random() * 900000000)}.js`,
      filename: `[name].js`,
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },

    optimization: {
      minimize: !env.DEBUG,
      minimizer: [
        new TerserPlugin({
          extractComments: !env.DEBUG
        })
      ]
    },

    externals: {
      'ConfigData': {
        author: packs.author.name,
        URL: packs.author.url
      }
    },
    externals: {
  react: "react",
  "react-dom": "react-dom"
},

    performance: {
      hints: env.DEBUG
        ? 'error'
        : false,
      maxEntrypointSize: 51200000,
      maxAssetSize: 51200000
    },

    resolve: {

      fallback: {
        "fs": false
      },

      alias: {
        Assets: path.resolve(__dirname, 'public/assets'),
        Core: path.resolve(__dirname, 'src/core'),
        Components: path.resolve(__dirname, 'src/components'),
        Scripts: path.resolve(__dirname, 'src/scripts'),
        Root: path.resolve(__dirname, 'src/')
      },

      modules: [path.resolve('node_modules')],
      extensions: [".ts", ".tsx", ".js", ".less", ".css", ".sass", ".scss"],

    },

    module: {

      rules: [
        // we use babel-loader to load our jsx and tsx files
       {
  test: /\.(ts|tsx|js|jsx)$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      presets: [
        "@babel/preset-env",
        ["@babel/preset-react", { runtime: "automatic" }],
        "@babel/preset-typescript"
      ]
    }
  }
},


        // plain file loader
        {
          test: /\.(htm|txt)$/i, //
          loader: 'file-loader',
          exclude: [/.OLD/]
        },

        // CSS, SCSS
        {
          test: /\.(s?(c|a)ss)(\?v=\d+\.\d+\.\d+)?$/i,
          use: [
            {
              loader: "style-loader"
            }, {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: false,
                sourceMap: false,
                url: false
              }
            }, {
              loader: "sass-loader"
            }
          ],
          exclude: [/.OLD/]
        },

        // css-loader and less-loader
        {
          test: /\.(less)(\?v=\d+\.\d+\.\d+)?$/i,
          use: [
            {
              loader: "style-loader"
            }, {
              loader: "css-loader",
              options: {
                sourceMap: false,
                modules: true,
                url: false
              }
            }, {
              loader: "less-loader"
            }
          ],
          exclude: [/.OLD/]
        },

        // assets
        {
          test: /\.(a?png|jpe?g|gif|ico|bmp|webb|svg)(\?v=\d+\.\d+\.\d+)?$/i,
          type: 'asset/resource',
          exclude: [/node_modules/, /.OLD/]
        },

        // fonts
        {
          test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/i,
          type: 'asset/resource',
          exclude: [/node_modules/, /.OLD/]
        },

        // audio
        {
          test: /\.wav$/,
          type: 'asset/resource',
          exclude: [/node_modules/, /.OLD/]
        }

      ]

    },

    plugins: [

      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer']
      }),

      // Environment

      new webpack.DefinePlugin({
        'process.env': dotenv.parsed,
        'process.env.debug': env.mode === 'development' ? true : false
      }),

      //Environment
      new webpack.DefinePlugin({
        'process.env': dotenv.parsed,
        'process.env.debug': env.mode === 'development' ? true : false
      }),

      new ProgressPlugin(true),

      new webpack.ContextReplacementPlugin(
        /\/package-name\//,
        (data) => {
          delete data.dependencies[0].critical
          return data
        }
      ),

      new CopyPlugin({
        patterns: [
          {
            from: "./public",
            to: "./",
            noErrorOnMissing: true,
            globOptions: {
              gitignore: true
            }
          },
          { from: "./types", to: "./types" },
          { from: "./documents", to: "./" },
          { from: "./index.d.ts", to: "./" },
        ],
        options: {
          concurrency: 100,
        }
      }),

      // Hot Module Replacement
      new webpack.HotModuleReplacementPlugin()

      // new CompressionPlugin({ algorithm: "gzip"})

    ]

  }

}
