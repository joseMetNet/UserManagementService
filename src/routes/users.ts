import {Router } from "express";
import {body, query} from "express-validator";
import {
  getUser,
  createUsers,
  authenticationUser,
  createUserGroup
} from "../controllers/users";
import {
  validateExistTableName,
  validateExistUserUserName,
  validateNotExistUserByUserName
} from "../middlewares/validator-custom";
import {validateEnpoint } from "../middlewares/validatorEnpoint";

const routes = Router();

routes.post(
  "/",
  [
    body("userGroup", "users.validate_user_group").notEmpty().isString(),
    body("userGroup").custom(validateExistTableName),
    body("userName", "users.validate_user_Name").notEmpty().isString(),
    body("userName").custom(validateExistUserUserName),
    body("password", "users.validate_password").notEmpty().isString(),
    validateEnpoint
  ],
  createUsers
);

routes.post(
  "/createUserGroup",
  [
    body("nameUserGroup", "users.validate_user_group").notEmpty().isString(),
    validateEnpoint
  ],
  createUserGroup
);

routes.post(
  "/authenticationUser",
  [
    body("userGroup","users.validate_user_group").notEmpty().isString(),
    body("userGroup").custom(validateExistTableName),
    body("userName", "users.validate_user_Name").notEmpty().isString(),
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
    query("userName", "users.validate_user_Name").notEmpty().isString(),
    query("userName").custom(validateNotExistUserByUserName),
    validateEnpoint
  ],
  getUser
);

export default routes;
