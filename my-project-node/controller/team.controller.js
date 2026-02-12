const db = require("../config/Db.js");
const { logError } = require("../util/logError");
const { removeFile } = require("../util/helper");
const getAllTeams = async (req, res) => {
  try {
    const [data] = await db.query("SELECT * FROM team");
    res.json({
      message: "Get all teams",
      data: data,
    });
  } catch (error) {
    logError("getAllTeams", error.message, res);
  }
};

const CreateTeam = async (req, res) => {
  try {
    const IdExists = await checkId(req.body.team_id);

    if (IdExists) {
      return res.json({ message: "id already exists" });
    }

    const sql = `
  INSERT INTO team 
  (team_id, team_name, status, description, image)
  VALUES (?, ?, ?, ?, ?)
`;

    const params = [
      req.body.team_id,
      req.body.team_name,
      req.body.status,
      req.body.description,
      req.file?.filename || null,
    ];

    const [results] = await db.query(sql, params);

    res.json({
      message: "Insert Success",
      results,
    });
  } catch (error) {
    logError("CreateTeam", error.message, res);
  }
};
const checkId = async (barId) => {
  try {
    const sql = `SELECT COUNT(*) AS Total FROM team WHERE team_id = ?`;
    const [rows] = await db.query(sql, [barId]);
    return rows[0].Total > 0;
  } catch (err) {
    logError("checkId", err.message);
    return false;
  }
};

const updateTeam = async (req, res) => {
  try {
    const sql = `update team set team_name = ?,
     status = ?, description = ?, team_id = ?, 
     image = ? where id = ?`;

    var filename = req.body.image;

    // image update new
    if (req.file) {
      filename = req.file?.filename;
    }

    // image update change
    if (
      req.body.image != "" &&
      req.body.image != null &&
      req.body.image != "null" &&
      req.file
    ) {
      removeFile(req.body.image); // remove old image
      filename = req.file?.filename;
    }

    // image remove
    if (req.body.image_remove == "1") {
      removeFile(req.body.image); // remove old image
      filename = null; // remove image default null
    }

    //   const paramsBody ={
    //     ...req.body,
    //     image:filename || null
    // }

    const [results] = await db.query(sql, [
      req.body.team_name,
      req.body.status,
      req.body.description,
      req.body.team_id,
      filename,
      req.body.id,
    ]);
    res.json({
      message: "Update Success",
      results,
    });
  } catch (error) {
    logError("updateTeam", error.message, res);
  }
};

const DeleteTeam = async (req, res) => {
  try {
    const sql = "DELETE FROM team WHERE id = ?";
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

module.exports = { getAllTeams, CreateTeam, DeleteTeam, updateTeam };
