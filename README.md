# vue-module-federation
Vue project base on webpack5 module federation plugin - A Micro-frontend Revolution

## Packages
+ app http://localhost:8081 (host)
+ sub1 http://localhost:8082 (remote)
+ sub2 http://localhost:8083 (remote)

## Module and Webpack Config
+ [config/module.config.js](config/module.config.js)
+ [scripts/create-webpack-config.js](scripts/create-webpack-config.js)


## Install
+ npm install

## development
+ npm run serve
+ will start all servers, and remotes connect each server by proxy
## production
+ npm run build
+ will copy remotes dist to host dist/proxy/remoteName/*, see [build scripts](scripts/build.js)
+ deploy host dist

## Link
+ https://webpack.js.org/plugins/module-federation-plugin/
+ https://webpack.js.org/concepts/module-federation/
+ https://module-federation.github.io/
+ https://github.com/module-federation/module-federation-examples