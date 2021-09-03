module.exports = {
    app: {
        host: true,
        port: 8081,
        exposes: {
            "./Header": "./src/header.vue"
        }
    },
    sub1: {
        port: 8082,
        exposes: {
            "./Sub1": "./src/sub1.vue"
        }
    },
    sub2: {
        port: 8083,
        exposes: {
            "./Sub2": "./src/sub2.vue"
        }
    }
};