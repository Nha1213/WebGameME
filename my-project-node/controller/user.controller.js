const db = require("../config/Db.js");
const { logError } = require("../util/logError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getAllUsers = async (req, res) => {
  try {
    const [data] = await db.query("SELECT * FROM user");
    res.status(200).json({
      message: "Get all users",
      data: data,
    });
  } catch (error) {
    logError("getAllUsers", error.message, res);
  }
};

const UserLogin = async (req, res) => {
  try {
    const sql = "SELECT * FROM user WHERE email = ?";
    const { email, password } = req.body;
    const [data] = await db.query(sql, [email]);

    if (data.length === 0) {
      return res.status(404).json({ message: "User email not found" });
    }
    const hashedPassword = data[0].password;
    const isCorrectPass = await bcrypt.compare(password, hashedPassword);
    if (!isCorrectPass) {
      return res.status(401).json({ message: "Isn't correct password" });
    }
    delete data[0].password;
    const obj = {
      profile: data[0],
    };

    res.json({
      message: "Login success",
      ...obj,
      access_token: await getAccessToken(obj),
    });
  } catch (error) {
    logError("getAllUsers", error.message, res);
  }
};

const register = async (req, res) => {
  try {
    const sql =
      "INSERT INTO user (name, email, password, status) VALUES (?, ?, ?, ?)";

    const { name, email, password, status } = req.body;

    // ✅ Validate required fields
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password are required." });
    }

    const hashedPassword = await bcrypt.hashSync(password, 10);

    const [data] = await db.query(sql, [name, email, hashedPassword, status]);

    res.status(200).json({
      message: "User registered successfully",
      data,
    });
  } catch (error) {
    logError("getAllUsers", error.message, res);
  }
};

const ChangePassword = async (req, res) => {
  try {
    const { passwordNew, email, passwordOld } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!passwordNew) {
      return res.status(400).json({ message: "New Password is required" });
    }

    if (!passwordOld) {
      return res.status(400).json({ message: "Old Password is required" });
    }

    // 1. Check if user exists
    const getUser = "SELECT password FROM user WHERE email = ?";
    const [rows] = await db.query(getUser, [email]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Email not found" });
    }

    // 2. Compare old password
    const matchOld = bcrypt.compareSync(passwordOld, rows[0].password);
    if (!matchOld) {
      return res.status(400).json({ message: "Old password incorrect" });
    }

    // 3. Hash new password
    const hashedPassword = bcrypt.hashSync(passwordNew, 10);

    // 4. Update password
    const sql = "UPDATE user SET password = ? WHERE email = ?";
    const [result] = await db.query(sql, [hashedPassword, email]);

    res.status(200).json({
      message: "Password updated successfully",
      data: result,
    });
  } catch (error) {
    logError("forget.controller", error.message, res);
  }
};

const forgetPass = async (req, res) => {
  try {
    const { email, passwordNew } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // 1. Check if user exists
    const getUser = "SELECT password FROM user WHERE email = ?";
    const [rows] = await db.query(getUser, [email]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Email not found" });
    }

    // 2. Hash new password
    const hashedPassword = bcrypt.hashSync(passwordNew, 10);

    // 3. Update password
    const sql = "UPDATE user SET password = ? WHERE email = ?";
    const [result] = await db.query(sql, [hashedPassword, email]);

    res.status(200).json({
      message: "Password updated successfully",
      data: result,
    });
  } catch (error) {
    logError("forget.controller", error.message, res);
  }
};

const getAccessToken = async (paramData) => {
  const KeyToken = "asdfsadfasfa@#saf12341234";
  const access_token = await jwt.sign({ data: paramData }, KeyToken, {
    expiresIn: "1d",
  });
  return access_token;
};

const validate_token = () => {
  return (req, res, next) => {
    const token_from_client = req.headers.authorization?.split(" ")[1]; // Bearer token

    if (!token_from_client) {
      return res.status(401).send({ message: "Access token missing" });
    }

    const KeyToken = "asdfsadfasfa@#saf12341234";
    jwt.verify(token_from_client, KeyToken, (error, result) => {
      if (error) {
        return res.status(401).send({
          message: "Unauthorized",
          error: error.message,
        });
      } else {
        // destaturing
        const { profile } = result.data;
        req.current_id = profile.id;
        req.profile = profile;
        next();
      }
    });
  };
};

module.exports = {
  getAllUsers,
  register,
  UserLogin,
  forgetPass,
  ChangePassword,
  validate_token,
};
