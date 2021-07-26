"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValueList extends Array {
    constructor() {
        super();
    }
    add(value, representation, marked = false) {
        const item = new ValueListItem(value, representation, marked);
        this.push(item);
        return item;
    }
}
exports.default = ValueList;
class ValueListItem {
    constructor(value, representation, marked) {
        this.value = value;
        this.representation = representation;
        this.marked = marked;
    }
}
//# sourceMappingURL=ValueList%20copy.js.map