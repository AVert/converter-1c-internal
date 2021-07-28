import sinon from 'sinon';
import { expect, should  } from 'chai';
import { readFileSync, writeFileSync } from "fs";
import { join as joinPath } from "path";
import Parser from "../Parser";

describe('Parsing 1C internal value list', function() {
  const fileNam = joinPath(__dirname, `./sources/ValueList`);
  const source = readFileSync(`${fileNam}.txt`, 'utf-8');
  const parsed = Parser.parse(source);
  writeFileSync(`${fileNam}.json`, JSON.stringify(parsed));

  const etalon1 = "4772b3b4-f4a3-49c0-a1a5-8cb5961511a3";
  it(`should parse file ValueList.txt and object ID equals '${etalon1}'`, () => {
    expect(parsed[1]).to.be.equal(etalon1);
  });
});