import { Sequelize } from "sequelize";
import mongoose from "mongoose";
import "colors";
import config from "../config/config";
import * as sql from 'mssql';

const configSQL: sql.config = {
  server: config.server_name_sql,
  user: config.user_server_sql,
  password: "13A132b17#",
  database: config.name_database_sql,
  options: {
    encrypt: true, // Puedes necesitar establecer esto a true dependiendo de tu configuración
  },
};

// Instancia de conexión para SQL
async function connectToSqlServer() {
  try {


    const pool = await sql.connect(configSQL); // Utiliza la configuración de SQL
    console.log('Conectado a SQL Server');

    // Ejemplo de consulta
    const result = await pool.request().query('SELECT 1 as Numero');
    console.log('Resultado de la consulta:', result.recordset);

    return pool;
  } catch (err) {
    console.error('Error al conectar a SQL Server:', err);
  }
}

// Conexion para mongo
const dbConnection = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(config.mongo_connection);
    console.log(" 🌳 Conectado correctamente a la base de datos online".blue);
  } catch (err) {
    console.log(" 😡 No se pudo conectar a la base de datos -- MONGO ".red);
  }
};

export { dbConnection, connectToSqlServer };
