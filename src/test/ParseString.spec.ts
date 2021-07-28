import sinon from 'sinon';
import { expect, should  } from 'chai';
import { readFileSync, writeFileSync } from "fs";
import { join as joinPath } from "path";
import Parser from "../Parser";

describe('Parsing 1C internal string', function() {
  const etalon = "\"a1a$9011a\"-{ac1a}-\"11:eb\"-'a71b'-`000c293a870e:`";
  it(`should parse file String.txt and equals '${etalon}'`, () => {
    const fileNam = joinPath(__dirname, `./sources/String`);
    const source = readFileSync(`${fileNam}.txt`, 'utf-8');
    const parsed = Parser.parse(source);
    writeFileSync(`${fileNam}.json`, JSON.stringify(parsed));
    expect(parsed[1]).to.be.equal(etalon);
  });
});