const request = require('./request');
const htmlParser = require('./html-parser');
const excel = require('exceljs');

const currentYear = parseInt(process.argv[3], 10) || 2019;

const have = 'Já Possui';
const dontHave = 'Não possui';

const cardExistant = (codeNumber) => {
  switch (codeNumber) {
    case 110:
    case 155:
    case 1006:
      return true;
    case 5:
    case 1003:
    default:
      return false;
  }
};

const run = async (filename) => {
  let workbook = new excel.Workbook();
  workbook = await workbook.xlsx.readFile(filename);

  let completed = false;
  let interval = setInterval(async () => {
    if (completed) {
      clearInterval(interval);
      await workbook.xlsx.writeFile(filename);
      console.log('Completed');
    }
  }, 100);

  workbook.eachSheet((worksheet) => {
    worksheet.eachRow(async (row, rowIndex) => {
      if (rowIndex === 1) {
        return;
      }

      const cpf = row.getCell(1).value;

      const response = await request.doRequest(cpf, currentYear);
      const codeNumber = htmlParser.findCode(response);

      const haveCard = cardExistant(codeNumber);

      row.getCell(2).value = haveCard ? have : dontHave;
    });
    completed = true;
  });
};

if (process.argv.length < 3) {
  console.error("It's necessary at least one argument");
  process.exit();
}

const filepath = process.argv[2];

if (!/\.xlsx$/.test(filepath)) {
  console.error("The file must be of type XLSX");
  process.exit();
}

console.log('Running....');

run(filepath).then(() => {
});