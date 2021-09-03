//const fs = require("fs");
const path = require("path");
const Util = require("./util.js");
const fse = require("fs-extra");

const buildModule = async () => {
    const res = await Util.forEachPackage((appDir) => {
        fse.removeSync(`${appDir}/dist`);
        return Util.exec("npm run build", {
            cwd: path.resolve(appDir)
        });
    });
    console.log(res);
    console.log("build done");
};

buildModule();