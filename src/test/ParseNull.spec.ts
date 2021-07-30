import { expect  } from 'chai';
import { readFileSync } from "fs";
import { join as joinPath } from "path";
import Parser from "../Parser";

describe('Parsing 1C internal null', function() {
  const etalon = 'L';
  it(`should parse file Null.txt and equals '${etalon}'`, () => {
    const fileNam = joinPath(__dirname, `./sources/Null`);
    const source = readFileSync(`${fileNam}.txt`, 'utf-8');
    const parsed = Parser.parse(source);
    expect(parsed[0]).to.be.equal(etalon);
  });
});