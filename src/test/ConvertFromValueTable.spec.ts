import sinon from 'sinon';
import { expect, should  } from 'chai';
import { readFileSync, writeFileSync } from "fs";
import { join as joinPath } from "path";
import Converter from "../Converter";
import ValueTable from "../classes/ValueTable";

describe('Converting 1C internal value table', function() {
  const fileNam = joinPath(__dirname, `./sources/ValueTable`);
  const source = readFileSync(`${fileNam}.txt`, 'utf-8');
  const converted = Converter.convertFrom1C(source) as any[];
  
  const etalon = ValueTable;
  it(`should convert value from file ValueTable.txt and return instance of'${etalon}'`, () => {
    expect(converted).to.be.instanceOf(etalon);
  });

  const etalon2 = `Name`;
  it(`and the third column name of value table should equal '${etalon2}'`, () => {
    expect((converted as any).columns[0].name).to.equal(etalon2);
  });

  const etalon3 = 2;
  it(`and the length of value table should equal '${etalon3}'`, () => {
    expect(converted.length).to.equal(etalon3);
  });
});