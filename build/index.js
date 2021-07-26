"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _MyArray_entries;
Object.defineProperty(exports, "__esModule", { value: true });
const fileNam = 'ValueTable';
class MyArray {
    // get length(): number {
    //   return this.#entries.length;
    // }
    constructor() {
        _MyArray_entries.set(this, void 0);
        __classPrivateFieldSet(this, _MyArray_entries, [], "f");
        addIterator(this, __classPrivateFieldGet(this, _MyArray_entries, "f"));
        this.length = 0;
    }
    add(value) {
        __classPrivateFieldGet(this, _MyArray_entries, "f").push(value);
        this[__classPrivateFieldGet(this, _MyArray_entries, "f").length - 1] = value;
        //this.length = this.#entries.length
    }
    getLength() {
        return __classPrivateFieldGet(this, _MyArray_entries, "f").length;
    }
    getByIndex(index) {
        return __classPrivateFieldGet(this, _MyArray_entries, "f")[index];
    }
    splice() {
        return null;
    }
}
_MyArray_entries = new WeakMap(), Symbol.iterator;
function addIterator(target, entries) {
    target.__proto__[Symbol.iterator] = function () {
        let count = 0;
        let isDone = false;
        let next = () => {
            if (count >= entries.length) {
                isDone = true;
            }
            return { done: isDone, value: entries[count++] };
        };
        return { next };
    };
}
const myArray = new MyArray();
for (let i = 0; i < 99999; i++) {
    myArray.add(`Item_${i}`);
}
const p = new Proxy(myArray, {
    get: function (target, property, reciever) {
        if (property === 'length') {
            return target.getLength();
        }
        if (Number(property).toString() === property) {
            return target.getByIndex(Number(property));
        }
    }
});
class m {
    constructor() {
    }
}
const handler = {};
console.log(p[0]);
//# sourceMappingURL=index.js.map