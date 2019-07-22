const htmlParser = require('node-html-parser');

const divIdMessage = 'divMensagem';
const codeRegex = /Cód[:|\.]\s*(\d+)/;

const findCode = (html) => {
  const parsedHtml = htmlParser.parse(html);
  
  const status = parsedHtml.querySelector(`#${divIdMessage}`);
  
  const codeNumber = status.toString().match(codeRegex)[1];
  
  if (codeNumber) {
    return parseInt(codeNumber, 10);
  }

  return null;
};


module.exports = {
  findCode
};