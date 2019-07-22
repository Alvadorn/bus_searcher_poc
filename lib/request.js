const request = require('request-promise-native');

const sptransUrl = 'https://scapub.sbe.sptrans.com.br/sa/consultaEstudante/consultarEstudante.action';

const doRequest = async (cpf, year) => {
  return request.post(sptransUrl).form({
    'anoLetivo': year,
    'usuarioSearch.cpfNumber': cpf
  });
};


module.exports = {
  doRequest,
};