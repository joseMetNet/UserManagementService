import { Router } from "express";
import { check,body} from "express-validator";
import {
  getExample,
  createUsers,
  updateExample,
  deleteExample,
} from "../controllers/users";
import { validateEnpoint } from "../middlewares/validatorEnpoint";

const routes = Router();

// Optener
routes.get("/", getExample);

// Actulizar 
routes.put(
  "/",
  [check("_id", "example.validate_id").notEmpty(), validateEnpoint],
  updateExample
);

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


// Eliminar 
routes.delete(
  "/:id",
  [check("id", "example.validate_id").notEmpty(), validateEnpoint],
  deleteExample
);

export default routes;
