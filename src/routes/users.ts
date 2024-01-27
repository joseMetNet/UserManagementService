import { Router } from "express";
import { body} from "express-validator";
import {

  createUsers,
  // authenticationUser,
} from "../controllers/users";


const routes = Router();

// Create 
routes.post(
  "/",
  [
    body("tableName", "companies.validate_id_empty").notEmpty().isString(),
    body("email", "companies.validate_id_empty").notEmpty().isEmail(),
    body("password", "companies.validate_id_empty").notEmpty().isString(),
  ],
  createUsers
);


// routes.post(
//   "/authenticationUser",
//   [
//     body("tableName", "companies.validate_id_empty").notEmpty().isString(),
//     body("email", "companies.validate_id_empty").notEmpty().isEmail(),
//     body("password", "companies.validate_id_empty").notEmpty().isString(),
//   ],
//   authenticationUser
// );






export default routes;
