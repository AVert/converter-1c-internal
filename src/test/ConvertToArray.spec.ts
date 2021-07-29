import sinon from 'sinon';
import { expect, should  } from 'chai';
import { readFileSync, writeFileSync } from "fs";
import { join as joinPath } from "path";
import Converter from "../Converter";

describe('Converting array to 1C internal', function() {
  const type = 'Array';
  const source = [`It is a string`, 99.55, true, new Date(`2021-07-27T11:26:34`), null];
  it(`should convert value '${source}' to 1C internal and save to the file to${type}.txt `, () => {
    const fileNam = joinPath(__dirname, `./sources/to${type}`);
    function test() {
      const converted = Converter.convertTo1C(source);
      writeFileSync(`${fileNam}.txt`, converted);
    }
    
    expect(test).not.to.throw();
  });
});