import Reference from "./classes/Reference";
import ValueList from "./classes/ValueList";
import ValueTable from "./classes/ValueTable";

type Executers = {
  [key: string]: Function
}

const executers: Executers = {
  '#': parseObject,
  'S': parseString,
  'N': parseNumber,
  'B': parseBoolean,
  'D': parseDate,
  'L': parseNull,
  'acf6192e-81ca-46ef-93a6-5a6968b78663': parseValueTable,
  '4772b3b4-f4a3-49c0-a1a5-8cb5961511a3': parseValueList,
  '51e7a0d2-530b-11d4-b98a-008048da3034': parseArray
}

export default function convertFrom(source: any[]): Object {
  const objectId = String(source[0]);
  const executer = getExecuter(objectId);
  if(executer) {
    try {
      return executer(source);
    } catch(error) {
      throw new Error(`Can't parse sourse string (${error})`);
    }
  } else {
    throw new Error(`Can't parse sourse string. Unknown object with ID '${objectId}'`);
  }
}

function getExecuter(objectId: string): Function | undefined {
  return Reflect.get(executers, objectId);
}

function parseObject(source: any[]): any {

  const objectId = (source[1] as string);
  const parser =  getExecuter(objectId);
  if(parser) {
    return parser(source);
  } else if(Number(source[2]) === source[2] ) {
    // it looks like objectId is a reference ID, because the third
    // parametr in array is a number of table in a data base 
    return parseReference(source);
  } else {
    throw new Error(`Can't parse object with ID '${objectId}'`)
  }
}

function parseValueTable(source: any[]) {

  const valueTable = new ValueTable();
  const columns = (source[2][1] as []).slice(1);
  const rows = (source[2][2][columns.length * 2 + 2] as []).slice(2);

  for(let i = 0; i < columns.length; i++) {
    const columnName = columns[i][1];
    let columnType = undefined;
    if(columns[i][2][1]) {
      columnType = columns[i][2][1][0];
    }
    valueTable.columns.add(columnName, columnType);
  }

  for(let row of rows) {
    const valueTableRow = valueTable.addRow();
    for(let i = 0; i < valueTable.columns.length; i++) {
      const columnName = valueTable.columns[i].name;
      valueTableRow[columnName] = convertFrom((row[i + 3]));
    }
  }

  return valueTable;
}

function parseValueList(source: any[]) {

  const valueList = new ValueList();
  const data = (source[2][4] as []).slice(1);

  for(let item of data) {
    const i = valueList.add(convertFrom(item[1][2]), item[1][0], item[1][1]);
    i.marked
  }

  return valueList;
}

function parseArray(source: any[]) {

  const data: any[] = (source[2] as []).slice(1);

  const array = [];
  for(let item of data) {
    array.push(convertFrom(item));
  }

  return array;
}

function parseReference(source: any[]) {
  return new Reference(source[1], source[2], source[3]);
}

function parseString(source: any[]): string {
  return source[1];
}

function parseNumber(source: any[]): number {
  return Number(source[1]);
}

function parseBoolean(source: any[]): boolean {
  return Boolean(source[1]);
}

function parseDate(source: any[]): Date {

  const dateString = source[1].toString();

  const yyyy  = dateString.slice(0, 4);
	const MM    = dateString.slice(4, 6);
	const dd    = dateString.slice(6, 8);
	const hh    = dateString.slice(8, 10);
	const mm    = dateString.slice(10, 12);
  const ss    = dateString.slice(12);

  return new Date(`${yyyy}-${MM}-${dd}T${hh}:${mm}:${ss}`);
}

function parseNull(): null {
  return null;
}