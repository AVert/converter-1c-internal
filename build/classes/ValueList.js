"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Iterable_1 = __importDefault(require("./Iterable"));
/**
 * Value list is an object that represents 1C:Enterprise analogue of Values list.
 * Contains a collection of {@link ValueTableItem} objects and can be iterated through
 * all the items and every item can be getten by index.
 */
class ValueList extends Iterable_1.default {
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
    add(value, representation = undefined, marked = false) {
        const item = new ValueListItem(value, representation, marked);
        this.push(item);
        return item;
    }
}
exports.default = ValueList;
/**
 * Represents 1C:Enterprise analogue of Values list item.
 * Can be created only by using {@link ValueList.add} method.
 */
class ValueListItem {
    constructor(value, representation, marked) {
        this.value = value;
        this.representation = representation;
        this.marked = marked;
    }
}
//# sourceMappingURL=ValueList.js.map