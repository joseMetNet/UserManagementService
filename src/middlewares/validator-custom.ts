import { connectToSqlServer } from "../DB/config";

export const validateExistUserUserName = async (userName: string, meta: any) => {
  const tableName = meta.req.body.userGroup;
  const db = await connectToSqlServer();
  const result = await db?.request()
    .query(`SELECT TOP 1 id,userName FROM TB_${tableName} WHERE userName = '${userName}'`);

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


export const validateNotExistUserByUserName = async (userName: string, meta: any) => {
  const tableName = meta.req.query.userGroup; 

  const db = await connectToSqlServer();
  const result = await db?.request()
    .query(`SELECT TOP 1 id,userName FROM TB_${tableName} WHERE userName = '${userName}'`);

  const data = result?.recordset[0];

  if (data == undefined) {
    throw new Error("users.not_existing_user");
  }
  else {
    return true;
  }
};