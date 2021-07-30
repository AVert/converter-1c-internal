import { expect  } from 'chai';
import { readFileSync, writeFileSync } from "fs";
import { join as joinPath } from "path";
import Parser from "../Parser";

describe('Parsing 1C internal value table', function() {
  const fileNam = joinPath(__dirname, `./results/ValueTable`);
  const source = readFileSync(`${fileNam}.txt`, 'utf-8');
  const parsed = Parser.parse(source);
  writeFileSync(`${fileNam}.json`, JSON.stringify(parsed));

  const etalon1 = "acf6192e-81ca-46ef-93a6-5a6968b78663";
  it(`should parse file ValueTable.txt and object ID equals '${etalon1}'`, () => {
    expect(parsed[1]).to.be.equal(etalon1);
  });
});