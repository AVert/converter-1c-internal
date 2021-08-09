import { expect  } from 'chai';
import { writeFileSync } from "fs";
import { join as joinPath } from "path";
import Converter from "../Converter";

describe('Converting structure to 1C internal', function() {
  const type = 'Structure';
  const source = {
    name: "Bob",
    lastName: "Deelan",
    age: 36
  };
  it(`should convert value '${source}' to 1C internal and save to the file to${type}.txt `, () => {
    const fileNam = joinPath(__dirname, `./results/to${type}`);
    function test() {
      const converted = Converter.convertTo1C(source);
      writeFileSync(`${fileNam}.txt`, converted);
    }
    
    expect(test).not.to.throw();
  });
});