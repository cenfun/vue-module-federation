const fs = require("fs");
const child_process = require("child_process");

const Util = {
    
    exec: (command, options) => {
        return new Promise(resolve => {
            const worker = child_process.exec(command, {
            //10M
                maxBuffer: 10 * 1024 * 1024,
                ... options
            });
    
            worker.stdout.on("data", function(data) {
                console.log(data.toString());
            });
    
            worker.stderr.on("data", function(data) {
                console.log(data.toString());
            });
    
            worker.on("close", function(code) {
                resolve(code);
            });
        });
    },

    forEachApps: async (callback, serial = false) => {
        const appsDir = "./packages";
        const apps = fs.readdirSync(appsDir);
        for (const item of apps) {
            const appDir = `${appsDir}/${item}`;
            if (serial) {
                await callback(appDir, item);
            } else {
                callback(appDir, item);
            }
        }
    }
};


module.exports = Util;