# vue-module-federation
Vue project base on webpack5 module federation plugin - A Micro-frontend Revolution

## Packages
+ app (host)
+ sub1 (remote)
+ sub2 (remote)

## Module and Webpack Config
+ [config/module.config.js](config/module.config.js)
+ [scripts/create-webpack-config.js](scripts/create-webpack-config.js)


## Install
+ npm install

## development
+ npm run serve
    + app http://localhost:8081
    + sub1 http://localhost:8082
    + sub2 http://localhost:8083
+ will start all servers, and remotes connect each server by proxy
## production
+ npm run build
+ deploy each app dist to standalone server with different port and connect by proxy

## production with merged dist
+ npm run build
+ npm run merge
+ will copy remotes dist to host dist/proxy/[remote name]/*, see [merge scripts](scripts/merge.js)
    + app/dist/*
    + app/dist/proxy/sub1/*
    + app/dist/proxy/sub2/*
+ deploy host dist, no need proxy

## Link
+ https://webpack.js.org/plugins/module-federation-plugin/
+ https://webpack.js.org/concepts/module-federation/
+ https://module-federation.github.io/
+ https://github.com/module-federation/module-federation-examples