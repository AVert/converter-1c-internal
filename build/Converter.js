"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Parser_1 = __importDefault(require("./Parser"));
const convertFrom_1 = __importDefault(require("./convertFrom"));
const convertTo_1 = __importDefault(require("./convertTo"));
/**
 * Default class that is used to convert values and objects to 1C:Enterprise
 * internal format string and vice versa - from 1C:Enterprise internal
 * format string to a JS value or object
 */
class Converter {
    /**
    * @static Converts a 1C:Enterprise internal format string to a value or an object
    */
    static convertFrom1C(sourceString) {
        // firstly we need to parse internal format string to fit it JSON array format
        const parsed = Parser_1.default.parse(sourceString);
        // now we can convert data to JS instances
        return convertFrom_1.default(parsed);
    }
    /**
    * @static Converts a value or an object to the 1C:Enterprise internal format string
    */
    static convertTo1C(item) {
        return convertTo_1.default(item);
    }
}
exports.default = Converter;
//# sourceMappingURL=Converter.js.map