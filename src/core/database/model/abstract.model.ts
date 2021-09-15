import { Database } from "../database";
import { Query } from "./query";

export abstract class AbstractModel {
  public static query: Query;
  public table;
  public fields;

  constructor(table: string, fields) {
    this.table = table;
    this.fields = fields;
    AbstractModel.query = new Query(this);
  }

  protected overwriteTypes(): object {
    return {};
  }

  public async findAll() {
    let results: any;

    await Database.query(AbstractModel.query.findAll(), function (_results) {
      results = _results;
    });

    return results;
  }

  public async add() {
    let results: any;

    await Database.query(AbstractModel.query.add(), function (_results) {
      results = _results;
    });

    return results;
  }
}