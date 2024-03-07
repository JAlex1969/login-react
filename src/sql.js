const express = require('express');
const mssql = require("mssql/msnodesqlv8");
const cors = require('cors');
var bodyparser = require('body-parser');

const connection = new mssql.ConnectionPool({
    database: "hotel",
    server: "(localdb)\\MSSQLLocalDB",
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true
    }
});

const app = express();

app.use(cors({
    origin: '*'
}));

app.use(bodyparser.urlencoded({ extended: false }));

app.use(bodyparser.json());

connection.connect();

// Rota GET
app.get('/login', (req, res) => {
    let { email } = req.query;
    if (email == null) {
        var liga = `SELECT * FROM Clientes`;
    } else {
        var liga = `SELECT * FROM Clientes WHERE Email='${email}'`;
    }
    connection.query(liga, (err, results) => {
        if (err) {
            res.status(500).json({
                error: 'Erro a obter dados'
            });
        } else {
            res.json(results.recordset);
        }
    })
});

app.listen(4000, () => {
    console.log('Servidor à escuta na porta: 4000');
});