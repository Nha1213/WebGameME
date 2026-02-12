const {
  CreatePricePool,
  getPricePool,
  updatePricePool,
  deletePricePool,
} = require("../controller/pricePool.controller");
const { newIdPricePool } = require("../util/helper");

const { logError, validateCheck } = require("../util/logError");
const { body } = require("express-validator");
const validateData = () => {
  return [
    body("place").not().isEmpty().withMessage("place is required"),
    body("price").isEmail().withMessage("price is required"),
    body("team_id").isEmpty().withMessage("Team id is required"),
  ];
};

const pricePoolRoute = (app) => {
  app.get("/api/users/price-pool", getPricePool);
  app.delete("/api/users/price-pool/:id", deletePricePool);
  app.post("/api/users/price-pool", CreatePricePool);
  app.put(
    "/api/users/price-pool",
    // validateData(),
    // validateCheck,
    updatePricePool
  );
  app.post("/api/users/price-pool-id", newIdPricePool);
};

module.exports = pricePoolRoute;
