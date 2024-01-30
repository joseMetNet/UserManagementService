import { Router } from "express";
import { body} from "express-validator";
import {

  createUsers,
  authenticationUser,
} from "../controllers/users";
import {
  validateExistTableName,
  validateExistUserByEmail,
} from "../helpers/validator-custom";
import { validateEnpoint } from "../middlewares/validatorEnpoint";

const routes = Router();

// Create 
routes.post(
  "/",
  [
    body("userGroup", "users.validate_user_group").notEmpty().isString(),
    body("userGroup").custom(validateExistTableName),
    body("email", "users.validate_user_group").notEmpty().isEmail(),
    body("email").custom(validateExistUserByEmail),
    body("password", "users.validate_user_group").notEmpty().isString(),
    validateEnpoint
  ],
  createUsers
);


routes.post(
  "/authenticationUser",
  [
    body("userGroup","users.validate_user_group").notEmpty().isString(),
    body("userGroup").custom(validateExistTableName),
    body("email", "users.validate_user_group").notEmpty().isEmail(),
    body("password", "users.validate_user_group").notEmpty().isString(),
    validateEnpoint
  ],
  authenticationUser
);






export default routes;
