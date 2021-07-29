import Parser from "./Parser";
import convertFrom from "./convertFrom";
import convertTo from "./convertTo";

/**
 * Default class that is used to convert values and objects to 1C:Enterprise
 * internal format string and vice versa - from 1C:Enterprise internal 
 * format string to a JS value or object
 */
export default class Converter {

  /**
  * @static Converts a 1C:Enterprise internal format string to a value or an object
  */
  static convertFrom1C(sourceString: string): Object {
    // firstly we need to parse internal format string to fit it JSON array format
    const parsed = Parser.parse(sourceString);
    // now we can convert data to JS instances
    return convertFrom(parsed);
  }

  /**
  * @static Converts a value or an object to the 1C:Enterprise internal format string
  */
  static convertTo1C(item: string | number | boolean | null | Date | Array<any> | IReference | IValueList | IValueTable): string {
    return convertTo(item);
  }
}