import { IresponseRepositoryService, dataUser,IGetUser, dataUserGroup} from "../interface/users";
import { connectToSqlServer } from "../DB/config";
import { hashPassword } from "../helpers/user";

import bcrypt from 'bcrypt';


export const createUser = async (data: dataUser): Promise<IresponseRepositoryService> => {
  try {
    const { userName, password, userGroup } = data;

    const db = await connectToSqlServer();

    const hashedContrasena = await hashPassword(password);

    // Realizar el INSERT en la tabla 
    await db?.request()
    .query(`INSERT INTO TB_${userGroup} VALUES ('${userName}', '${hashedContrasena}')`);
    
    const result = await db?.request()
    .query(`SELECT TOP 1 id,userName FROM TB_${userGroup} WHERE userName = '${userName}'`);

    return {
      code: 200,
      message: 'users.succesfull',
      data: result?.recordset
    };

  } catch (err: any) {
    console.log("Error creating user", err);
    return {
      code: 400,
      message: { translationKey: "users.errorInRepository", translationParams: { name: "createUser" } },
    };
  }
};


export const createUserGroup = async (data: dataUserGroup): Promise<IresponseRepositoryService> => {
  try {
    const { nameUserGroup } = data;

    const db = await connectToSqlServer();

    await db?.request()
    .query(`
      CREATE TABLE TB_${nameUserGroup} (
      id INT PRIMARY KEY IDENTITY,
      userName VARCHAR(150),
      password VARCHAR(200)
    );`);
    
    return {
      code: 200,
      message: 'UserGroup.create_succesfull',
    };

  } catch (err: any) {
    console.log("Error creating user", err);
    return {
      code: 400,
      message: { translationKey: "UserGroup.errorInRepository", translationParams: { name: "createUser" } },
    };
  }
};


export const recoverPassword = async (data: dataUser): Promise<IresponseRepositoryService> => {
  try {
    const { userGroup,userName,password} = data;

    const db = await connectToSqlServer();

    const hashedContrasena = await hashPassword(password);

    await db?.request()
    .query(`UPDATE TB_${userGroup} SET password = '${hashedContrasena}' WHERE userName = '${userName}' `);
    
    return {
      code: 200,
      message: 'users.successfully_updated',
    };

  } catch (err: any) {
    console.log("Error update user", err);
    return {
      code: 400,
      message: { translationKey: "users.errorInRepository", translationParams: { name: "recoverPassword" } },
    };
  }
};



export const getUser = async (params: IGetUser | any) => {
  try {
    const { userName, userGroup } = params;

    const db = await connectToSqlServer();

    const result = await db?.request()
    .query(`SELECT TOP 1 id, userName FROM TB_${userGroup} WHERE userName = '${userName}'`);

    return {
      code: 200,
      message: 'users.succesfull',
      data: result?.recordset
    };

  } catch (err: any) {
    console.log("Error bringing user", err);
    return {
      code: 400,
      message: { translationKey: "users.errorInRepository", translationParams: { name: "getUser" } },
    };
  }
};



export const authenticateUser = async (data: dataUser): Promise<IresponseRepositoryService> => {
  try {
    const { userName, password, userGroup } = data;

    const db = await connectToSqlServer();

    // Obtener el usuario por correo electrónico
    const userResult = await db?.request()
      .query(`SELECT TOP 1 * FROM TB_${userGroup} WHERE userName = '${userName}'`);


    // Verificar si se encontró un usuario
    if (!userResult || userResult.recordset.length === 0) {
      return {
        code: 401,  // Código 401 para indicar no autorizado
        message: { translationKey: "users.userNotFound", translationParams: { userName } },
      };
    }

    const user = userResult.recordset[0];

    // Verificar la contraseña utilizando bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return {
        code: 401,
        message: 'users.Invalid_password',
        data: {userName : user.userName, password : password },
      };
    }
    return {
      code: 200,
      message: 'users.succesfull',
      data: {userName : user.userName, id : user.id },
    };

  } catch (err: any) {
    console.error("User authentication failed", err);
    return {
      code: 500,
      message: { translationKey: "users.errorInRepository", translationParams: { name: "authenticateUser" } },
    };
  }
};

