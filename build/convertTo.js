"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataTypes_1 = __importDefault(require("./classes/DataTypes"));
const executers = {
    'string': convertString,
    'number': convertNumber,
    'boolean': convertBoolean,
    'null': convertNull,
    'Date': convertDate,
    'Reference': convertReference,
    'Array': convertArray,
    'ValueList': convertValueList,
    'ValueTable': convertValueTable
};
function convertTo(item) {
    let type = typeof item;
    if (item === null) {
        type = 'null';
    }
    else if (isReference(item)) {
        type = 'Reference';
    }
    else if (isValueList(item)) {
        type = 'ValueList';
    }
    else if (isValueTable(item)) {
        type = 'ValueTable';
    }
    else if (type === 'object') {
        type = item.constructor.name;
    }
    const executer = getExecuter(type);
    if (executer) {
        try {
            return executer(item);
        }
        catch (error) {
            throw new Error(`Can't convert item to 1C internal (${error})`);
        }
    }
    else {
        throw new Error(`Can't convert type '${type}' to 1C internal.`);
    }
}
exports.default = convertTo;
function isReference(item) {
    if (item.meteDataObjectId && item.dataBaseTableId && item.linkId) {
        return true;
    }
    return false;
}
function isValueList(item) {
    if (item.length && item[0] && item[0].value && !item.columns) {
        return true;
    }
    return false;
}
function isValueTable(item) {
    if (item.columns && item.columns.length && item.columns[0].name) {
        return true;
    }
    return false;
}
function getExecuter(type) {
    return Reflect.get(executers, type);
}
function convertString(value) {
    return `{"S","${value}"}`;
}
function convertNumber(value) {
    return `{"N",${value}}`;
}
function convertBoolean(value) {
    return `{"B",${Number(value)}}`;
}
function convertDate(value) {
    const isoString = value.toISOString();
    // TODO this should be changed to convert date withot timezone mutation
    const result = isoString.replace(/-/g, "").replace(/T/g, "").replace(/:/g, "").slice(0, 14);
    return `{"D",${result}}`;
}
function convertNull() {
    return `{"L"}`;
}
function convertReference(value) {
    return `{"#",${value.meteDataObjectId},${value.dataBaseTableId}:${value.linkId}}`;
}
function convertArray(value) {
    // header
    const result = [`{"#",51e7a0d2-530b-11d4-b98a-008048da3034,\n{${value.length},`];
    // items/data section
    const data = [];
    for (let item of value) {
        data.push(convertTo(item));
    }
    // end section
    result.push(data.join(',\n'));
    result.push('}\n}');
    return result.join('\n');
}
function convertValueList(value) {
    // header
    const result = [
        `{"#",4772b3b4-f4a3-49c0-a1a5-8cb5961511a3,`,
        `{6,1e512aab-1b41-4ef6-9375-f0137be9dd91,0,0,`,
        `{${value.length},`
    ];
    // items/data section
    const data = [];
    for (let i = 0; i < value.length; i++) {
        const item = value[i];
        const dataItem = [
            `{1e512aab-1b41-4ef6-9375-f0137be9dd91`,
            `{"${item.representation}",${Number(item.marked)}`,
            convertTo(item.value),
            `{4,0`,
            `{0},"",-1,-1,0,0,""},${i},0,""}\n}`
        ];
        data.push(dataItem.join(',\n'));
    }
    // end section
    result.push(data.join(',\n'));
    result.push('},\n{"Pattern"},0,2}\n}');
    return result.join('\n');
}
function convertValueTable(value) {
    const valueTableColumns = value.columns;
    // header
    const result = [
        `{"#",acf6192e-81ca-46ef-93a6-5a6968b78663,`,
        `{9,`,
        `{${valueTableColumns.length},`
    ];
    // columns description
    const columns = [];
    let columnsNumeration = '';
    for (let c = 0; c < valueTableColumns.length; c++) {
        const column = valueTableColumns[c];
        const columnItem = [
            `{${c},"${column.name}"`,
            `{"Pattern"${valueTableColumnPattern(column, value[0])}},"",0}`
        ];
        columns.push(columnItem.join(',\n'));
        columnsNumeration += `${c},${c},`;
    }
    // rows/data section
    const data = [];
    for (let i = 0; i < value.length; i++) {
        const item = value[i];
        const dataItem = [`{2,${i},${valueTableColumns.length}`];
        for (let c = 0; c < valueTableColumns.length; c++) {
            const column = valueTableColumns[c];
            dataItem.push(convertTo(item[column.name]));
        }
        data.push(`${dataItem.join(',\n')},0}`);
    }
    // end section
    result.push(columns.join(',\n'));
    result.push(`},\n{2,${valueTableColumns.length},${columnsNumeration}`);
    result.push(`{1,${value.length},`);
    result.push(data.join(',\n'));
    result.push(`},${valueTableColumns.length - 1},${value.length - 1}},`);
    result.push(`{0,0}\n}\n}`);
    return result.join('\n');
}
function valueTableColumnPattern(column, item) {
    let result = '';
    if (column.type === DataTypes_1.default.Reference) {
        result = `,{"${column.type}",${item[column.name].meteDataObjectId}}`;
    }
    else if (column.type) {
        result = `,{"${column.type}"}`;
    }
    return result;
}
//# sourceMappingURL=convertTo.js.map