const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  outputDir: 'temp-dist',
  filenameHashing: false,
  chainWebpack: config => {
    config.optimization.delete('splitChunks');
    config.module.rule('images').use('url-loader').loader('file-loader').options({});
  },
  configureWebpack: {
    output: {
      filename: 'options.js'
    }
  },
  css: {
    extract: false
  },
  transpileDependencies: true
});
