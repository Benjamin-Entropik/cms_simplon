import { Database } from "../../database";

export class Commentaire {
  public static createTable() {
    Database.query(`CREATE TABLE IF NOT EXISTS commentaire
      (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, name VARCHAR(50), content VARCHAR(255), article_id INT)`)
    Database.query(`ALTER TABLE commentaire  ADD FOREIGN KEY (article_id) REFERENCES article(id)`)
    
    return 'table commentaire créée'
  }

  public static drop() {
    return Database.query(`DROP TABLE IF EXISTS commentaire`)
  }
}