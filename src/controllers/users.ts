import { RequestHandler } from "express";
import * as repository from "../repository/users";
import { parseMessageI18n } from "../utils/parse-messga-i18";
import { IresponseRepositoryService } from "../interface/users";

// Los controlers solo son el puente entre cliente y servidor
export const getExample: RequestHandler = async (req, res) => {
  try {
    const { code, message, ...resto }:IresponseRepositoryService = await  repository.findExamples();
    res.status(code).json({message: parseMessageI18n(message, req),  ...resto});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: parseMessageI18n("error_server", req) });
  }
};

export const updateExample: RequestHandler = async (req, res) => {
  try {
    const { code, message, ...resto }: IresponseRepositoryService = await repository.updateExample(req.body);
    res.status(code).json({message: parseMessageI18n(message, req),  ...resto});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: parseMessageI18n("error_server", req) });
  }
};

export const createUsers: RequestHandler = async (req, res) => {
  try {
    const { code, message, ...resto }: IresponseRepositoryService = await repository.createUser(req.body);
    res.status(code).json({message: parseMessageI18n(message, req),  ...resto});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: parseMessageI18n("error_server", req) });
  }
};

export const deleteExample: RequestHandler = async (req, res) => {
  try {
    const { code, message, ...resto }:IresponseRepositoryService = await repository.deleteExample(req.params.id);
    res.status(code).json({message: parseMessageI18n(message, req),  ...resto});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: parseMessageI18n("error_server", req) });
  }
};
