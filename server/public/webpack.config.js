var env = process.env.NODE_ENV || "development";
var path = require("path");
var webpack = require("webpack");

var plugins = [
    new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(env)
    })
];

if (env === "production") {
    plugins.push(
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );
}

module.exports = {
    entry: "./src/App.js",

    output: {
        filename: "bundle.js",
        path: path.resolve("dist"),
        library: "BeanstalkAdmin"
    },

    module: {
        loaders: [
            { test: /\.js$/, loader: "jsx-loader?harmony" }
        ]
    },

    plugins: plugins,
    devtool: "source-map"
};
