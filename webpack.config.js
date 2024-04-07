const path = require('path');
const fs = require('fs');
const config = {};

module.exports = {
  target: 'node',
  mode: 'development',
  entry: './src/server.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  stats: {
    warnings: false,
  }
};

config.externals = fs.readdirSync("node_modules")
.reduce(
    function(acc, mod) {
        if (mod === ".bin") {
            return acc
        }
        acc[mod] = "commonjs " + mod
        return acc
    }
)