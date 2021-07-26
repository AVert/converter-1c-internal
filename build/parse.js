"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ValueList_1 = __importDefault(require("./classes/ValueList"));
const ValueTable_1 = __importDefault(require("./classes/ValueTable"));
const parsers = {
    '#': getObject,
    'S': getString,
    'N': getNumber,
    'B': getBoolean,
    'D': getDate,
    'L': getNull,
    'acf6192e-81ca-46ef-93a6-5a6968b78663': getValueTable,
    '4772b3b4-f4a3-49c0-a1a5-8cb5961511a3': getValueList,
    '51e7a0d2-530b-11d4-b98a-008048da3034': getArray
};
function parse(source) {
    const objectId = source[0];
    return getParser(objectId)(source);
}
exports.default = parse;
function getParser(objectId) {
    if (Object.getOwnPropertyDescriptor(parsers, objectId)) {
        // I would prefer to get parser in that way parsers[type], byt TS doesn't allow it :-)
        return Object.getOwnPropertyDescriptor(parsers, objectId).value;
    }
    return undefined;
}
function getObject(source) {
    const objectId = source[1];
    const parser = getParser(objectId);
    if (parser) {
        return parser(source);
    }
    else if (Number(source[2]) > 0) {
        return getReference(source);
    }
    else {
        throw new Error(`Can't parse object with ID '${objectId}'`);
    }
}
function getValueTable(source) {
    const valueTable = new ValueTable_1.default();
    const columns = source[2][1].slice(1);
    const rows = source[2][2][columns.length * 2 + 2].slice(2);
    for (let i = 0; i < columns.length; i++) {
        const columnName = columns[i][1];
        const columnType = columns[i][2][1][0];
        valueTable.columns.add(columnName, columnType);
    }
    for (let row of rows) {
        const valueTableRow = valueTable.addRow();
        for (let i = 0; i < valueTable.columns.length; i++) {
            const columnName = valueTable.columns[i].name;
            valueTableRow[columnName] = parse((row[i + 3]));
        }
    }
    return valueTable;
}
function getValueList(source) {
    const valueList = new ValueList_1.default();
    const items = source[2][4].slice(1);
    for (let item of items) {
        valueList.add(parse(item[1][2]), item[1][0], item[1][1]);
    }
    return valueList;
}
function getArray(source) {
    const items = source[2].slice(1);
    const data = [];
    for (let item of items) {
        data.push(parse(item));
    }
    return data;
}
function getReference(source) {
    const item = {};
    item.meteDataObjectId = source[1];
    item.dataBaseTableId = source[2];
    item.linkId = source[3];
    item.referenceId = getReferenceId(item.linkId);
    return item;
}
function getReferenceId(linkId) {
    const part1 = linkId.slice(24);
    const part2 = linkId.slice(20, 24);
    const part3 = linkId.slice(16, 20);
    const part4 = linkId.slice(0, 4);
    const part5 = linkId.slice(4, 16);
    return `${part1}-${part2}-${part3}-${part4}-${part5}`;
}
function getString(source) {
    return source[1];
}
function getNumber(source) {
    return source[1];
}
function getBoolean(source) {
    return Boolean(source[1]);
}
function getDate(source) {
    return new Date(source[1]);
}
function getNull() {
    return null;
}
//# sourceMappingURL=parse.js.map