import { expect  } from 'chai';
import { readFileSync, writeFileSync } from "fs";
import { join as joinPath } from "path";
import Parser from "../Parser";

describe('Parsing 1C internal number', function() {
  const etalon = 99.55;
  it(`should parse file Number.txt and equals '${etalon}'`, () => {
    const fileNam = joinPath(__dirname, `./results/Number`);
    const source = readFileSync(`${fileNam}.txt`, 'utf-8');
    const parsed = Parser.parse(source);
    writeFileSync(`${fileNam}.json`, JSON.stringify(parsed));
    expect(parsed[1]).to.be.equal(etalon);
  });
});