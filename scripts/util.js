const fs = require("fs");
const path = require("path");
const child_process = require("child_process");

const Util = {

    root: path.resolve(__dirname, "../"),
    
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

    forEachPackage: async (callback, serial = false) => {
        const appsDir = "./packages";
        const apps = fs.readdirSync(appsDir);
        if (serial) {
            for (const item of apps) {
                const appDir = `${appsDir}/${item}`;
                await callback(appDir, item);
            }
            return;
        }
        const list = [];
        for (const item of apps) {
            const appDir = `${appsDir}/${item}`;
            list.push(callback(appDir, item));
        }
        return Promise.allSettled(list);
    },

    // \ to /
    formatPath: function(str) {
        if (str) {
            str = str.replace(/\\/g, "/");
        }
        return str;
    },

    relativePath: function(p, root) {
        p = `${p}`;
        root = `${root || Util.root}`;
        let rp = path.relative(root, p);
        rp = Util.formatPath(rp);
        return rp;
    },

    delay: function(ms) {
        return new Promise((resolve) => {
            if (ms) {
                setTimeout(resolve, ms);
            } else {
                setImmediate(resolve);
            }
        });
    }
};


module.exports = Util;