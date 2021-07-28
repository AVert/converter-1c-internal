import sinon from 'sinon';
import { expect, should  } from 'chai';
import { readFileSync, writeFileSync } from "fs";
import { join as joinPath } from "path";
import Parser from "../Parser";

describe('Parsing 1C internal null', function() {
  const etalon = 'L';
  it(`should parse file Null.txt and equals '${etalon}'`, () => {
    const fileNam = joinPath(__dirname, `./sources/Null`);
    const source = readFileSync(`${fileNam}.txt`, 'utf-8');
    const parsed = Parser.parse(source);
    writeFileSync(`${fileNam}.json`, JSON.stringify(parsed));
    expect(parsed[0]).to.be.equal(etalon);
  });
});