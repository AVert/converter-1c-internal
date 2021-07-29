import sinon from 'sinon';
import { expect, should  } from 'chai';
import { readFileSync, writeFileSync } from "fs";
import { join as joinPath } from "path";
import Converter from "../Converter";

describe('Converting string to 1C internal', function() {
  const type = 'String';
  const source = `It is a string`;
  const etalon = `{"S","${source}"}`;
  it(`should convert value '${source}' to 1C internal and save to the file to${type}.txt `, () => {
    const fileNam = joinPath(__dirname, `./sources/to${type}`);
    const converted = Converter.convertTo1C(source);
    writeFileSync(`${fileNam}.txt`, converted);
    
    expect(converted).to.be.equal(etalon);
  });
});

describe('Converting number to 1C internal', function() {
  const type = 'Number';
  const source = 99.55;
  const etalon = `{"N",${source}}`;
  it(`should convert value '${source}' to 1C internal and save to the file to${type}.txt `, () => {
    const fileNam = joinPath(__dirname, `./sources/to${type}`);
    const converted = Converter.convertTo1C(source);
    writeFileSync(`${fileNam}.txt`, converted);
    
    expect(converted).to.be.equal(etalon);
  });
});

describe('Converting boolean to 1C internal', function() {
  const type = 'Boolean';
  const source = true;
  const etalon = `{"B",1}`;
  it(`should convert value '${source}' to 1C internal and save to the file to${type}.txt `, () => {
    const fileNam = joinPath(__dirname, `./sources/to${type}`);
    const converted = Converter.convertTo1C(source);
    writeFileSync(`${fileNam}.txt`, converted);
    
    expect(converted).to.be.equal(etalon);
  });
});

describe('Converting date to 1C internal', function() {
  const type = 'Date';
  const source = new Date(`2021-07-27T11:26:34`); // it can be diffrent for anothe time zone
  const etalon = `{"D",20210727092634}`;
  it(`should convert value '${source}' to 1C internal and save to the file to${type}.txt `, () => {
    const fileNam = joinPath(__dirname, `./sources/to${type}`);
    const converted = Converter.convertTo1C(source);
    writeFileSync(`${fileNam}.txt`, converted);
    
    expect(converted).to.be.equal(etalon);
  });
});

describe('Converting null to 1C internal', function() {
  const type = 'Null';
  const source = null;
  const etalon = `{"L"}`;
  it(`should convert value '${source}' to 1C internal and save to the file to${type}.txt `, () => {
    const fileNam = joinPath(__dirname, `./sources/to${type}`);
    const converted = Converter.convertTo1C(source);
    writeFileSync(`${fileNam}.txt`, converted);
    
    expect(converted).to.be.equal(etalon);
  });
});