import { Database } from "../database/database";
import { Query } from "./query";

export abstract class AbstractModel {
  query: Query;
  public table;
  public fields;
  public table_join;
  selection: any = []
  constructor(table: string, fields) {
    this.table = table;
    this.fields = fields;
    this.query = new Query(this);
  }

  protected overwriteTypes(): object {
    return {};
  }

  public async findAll(data: any = null) {
    let queryString: string = "";
    if (!data) {
      queryString = this.query.select(this.selection).from(this.table).toString()
    } else {
      queryString = this.query.select(this.selection).from(this.table).where(data).toString()

    }
    try {
      this.selection = []
      const data: any = await Database.query(queryString)

      return data
    } catch (error) {
      return { error: error }
    }
  }


  public async find(id: number) {
    let queryString: string;
    if(this.table_join) {
      queryString = this.query.select(this.selection).from(this.table).where({ id: id }).join({table: this.table_join}).toString()

    } else {
      queryString = this.query.select(this.selection).from(this.table).where({ id: id }).toString()
    }
    try {
      this.selection = []
      const data: any = await Database.query(queryString)
      return data
    } catch (error) {
      return { error: error }
    }
  }

  public async add(values: object) {
    const queryString: string = this.query.add(values);
    try {
      this.selection = []
      const data: any = await Database.query(queryString)
      return data
    } catch (error) {
      return { error: error }
    }
  }

  public async update(values: object, id: number) {
    const queryString: string = this.query.update(values, id);
    try {
      this.selection = []
      const data: any = await Database.query(queryString)
      return data
    } catch (error) {
      return { error: error }
    }
  }

  public async delete(id: number) {
    const queryString: string = this.query.delete(id);
    try {
      this.selection = []
      const data: any = await Database.query(queryString)
      return data
    } catch (error) {
      return { error: error }
    }
  }

  public with(table) {
    this.table_join = table;
    return this;
  }

}