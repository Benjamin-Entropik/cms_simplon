import mysql from 'mysql2/promise';
import { DatabaseModel } from './database.model';

export class Database {
  static results: any;
  constructor() { }

  private static createConnection() {
    const db = new DatabaseModel(process.env.MYSQL_HOST, process.env.MYSQL_USER, process.env.MYSQL_DATABASE, process.env.MYSQL_PASSWORD)
    return mysql.createConnection(db);
  }

  public static async query(sql) {
    let conn = await this.createConnection();
    await conn.query(sql);

  }
}