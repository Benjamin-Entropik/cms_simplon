import mysql from 'mysql2';
import { DatabaseModel } from '../model/database.model';

export class Database {
  static results: any;
  constructor() { }

  public static createConnection() {
    const db = new DatabaseModel(process.env.MYSQL_HOST, process.env.MYSQL_USER, process.env.MYSQL_DATABASE, process.env.MYSQL_PASSWORD)
    return mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      connectionLimit: 100,
      waitForConnections: true,
      queueLimit: 0
    });
  }

  public static async query(sql) {
    let conn = await this.createConnection();
    return new Promise(function (resolve, reject) {
      conn.execute(sql, function (err, rows, fields) {
        if (err) {
          return reject(err);
        }
        resolve(rows);

      });
      conn.removeAllListeners();

    })
  }
}