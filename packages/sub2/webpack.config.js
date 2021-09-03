const createWebpackConfig = require("../../scripts/create-webpack-config.js");
module.exports = () => {
    return createWebpackConfig(__dirname);
};
