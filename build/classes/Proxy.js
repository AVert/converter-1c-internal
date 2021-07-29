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
class ValueTable extends Iterable_1.default {
    constructor() {
        super();
        _ValueTable_columns.set(this, new ValueTableColumnCollection());
        return new Proxy(this, {
            construct(target, args, newTarget) {
                console.log(`Got it!`);
                return Reflect.construct(() => { }, args, newTarget);
            },
            set(target, property, value, receiver) {
                console.log(`Property: ${property.toString()}`);
                return true;
            }
        });
    }
    get columns() {
        return __classPrivateFieldGet(this, _ValueTable_columns, "f");
    }
    addRow(value) {
        const newRow = new ValueTableRow(__classPrivateFieldGet(this, _ValueTable_columns, "f"), value);
        this.push(newRow);
        return newRow;
    }
}
exports.default = ValueTable;
_ValueTable_columns = new WeakMap();
class ValueTableColumnCollection extends Iterable_1.default {
    constructor() {
        super();
    }
    add(name, type) {
        const newColumn = new ValueTableColumn(name, type);
        this.push(newColumn);
        return newColumn;
    }
}
class ValueTableColumn {
    constructor(name, type) {
        _ValueTableColumn_name.set(this, void 0);
        _ValueTableColumn_type.set(this, void 0);
        __classPrivateFieldSet(this, _ValueTableColumn_name, name, "f");
        __classPrivateFieldSet(this, _ValueTableColumn_type, type, "f");
    }
    get name() {
        return __classPrivateFieldGet(this, _ValueTableColumn_name, "f");
    }
    get type() {
        return __classPrivateFieldGet(this, _ValueTableColumn_type, "f").toString();
    }
}
_ValueTableColumn_name = new WeakMap(), _ValueTableColumn_type = new WeakMap();
class ValueTableRow {
    constructor(columns, value) {
        for (let column of columns) {
            this[column.name] = undefined;
        }
    }
}
//# sourceMappingURL=Proxy.js.map