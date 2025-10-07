import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST ?? "",
  user: process.env.USER ?? "",
  password: process.env.PASSWORD ?? "",
  database: process.env.DATABASE ?? "",
});

connection.connect((err) => {
  if (err) {
    console.error("Ошибка подключения:", err);
  } else {
    console.log("Подключено к MySQL!");
  }
});

export default connection.connect;
