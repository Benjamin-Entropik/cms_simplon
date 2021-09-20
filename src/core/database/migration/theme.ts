import { Database } from "../database";

export class Theme {
  public static createTable() {
    return Database.query(`CREATE TABLE IF NOT EXISTS theme
      (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, name VARCHAR(50), choice BOOLEAN)`)
  }
}