const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;
const VueLoaderPlugin = require("vue-loader").VueLoaderPlugin;
const stylesHandler = MiniCssExtractPlugin.loader;
const ModuleConfig = require("../config/module.config.js");

const getRemoteFilename = (itemName) => {
    return `${itemName}.remote.js`;
};

const generateRemotes = (packageName) => {
    const remotes = {};
    for (const itemName in ModuleConfig) {
        if (itemName === packageName) {
            continue;
        }
        const item = ModuleConfig[itemName];
        if (!Object.keys(item.exposes).length) {
            //console.log(`Not found exposes: ${itemName}`);
            continue;
        }
        remotes[itemName] = `${itemName}@proxy/${itemName}/${getRemoteFilename(itemName)}`;
    }
    return remotes;
};

const generateProxy = (packageName) => {
    const proxy = {};
    for (const itemName in ModuleConfig) {
        if (itemName === packageName) {
            continue;
        }
        const item = ModuleConfig[itemName];
        const pre = `/proxy/${itemName}/`;
        const pathRewrite = {};
        pathRewrite[pre] = "";
        proxy[pre] = {
            target: `http://localhost:${item.port}`,
            pathRewrite: pathRewrite
        };
    }
    return proxy;
};

module.exports = (dir) => {
    const isProduction = process.env.NODE_ENV === "production";

    const packageJson = require(path.resolve(dir, "package.json"));

    const packageName = packageJson.name;
    console.log(`package name: ${packageName}`);
    
    const moduleConfig = ModuleConfig[packageName];
    if (!moduleConfig) {
        throw new Error(`Not found module config: ${packageName}`);
    }

    const remotes = generateRemotes(packageName);
    //console.log(remotes);

    const MFP = {
        name: packageName,
        filename: getRemoteFilename(packageName),
        // library: {
        //     type: "umd",
        //     name: "sub2"
        // },
        remotes: remotes,
        exposes: moduleConfig.exposes,
        shared: {
            ... packageJson.dependencies
        }
    };
    console.log(MFP);

    const proxy = generateProxy(packageName);
    console.log(proxy);

    const config = {
        entry: "./src/index.js",
        output: {
            path: path.resolve(dir, "dist")
            //publicPath: "http://localhost:8083/"
        },
        devServer: {
            open: true,
            host: "localhost",
            port: moduleConfig.port,
            proxy: proxy
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "public/index.html"
            }),
    
            new VueLoaderPlugin(),
    
            new MiniCssExtractPlugin(),
    
            new ModuleFederationPlugin(MFP)
    
            // Add your plugins here
            // Learn more about plugins from https://webpack.js.org/configuration/plugins/
        ],
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/i,
                    loader: "babel-loader"
                },
                {
                    test: /\.css$/i,
                    use: [stylesHandler, "css-loader"]
                },
                {
                    test: /\.vue$/i,
                    use: "vue-loader"
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [stylesHandler, "css-loader", "sass-loader"]
                },
                {
                    test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                    type: "asset"
                }
    
                // Add your rules for custom modules here
                // Learn more about loaders from https://webpack.js.org/loaders/
            ]
        }
    };

    if (isProduction) {
        config.mode = "production";
    } else {
        config.mode = "development";
        config.devtool = "source-map";
    }
    return config;
};
