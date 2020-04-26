const sql = require("mssql");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const dbConfig = {
  server: "DESKTOP-9V3T2L9\\SQLEXPRESS01",
  user: "test",
  password: "123",
  database: "ORDERS",
  port: 1433
};

function handleError(err, res) {
  console.log(err);
  res.status(400).send("Error");
}

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/dist/main.js", (req, res) => {
  res.sendFile(__dirname + "/dist/main.js");
});

app.get("/api/Orders", (req, res) => {
  sql.connect(dbConfig)
  .then(pool => {
    pool.query(`SELECT * from OrderInfo`, (err, recordset) => {
      if (err) {
        handleError(err, res);            
      } else {
        res.status(200).json(recordset["recordset"]);
      }
    });
  });
});

// ! Надо посмотреть про маршрутизацию

app.get("/api/Orders/:orderId", (req, res) => {
  const { orderId } = req.params;
  sql.connect(dbConfig)
  .then(pool => {
    pool.query(`SELECT * FROM OrderInfo WHERE orderId = ${orderId}`, (err, recordset) => {
      if (err) {
        handleError(err, res);            
      } else {
        res.status(200).json(recordset["recordset"]);
      }
    });
  });
});

app.get("/api/Orders/:orderId/products", (req, res) => {
  const { orderId } = req.params;
  sql.connect(dbConfig)
  .then(pool => {
    pool.query(`SELECT * FROM ProductInfo WHERE orderId = ${orderId}`, (err, recordset) => {
      if (err) {
        handleError(err, res);            
      } else {
        res.status(200).json(recordset["recordset"]);
      }
    });
  });
});

app.post("/api/Orders", (req, res) => {
  const order = req.body;
  const keys = Object.keys(order);
  const values = Object.values(order).reduce((acc, val, index) => (index === 1) ? `'${acc}', '${val}'` : `${acc}, '${val}'`);

  sql.connect(dbConfig)
  .then(pool => {
    pool.query(`INSERT INTO OrderInfo (${keys.join(", ")}) VALUES (${values})`, (err, recordset) => {
      if (err) {
        handleError(err, res);            
      } else {
        pool.query(`SELECT * FROM OrderInfo WHERE orderId = (SELECT MAX(orderId) FROM OrderInfo)`, (err, recordset) => {
          if (err) {
            handleError(err, res);            
          } else {
            res.status(200).json(recordset["recordset"]);
          }
        });
      }
    });
  })
});

app.listen(3000);
