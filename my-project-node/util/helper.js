// ✅ Define the upload destination and filename
const multer = require("multer");
const fs = require("fs");
const db = require("../config/Db.js");
const path = require("path");
const { logError } = require("../util/logError");
var pathName = "C:/wamp64/www/StoreImageWebGame/";
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, pathName);
  },
  filename: function (req, file, callback) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// ✅ File filter (fix logic)
const fileFilter = function (req, file, callback) {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/gif",
    "image/webp",
    "image/bmp",
    "image/tiff",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    callback(null, true); // allow upload
  } else {
    callback(new Error("Only .jpg, .jpeg, .png files are allowed!"), false);
  }
};
// ✅ Multer configuration
exports.uploadFile = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 3 }, // 3MB
  fileFilter: fileFilter,
});

// ✅ Remove file function
exports.removeFile = async (fileName) => {
  // const filePath = path.join(pathName, fileName);
  // const filePath = "C:/wamp64/www/StoreImgeWebGame/";
  try {
    await fs.promises.unlink(pathName + "/" + fileName);
    return "File Deleted Successfully";
  } catch (err) {
    console.error("Error deleting file:", err);
    throw err;
  }
};

// barcode
exports.newId = async (req, res) => {
  try {
    const sql = `
      SELECT CONCAT("TID", LPAD((SELECT COALESCE(MAX(id), 0) + 1 FROM team), 3, '0')) 
      AS new_id;
    `;

    const [rows] = await db.query(sql);
    res.json({
      message: "success",
      new_id: rows[0].new_id,
    });
  } catch (err) {
    logError("ID.controller", err.message, res);
  }
};

exports.newIdPricePool = async (req, res) => {
  try {
    const sql = `
      SELECT CONCAT("PID", LPAD((SELECT COALESCE(MAX(id), 0) + 1 FROM prize_pool), 3, '0')) 
      AS new_id_price;
    `;

    const [rows] = await db.query(sql);
    res.json({
      message: "success",
      new_id: rows[0].new_id_price,
    });
  } catch (err) {
    logError("ID.controller", err.message, res);
  }
};
exports.newIdPlayer = async (req, res) => {
  try {
    const sql = `
      SELECT CONCAT("TID", LPAD((SELECT COALESCE(MAX(id), 0) + 1 FROM player), 3, '0')) 
      AS new_id_player;
    `;

    const [rows] = await db.query(sql);
    res.json({
      message: "success",
      new_id: rows[0].new_id_player,
    });
  } catch (err) {
    logError("ID.controller", err.message, res);
  }
};
