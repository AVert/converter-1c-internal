/**
* Value table is an object that represents 1C:Enterprise analogue of Values table. 
* Contains a collection of 'ValueTableColumn' objects and can be iterated through
* all the records and every record (row) can be gotten by index. Records (rows) are 
* the objects of type 'ValueTableRow'.
*/
declare class ValueTable {

  /**
  * 'ValueTableColumnCollection'
  */
  public columns: ValueTableColumnCollection<ValueTableColumn>;
  /**
   * Add a new row (record) the the 'ValueTable'
   * @param {any} value An object with properties with names the same as columns names
   */
  public addRow(value?: any): ValueTableRow<any>;
}

/**
* A collection of 'ValueTableColumn' objects.
* Can be iterated through all the columns and every column can be gotten by index.
*/
declare class ValueTableColumnCollection<ValueTableColumn> {
  /**
   * Adds a new column to the 'ValueTable'
   * @param {string} name Name of the column
   * @param {DataTypes} type Type of tne column
   * @returns {ValueTableColumn} new column
   */
  public add(name: string, type: DataTypes): ValueTableColumn;
}

/**
* An object that represents a column of 'ValueTable'.
* Can be created only by using 'add' method of 'ValueTableCollection'
* @property {string} name - The name of the column.
* @property {DataTypes} type - The type of the column.
*/
declare class ValueTableColumn {

  public name: string;
  public type: DataTypes;
}

/**
* An object that represents a row (record) of 'ValueTable'.
* Can be created only by using 'addRow' method of 'ValueTable'
* Row properties are the columns names, so a row represents an objject that 
* has propereties the same as the columns of 'ValueTable'
*/
declare class ValueTableRow<T> {

  [key: string]: T
}

declare enum DataTypes {
  String    = 'S',
  Number    = 'N',
  Boolean   = 'B',
  Date      = 'D',
  Null      = 'L',
  Reference = '#'
}