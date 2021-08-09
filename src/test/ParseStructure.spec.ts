import { expect  } from 'chai';
import { readFileSync } from "fs";
import { join as joinPath } from "path";
import Parser from "../Parser";

describe('Parsing 1C internal structur', function() {
  const fileNam = joinPath(__dirname, `./sources/Structure`);
  const source = readFileSync(`${fileNam}.txt`, 'utf-8');
  const parsed = Parser.parse(source);

  const etalon1 = ["S", "number"]; //{ number: 1, string: "Hello world", boolean: true };
  it(`should parse file Structure.txt and returned object should equals '${etalon1}'`, () => {
    expect(parsed[2][1][0]).to.be.eql(etalon1);
  });
});