import { Database } from "../../database";

export class Theme {
  public static createTable() {
    return Database.query(`CREATE TABLE IF NOT EXISTS theme
      (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, name VARCHAR(50), choice BOOLEAN)`)
  }

  public static createSeeder() {
    this.createTable();
    return Database.query(`INSERT INTO theme (id, name, choice)
    VALUES
    (1, 'standard', 1),
    (2, 'brown', 0)`)
  }

  public static drop() {
    return Database.query(`DROP TABLE IF EXISTS theme`)
  }
}