
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
      client.query("INSERT INTO voluntario (nome, cpf, rg, email, endereco, religiao, sexo, escolaridade,cargoInteresse, estadoCivil, profissao, dtNascimento, telefoneContato) " +
          "VALUES ('" + req.body.nome + "','" + req.body.cpf + "','" + req.body.rg + "','" + req.body.email + "','" + req.body.endereco +
          "','" + req.body.religiao + "','" + req.body.sexo + "','" + req.body.escolaridade + "','" + req.body.cargoInteresse + "','" + req.body.estadoCivil + "','" + req.body.profissao + "','" + req.body.dtNascimento + "','" + req.body.telefoneContato + "')", function (err, result) {
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
          "rg = '" + req.body.rg + "', " +
          "email = '" + req.body.email + "', " +
          "endereco = '" + req.body.endereco + "', " +
          "religiao = '" + req.body.religiao + "', " +
          "sexo = '" + req.body.sexo + "', " +
          "escolaridade = '" + req.body.escolaridade + "', " +
          "cargointeresse = '" + req.body.estadocivil + "', " +
          "profissao = '" + req.body.profissao + "', " +
          "dtnascimento = '" + req.body.dtnascimento + "', " +
          "telefonecontato = '" + req.body.telefonecontato + "' " +
          "WHERE id = " + req.body.id, function (err, result) {
            console.log(err, result)
            done();
            if (err) {
                return console.error('error running query', err);
            }
            res.setHeader('Access-Control-Allow-Origin', '*');
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
    client.query('DELETE FROM voluntario where id = ' + req.params.id, function (err, result) {
    done();
    if(err) {
      return console.error('error running query', err);
    }
    res.setHeader('Access-Control-Allow-Origin','*');
    res.json(result.rows); // servidor retorna a consulta em formato json
  });
});
});
//VAGAS
// rota com protocolo GET para seleção no banco de dados
app.get('/vagas', function (req, res) {
    pool.connect(function (err, client, done) {
        if (err)
            return console.error('error fetching client from pool', err);
        client.query('SELECT * FROM vagas ORDER BY id',
            function (err, result) {
                done();
                if (err) {
                    return console.error('error running query', err);
                }
                res.setHeader('Access-Control-Allow-Origin', '*');
                console.log(result.rows);
                res.json(result.rows); // servidor retorna a consulta em formato json
            });
    });
});
//get que retorna pelo id_cliente
app.get('/vagas/:id', function (req, res) {
    pool.connect(function (err, client, done) {
        if (err)
            return console.error('error fetching client from pool', err);
        client.query('SELECT * FROM vagas WHERE id = ' + req.params.id,
            function (err, result) {
                done();
                if (err) {
                    return console.error('error running query', err);
                }
                res.setHeader('Access-Control-Allow-Origin', '*');
                console.log(result.rows);
                res.json(result.rows); // servidor retorna a consulta em formato json
            });
    });
});

// rota com protocolo POST para inserção no banco de dados
app.post('/vagas', function (req, res) {
    pool.connect(function (err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        client.query("INSERT INTO vagas (descricaovaga,dtinicio,dtfim,id_instituicao,titulo) " +
            "VALUES ('" + req.body.descricaovaga + "','" + req.body.dtinicio + "','" + req.body.dtfim + "','" + req.body.id_instituicao + "','" + req.body.titulo + "')", function (err, result) {
            done();
            if (err) {
                return console.error('error running query', err);
            }
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.json(result.rows); // servidor retorna a consulta em formato json
        });
    });
});

// rota com protocolo PUT para atualização no banco de dados
app.put('/vagas', function (req, res) {
    pool.connect(function (err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        client.query("UPDATE vagas SET " +
            "descricaovaga = '" + req.body.descricaovaga + "', " +
            "dtinicio = '" + req.body.dtinicio + "', " +
            "dtfim = '" + req.body.dtfim + "', " +
            "id_instituicao = '" + req.body.id_instituicao + "', " +
            "titulo = '" + req.body.titulo + "' " +
            "WHERE id = " + req.body.id, function (err, result) {
            console.log(err, result)
            done();
            if (err) {
                return console.error('error running query', err);
            }
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.json(result.rows); // servidor retorna a consulta em formato json
        });
    });
});


// rota com protocolo DELETE para remoção no banco de dados
app.delete('/vagas/:id', function (req, res) {
    var codigo = req.params.codigo;
    pool.connect(function (err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        client.query('DELETE FROM vagas where id = ' + req.params.id, function (err, result) {
            done();
            if (err) {
                return console.error('error running query', err);
            }
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.json(result.rows); // servidor retorna a consulta em formato json
        });
    });
});

//VAGAS E VOLUNTARIOS


app.listen(3000)
