import ValueList from "./classes/ValueList";
import ValueTable from "./classes/ValueTable";

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
}

export default function parse(source: any[]): any {
  const objectId = (source[0] as string);
  return getParser(objectId)!(source);
}

function getParser(objectId: string): Function | undefined {
  if(Object.getOwnPropertyDescriptor(parsers, objectId)) {
    // I would prefer to get parser in that way parsers[type], byt TS doesn't allow it :-)
    return Object.getOwnPropertyDescriptor(parsers, objectId)!.value;
  }
  return undefined;
}

function getObject(source: any[]): any {
  const objectId = (source[1] as string);
  const parser =  getParser(objectId);
  if(parser) {
    return parser(source);
  } else if(Number(source[2]) > 0 ) {
    return getReference(source);
  } else {
    throw new Error(`Can't parse object with ID '${objectId}'`)
  }
}

function getValueTable(source: any[]) {

  const valueTable = new ValueTable();
  const columns = (source[2][1] as []).slice(1);
  const rows = (source[2][2][columns.length * 2 + 2] as []).slice(2);

  for(let i = 0; i < columns.length; i++) {
    const columnName = columns[i][1];
    const columnType = columns[i][2][1][0];
    valueTable.columns.add(columnName, columnType);
  }

  for(let row of rows) {
    const valueTableRow = valueTable.addRow();
    for(let i = 0; i < valueTable.columns.length; i++) {
      const columnName = valueTable.columns[i].name;
      valueTableRow[columnName] = parse((row[i + 3]));
    }
  }

  return valueTable;
}

function getValueList(source: any[]) {

  const valueList = new ValueList();
  const items = (source[2][4] as []).slice(1);

  for(let item of items) {
    valueList.add(parse(item[1][2]), item[1][0], item[1][1]);
  }

  return valueList;
}

function getArray(source: any[]) {

  const items: any[] = (source[2] as []).slice(1);

  const data = [];
  for(let item of items) {
    data.push(parse(item));
  }

  return data;
}

function getReference(source: any[]) {

    const item: any = {};
    item.meteDataObjectId = source[1];
    item.dataBaseTableId = source[2];
    item.linkId = source[3];
    item.referenceId = getReferenceId(item.linkId);

  return item;
}

function getReferenceId(linkId: string) {

  const part1 = linkId.slice(24);
	const part2 = linkId.slice(20, 24);
	const part3 = linkId.slice(16, 20);
	const part4 = linkId.slice(0, 4);
	const part5 = linkId.slice(4, 16);

  return `${part1}-${part2}-${part3}-${part4}-${part5}`;
}

function getString(source: any[]): string {
  return source[1];
}

function getNumber(source: any[]): number {
  return source[1];
}

function getBoolean(source: any[]): boolean {
  return Boolean(source[1]);
}

function getDate(source: any[]): Date {
  return new Date(source[1]);
}

function getNull(): null {
  return null;
}