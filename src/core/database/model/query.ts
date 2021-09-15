import { AbstractModel } from "./abstract.model";

export class Query {
  public table: any;
  public fields: any = null;

  constructor(model: AbstractModel) {
    this.table = model.table;
    this.fields = model.fields;
  }

  public findAll() {

    if (this.fields != null) {
      return 'SELECT ' + this.fields + ' from ' + this.table
    } else {
      return 'SELECT * from ' + this.table
    }
  }

  public add() {
    if (this.fields != null) {
      return 'INSERT INTO ' + this.table + ' ' + this.fields + ' VALUES (\'toto\', \'tata\')'

    } else {
      return 'SELECT * from ' + this.table

    }
  }

}