"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _ValueTable_columns, _ValueTableColumn_name, _ValueTableColumn_type;
Object.defineProperty(exports, "__esModule", { value: true });
const Iterable_1 = __importDefault(require("./Iterable"));
/**
* Value table is an object that represents 1C:Enterprise analogue of Values table.
* Contains a collection of {@link ValueTableColumn} objects and can be iterated through
* all the records and every record (row) can be getten by index. Records (rows) are
* the objects of type {@link ValueTableRow}.
*/
class ValueTable extends Iterable_1.default {
    constructor() {
        super();
        /**
         * A collection of columns
         */
        _ValueTable_columns.set(this, new ValueTableColumnCollection());
    }
    get columns() {
        return __classPrivateFieldGet(this, _ValueTable_columns, "f");
    }
    /**
     * Add a new row to the table. If the method is called with `value` parameter,
     * a new row will be filled with properties' values of that parameter and only,
     * if its properties's names are the same as columns names
     * @param {any} value An object with properties' names the same as columns' names
     * @returns {ValueTableRow} Added row
     */
    addRow(value) {
        const newRow = new ValueTableRow(__classPrivateFieldGet(this, _ValueTable_columns, "f"), value);
        this.push(newRow);
        return newRow;
    }
}
exports.default = ValueTable;
_ValueTable_columns = new WeakMap();
/**
 * Collection of {@link ValueTableColumn} objects
 * * Can be iterated through all the columns and every column can be gotten by index.
 */
class ValueTableColumnCollection extends Iterable_1.default {
    constructor() {
        super();
    }
    /**
     * Add a new column to the table
     * @param {string} name A column's name
     * @param {DataTypes} [type] A column type
     * @returns {ValueTableColumn} Added column
     */
    add(name, type) {
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
     *
     * @param {string} name Column's name
     * @param {DataTypes} [type] Column type
     */
    constructor(name, type) {
        /**
         * Name of the column
         */
        _ValueTableColumn_name.set(this, void 0);
        /**
         * Type of the column
         */
        _ValueTableColumn_type.set(this, void 0);
        __classPrivateFieldSet(this, _ValueTableColumn_name, name, "f");
        __classPrivateFieldSet(this, _ValueTableColumn_type, type || undefined, "f");
    }
    get name() {
        return __classPrivateFieldGet(this, _ValueTableColumn_name, "f");
    }
    get type() {
        return __classPrivateFieldGet(this, _ValueTableColumn_type, "f");
    }
}
_ValueTableColumn_name = new WeakMap(), _ValueTableColumn_type = new WeakMap();
/**
 * ValueTable row/record. Can be created and added only by using
 * {@link ValueTable.addRow} method.
 */
class ValueTableRow {
    constructor(columns, value) {
        for (let column of columns) {
            this[column.name] = value ? value[column.name] : undefined;
        }
    }
}
//# sourceMappingURL=ValueTable.js.map