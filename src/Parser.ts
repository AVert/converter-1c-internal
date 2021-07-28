
const charsToSkip = ['\r', '\n'];

let position: number;
let currentChar: string;
let nextChar: string;
let previousChar: string;
let stringBlock: string = '';
let numberBlock: string = '';
let isStringBlock: boolean = false;
let quotationInProgress: boolean = false;

export default class Parser {

  [key: string]: Function;

  static '{' = parseOpenParenthesis;
  static '}' = parseCloseParenthesis;
  static ':' = parseColon;
  static '"' = parseQuote;
  static ' ' = parseWhitespace;
  static ',' = parseComma;
  static '.' = parseDot;
  

  static parse(source: string): any[] {
    let result = '';

    for(position = 0; position < source.length; position++) {
      currentChar = source[position];
      if(currentChar.charCodeAt(0) === 65279) { // it is a byte order mark (BOM)
        continue;
      }
      if(position !== 0 && previousChar !== 'null') {
        previousChar = source[position-1];
      }
      if(position < source.length) {
        nextChar = source[position+1];
      }
      
      if(charsToSkip.includes(currentChar)) {
        continue;
      }

      const executer = getExecuter(currentChar);
      result += executer();
    }

    try {
      return JSON.parse(result);
    } catch(error) {
      throw new Error(`Can't parse source string (${error})`);
    }
  }
}

function getExecuter(char: string): Function {
  let executer =  Reflect.get(Parser, char);
  if(!executer) {
    executer = defaultExecuter;
  }

  return executer;
}

function parseOpenParenthesis(): string { // '{'
  let result = '';
  if(quotationInProgress) {
    stringBlock += currentChar;
  } else {
    result = '[';
  }

  return result;
}

function parseCloseParenthesis(): string { // '}'
  let result = '';
  if(numberBlock.length > 0) {
    if(Number(numberBlock).toString() !== numberBlock) {
      result = `"${numberBlock}"]`;
    } else {
      result = `${numberBlock}]`;
    }
    numberBlock = '';
  } else if(quotationInProgress) { 
    if(isStringBlock) {
      if(previousChar === '"') { // we have to close qoute
        quotationInProgress = false;
        result = `"${stringBlock}"]`;
        stringBlock = '';
      } else  {
        stringBlock += currentChar;
      }
    } else {
      quotationInProgress = false;
      result = `"${stringBlock}"]`;
      stringBlock = '';
    }
  } else {
    result = ']';
  }

  return result;
}

function parseColon(): string { // ':'
  let result = '';
  if(numberBlock.length > 0) {
    result = `${numberBlock},`;
    numberBlock = '';
  } else if(quotationInProgress) {
    stringBlock += currentChar;
  } else {
    throw new Error(`Unexpected character ":" at position ${position}`)
  }

  return result;
}

function parseWhitespace(): string { // ' '
  if(quotationInProgress) { // we need this whitespace as a part of qautation block
    stringBlock += currentChar;
  }

  return '';
}

function parseComma(): string { // ','
  let result = '';
  if(numberBlock.length > 0) {
    result = `${numberBlock},`;
    numberBlock = '';
  } else if(!isStringBlock) {
    if(quotationInProgress) { // we have to close quote
      quotationInProgress = false;
      result = `"${stringBlock}",`;
      stringBlock = '';
      isStringBlock = false;
    } else {
      result = currentChar;
    }
  } else {
    if(quotationInProgress) {
      stringBlock += currentChar;
    } else {
      result = currentChar;
    }
  }

  return result;
}

function parseQuote(): string { // '"'
  let result = '';
  if(quotationInProgress) { // so maybe it is closing quote
    if(nextChar === '"') { // we should screen the breakets in text property
      stringBlock += `\\\"`;
      position++; // we need to step over next position
      // in case, when a string has combination ""} we need to mark previousChar
      // as null, so we prewent closing breakets during quotation
      previousChar = 'null'; 
    } else {
      quotationInProgress = false;
      result = `"${stringBlock}"`;
      stringBlock = '';
      isStringBlock = false;
    }
  } else { // it is opening quote
    quotationInProgress = true;
    isStringBlock = true;
  }

  return result;
}

function parseDot(): string { // '.'
  let result = '';
  if(numberBlock.length > 0) {
    numberBlock += currentChar; // it is a dot division
  } else {
    stringBlock += currentChar; // it is a part of quoted string
  }

  return result;
}

function defaultExecuter(): string { // all the other characters
  let result = '';
  if(currentChar.match('[0-9]')) { // it is possibly a number
    if(!quotationInProgress) {
      numberBlock += currentChar;
    } else {
      stringBlock += currentChar;
    }
  } else {
    if(numberBlock.length > 0) { // it is not a number
      quotationInProgress = true;
      stringBlock += numberBlock + currentChar;
      numberBlock = '';
    } else {
      quotationInProgress = true;
      stringBlock += currentChar;
    }
  }

  return result;
}