import mysql from 'mysql2';
import { DatabaseModel } from '../model/database.model';

export class Database {
  static results: any;
  constructor() { }

  public static createConnection() {
    const db = new DatabaseModel(process.env.MYSQL_HOST, process.env.MYSQL_USER, process.env.MYSQL_DATABASE, process.env.MYSQL_PASSWORD)
    return mysql.createConnection(db);
  }

  public static async query(sql) {
    let conn = await this.createConnection();
    return new Promise(function (resolve, reject) {
      conn.query(sql, function (err, rows, fields) {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    })
  }
}