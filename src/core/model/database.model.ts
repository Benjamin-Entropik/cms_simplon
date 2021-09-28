export class DatabaseModel {
  public connectionLimit: number;
  public host: string;
  public user: string;
  public database: string;
  public password: string;

  constructor(connectionLimit: number, host: string, user: string, database: string, password: string) {
    this.connectionLimit = connectionLimit;
    this.host = host;
    this.user = user;
    this.database = database;
    this.password = password;
  }
}