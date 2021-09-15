import mysql from 'mysql2/promise';
import { DatabaseModel } from './model/database.model';

export class Database {
  static results: any;
  constructor() { }

  public static createConnection() {
    const db = new DatabaseModel(process.env.MYSQL_HOST, process.env.MYSQL_USER, process.env.MYSQL_DATABASE, process.env.MYSQL_PASSWORD)
    return mysql.createConnection(db);
  }

  public static async query(sql, callback) {
    let conn = await this.createConnection();
    let [results, fields] = await conn.query(sql);
    return callback(results);
  }
}