"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Enumeration {
    constructor(meteDataObjectId, dataBaseTableId, linkId) {
        this.meteDataObjectId = meteDataObjectId;
        this.dataBaseTableId = dataBaseTableId;
        this.linkId = linkId;
        this.referenceId = getReferenceId(linkId);
    }
}
exports.default = Enumeration;
function getReferenceId(linkId) {
    const part1 = linkId.slice(24);
    const part2 = linkId.slice(20, 24);
    const part3 = linkId.slice(16, 20);
    const part4 = linkId.slice(0, 4);
    const part5 = linkId.slice(4, 16);
    return `${part1}-${part2}-${part3}-${part4}-${part5}`;
}
//# sourceMappingURL=Enumeration.js.map