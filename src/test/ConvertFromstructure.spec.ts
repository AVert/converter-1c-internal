import { expect  } from 'chai';
import { readFileSync } from "fs";
import { join as joinPath } from "path";
import Converter from "../Converter";

describe('Converting 1C internal structure', function() {
  const fileNam = joinPath(__dirname, `./sources/Structure`);
  const source = readFileSync(`${fileNam}.txt`, 'utf-8');
  const converted = Converter.convertFrom1C(source) as any[];
  
  const etalon = { number: 1, string: "Hello world", boolean: true };
  it(`should convert value from file Structure.txt and return object '${etalon}'`, () => {
    expect(converted).to.be.eql(etalon);
  });
});