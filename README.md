# vue-module-federation
Vue project base on webpack5 module federation plugin

## Packages
+ app http://localhost:8081
+ sub1 http://localhost:8082
+ sub2 http://localhost:8083

## Module and Webpack Config
+ [config/module.config.js](config/module.config.js)
+ [scripts/create-webpack-config.js](scripts/create-webpack-config.js)


## CLI
+ npm run serve
+ npm run build

## Deploy
after built, all sub dist files will be copied to host dist folder.

## Link
+ https://webpack.js.org/plugins/module-federation-plugin/
+ https://webpack.js.org/concepts/module-federation/
+ https://module-federation.github.io/
+ https://github.com/module-federation/module-federation-examples