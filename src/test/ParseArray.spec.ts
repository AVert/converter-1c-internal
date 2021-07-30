import { expect  } from 'chai';
import { readFileSync, writeFileSync } from "fs";
import { join as joinPath } from "path";
import Parser from "../Parser";

describe('Parsing 1C internal array', function() {
  const fileNam = joinPath(__dirname, `./results/Array`);
  const source = readFileSync(`${fileNam}.txt`, 'utf-8');
  const parsed = Parser.parse(source);
  writeFileSync(`${fileNam}.json`, JSON.stringify(parsed));

  const etalon1 = "51e7a0d2-530b-11d4-b98a-008048da3034";
  it(`should parse file String.txt and object ID equals '${etalon1}'`, () => {
    expect(parsed[1]).to.be.equal(etalon1);
  });

  const etalon2 = "It is a string";
  it(`The second element of array should equals '${etalon2}'`, () => {
    expect(parsed[2][2][1]).to.be.equal(etalon2);
  });
});