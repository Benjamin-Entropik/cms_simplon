import { Crypt } from "../../../../../config/md5";
import { Database } from "../../database";

export class User {
  public static createTable() {
    Database.query(`CREATE TABLE IF NOT EXISTS user
      (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, name VARCHAR(50) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(125) NOT NULL, token VARCHAR(255))`);
    return 'table user créée'
  }
  public static createSeeder() {
    this.createTable();
    return Database.query(`INSERT INTO user (id, name, email, password)
    VALUES
    (1, 'maintenance', 'maintenance@simploncms.re', '` + Crypt.calcMD5('password') + `')`)
  }
  public static drop() {
    return Database.query(`DROP TABLE IF EXISTS user`)
  }
}