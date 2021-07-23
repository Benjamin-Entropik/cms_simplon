import { Database } from "../database";

export class Query {
  public table: string;
  public fields: string;
  private static _instance: Query;

  constructor(table, fields) {
    Query._instance = this;
    this.table = table;
    this.fields = fields;
  }

  public static getInstance(table: string, fields: string) {
    Query._instance = new Query(table, fields);
    return Query._instance;
  }

  public async findAll() {
    let results: any;
    if (this.fields != null) {
      await Database.query('SELECT ' + this.fields + ' from ' + this.table, function (_results) {
        results = _results;
      });
    } else {
      await Database.query('SELECT * from ' + this.table, function (_results) {
        results = _results;
      });
    }
    return results;
  }
}