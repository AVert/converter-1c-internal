"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Iterable_entries, _a;
Object.defineProperty(exports, "__esModule", { value: true });
class Iterable {
    constructor() {
        _Iterable_entries.set(this, []);
        /**
        * How many items it has
        */
        this.length = 0;
        this[_a] = function () {
            let count = 0;
            let isDone = false;
            let next = () => {
                if (count >= __classPrivateFieldGet(this, _Iterable_entries, "f").length) {
                    isDone = true;
                }
                return { done: isDone, value: __classPrivateFieldGet(this, _Iterable_entries, "f")[count++] };
            };
            return { next };
        };
    }
    push(value) {
        __classPrivateFieldGet(this, _Iterable_entries, "f").push(value);
        this[__classPrivateFieldGet(this, _Iterable_entries, "f").length - 1] = value;
        this.length = __classPrivateFieldGet(this, _Iterable_entries, "f").length;
        return __classPrivateFieldGet(this, _Iterable_entries, "f").length;
    }
    splice(start = 0, deleteCount = 0, items = []) {
        return __classPrivateFieldGet(this, _Iterable_entries, "f").splice(start, deleteCount, ...items);
    }
}
exports.default = Iterable;
_Iterable_entries = new WeakMap(), _a = Symbol.iterator;
//# sourceMappingURL=Iterable.js.map