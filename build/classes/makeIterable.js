"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function makeIterable(target, entries) {
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
exports.default = makeIterable;
//# sourceMappingURL=makeIterable.js.map