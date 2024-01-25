import { IresponseRepositoryService, dataExample } from "../interface/users";
import { connectToSqlServer } from "../DB/config";
import bcrypt from 'bcrypt';





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
    .query(`SELECT TOP 1 * FROM ${tableName}`);

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

