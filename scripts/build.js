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
    
    const ModuleConfig = require("../config/module.config.js");
    Object.keys(ModuleConfig).forEach(key => {
        if (ModuleConfig[key].host) {
            const hostDistPath = Util.relativePath(path.resolve("./packages", key, "dist"));
            for (const itemName in ModuleConfig) {
                const item = ModuleConfig[itemName];
                if (item.host) {
                    continue;
                }
                const itemDistPath = Util.relativePath(path.resolve("./packages", itemName, "dist"));
                const destPath = `${hostDistPath}/proxy/${itemName}`;
                console.log(`copy ${itemDistPath} to ${destPath}`);
                fse.copySync(itemDistPath, destPath);
            }
        }
    });

    
};

buildModule();