import { IresponseRepositoryService, dataUser,IGetUser } from "../interface/users";
import { connectToSqlServer } from "../DB/config";
import bcrypt from 'bcrypt';


export const createUser = async (data: dataUser): Promise<IresponseRepositoryService> => {
  try {
    const { email, password, userGroup } = data;

    const db = await connectToSqlServer();

    // Encriptar la contraseña utilizando bcrypt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedContrasena = await bcrypt.hash(password, salt);

    // Realizar el INSERT en la tabla 
    await db?.request()
    .query(`INSERT INTO TB_${userGroup} VALUES ('${email}', '${hashedContrasena}')`);
    
    const result = await db?.request()
    .query(`SELECT TOP 1 id,email FROM TB_${userGroup} WHERE email = '${email}'`);

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


export const getUser = async (params: IGetUser | any) => {
  try {
    const { email, userGroup } = params;

    const db = await connectToSqlServer();

    const result = await db?.request()
    .query(`SELECT TOP 1 id, email FROM TB_${userGroup} WHERE email = '${email}'`);

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
    const { email, password, userGroup } = data;

    const db = await connectToSqlServer();

    // Obtener el usuario por correo electrónico
    const userResult = await db?.request()
      .query(`SELECT TOP 1 * FROM TB_${userGroup} WHERE email = '${email}'`);


    // Verificar si se encontró un usuario
    if (!userResult || userResult.recordset.length === 0) {
      return {
        code: 401,  // Código 401 para indicar no autorizado
        message: { translationKey: "users.userNotFound", translationParams: { email } },
      };
    }

    const user = userResult.recordset[0];

    // Verificar la contraseña utilizando bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return {
        code: 401,
        message: 'users.Invalid_password',
        data: {email : user.email, password : password },
      };
    }
    return {
      code: 200,
      message: 'users.succesfull',
      data: {email : user.email, id : user.id },
    };

  } catch (err: any) {
    console.error("User authentication failed", err);
    return {
      code: 500,
      message: { translationKey: "users.errorInRepository", translationParams: { name: "authenticateUser" } },
    };
  }
};

