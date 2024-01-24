import { IresponseRepositoryService, dataExample } from "../interface/users";
import { connectToSqlServer } from "../DB/config";
import bcrypt from 'bcrypt';

export const findExamples = async (): Promise<IresponseRepositoryService> => {
  try {

    const db = await connectToSqlServer();

    // Datos a insertar
    const correo = 'correo@example.com';
    const contrasena = 'contrasena_secreta';
    const table = 'TB_UsersPrueba';


    // Realizar el INSERT en la tabla de usuarios
    const result = await db?.request()
      .query(`INSERT INTO ${table} (correo, contrasena) VALUES ('${correo}', '${contrasena}')`);

    // Buscar datos en la base de datos
    // Manejo de datos
    // Retornar respuesta formato json {code: 200, data: []...}
    return {
      code: 200,
      message: "example.succesfull",
      data: [{ _id: "example" }],
    };
  } catch (err: any) {
    console.log("Err repo findExample", err);
    return {
      code: 400,
      message: { translationKey: "example.errorInRepository", translationParams: { name: "findExample" } },
    };
  }
};

export const updateExample = async (data: dataExample): Promise<IresponseRepositoryService> => {
  try {
    const { } = data;
    // Actualizar example

    return {
      code: 200,
      message: { translationKey: "example.idComposed", translationParams: {} },
    };
  } catch (err: any) {
    console.log("Err updateExample", err);
    return {
      code: 400,
      message: { translationKey: "example.errorInRepository", translationParams: { name: "updateExample" } },
    };
  }
};

export const createUser = async (data: dataExample): Promise<IresponseRepositoryService> => {
  try {
    const { email, password, tableName } = data;

    const db = await connectToSqlServer();

    // Encriptar la contraseña utilizando bcrypt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedContrasena = await bcrypt.hash(password, salt);

    // Realizar el INSERT en la tabla 
    await db?.request()
    .query(`INSERT INTO ${tableName} VALUES ('${email}', '${hashedContrasena}')`);
    
    const result = await db?.request()
    .query(`SELECT TOP 1 id , email  FROM ${tableName}`);

    return {
      code: 200,
      message: 'users.succesfull',
      data: result?.recordset
    };

  } catch (err: any) {
    console.log("Err createExample", err);
    return {
      code: 400,
      message: { translationKey: "users.errorInRepository", translationParams: { name: "createExample" } },
    };
  }
};

export const deleteExample = async (_id: string): Promise<IresponseRepositoryService> => {
  try {
    //   Eliminar Exaple por id

    return {
      code: 200,
      message: { translationKey: "example.idComposed", translationParams: { _id } },
    };
  } catch (err: any) {
    console.log("Err deleteExample", err);
    return {
      code: 400,
      message: { translationKey: "example.errorInRepository", translationParams: { name: "deleteExample" } },
    };
  }
};
