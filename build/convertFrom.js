"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Reference_1 = __importDefault(require("./classes/Reference"));
const ValueList_1 = __importDefault(require("./classes/ValueList"));
const ValueTable_1 = __importDefault(require("./classes/ValueTable"));
const executers = {
    '#': parseObject,
    'S': parseString,
    'N': parseNumber,
    'B': parseBoolean,
    'D': parseDate,
    'L': parseNull,
    'acf6192e-81ca-46ef-93a6-5a6968b78663': parseValueTable,
    '4772b3b4-f4a3-49c0-a1a5-8cb5961511a3': parseValueList,
    '51e7a0d2-530b-11d4-b98a-008048da3034': parseArray,
    '4238019d-7e49-4fc9-91db-b6b951d5cf8e': parseStructure
};
function convertFrom(source) {
    const objectId = String(source[0]);
    const executer = getExecuter(objectId);
    if (executer) {
        try {
            return executer(source);
        }
        catch (error) {
            throw new Error(`Can't parse sourse string (${error})`);
        }
    }
    else {
        throw new Error(`Can't parse sourse string. Unknown object with ID '${objectId}'`);
    }
}
exports.default = convertFrom;
function getExecuter(objectId) {
    return Reflect.get(executers, objectId);
}
function parseObject(source) {
    const objectId = source[1];
    const parser = getExecuter(objectId);
    if (parser) {
        return parser(source);
    }
    else if (Number(source[2]) === source[2]) {
        // it looks like objectId is a reference ID, because the third
        // parametr in array is a number of table in a data base 
        return parseReference(source);
    }
    else {
        throw new Error(`Can't parse object with ID '${objectId}'`);
    }
}
function parseValueTable(source) {
    const valueTable = new ValueTable_1.default();
    const columns = source[2][1].slice(1);
    const rows = source[2][2][columns.length * 2 + 2].slice(2);
    for (let i = 0; i < columns.length; i++) {
        const columnName = columns[i][1];
        let columnType = undefined;
        if (columns[i][2][1]) {
            columnType = columns[i][2][1][0];
        }
        valueTable.columns.add(columnName, columnType);
    }
    for (let row of rows) {
        const valueTableRow = valueTable.addRow();
        for (let i = 0; i < valueTable.columns.length; i++) {
            const columnName = valueTable.columns[i].name;
            valueTableRow[columnName] = convertFrom((row[i + 3]));
        }
    }
    return valueTable;
}
function parseValueList(source) {
    const valueList = new ValueList_1.default();
    const data = source[2][4].slice(1);
    for (let item of data) {
        const i = valueList.add(convertFrom(item[1][2]), item[1][0], item[1][1]);
        i.marked;
    }
    return valueList;
}
function parseArray(source) {
    const data = source[2].slice(1);
    const array = [];
    for (let item of data) {
        array.push(convertFrom(item));
    }
    return array;
}
function parseStructure(source) {
    const data = source[2].slice(1);
    const structure = {};
    for (let item of data) {
        structure[item[0][1]] = convertFrom(item[1]);
    }
    return structure;
}
function parseReference(source) {
    return new Reference_1.default(source[1], source[2], source[3]);
}
function parseString(source) {
    return source[1];
}
function parseNumber(source) {
    return Number(source[1]);
}
function parseBoolean(source) {
    return Boolean(source[1]);
}
function parseDate(source) {
    const dateString = source[1].toString();
    const yyyy = dateString.slice(0, 4);
    const MM = dateString.slice(4, 6);
    const dd = dateString.slice(6, 8);
    const hh = dateString.slice(8, 10);
    const mm = dateString.slice(10, 12);
    const ss = dateString.slice(12);
    return new Date(`${yyyy}-${MM}-${dd}T${hh}:${mm}:${ss}`);
}
function parseNull() {
    return null;
}
//# sourceMappingURL=convertFrom.js.map