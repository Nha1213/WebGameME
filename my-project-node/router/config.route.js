const {getConfig} = require("../controller/config.controller");

const configRoute = (app) => {
    app.get("/api/users/config", getConfig);

}

module.exports = configRoute