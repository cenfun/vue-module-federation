
const path = require("path");
const Util = require("./util.js");

const serveModule = () => {
    Util.forEachPackage(async (appDir) => {
        Util.exec("npm run serve", {
            cwd: path.resolve(appDir)
        });
        await Util.delay(100);
    }, true);
};

serveModule();