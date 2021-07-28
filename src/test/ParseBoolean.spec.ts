import sinon from 'sinon';
import { expect, should  } from 'chai';
import { readFileSync, writeFileSync } from "fs";
import { join as joinPath } from "path";
import Parser from "../Parser";

describe('Parsing 1C internal boolean', function() {
  const etalon = 1;
  it(`should parse file Boolean.txt and equals '${etalon}'`, () => {
    const fileNam = joinPath(__dirname, `./sources/Boolean`);
    const source = readFileSync(`${fileNam}.txt`, 'utf-8');
    const parsed = Parser.parse(source);
    writeFileSync(`${fileNam}.json`, JSON.stringify(parsed));
    expect(parsed[1]).to.be.equal(etalon);
  });
});