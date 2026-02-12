const db = require("../config/Db.js");
const { logError } = require("../util/logError.js");
const { removeFile } = require("../util/helper.js");
const getAllPlayers = async (req, res) => {
  try {
    const [data] = await db.query("SELECT * FROM player");
    res.json({
      message: "Get all players successfully",
      data: data,
    });
  } catch (error) {
    logError("getAllPlayers", error.message, res);
  }
};

const CreatePlayer = async (req, res) => {
  try {
    const IdExists = await checkId(req.body.team_id);

    if (IdExists) {
      return res.json({ message: "id already exists" });
    }

    const sql = `
  INSERT INTO player 
  (player_name,image, team_id, status)
  VALUES (?, ?, ?, ?)
`;
    const params = [
      req.body.player_name,
      req.file?.filename || null,
      req.body.team_id,
      req.body.status,
    ];

    const [results] = await db.query(sql, params);

    res.json({
      message: "Insert Success",
      results,
    });
  } catch (error) {
    logError("CreatePlayer", error.message, res);
  }
};
const checkId = async (barId) => {
  try {
    const sql = `SELECT COUNT(*) AS Total FROM player WHERE team_id = ?`;
    const [rows] = await db.query(sql, [barId]);
    return rows[0].Total > 0;
  } catch (err) {
    logError("checkId", err.message);
    return false;
  }
};

const updatePlayer = async (req, res) => {
  try {
    const sql = `UPDATE player 
      SET player_name = ?, image = ?, team_id = ?, status = ?
      WHERE id = ?`;

    let filename = req.body.image;

    // image update new
    if (req.file) {
      filename = req.file.filename;
    }

    // image update change
    if (req.body.image && req.body.image !== "null" && req.file) {
      removeFile(req.body.image); // remove old image
      filename = req.file.filename;
    }

    // image remove
    if (req.body.image_remove == "1") {
      removeFile(req.body.image); // remove old image
      filename = null;
    }

    const [results] = await db.query(sql, [
      req.body.player_name,
      filename,
      req.body.team_id,
      req.body.status,
      req.body.id,
    ]);

    res.json({
      message: "Update Success",
      results,
    });
  } catch (error) {
    logError("updatePlayer", error.message, res);
  }
};

const DeletePlayer = async (req, res) => {
  try {
    const sql = "DELETE FROM player WHERE id = ?";
    const [results] = await db.query(sql, [req.body.id]);

    if (results.affectedRows && req.body != null && req.body.image != "") {
      removeFile(req.body.image);
    }
    res.json({
      message: "Delete Success",
      results,
    });
  } catch (error) {
    logError("DeleteTeam", error.message, res);
  }
};

module.exports = { getAllPlayers, CreatePlayer, DeletePlayer, updatePlayer };
