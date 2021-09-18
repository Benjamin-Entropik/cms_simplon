import { Database } from "../database";

export class Commentaire {
  public static createTable() {
    return Database.query(`CREATE TABLE IF NOT EXISTS commentaire
      (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, name VARCHAR(50), content VARCHAR(255), article_id INT, FOREIGN KEY (article_id) REFERENCES article(id))`)
  }
}