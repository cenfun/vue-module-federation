
const path = require("path");
const Util = require("./util.js");

const serveModule = () => {
    Util.forEachApps(async (appDir) => {
        const code = await Util.exec("npm run serve", {
            cwd: path.resolve(appDir)
        });
        console.log(code);
    });
};

serveModule();