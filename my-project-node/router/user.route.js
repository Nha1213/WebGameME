const {
  getAllUsers,
  register,
  UserLogin,
  ChangePassword,
  forgetPass,
} = require("../controller/user.controller");
const { validateCheck } = require("../util/logError");
const { body } = require("express-validator");
const { validate_token } = require("../controller/user.controller");
const validateData = () => {
  return [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ];
};

const userRoute = (app) => {
  app.get("/api/users/Getall", validate_token(), getAllUsers);
  app.post("/api/users/register", register);
  app.post("/api/users/login", UserLogin);
  app.put("/api/users/ChangePassword", ChangePassword);
  app.put("/api/users/forgetPass", forgetPass);
};

module.exports = userRoute;
