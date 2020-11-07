module.exports = [
  // Add support for native node modules
  {
    test: /\.node$/,
    use: "node-loader",
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: "@marshallofsound/webpack-asset-relocator-loader",
      options: {
        outputAssetBase: "native_modules",
      },
    },
  },
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
    },
  },
  // {
  //   test: /\.svg$/,
  //   exclude: /node_modules/,
  //   use: {
  //     loader: "svg-inline-loader"
  //   }
  // },
  {
    test: /\.(png|jpe?g|gif|svg)$/i,
    use: [
      {
        loader: "file-loader",
        options: {
          publicPath: "..",
          context: "src",
        },
      },
    ],
  },
];
