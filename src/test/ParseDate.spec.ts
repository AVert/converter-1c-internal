import sinon from 'sinon';
import { expect, should  } from 'chai';
import { readFileSync, writeFileSync } from "fs";
import { join as joinPath } from "path";
import Parser from "../Parser";

describe('Parsing 1C internal date', function() {
  const etalon = 20210727092634;
  it(`should parse file Date.txt and equals '${etalon}'`, () => {
    const fileNam = joinPath(__dirname, `./sources/Date`);
    const source = readFileSync(`${fileNam}.txt`, 'utf-8');
    const parsed = Parser.parse(source);
    writeFileSync(`${fileNam}.json`, JSON.stringify(parsed));
    expect(parsed[1]).to.be.equal(etalon);
  });
});