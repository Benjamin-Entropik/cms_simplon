import { AbstractModel } from "./abstract.model";

export class Query {
  public table: any;
  public fields: any = null;
  selectedFields: Array<any> = [];
  selectedCondition: string = "";
  selectedJoin: string = "";
  selectedJoinField: string = "";

  constructor(model: AbstractModel) {
    this.table = model.table;
    this.fields = model.fields;
  }

  public select(args: any) {
    this.selectedFields = args;
    return this;
  }

  public delete(id: number) {
    console.log(`DELETE FROM ${this.table} WHERE id = ${id}`)
    return `DELETE FROM ${this.table} WHERE id = ${id}`;
  }

  from(table: any, alias: any = null) {
    if (!alias) {
      this.table = table;
    } else {
      this.table = `${table} AS ${alias}`
    }
    return this;
  }

  where(args: any) {
    let conditions: string = "";
    if (Array.isArray(args)) {
      if (args.length > 1) {
        if (args[0][2].includes('%')) args[0][2] = `'${args[0][2]}'`

        conditions += " " + args[0][0] + " " + args[0][1] + " " + args[0][2] + " "

        for (let index = 1; index < args.length; index++) {
          if (args[index][0].includes('%')) args[index][0] = `'${args[index][0]}'`
          conditions += " AND " + args[index][0] + " " + args[index][1] + " " + args[index][2] + " "
        }

      } else {
        args.forEach(element => {
          if (element[2].includes('%')) element[2] = `'${element[2]}'`
          conditions += " " + element[0] + " " + element[1] + " " + element[2] + " "

        })

      }
    }

    if (typeof args === 'object' && !Array.isArray(args)) {
      conditions += this.and(args) + " "
    }
    if (conditions !== "")this.selectedCondition += " WHERE " + this.table + '.' + conditions;
    return this;
  }
  and(args: any) {
    let conditions: string = "";
    const keys: any = Object.keys(args);

    if (keys && keys.length > 1) {
      keys.map((key: any, index: number) => {
        if (key && index === 0) conditions += key + " = " + args[key]
        if (key && index > 0) conditions += " AND " + key + " = '" + args[key] + "'"
      })
    } else {
      conditions += keys[0] + " = '" + args[keys[0]] + "'"
    }
    return conditions;
  }

  public add(values: object) {
    const keys: any = Object.keys(values);
    const vals: any = Object.values(values);

    let arrayField: string = `${keys[0]}`;
    let arrayValues: string = `'${vals[0]}'`;

    for (let i = 1; i < keys.length; i++) {
      arrayField += `, ${keys[i]}`;
    }

    for (let i = 1; i < vals.length; i++) {
      arrayValues += `, '${vals[i]}'`;
    }

    console.log(`INSERT INTO ${this.table} (${arrayField}) values (${arrayValues})`)
    return `INSERT INTO ${this.table} (${arrayField}) values (${arrayValues})`;
  }

  public update(values: object, id: number) {
    const keys: any = Object.keys(values);
    const vals: any = Object.values(values);

    let arrayValues: string = `${keys[0]} = '${vals[0]}'`;

    for (let i = 1; i < vals.length; i++) {
      arrayValues += `, ${keys[i]} = '${vals[i]}'`;
    }
    let update = `UPDATE ${this.table} SET ${arrayValues} WHERE id = ${id}`;
    console.log(update);
    return update;
  }

  toString() {
    const liestFields: string = (this.selectedFields.length > 0) ? this.selectedFields.join(`, `) : '*'
    let query: string = "";

    if (this.selectedJoin != "") {



      query = 'SELECT ' + liestFields + ' FROM ' + this.table + this.selectedJoin + this.selectedCondition;
    } else {
      query = 'SELECT ' + liestFields + ' FROM ' + this.table + this.selectedCondition;
    }

    this.selectedJoin = "";
    this.selectedJoinField = "";
    this.selectedFields = [];
    this.table = "";
    this.selectedCondition = "";
    return query;
  }

  join(args: any) {

    this.selectedJoin = ' LEFT JOIN ' + args.table + ' ON ' + this.table + '.id=' + args.table + '.' + this.table + '_id';

    return this;
  }
}