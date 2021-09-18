import { Database } from "../database";

export class Article {
  public static createTable() {
    return Database.query(`CREATE TABLE IF NOT EXISTS article
      (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, title VARCHAR(50), content VARCHAR(255))`)
  }
}