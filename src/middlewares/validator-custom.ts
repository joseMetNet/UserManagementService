import { connectToSqlServer } from "../DB/config";

export const validateExistUserUserName = async (email: string, meta: any) => {
  const tableName = meta.req.body.userGroup; // Accede al valor de 'tableName' desde la solicitud
  const db = await connectToSqlServer();
  // Realizar el INSERT en la tabla 
  const result = await db?.request()
    .query(`SELECT TOP 1 id,email FROM TB_${tableName} WHERE email = '${email}'`);

  const data = result?.recordset[0];

  if (data != undefined) {
    throw new Error("users.existing_user");
  }
  else {
    return true;
  }
};

export const validateExistTableName = async (userGroup: string) => {

  const db = await connectToSqlServer();

  // Realizar el INSERT en la tabla 
  const result = await db?.request()
    .query(`IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES  WHERE TABLE_NAME = 'TB_${userGroup}')
            BEGIN
            --1 la tabla existe
                  SELECT 1 AS response
            END
            ELSE
            BEGIN
            --2 la tabla no existe
                  SELECT 2 AS response;
            END`);

  const data = result?.recordset[0];

  if (data.response == 2) {

    throw new Error("users.user_group");
  }
  else {
    return true;
  }
};


export const validateNotExistUserByUserName = async (email: string, meta: any) => {
  const tableName = meta.req.query.userGroup; // Accede al valor de 'tableName' desde la solicitud

  const db = await connectToSqlServer();
  // Realizar el INSERT en la tabla 
  const result = await db?.request()
    .query(`SELECT TOP 1 id,email FROM TB_${tableName} WHERE email = '${email}'`);

  const data = result?.recordset[0];

  if (data == undefined) {
    throw new Error("users.not_existing_user");
  }
  else {
    return true;
  }
};