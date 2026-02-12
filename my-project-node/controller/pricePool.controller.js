const db = require("../config/Db.js");
const { logError } = require("../util/logError");

const getPricePool = async (req, res) => {
  try {
    const sql = `SELECT * FROM prize_pool P INNER JOIN team T ON P.team_id = T.team_id`;
    const [result] = await db.query(sql);
    res.json({
      message: "Get all price pool successfully",
      pricePool: result,
    });
  } catch (err) {
    logError("PricePoolControllers", err, res);
  }
};

const CreatePricePool = async (req, res) => {
  try {
    const sql = `INSERT INTO prize_pool (place, price, team_id) VALUES (?, ?, ?)`;
    const { place, price, team_id } = req.body;
    const [result] = await db.query(sql, [place, price, team_id]);
    res.json({
      message: "Create price pool successfully",
      pricePool: result,
    });
  } catch (err) {
    logError("PricePoolControllers", err, res);
  }
};

const updatePricePool = async (req, res) => {
  try {
    const sql = `UPDATE prize_pool SET price = ?, team_id = ? WHERE place = ?`;
    const { price, team_id, place } = req.body;
    const [result] = await db.query(sql, [price, team_id, place]);
    res.json({
      message: "Update price pool successfully",
      pricePool: result,
    });
  } catch (err) {
    logError("PricePoolControllers", err, res);
  }
};

const deletePricePool = async (req, res) => {
  try {
    const sql = `DELETE FROM prize_pool WHERE place = ?`;
    const { id } = req.params;
    const [result] = await db.query(sql, [id]);
    res.json({
      message: "Delete price pool successfully",
      pricePool: result,
    });
  } catch (err) {
    logError("PricePoolControllers", err, res);
  }
};

module.exports = {
  getPricePool,
  CreatePricePool,
  updatePricePool,
  deletePricePool,
};
