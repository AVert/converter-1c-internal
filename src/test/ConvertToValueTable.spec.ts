import sinon from 'sinon';
import { expect, should  } from 'chai';
import { readFileSync, writeFileSync } from "fs";
import { join as joinPath } from "path";
import Converter from "../Converter";
import ValueTable from "../classes/ValueTable";
import DataTypes from "../classes/DataTypes";
import Reference from '../classes/Reference';

describe('Converting Value table to 1C internal', function() {
  const type = 'ValueTable';
  const source = new ValueTable();
  source.columns.add("Name");
  source.columns.add("Age");
  source.columns.add("Male", DataTypes.Boolean);
  source.columns.add("Birthday", DataTypes.Date);
  source.columns.add("Parent");
  const parent1 = new Reference('190a7469-3325-4d33-b5ec-28a63ac83b06', 96, '8032902b343787ed11e789654479c317');
  source.addRow({
    Name: "Max",
    Age: 39,
    Male: true,
    Birthday: new Date(`1982-11-10`),
    Parent: parent1
  });
  const parent2 = new Reference('190a7469-3325-4d33-b5ec-28a63ac83b06', 96, '8032902b343787ed11e789656539719c');
  source.addRow({
    Name: "Kate",
    Age: 35,
    Male: false,
    Birthday: new Date(`1986-05-18`),
    Parent: parent2
  });

  const fileName = joinPath(__dirname, `./sources/to${type}1.txt`);
  it(`should convert value '${source}' to 1C internal and save to the file ${fileName}`, () => {
    function test() {
      const converted = Converter.convertTo1C(source);
      writeFileSync(fileName, converted);
    }
    
    expect(test).not.to.throw();
  });
});

describe('Converting a ValueTable-like object to 1C internal', function() {
  const type = 'ValueTable';
  const parent1 = new Reference('190a7469-3325-4d33-b5ec-28a63ac83b06', 96, '8032902b343787ed11e789654479c317');
  const parent2 = new Reference('190a7469-3325-4d33-b5ec-28a63ac83b06', 96, '8032902b343787ed11e789656539719c');
  const source = {
    length: 2,
    columns: {
      length: 3,
      [0]: { name: 'Name'},
      [1]: { name: 'Age' },
      [2]: { name: 'Male'}
    },
    [0]: {
      Name: "Max",
      Age: 39,
      Male: true,
      Birthday: new Date(`1982-11-10`),
      Parent: parent1
    },
    [1]: {
      Name: "Kate",
      Age: 35,
      Male: false,
      Birthday: new Date(`1986-05-18`),
      Parent: parent2
    }
  };

  const fileName = joinPath(__dirname, `./sources/to${type}2.txt`);
  it(`should convert value '${source}' to 1C internal and save to the file ${fileName}`, () => {
    function test() {
      const converted = Converter.convertTo1C(source);
      writeFileSync(fileName, converted);
    }
    
    expect(test).not.to.throw();
  });
});