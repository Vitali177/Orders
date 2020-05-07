const sql = require("mssql");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

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
  const query = `SELECT * from OrderInfo INNER JOIN CustomerInfo ON OrderInfo.customerId = CustomerInfo.id`;

  sql.connect(dbConfig)
  .then(pool => {
    pool.query(query, (err, recordset) => {
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
  const query = `SELECT * from OrderInfo 
  INNER JOIN CustomerInfo ON OrderInfo.customerId = CustomerInfo.id
  INNER JOIN OrdersProducts ON OrderInfo.id = OrdersProducts.orderId
  INNER JOIN ProductInfo ON ProductInfo.id = OrdersProducts.productId
  WHERE OrderInfo.id = ${orderId}`;

  sql.connect(dbConfig)
  .then(pool => {
    pool.query(query, (err, recordset) => {
      if (err) {
        handleError(err, res);            
      } else {
        const data = recordset["recordset"]
        const totalPrice = data.reduce((acc, curr) => acc += curr.quantity * curr.price, 0);
        const { createdAt, shippedAt, status, ZIP, region, country, 
          firstName, lastName, address, phone, email } = data[0];
        const order = {
          id: data[0]["id"][0],
          createdAt, shippedAt, status, ZIP, region, country, 
          firstName, lastName, address, phone, email, totalPrice
        };
        res.status(200).json(order);
      }
    });
  });
});

app.get("/api/Orders/:orderId/products", (req, res) => {
  const { orderId } = req.params;
  const query = `SELECT * from ProductInfo 
  INNER JOIN OrdersProducts ON ProductInfo.id = OrdersProducts.productId
  WHERE OrdersProducts.orderId = ${orderId}`;

  sql.connect(dbConfig)
  .then(pool => {
    pool.query(query, (err, recordset) => {
      if (err) {
        handleError(err, res);            
      } else {
        const products = recordset["recordset"];
        products.forEach(item => item.totalPrice = item.quantity * item.price);
        res.status(200).json(products);
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
  });
});

app.post("/api/OrderProducts", (req, res) => {
  const order = req.body;
  const keys = Object.keys(order);
  const values = Object.values(order).reduce((acc, val, index) => (index === 1) ? `'${acc}', '${val}'` : `${acc}, '${val}'`);

  sql.connect(dbConfig)
  .then(pool => {
    pool.query(`INSERT INTO ProductInfo (${keys.join(", ")}) VALUES (${values})`, (err, recordset) => {
      if (err) {
        handleError(err, res);            
      } else {
        pool.query(`SELECT * FROM ProductInfo WHERE id = (SELECT MAX(id) FROM ProductInfo)`, (err, recordset) => {
          if (err) {
            handleError(err, res);            
          } else {
            res.status(200).json(recordset["recordset"]);
          }
        });
      }
    });
  });
});

app.put("/api/Orders/:orderId", (req, res) => {
  const { orderId } = req.params;
  const order = req.body;
  let str = "";

  for (key in order) {
    str += `${key} = '${order[key]}', `;
  }
  str = str.slice(0, -2); // slice last ", " from str

  sql.connect(dbConfig)
  .then(pool => {
    pool.query(`UPDATE OrderInfo SET ${str} WHERE orderId = ${orderId}`, (err, recordset) => {
      if (err) {
        handleError(err, res);            
      } else {
        res.status(200).json(recordset);
      }
    });
  });
});

app.delete("/api/Orders/:orderId", (req, res) => {
  const { orderId } = req.params;

  sql.connect(dbConfig)
  .then(pool => {
    pool.query(`DELETE FROM OrderInfo WHERE id = ${orderId}`, (err, recordset) => {
      if (err) {
        handleError(err, res);            
      } else {
        res.status(200).json(recordset);
      }
    });
  });
});

app.delete("/api/OrderProducts/:orderId/:productId", (req, res) => {
  const { orderId, productId } = req.params;

  sql.connect(dbConfig)
  .then(pool => {
    pool.query(`DELETE FROM OrdersProducts 
    WHERE (orderId = ${orderId}) AND (productId = ${productId})`, (err, recordset) => {
      if (err) {
        handleError(err, res);            
      } else {
        res.status(200).json(recordset);
      }
    });
  });
});

app.listen(PORT);