import { expect  } from 'chai';
import { writeFileSync } from "fs";
import { join as joinPath } from "path";
import Converter from "../Converter";
import ValueList from "../classes/ValueList";

describe('Converting Value list to 1C internal', function() {
  const type = 'ValueList';
  const source = new ValueList();
  source.add(`String`, `It is a string`, false);
  source.add(99.55, `It is a number`, true);
  source.add(true, `It is a boolean`, false);
  source.add([1,2,3], `It is an array`);
  source.add(null);
  it(`should convert value '${source}' to 1C internal and save to the file to${type}.txt `, () => {
    const fileNam = joinPath(__dirname, `./results/to${type}`);
    function test() {
      const converted = Converter.convertTo1C(source);
      writeFileSync(`${fileNam}.txt`, converted);
    }
    
    expect(test).not.to.throw();
  });
});