export class DatabaseModel {
  public host: string;
  public user: string;
  public database: string;
  public password: string;

  constructor(host: string, user: string, database: string, password: string) {
    this.host = host;
    this.user = user;
    this.database = database; 
    this.password = password;
  }
}