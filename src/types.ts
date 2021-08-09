/**
 * Default class that is used to convert values and objects to 1C:Enterprise
 * internal format string and vice versa - from 1C:Enterprise internal 
 * format string to a JS value or object
 */
 export declare class Converter {

  /**
   * @static Converts a 1C:Enterprise internal format string to a value or an object
   */
  static convertFrom1C(sourceString: string): Object;

  /**
   * @static Converts a value or an object to the 1C:Enterprise internal format string
   */
  static convertTo1C(item: string | number | boolean | null | Date | Array<any> | IReference | IValueList | IValueTable): string;
}

export declare enum DataTypes {
  String    = 'S',
  Number    = 'N',
  Boolean   = 'B',
  Date      = 'D',
  Null      = 'L',
  Reference = '#'
}

declare interface IReference {
  meteDataObjectId: string;
  dataBaseTableId: number;
  linkId: string;
}

/**
* Special object to represent a reference to a Metadata object
* inside 1C:Enterprise application
*/
export declare class Reference implements IReference {
  meteDataObjectId: string;
  dataBaseTableId: number;
  linkId: string;
  referenceId: string;
  /**
   * Create a reference
   * @param {string} meteDataObjectId A GUID of a Metadata object inside 1C:Enterprise application
   * @param {number} dataBaseTableId A number of a table in 1C:Enterprise database
   * @param {string} linkId An internal identificator of a reference inside 1C:Enterprise application
   */
  constructor(
    meteDataObjectId: string,
    dataBaseTableId: number,
    linkId: string
  );
}

declare interface IValueList {
  [index: number]: IValueListItem;
  length: number;
}

declare interface IValueListItem {
  value: string;
  representation: string | undefined;
  marked: boolean;
}

/**
 * Value list is an object that represents 1C:Enterprise analogue of Values list. 
 * Contains a collection of {@link ValueTableItem} objects and can be iterated through
 * all the items and every item can be getten by index.
 */
export declare class ValueList implements IValueList {
  [index: number]: ValueListItem;
  length: number;

  /**
   * Add a new item to the list
   * @param {any} value Any value or an object, that can be converted to 
   * 1C:Enterprise internal format string
   * @param {string} [representation] A titel for the value
   * @param {boolean} [marked] Whether a value is marked/checked or not
   * @returns {ValueListItem} Added item
   */
  add(value: any, representation?: string, marked?: boolean): ValueListItem
}

/**
 * Represents 1C:Enterprise analogue of Values list item. 
 * Can be created only by using {@link ValueList.add} method.
 */
declare class ValueListItem implements IValueListItem {
  /**
   * Any value or an object, that can be converted to/from 
   * 1C:Enterprise internal format string
   */
  value: string;

  /**
   * Titel for the value
   */
  representation: string | undefined;

  /**
   * Means whether a value is marked/checked or not
   */
  marked: boolean;

  constructor(value: any, representation: string | undefined, marked: boolean);
}

declare interface IValueTableRow<T> {
  [key: string]: T
}

declare interface IValueTableColumn {
  name: string;
}

declare interface IValueTableColumnCollection<IValueTableColumn> {
  [index: number]: IValueTableRow<any>;
  length: number;
}

declare interface IValueTable {
  [index: number]: IValueTableRow<any>;
  length: number;
  columns: IValueTableColumnCollection<IValueTableColumn>;
}

/**
* Value table is an object that represents 1C:Enterprise analogue of Values table. 
* Contains a collection of {@link ValueTableColumn} objects and can be iterated through
* all the records and every record (row) can be getten by index. Records (rows) are 
* the objects of type {@link ValueTableRow}.
*/
export declare class ValueTable implements IValueTable {

  [index: number]: ValueTableRow<any>;

  /**
  * How many items a ValueTable has
  */
  public length: number;
  
  /**
   * A collection of columns
   */
  public columns: ValueTableColumnCollection<ValueTableColumn>;
  
  /**
   * Add a new row to the table. If the method is called with `value` parameter,
   * a new row will be filled with properties' values of that parameter and only,
   * if its properties's names are the same as columns names
   * @param {any} value An object with properties' names the same as columns' names
   * @returns {ValueTableRow} Added row
   */
  public addRow(value?: any): ValueTableRow<any>;
}

/**
 * Collection of {@link ValueTableColumn} objects
 * * Can be iterated through all the columns and every column can be gotten by index.
 */
declare class ValueTableColumnCollection<ValueTableColumn> implements IValueTableColumnCollection<IValueTableColumn> {
  
  [index: number]: ValueTableRow<any>;

  /**
  * How many columns collection has
  */
   public length: number;
  
   /**
   * Add a new column to the table
   * @param {string} name A column's name
   * @param {DataTypes} [type] A column type
   * @returns {ValueTableColumn} Added column
   */
  public add(name: string, type?: DataTypes | undefined): ValueTableColumn;
}

/**
 * A ValueTable column. Can be created and added only by using 
 * {@link ValueTableColumn.add} method
 */
declare class ValueTableColumn implements IValueTableColumn {

  /**
   * Name of the column
   */
  public name: string;

  /**
   * Type of the column
   */
  public type: DataTypes;
}

/**
 * ValueTable row/record. Can be created and added only by using
 * {@link ValueTable.addRow} method.
 */
declare class ValueTableRow<T>  implements IValueTableRow<T>{

  [key: string]: T
}

export declare type Structure = {
  [key: string]: string | number | boolean | null | Date | Array<any> | IReference | IValueList | IValueTable | Structure
}