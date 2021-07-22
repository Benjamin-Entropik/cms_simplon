import mysql from 'mysql2/promise';
import { DatabaseModel } from './database.model';

export class Database {
  static results: any;
  constructor() { }

  private static setDb() {
    return new DatabaseModel(process.env.MYSQL_HOST, process.env.MYSQL_USER, process.env.MYSQL_DATABASE, process.env.MYSQL_PASSWORD)
  }

  public static async query(sql) {
    let db = this.setDb();
    const conn = await mysql.createConnection(db);

    let [rows, fields] = await conn.query(sql);

  }
}