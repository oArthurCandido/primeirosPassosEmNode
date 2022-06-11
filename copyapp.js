// Incluindo uma biblioteca
const http = require('http');
const queryString = require('query-string');
const url = require('url');
const fs = require('fs');

// Definição de endereço
const hostname = '127.0.0.1'; //Localhost
const port = 3000;

//Implementação da regra de negócio
const server = http.createServer((req, res) => {
  // Retornar a resposta escolhida
  var resposta;
  const urlparse = url.parse(req.url, true);
  //Receber dados do usuario
  const params = queryString.parse(urlparse.search);
  console.log(params);
  //Criar um usuario - Atualizar um usuario
  if (urlparse.pathname == '/criar-atualizar-usuario') {
    //Salvar informações
    fs.writeFile(
      'users/' + params.id + '.txt',
      JSON.stringify(params),
      function (err) {
        if (err) throw err;
        console.log('Saved!');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(resposta);
      }
    );

    resposta = 'Usuario criado/atualizado com sucesso';
    console.log(resposta);
  }
  //Selecionar um usuario
  else if (urlparse.pathname == '/selecionar-usuario') {
    fs.readFile('users/' + params.id + '.txt', function (err, data) {
      resposta = data;
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(resposta);
    });
  }

  //Remover um usuario
  else if (urlparse.pathname == '/remover-usuario') {
    fs.unlink('users/' + params.id + '.txt', function (err) {
      resposta = err
        ? 'Usuario nao encontrado'
        : 'Usuario removido com sucesso';
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(resposta);
    });
  }
});
//Execução
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

//http://localhost:3000/criar-atualizar-usuario?nome=arthur-severino&idade=80&id=002
//http://localhost:3000/selecionar-usuario?id=002
//http://localhost:3000/remover-usuario?id=002
