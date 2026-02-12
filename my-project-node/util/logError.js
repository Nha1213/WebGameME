const fs = require("fs/promises");
const moment = require("moment");
const { validationResult } = require("express-validator");
const logError = async (controller, message_error, res) => {
  try {
    const timestamp = moment().format("DD/MM/YYYY HH:mm:ss"); // Use 'moment' for formatted timestamp
    const path = "./logs/" + controller + ".txt";
    const logMessage = "[" + timestamp + "] " + message_error + "\n";
    await fs.appendFile(path, logMessage);
  } catch (error) {
    console.error("Error writing to log file:", error);
  }
  res.status(500).send("Internal Server Error!");
};

const validateCheck = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  // const extractedErrors = [];
  // errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));
  return res.status(400).json({
    errors: errors.array(),
  });
};
module.exports = { logError, validateCheck };
