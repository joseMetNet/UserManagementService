import {Router } from "express";
import {body, query} from "express-validator";
import {
  getUser,
  createUsers,
  authenticationUser,
} from "../controllers/users";
import {
  validateExistTableName,
  validateExistUserByEmail,
  validateNotExistUserByEmail
} from "../helpers/validator-custom";
import {validateEnpoint } from "../middlewares/validatorEnpoint";

const routes = Router();

routes.post(
  "/",
  [
    body("userGroup", "users.validate_user_group").notEmpty().isString(),
    body("userGroup").custom(validateExistTableName),
    body("email", "users.validate_email").notEmpty().isEmail(),
    body("email").custom(validateExistUserByEmail),
    body("password", "users.validate_password").notEmpty().isString(),
    validateEnpoint
  ],
  createUsers
);

routes.post(
  "/authenticationUser",
  [
    body("userGroup","users.validate_user_group").notEmpty().isString(),
    body("userGroup").custom(validateExistTableName),
    body("email", "users.validate_email").notEmpty().isEmail(),
    body("password", "users.validate_password").notEmpty().isString(),
    validateEnpoint
  ],
  authenticationUser
);

routes.get(
  "/",
  [
    query("userGroup","users.validate_user_group").notEmpty().isString(),
    query("userGroup").custom(validateExistTableName),
    query("email", "users.validate_email").notEmpty().isEmail(),
    query("email").custom(validateNotExistUserByEmail),
    validateEnpoint
  ],
  getUser
);

export default routes;
