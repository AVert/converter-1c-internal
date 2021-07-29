import sinon from 'sinon';
import { expect, should  } from 'chai';
import { readFileSync, writeFileSync } from "fs";
import { join as joinPath } from "path";
import Converter from "../Converter";
import ValueList from "../classes/ValueList";

describe('Converting 1C internal value list', function() {
  const fileNam = joinPath(__dirname, `./sources/ValueList`);
  const source = readFileSync(`${fileNam}.txt`, 'utf-8');
  const converted = Converter.convertFrom1C(source) as any[];
  
  const etalon = ValueList;
  it(`should convert value from file ValueList.txt and return instance of'${etalon}'`, () => {
    expect(converted).to.be.instanceOf(etalon);
  });

  const etalon2 = `It is a {"complecated"} string`;
  it(`and the third elemnt value of value list should equal '${etalon2}'`, () => {
    expect(converted[2].value).to.equal(etalon2);
  });

  const etalon3 = 3;
  it(`and the length of value list should equal '${etalon3}'`, () => {
    expect(converted.length).to.equal(etalon3);
  });

  const etalon4 = `ValueListItem`;
  it(`and the type of first element of value list should equal '${etalon3}'`, () => {
    expect(converted[0].constructor.name).to.equal(etalon4);
  });

  it(`should be iterated throth withow error`, () => {
    function test() {
      for(let item of converted) {
        //console.log((item as any).value)
      }
    }
    expect(test).to.not.throw();
  });
});