import sinon from 'sinon';
import { expect, should  } from 'chai';
import { readFileSync, writeFileSync } from "fs";
import { join as joinPath } from "path";
import Converter from "../Converter";

describe('Converting 1C internal array', function() {
  const fileNam = joinPath(__dirname, `./sources/Array`);
  const source = readFileSync(`${fileNam}.txt`, 'utf-8');
  const converted = Converter.convertFrom1C(source) as any[];
  
  const etalon = Array;
  it(`should convert value from file Array.txt and return instance of'${etalon}'`, () => {
    expect(converted).to.be.instanceOf(etalon);
  });

  const etalon2 = "It is a string";
  it(`and the second elemnt of array should equal '${etalon2}'`, () => {
    expect(converted[1]).to.equal(etalon2);
  });

  const etalon3 = 4;
  it(`and the length of array should equal '${etalon3}'`, () => {
    expect(converted.length).to.equal(etalon3);
  });
});