const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Conexão com o banco de dados SQLite
const db = new sqlite3.Database("./minhacervejaria.db");

// Criação das tabelas
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS fabricantes (
    id INTEGER PRIMARY KEY,
    nome TEXT,
    cnpj TEXT,
    endereco TEXT,
    cidade TEXT,
    estado TEXT,
    cep TEXT,
    telefone TEXT,
    email TEXT,
    status BOOLEAN,
    observacoes TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY,
    nome TEXT,
    email TEXT,
    telefone TEXT,
    endereco TEXT,
    cidade TEXT,
    estado TEXT,
    cep TEXT,
    cpf TEXT,
    dataNascimento DATE,
    sexo TEXT,
    status BOOLEAN,
    observacoes TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS estoques (
    id INTEGER PRIMARY KEY,
    cervejaId INTEGER,
    quantidade INTEGER,
    dataEntrada DATE,
    dataValidade DATE,
    status BOOLEAN,
    observacoes TEXT,
    FOREIGN KEY(cervejaId) REFERENCES cervejas(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS cervejas (
    id INTEGER PRIMARY KEY,
    nome TEXT,
    fabricanteId INTEGER,
    estilo TEXT,
    teorAlcoolico REAL,
    ibu INTEGER,
    descricao TEXT,
    FOREIGN KEY(fabricanteId) REFERENCES fabricantes(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS vendas (
    id INTEGER PRIMARY KEY,
    clienteId INTEGER,
    cervejaId INTEGER,
    quantidade INTEGER,
    dataVenda DATE,
    valorTotal REAL,
    status BOOLEAN,
    observacoes TEXT,
    FOREIGN KEY(clienteId) REFERENCES clientes(id),
    FOREIGN KEY(cervejaId) REFERENCES cervejas(id)
  )`);
});

// Rota para adicionar cervejas
app.post("/api/cervejas", (req, res) => {
  const {
    nome,
    fabricanteId,
    estilo,
    teorAlcoolico,
    ibu,
    descricao
  } = req.body;
  db.run(
    "INSERT INTO cervejas (nome, fabricanteId, estilo, teorAlcoolico, ibu, descricao) VALUES (?, ?, ?, ?, ?, ?)",
    [nome, fabricanteId, estilo, teorAlcoolico, ibu, descricao],
    function (err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.status(201).send({ id: this.lastID });
    }
  );
});

//Rota para listar cervejas
app.get("/api/cervejas", (req, res) => {
  db.all("SELECT * FROM cervejas", (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send(rows);
  });
});

//Rota para editar cervejas
app.put("/api/cervejas/:id", (req, res) => {
  const { id } = req.params;
  const {
    nome,
    fabricanteId,
    estilo,
    teorAlcoolico,
    ibu,
    descricao
  } = req.body;
  db.run(
    "UPDATE cervejas SET nome = ?, fabricanteId = ?, estilo = ?, teorAlcoolico = ?, ibu = ?, descricao = ? WHERE id = ?",
    [nome, fabricanteId, estilo, teorAlcoolico, ibu, descricao, id],
    function (err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.send({ id: this.lastID });
    }
  );
});

//Rota para deletar cervejas
app.delete("/api/cervejas/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM cervejas WHERE id = ?", id, (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send({ id });
  });
});

// Rota para adicionar fabricantes
app.post("/api/fabricantes", (req, res) => {
  const {
    nome,
    cnpj,
    endereco,
    cidade,
    estado,
    cep,
    telefone,
    email,
    status,
    observacoes,
  } = req.body;
  db.run(
    "INSERT INTO fabricantes (nome, cnpj, endereco, cidade, estado, cep, telefone, email, status, observacoes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      nome,
      cnpj,
      endereco,
      cidade,
      estado,
      cep,
      telefone,
      email,
      status,
      observacoes,
    ],
    function (err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.status(201).send({ id: this.lastID });
    }
  );
});

//Rota para listar fabricantes
app.get("/api/fabricantes", (req, res) => {
  db.all("SELECT * FROM fabricantes", (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send(rows);
  });
});

//Rota para editar fabricantes
app.put("/api/fabricantes/:id", (req, res) => {
  const { id } = req.params;
  const {
    nome,
    cnpj,
    endereco,
    cidade,
    estado,
    cep,
    telefone,
    email,
    status,
    observacoes,
  } = req.body;
  db.run(
    "UPDATE fabricantes SET nome = ?, cnpj = ?, endereco = ?, cidade = ?, estado = ?, cep = ?, telefone = ?, email = ?, status = ?, observacoes = ? WHERE id = ?",
    [
      nome,
      cnpj,
      endereco,
      cidade,
      estado,
      cep,
      telefone,
      email,
      status,
      observacoes,
      id,
    ],
    function (err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.send({ id: this.lastID });
    }
  );
});

//Rota para deletar fabricantes
app.delete("/api/fabricantes/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM fabricantes WHERE id = ?", id, (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send({ id });
  });
});

// Rota para adicionar clientes
app.post("/api/clientes", (req, res) => {
  const {
    nome,
    email,
    telefone,
    endereco,
    cidade,
    estado,
    cep,
    cpf,
    dataNascimento,
    sexo,
    status,
    observacoes,
  } = req.body;
  db.run(
    "INSERT INTO clientes (nome, email, telefone, endereco, cidade, estado, cep, cpf, dataNascimento, sexo, status, observacoes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      nome,
      email,
      telefone,
      endereco,
      cidade,
      estado,
      cep,
      cpf,
      dataNascimento,
      sexo,
      status,
      observacoes,
    ],
    function (err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.status(201).send({ id: this.lastID });
    }
  );
});

//Rota para listar clientes
app.get("/api/clientes", (req, res) => {
  db.all("SELECT * FROM clientes", (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send(rows);
  });
});

//Rota para editar clientes
app.put("/api/clientes/:id", (req, res) => {
  const { id } = req.params;
  const {
    nome,
    email,
    telefone,
    endereco,
    cidade,
    estado,
    cep,
    cpf,
    dataNascimento,
    sexo,
    status,
    observacoes,
  } = req.body;
  db.run(
    "UPDATE clientes SET nome = ?, email = ?, telefone = ?, endereco = ?, cidade = ?, estado = ?, cep = ?, cpf = ?, dataNascimento = ?, sexo = ?, status = ?, observacoes = ? WHERE id = ?",
    [
      nome,
      email,
      telefone,
      endereco,
      cidade,
      estado,
      cep,
      cpf,
      dataNascimento,
      sexo,
      status,
      observacoes,
      id,
    ],
    function (err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.send({ id });
    }
  );
});

//Rota para deletar clientes
app.delete("/api/clientes/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM clientes WHERE id = ?", id, (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send({ id });
  });
});

//Rota para adicionar vendas
app.post("/api/vendas", (req, res) => {
  const {
    clienteId,
    cervejaId,
    quantidade,
    dataVenda,
    valorTotal,
    status,
    observacoes,
  } = req.body;
  db.run(
    "INSERT INTO vendas (clienteId, cervejaId, quantidade, dataVenda, valorTotal, status, observacoes) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      clienteId,
      cervejaId,
      quantidade,
      dataVenda,
      valorTotal,
      status,
      observacoes,
    ],
    function (err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.status(201).send({ id: this.lastID });
    }
  );
});

//Rota para listar vendas
app.get("/api/vendas", (req, res) => {
  db.all("SELECT * FROM vendas", (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send(rows);
  });
});

//Rota para editar vendas
app.put("/api/vendas/:id", (req, res) => {
  const { id } = req.params;
  const {
    clienteId,
    cervejaId,
    quantidade,
    dataVenda,
    valorTotal,
    status,
    observacoes,
  } = req.body;
  db.run(
    "UPDATE vendas SET clienteId = ?, cervejaId = ?, quantidade = ?, dataVenda = ?, valorTotal = ?, status = ?, observacoes = ? WHERE id = ?",
    [
      clienteId,
      cervejaId,
      quantidade,
      dataVenda,
      valorTotal,
      status,
      observacoes,
      id,
    ],
    function (err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.send({ id: this.lastID });
    }
  );
});

//Rota para deletar vendas
app.delete("/api/vendas/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM vendas WHERE id = ?", id, (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send({ id });
  });
});

//Rota para adicionar estoques
app.post("/api/estoques", (req, res) => {
  const {
    cervejaId,
    quantidade,
    dataEntrada,
    dataValidade,
    status,
    observacoes,
  } = req.body;
  db.run(
    "INSERT INTO estoques (cervejaId, quantidade, dataEntrada, dataValidade, status, observacoes) VALUES (?, ?, ?, ?, ?, ?)",
    [cervejaId, quantidade, dataEntrada, dataValidade, status, observacoes],
    function (err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.status(201).send({ id: this.lastID });
    }
  );
});

//Rota para listar estoques
app.get("/api/estoques", (req, res) => {
  const { cervejaId } = req.query;
  let query = "SELECT * FROM estoques";
  const params = [];
  if (cervejaId) {
    query += " WHERE cervejaId = ?";
    params.push(cervejaId);
  }
  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send(rows);
  });
});

//Rota para editar estoques
app.put("/api/estoques/:id", (req, res) => {
  const { id } = req.params;
  const { quantidade } = req.body;
  db.run(
    "UPDATE estoques SET quantidade = ? WHERE id = ?",
    [quantidade, id],
    function (err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.send({ id: this.lastID });
    }
  );
});

//Rota para deletar estoques
app.delete("/api/estoques/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM estoques WHERE id = ?", id, (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send({ id });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
