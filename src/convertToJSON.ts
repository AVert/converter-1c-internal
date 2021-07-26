export default function convertToJSON(source: string): string {
  
  let result: string = '';

  try {
    let quatationBlock: string = '';
    let numberBlock: string = '';
    let isStringBlock: boolean = false;
    let quatationInProgress: boolean = false;
    for(let i = 0; i < source.length; i++) {
      let char = source[i];
      switch (char) {
        case '\r':
          break;
        case '\n':
          break;
        case '{':
          quatationInProgress = false;
          quatationBlock = '';
          result += '[';
          break;
        case '}':
          if(numberBlock.length > 0) {
            if(Number(numberBlock).toString() !== numberBlock) {
              result += `"${numberBlock}"`;
            } else {
              result += numberBlock;
            }
            numberBlock = '';
          }
          if(quatationInProgress) { // we have to close breakets
            quatationInProgress = false;
            result += `"${quatationBlock}"`;
            quatationBlock = '';
          }
          result += ']';
          break;
        case ':':
          if(numberBlock.length > 0) {
            result += numberBlock;
            numberBlock = '';
          }
          if(quatationInProgress) { // we have to close breakets
            quatationInProgress = false;
            result += `"${quatationBlock}"`;
            quatationBlock = '';
          }
          result += ',';
          break;
        case '"':
          if(quatationInProgress) { // so maybe it is closing breakets
            const nextChar = source[i+1];
            if(nextChar === '"') { // we should screen the breakets in text property
              quatationBlock += `\\\"`;
              i++;
            } else {
              quatationInProgress = false;
              result += `"${quatationBlock}"`;
              quatationBlock = '';
              isStringBlock = false;
            }
          } else { // it is opening breakets
            quatationInProgress = true;
            isStringBlock = true;
          }
          break;
        case ',':
          if(numberBlock.length > 0) {
            result += numberBlock;
            numberBlock = '';
          }
          if(!isStringBlock) {
            if(quatationInProgress) { // we have to close breakets
              quatationInProgress = false;
              result += `"${quatationBlock}"`;
              quatationBlock = '';
              isStringBlock = false;
            } //else {
              result += char;
            //}
          } else {
            if(quatationInProgress) {
              quatationBlock += char;
            } else {
              result += char;
            }
          }
          break;
        case ' ':
          if(quatationInProgress) { // we need this whitespace as a part of qautation block
            quatationBlock += char;
          }
          // therwise it is a 'noise'
          break;
        default:
          if(char.match('[0-9]') || char === '.') { // it is possibly a number
            if(!quatationInProgress) {
              numberBlock += char;
            } else {
              quatationBlock += char;
            }
          } else {
            if(numberBlock.length > 0) { // it is not a number
              quatationInProgress = true;
              quatationBlock += numberBlock + char;
              numberBlock = '';
            } else {
              quatationInProgress = true;
              quatationBlock += char;
            }
          }
          break;
      }
    }
  } catch(error) {
    throw new Error(`Can't read source (${error})`);
  }

  return result;
  //return result.replace(/",""/g, `","--"`).replace(/,"",/g, `,"--",`).replace(/""/g, `'`).replace(/,"--",/g, `,"",`);
}