// Incluindo uma biblioteca
const http = require('http');
const url = require('url');
const queryString = require('query-string');

// Definição de endereço
const hostname = '127.0.0.1'; //Localhost
const port = 3000;

//Implementação da regra de negócio
const server = http.createServer((req, res) => {
  // Pegar pergunta na url

  const params = queryString.parse(url.parse(req.url, true).search);
  // console.log(params);
  // Verificar a pergunta e escolher uma resposta
  let resposta;
  if (params.pergunta == 'melhor-filme') {
    resposta = 'Onde os fracos nao tem vez';
  } else if (params.pergunta == 'melhor-tecnologia-backend') {
    resposta = 'NodeJS';
  } else {
    resposta = 'nao sei, deculpe';
  }
  // Retornar a resposta escolhida

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(resposta);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
