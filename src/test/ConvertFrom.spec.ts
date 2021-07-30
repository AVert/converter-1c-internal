import { expect  } from 'chai';
import { readFileSync } from "fs";
import { join as joinPath } from "path";
import Converter from "../Converter";

describe('Converting 1C internal string', function() {
  const etalon = "\"a1a$9011a\"-{ac1a}-\"11:eb\"-'a71b'-`000c293a870e:`";
  it(`should convert value from file String.txt and return '${etalon}'`, () => {
    const fileNam = joinPath(__dirname, `./sources/String`);
    const source = readFileSync(`${fileNam}.txt`, 'utf-8');
    const converted = Converter.convertFrom1C(source);
    expect(converted).to.be.equal(etalon);
  });
});

describe('Converting 1C internal number', function() {
  const etalon = 99.55;
  it(`should convert value from file Number.txt and return '${etalon}'`, () => {
    const fileNam = joinPath(__dirname, `./sources/Number`);
    const source = readFileSync(`${fileNam}.txt`, 'utf-8');
    const converted = Converter.convertFrom1C(source);
    expect(converted).to.be.equal(etalon);
  });
});

describe('Converting 1C internal boolean', function() {
  const etalon = true;
  it(`should convert value from file Boolean.txt and return '${etalon}'`, () => {
    const fileNam = joinPath(__dirname, `./sources/Boolean`);
    const source = readFileSync(`${fileNam}.txt`, 'utf-8');
    const converted = Converter.convertFrom1C(source);
    expect(converted).to.be.equal(etalon);
  });
});

describe('Converting 1C internal date', function() {
  const etalon = new Date(`2021-07-27T09:26:34`);
  it(`should convert value from file Date.txt and return '${etalon}'`, () => {
    const fileNam = joinPath(__dirname, `./sources/Date`);
    const source = readFileSync(`${fileNam}.txt`, 'utf-8');
    const converted = Converter.convertFrom1C(source) as Date;
    expect(converted.toISOString()).to.be.equal(etalon.toISOString());
  });
});

describe('Converting 1C internal null', function() {
  const etalon = null;
  it(`should convert value from file Null.txt and return '${etalon}'`, () => {
    const fileNam = joinPath(__dirname, `./sources/Null`);
    const source = readFileSync(`${fileNam}.txt`, 'utf-8');
    const converted = Converter.convertFrom1C(source);
    expect(converted).to.be.equal(etalon);
  });
});