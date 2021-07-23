import { Query } from "./query";

export abstract class AbstractModel {
  public table;
  public fields;
  constructor() { }

  protected overwriteTypes(): object {
    return {};
  }

  public static findAll(table, fields = null) {
    let query = Query.getInstance(table, fields);
    return query.findAll();
  }
}