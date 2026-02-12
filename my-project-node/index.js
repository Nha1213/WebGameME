const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
// const {startScheduler} = require('./src/service/productScheduler');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// ✅ Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

const userRoute = require("./router/user.route");
userRoute(app);

const teamRoute = require("./router/team.route");
teamRoute(app);

const configRoute = require("./router/config.route");
configRoute(app);

const pricePoolRoute = require("./router/pricePool.route");
pricePoolRoute(app);

const playerRoute = require("./router/player.route");
playerRoute(app);

app.listen(3000, () => {
  console.log("localhost:3000");
});
