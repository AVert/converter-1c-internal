import { readFileSync, writeFileSync } from "fs";
import { join as joinPath } from "path";
import internal from "stream";
import convertToJSON from "./convertToJSON";
import parse from "./parse";

const fileNam = 'ValueTable';
//const fileNam = 'ValueList';
//const fileNam = 'Catalogs';
//const fileNam = 'Reference';
//const fileNam = 'Array';
//const fileNam = 'String';

// const source = readFileSync(joinPath(__dirname, `../test/${fileNam}.txt`), 'utf-8');
// const converted = convertToJSON(source);

// writeFileSync(joinPath(__dirname, `../test/${fileNam}.json`), converted);

// const result = JSON.parse(converted);

// let data = parse(result);

// console.log(data[2]);

interface IMyArray {
  [key: number]: any

}
class MyArray implements IMyArray {
  #entries: any[];
  [Symbol.iterator]: Function

  length: number

  // get length(): number {
  //   return this.#entries.length;
  // }

  constructor() {
    this.#entries = [];
    addIterator(this, this.#entries)
    this.length = 0
  }
  [key: number]: any;

  add(value: any) {
    this.#entries.push(value);
    this[ this.#entries.length-1] = value;
    //this.length = this.#entries.length
  }

  getLength() {
    return this.#entries.length
  }

  getByIndex(index: number) {
    return this.#entries[index];
  }

  splice() {
    return null
  }
}

function addIterator(target: any, entries: any[]) {
  target.__proto__[Symbol.iterator] = function() {

    let count = 0;
    let isDone = false;

    let next = () => {
       if(count >= entries.length) {
          isDone = true;
       }
       return { done: isDone, value: entries[count++] };
    }

    return { next };
  };
}



const myArray = new MyArray();
for(let i = 0; i < 99999; i++) {
  myArray.add(`Item_${i}`);
}

const p = new Proxy(myArray, {
  get: function(target, property, reciever) {
    if(property === 'length') {
      return target.getLength()
    }

    if(Number(property).toString() === property) {
      return target.getByIndex(Number(property))
    }
  }
})

class m {
  constructor(){
    
  }
}

const handler = {}

console.log(p[0]);