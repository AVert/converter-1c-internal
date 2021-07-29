"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Special object to represent a reference to a Metadata object
 * inside 1C:Enterprise application
 */
class Reference {
    /**
     * Create a reference
     * @param {string} meteDataObjectId A GUID of a Metadata object inside 1C:Enterprise application
     * @param {number} dataBaseTableId A number of a table in 1C:Enterprise database
     * @param {string} linkId An internal identificator of a reference inside 1C:Enterprise application
     */
    constructor(meteDataObjectId, dataBaseTableId, linkId) {
        this.meteDataObjectId = meteDataObjectId;
        this.dataBaseTableId = dataBaseTableId;
        this.linkId = linkId;
        this.referenceId = getReferenceId(linkId);
    }
}
exports.default = Reference;
function getReferenceId(linkId) {
    const part1 = linkId.slice(24);
    const part2 = linkId.slice(20, 24);
    const part3 = linkId.slice(16, 20);
    const part4 = linkId.slice(0, 4);
    const part5 = linkId.slice(4, 16);
    return `${part1}-${part2}-${part3}-${part4}-${part5}`;
}
//# sourceMappingURL=Reference.js.map