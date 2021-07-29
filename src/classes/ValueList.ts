import Iterable from "./Iterable";

/**
 * Value list is an object that represents 1C:Enterprise analogue of Values list. 
 * Contains a collection of {@link ValueTableItem} objects and can be iterated through
 * all the items and every item can be getten by index.
 */
export default class ValueList extends Iterable<ValueListItem> {

  constructor() {
    super();
  }

  /**
   * Add a new item to the list
   * @param {any} value Any value or an object, that can be converted to 
   * 1C:Enterprise internal format string
   * @param {string} [representation] A titel for the value
   * @param {boolean} [marked] Whether a value is marked/checked or not
   * @returns {ValueListItem} Added item
   */
  add(value: any, representation: string | undefined = undefined, marked: boolean = false): ValueListItem {
    const item = new ValueListItem(value, representation, marked);
    this.push(item);
    return item;
  }
}

/**
 * Represents 1C:Enterprise analogue of Values list item. 
 * Can be created only by using {@link ValueList.add} method.
 */
class ValueListItem {
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

  constructor(value: any, representation: string | undefined, marked: boolean) {
    this.value = value;
    this.representation = representation;
    this.marked = marked;
  }
}