var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: "./openmct.js",
    output:{
        path: __dirname + "/dist",
        filename: "bundle.js",
        library: "openmct",
        libraryTarget: "umd"
    },
    module: {
        rules: [
            {
                resource: {
                  exclude: /(node_modules|bower_components)/,
                  test: /.jsx?$/
                },
                use: [
                    { loader: 'babel-loader' }
                ],
            },
            {
                resource: {
                    exclude: /(node_modules|bower_components)/,
                    test: /.css$/
                },
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                }),
            },
            {
                resource: {
                    exclude: /(node_modules|bower_components)/,
                    test: /.scss$/
                },
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!sass-loader',
                }),
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
    ],
    resolve: {
      modules: [
        "node_modules"
      ],
      alias: {
        "legacyRegistry": __dirname + "/src/legacyRegistry",
        "BundleRegistry": __dirname + "/src/BundleRegistry",
        "angular": "angular/index",
        "angular-route": "angular-route/angular-route.min",
        "jqueryUI": "lib/jquery-ui.min",
        "csv": "comma-separated-values/csv.min",
        "EventEmitter": "eventemitter3/index",
        "es6-promise": "es6-promise/dist/es6-promise.min",
        "html2canvas": "html2canvas/dist/html2canvas.min",
        "moment": "moment/moment",
        "moment-duration-format": "moment-duration-format/lib/moment-duration-format",
        "saveAs": "file-saver/FileSaver.min",
        "screenfull": "screenfull/dist/screenfull",
        "text": "text/text",
        "uuid": "node-uuid/uuid",
        "zepto": "zepto/dist/zepto.min",
        "lodash": "lodash/lodash",
        "d3-selection": "d3-selection/build/d3-selection.min",
        "d3-scale": "d3-scale/build/d3-scale.min",
        "d3-axis": "d3-axis/build/d3-axis.min",
        "d3-array": "d3-array/build/d3-array.min",
        "d3-collection": "d3-collection/build/d3-collection.min",
        "d3-color": "d3-color/build/d3-color.min",
        "d3-format": "d3-format/build/d3-format.min",
        "d3-interpolate": "d3-interpolate/build/d3-interpolate.min",
        "d3-time": "d3-time/build/d3-time.min",
        "d3-time-format": "d3-time-format/build/d3-time-format.min",
        "requirejs": "requirejs/require.js"
      }
    },
    devServer: {
      contentBase: path.resolve(__dirname)
    }
};
