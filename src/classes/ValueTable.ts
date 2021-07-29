import Iterable from "./Iterable";
import DataTypes from "./DataTypes";

/**
* Value table is an object that represents 1C:Enterprise analogue of Values table. 
* Contains a collection of {@link ValueTableColumn} objects and can be iterated through
* all the records and every record (row) can be getten by index. Records (rows) are 
* the objects of type {@link ValueTableRow}.
*/
export default class ValueTable extends Iterable<ValueTableRow> {

  /**
   * A collection of columns
   */
  #columns: ValueTableColumnCollection = new ValueTableColumnCollection();
  get columns(): ValueTableColumnCollection {
    return this.#columns;
  }

  constructor() {
    super();
  }

  /**
   * Add a new row to the table. If the method is called with `value` parameter,
   * a new row will be filled with properties' values of that parameter and only,
   * if its properties's names are the same as columns names
   * @param {any} value An object with properties' names the same as columns' names
   * @returns {ValueTableRow} Added row
   */
  addRow(value?: any): ValueTableRow {
    const newRow = new ValueTableRow(this.#columns, value);
    this.push(newRow);
    return newRow;
  }
}

/**
 * Collection of {@link ValueTableColumn} objects
 * * Can be iterated through all the columns and every column can be gotten by index.
 */
class ValueTableColumnCollection extends Iterable<ValueTableColumn> {

  constructor() {
    super();
  }

  /**
   * Add a new column to the table
   * @param {string} name A column's name
   * @param {DataTypes} [type] A column type
   * @returns {ValueTableColumn} Added column
   */
  add(name: string, type?: DataTypes | undefined): ValueTableColumn {
    const newColumn = new ValueTableColumn(name, type);
    this.push(newColumn);
    return newColumn;
  }
}

/**
 * A ValueTable column. Can be created and added only by using 
 * {@link ValueTableColumn.add} method
 */
class ValueTableColumn {

  /**
   * Name of the column
   */
  #name: string;
  get name(): string {
    return this.#name;
  }

  /**
   * Type of the column
   */
  #type: DataTypes | undefined;
  get type(): string | undefined {
    return this.#type;
  }

  /**
   * 
   * @param {string} name Column's name
   * @param {DataTypes} [type] Column type
   */
  constructor(name: string, type?: DataTypes | undefined) {
    this.#name = name;
    this.#type = type || undefined;
  }
}

/**
 * ValueTable row/record. Can be created and added only by using
 * {@link ValueTable.addRow} method.
 */
class ValueTableRow {

  [key: string]: any

  constructor(columns: ValueTableColumnCollection, value?: any) {
    for(let column of columns!) {
      this[column.name] = value ? value[column.name] : undefined;
    }
  }
}