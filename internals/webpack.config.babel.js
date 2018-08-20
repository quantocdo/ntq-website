import path from 'path'
import AssetsPlugin from 'assets-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const outDir = path.resolve(__dirname, '../dist/assets')

export default {
  mode: 'development',
  context: path.resolve(__dirname, '..'),
  entry: {
    lp: [
      './src/public/stylus/pages/home.styl'
    ]
  },
  output: {
    path: outDir
  },
  plugins: [
    new AssetsPlugin({
      path: outDir,
      prettyPrint: true,
      update: true
    }),
    new CleanWebpackPlugin([ outDir ], {
      verbose: true,
      watch: true,
      allowExternal: true
    }),
    new ExtractTextPlugin('css/[name].[hash:5].css')
  ],
  module: {
    rules: [ {
      test: /.styl$/,
      use: ExtractTextPlugin.extract({
        use: [ {
          loader: 'css-loader',
        }, {
          loader: 'stylus-loader',
          options: {
            import: [
              '~kouto-swiss/index.styl'
            ]
          }
        } ]
      })
    }, {
      test: /\.(jpg|png|gif|svg|bmp|webp)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'img/[name].[hash:5].[ext]',
            publicPath: '/assets/',
            emitFile: true
          }
        }
      ]
    },
    {
      test: /\.(ttf|eot|woff|woff2)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[hash:5].[ext]',
            publicPath: '/assets/',
            emitFile: true
          }
        }
      ]
    }, ]
  },
  resolve: {
    extensions: [ '.js', '.styl' ],
    modules: [
      'node_modules',
      'src/public'
    ]
  }
}
