import Iterable from "./Iterable";
import DataTypes from "./DataTypes";

export default class ValueTable extends Iterable<ValueTableRow> {

  #columns: ValueTableColumnCollection = new ValueTableColumnCollection();
  get columns(): ValueTableColumnCollection {
    return this.#columns;
  }

  constructor() {
    super();
  }

  addRow(value?: any): ValueTableRow {
    const newRow = new ValueTableRow(this.#columns, value);
    this.push(newRow);
    return newRow;
  }
}

class ValueTableColumnCollection extends Iterable<ValueTableColumn> {

  constructor() {
    super();
  }

  add(name: string, type: DataTypes): ValueTableColumn {
    const newColumn = new ValueTableColumn(name, type);
    this.push(newColumn);
    return newColumn;
  }
}

class ValueTableColumn {

  #name: string;
  get name(): string {
    return this.#name;
  }

  #type: DataTypes;
  get type(): string {
    return this.#type.toString();
  }

  constructor(name: string, type: DataTypes) {
    this.#name = name;
    this.#type = type;
  }
}

class ValueTableRow {

  [key: string]: any

  constructor(columns: ValueTableColumnCollection, value?: any) {
    for(let column of columns!) {
      this[column.name] = undefined;
    }
  }
}