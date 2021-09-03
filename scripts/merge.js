//const fs = require("fs");
const path = require("path");
const Util = require("./util.js");
const fse = require("fs-extra");

const ModuleConfig = require("../config/module.config.js");

const getHost = () => {
    for (const itemName in ModuleConfig) {
        const item = ModuleConfig[itemName];
        if (item.host) {
            return itemName;
        }
    }
};


const mergeModule = () => {
    
    const hostName = getHost();
    const hostDistPath = Util.relativePath(path.resolve("./packages", hostName, "dist"));

    //const hostFiles = fs.readdirSync(hostDistPath);

    Object.keys(ModuleConfig).forEach(itemName => {
        if (itemName === hostName) {
            return;
        }
        
        const itemDistPath = path.resolve("./packages", itemName, "dist");
        const destPath = `${hostDistPath}/proxy/${itemName}`;

        console.log(`copy ${Util.relativePath(itemDistPath)} to ${Util.relativePath(destPath)} ...`);
        //only copy *.remote.js file? 
        //and static files?
        fse.copySync(itemDistPath, destPath);

        //remove shared files (we don't know which shared file should be loaded, so do not remove any)
        // const files = fs.readdirSync(destPath);
        // files.forEach(f => {
        //     if (hostFiles.includes(f)) {
        //         const fp = path.resolve(destPath, f);
        //         fse.removeSync(fp);
        //         console.log(`removed shared file: ${Util.relativePath(fp)}`);
        //     }
        // });

    });

    console.log("merge done");
    
};

mergeModule();