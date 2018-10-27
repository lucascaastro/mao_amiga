
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var core_use = require('cors');
var pg = require('pg');

app.use(core_use());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var config = {
  user: 'postgres', //env var: PGUSER
    database: 'mao_amiga', //env var: PGDATABASE
  password: '123456', //env var: PGPASSWORD
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

var pool = new pg.Pool(config);

// rota com protocolo GET para seleção no banco de dados
app.get('/voluntario', function (req, res) {
	  pool.connect(function(err, client, done) {
	     if(err)
		     return console.error('error fetching client from pool', err);
	     client.query('SELECT * FROM voluntario ORDER BY id',
      function(err, result) {
		      done();
		if(err) {
		  return console.error('error running query', err);
		}
		res.setHeader('Access-Control-Allow-Origin','*');
		console.log(result.rows);
    res.json(result.rows); // servidor retorna a consulta em formato json
		});
	});
});
//get que retorna pelo id_cliente
app.get('/voluntario/:id', function (req, res) {
	  pool.connect(function(err, client, done) {
	     if(err)
		     return console.error('error fetching client from pool', err);
          client.query('SELECT * FROM voluntario WHERE id = ' + req.params.id,
      function(err, result) {
		      done();
		if(err) {
		  return console.error('error running query', err);
		}
		res.setHeader('Access-Control-Allow-Origin','*');
		console.log(result.rows);
    res.json(result.rows); // servidor retorna a consulta em formato json
		});
	});
});

// rota com protocolo POST para inserção no banco de dados
app.post('/voluntario', function (req, res) {
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query("INSERT INTO tb_cliente (nome,cpf,endereco,numero,bairro,cidade,estado,telefone,email) VALUES ('" + req.body.nome + "','" + req.body.cpf + "','" + req.body.endereco + "','" + req.body.numero +  "','"  + req.body.bairro +
    "','" + req.body.cidade + "','" + req.body.estado + "','" + req.body.telefone + "','" + req.body.email + "')", function(err, result) {
      done();
      if(err) {
        return console.error('error running query', err);
      }
      res.setHeader('Access-Control-Allow-Origin','*');
      res.json(result.rows); // servidor retorna a consulta em formato json
    });
  });
});

// rota com protocolo PUT para atualização no banco de dados
app.put('/voluntario', function (req, res) {
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
  }
      client.query("UPDATE voluntario SET " +
               "nome = '" + req.body.nome + "', " +
               "cpf = '" + req.body.cpf + "', " +
               "endereco = '" + req.body.endereco + "', " +
               "numero = '" + req.body.numero + "', " +
               "bairro = '" + req.body.bairro + "', " +
               "cidade = '" + req.body.cidade + "', " +
               "estado = '" + req.body.estado + "', " +
               "telefone = '" + req.body.telefone + "', " +
               "email = '" + req.body.email + "' " +
               "WHERE id_cliente = " + req.body.id_cliente, function(err, result) {
    done();
    if(err) {
      return console.error('error running query', err);
    }
    res.setHeader('Access-Control-Allow-Origin','*');
    res.json(result.rows); // servidor retorna a consulta em formato json
  });
});
});


// rota com protocolo DELETE para remoção no banco de dados
app.delete('/voluntario/:id', function (req, res) {
    var codigo = req.params.codigo;
pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('DELETE FROM tb_cliente where id_cliente = ' + req.params.id, function(err, result) {
    done();
    if(err) {
      return console.error('error running query', err);
    }
    res.setHeader('Access-Control-Allow-Origin','*');
    res.json(result.rows); // servidor retorna a consulta em formato json
  });
});
});

app.listen(3000)
