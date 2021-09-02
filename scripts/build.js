const path = require("path");
const Util = require("./util.js");
const rimraf = require("rimraf");

const buildModule = () => {
    Util.forEachApps(async (appDir) => {
        //remove dist
        rimraf.sync(`${appDir}/dist`);

        const code = await Util.exec("npm run build", {
            cwd: path.resolve(appDir)
        });
        console.log(code);
    });

};

buildModule();