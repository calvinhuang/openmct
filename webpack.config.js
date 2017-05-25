var path = require('path');

module.exports = {
    context: __dirname,
    entry: "./openmct.js",
    output:{
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    resolve: {
      modules: [
        "node_modules"
      ],
      alias: {
        "legacyRegistry": __dirname + "/src/legacyRegistry",
        "BundleRegistry": __dirname + "/src/BundleRegistry",
        "angular": "angular/angular.min",
        "angular-route": "angular-route/angular-route.min",
        "jqueryUI": "lib/jquery-ui.min",
        "csv": "comma-separated-values/csv.min",
        "EventEmitter": "eventemitter3/index",
        "es6-promise": "es6-promise/dist/es6-promise.min",
        "html2canvas": "html2canvas/build/html2canvas.min",
        "moment": "moment/moment",
        "moment-duration-format": "moment-duration-format/lib/moment-duration-format",
        "saveAs": "file-saver/FileSaver.min",
        "screenfull": "screenfull/dist/screenfull.min",
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
        "d3-time-format": "d3-time-format/build/d3-time-format.min"
      }
    },
    devServer: {
      contentBase: path.resolve(__dirname, './app')
    }
};
