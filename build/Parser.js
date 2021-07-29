"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const charsToSkip = ['\r', '\n'];
let position;
let currentChar;
let nextChar;
let previousChar;
let stringBlock = '';
let numberBlock = '';
let isStringBlock = false;
let quotationInProgress = false;
class Parser {
    static parse(source) {
        let result = '';
        for (position = 0; position < source.length; position++) {
            currentChar = source[position];
            if (currentChar.charCodeAt(0) === 65279) { // it is a byte order mark (BOM)
                continue;
            }
            if (position !== 0 && previousChar !== 'null') {
                previousChar = source[position - 1];
            }
            if (position < source.length) {
                nextChar = source[position + 1];
            }
            if (charsToSkip.includes(currentChar)) {
                continue;
            }
            const executer = getExecuter(currentChar);
            result += executer();
        }
        try {
            return JSON.parse(result);
        }
        catch (error) {
            throw new Error(`Can't parse source string (${error})`);
        }
    }
}
exports.default = Parser;
Parser['{'] = parseOpenParenthesis;
Parser['}'] = parseCloseParenthesis;
Parser[':'] = parseColon;
Parser['"'] = parseQuote;
Parser[' '] = parseWhitespace;
Parser[','] = parseComma;
Parser['.'] = parseDot;
function getExecuter(char) {
    let executer = Reflect.get(Parser, char);
    if (!executer) {
        executer = defaultExecuter;
    }
    return executer;
}
function parseOpenParenthesis() {
    let result = '';
    if (quotationInProgress) {
        stringBlock += currentChar;
    }
    else {
        result = '[';
    }
    return result;
}
function parseCloseParenthesis() {
    let result = '';
    if (numberBlock.length > 0) {
        if (Number(numberBlock).toString() !== numberBlock) {
            result = `"${numberBlock}"]`;
        }
        else {
            result = `${numberBlock}]`;
        }
        numberBlock = '';
    }
    else if (quotationInProgress) {
        if (isStringBlock) {
            if (previousChar === '"') { // we have to close qoute
                quotationInProgress = false;
                result = `"${stringBlock}"]`;
                stringBlock = '';
            }
            else {
                stringBlock += currentChar;
            }
        }
        else {
            quotationInProgress = false;
            result = `"${stringBlock}"]`;
            stringBlock = '';
        }
    }
    else {
        result = ']';
    }
    return result;
}
function parseColon() {
    let result = '';
    if (numberBlock.length > 0) {
        result = `${numberBlock},`;
        numberBlock = '';
    }
    else if (quotationInProgress) {
        stringBlock += currentChar;
    }
    else {
        throw new Error(`Unexpected character ":" at position ${position}`);
    }
    return result;
}
function parseWhitespace() {
    if (quotationInProgress) { // we need this whitespace as a part of qautation block
        stringBlock += currentChar;
    }
    return '';
}
function parseComma() {
    let result = '';
    if (numberBlock.length > 0) {
        result = `${numberBlock},`;
        numberBlock = '';
    }
    else if (!isStringBlock) {
        if (quotationInProgress) { // we have to close quote
            quotationInProgress = false;
            result = `"${stringBlock}",`;
            stringBlock = '';
            isStringBlock = false;
        }
        else {
            result = currentChar;
        }
    }
    else {
        if (quotationInProgress) {
            stringBlock += currentChar;
        }
        else {
            result = currentChar;
        }
    }
    return result;
}
function parseQuote() {
    let result = '';
    if (quotationInProgress) { // so maybe it is closing quote
        if (nextChar === '"') { // we should screen the breakets in text property
            stringBlock += `\\\"`;
            position++; // we need to step over next position
            // in case, when a string has combination ""} we need to mark previousChar
            // as null, so we prewent closing breakets during quotation
            previousChar = 'null';
        }
        else {
            quotationInProgress = false;
            result = `"${stringBlock}"`;
            stringBlock = '';
            isStringBlock = false;
        }
    }
    else { // it is opening quote
        quotationInProgress = true;
        isStringBlock = true;
    }
    return result;
}
function parseDot() {
    let result = '';
    if (numberBlock.length > 0) {
        numberBlock += currentChar; // it is a dot division
    }
    else {
        stringBlock += currentChar; // it is a part of quoted string
    }
    return result;
}
function defaultExecuter() {
    let result = '';
    if (currentChar.match('[0-9]')) { // it is possibly a number
        if (!quotationInProgress) {
            numberBlock += currentChar;
        }
        else {
            stringBlock += currentChar;
        }
    }
    else {
        if (numberBlock.length > 0) { // it is not a number
            quotationInProgress = true;
            stringBlock += numberBlock + currentChar;
            numberBlock = '';
        }
        else {
            quotationInProgress = true;
            stringBlock += currentChar;
        }
    }
    return result;
}
//# sourceMappingURL=Parser.js.map