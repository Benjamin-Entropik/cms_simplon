import { Database } from "../../database";

export class User {
  public static createTable() {
    return Database.query(`CREATE TABLE IF NOT EXISTS user
      (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, name VARCHAR(50) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(125) NOT NULL, token VARCHAR(255))`);
  }

  public static drop() {
    return Database.query(`DROP TABLE IF EXISTS user`)
  }
}