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
  const query = `
  SELECT * FROM OrderInfo
  INNER JOIN CustomerInfo ON (OrderInfo.customerId = CustomerInfo.id)`;

  sql.connect(dbConfig)
  .then(pool => {
    pool.query(query, (err, recordset) => {
      if (err) {
        handleError(err, res);            
      } else {
        if (recordset["recordset"].length !== 0) {
           // fix bug, because tables OrderInfo and CustomerInfo have the same name column "id"
          recordset["recordset"].forEach(order => order.id = order.id[0]);
          res.status(200).json(recordset["recordset"]);
        } else {
          res.status(404).json({Error: 'There are no orders in the DataBase'});    
        }   
      }
    });
  });
});

app.get("/api/Orders/:orderId", (req, res) => {
  const { orderId } = req.params;
  const query = `SELECT * FROM OrderInfo 
  INNER JOIN CustomerInfo ON OrderInfo.customerId = CustomerInfo.id
  LEFT JOIN OrdersProducts ON OrderInfo.id = OrdersProducts.orderId
  LEFT JOIN ProductInfo ON ProductInfo.id = OrdersProducts.productId
  WHERE OrderInfo.id = ${orderId}`;

  sql.connect(dbConfig)
  .then(pool => {
    pool.query(query, (err, recordset) => {
      if (err) {
        handleError(err, res);            
      } else {
        const data = recordset["recordset"];
        if (data.length) {
          const totalPrice = data.reduce((acc, curr) => acc += curr.quantity * curr.price, 0);
          const { createdAt, shippedAt, status, ZIP, region, country, firstName, lastName, address, phone, email } = data[0];
          const order = {
            id: data[0]["id"][0], createdAt, shippedAt, status, ZIP, region, country, 
            firstName, lastName, address, phone, email, totalPrice
          };
          res.status(200).json(order);
        } else {
          res.status(404).json({Error: "Order with this id is not found"});
        }
      }
    });
  });
});

app.get("/api/Orders/:orderId/products", (req, res) => {
  const { orderId } = req.params;
  const query = `SELECT * FROM ProductInfo 
  INNER JOIN OrdersProducts ON ProductInfo.id = OrdersProducts.productId
  WHERE OrdersProducts.orderId = ${orderId}`;

  sql.connect(dbConfig)
  .then(pool => {
    pool.query(query, (err, recordset) => {
      if (err) {
        handleError(err, res);            
      } else {
        if (recordset["recordset"].length) {
          const products = recordset["recordset"];
          products.forEach(item => Math.round(item.totalPrice = item.quantity * item.price));
          res.status(200).json(products);
        } else {
          res.status(404).json({Error: "Products of the order with this id is not found"});
        }        
      }
    });
  });
});

app.post("/api/Orders", (req, res) => {
  const { createdAt, shippedAt, status, ZIP, region, country, firstName, lastName, address, phone, email } = req.body;
  const query = `INSERT INTO CustomerInfo (firstName, lastName, address, phone, email) VALUES
  ('${firstName}', '${lastName}', '${address}', '${phone}', '${email}')
  
  INSERT INTO OrderInfo (customerId, createdAt, status, shippedAt, ZIP, region, country) VALUES
  ((SELECT MAX(id) FROM CustomerInfo), '${createdAt}', '${status}', '${shippedAt}', '${ZIP}', '${region}', '${country}')`;

  sql.connect(dbConfig)
  .then(pool => {
    pool.query(query, (err, recordset) => {
      if (err) {
        handleError(err, res);            
      } else {
        const queryOrder = `SELECT * FROM OrderInfo 
        INNER JOIN CustomerInfo ON OrderInfo.customerId = CustomerInfo.id
        LEFT JOIN OrdersProducts ON OrderInfo.id = OrdersProducts.orderId
        LEFT JOIN ProductInfo ON ProductInfo.id = OrdersProducts.productId
        WHERE OrderInfo.id = (SELECT MAX(id) FROM OrderInfo)`;

        pool.query(queryOrder, (err, recordset) => {
          if (err) {
            handleError(err, res);            
          } else {
            const order = recordset["recordset"][0];
            order.id = order.id[0];
            res.status(200).json(order);
          }
        });
      }
    });
  });
});

app.post("/api/OrderProducts", (req, res) => {
  const product = req.body;
  const query = `INSERT INTO ProductInfo (productName, price) VALUES
  ('${product.productName}', ${product.price})

  INSERT INTO OrdersProducts (orderId, productId, quantity) VALUES
  (${product.orderId}, (SELECT MAX(id) FROM ProductInfo), ${product.quantity})`;

  sql.connect(dbConfig)
  .then(pool => {
    pool.query(query, (err, recordset) => {
      if (err) {
        handleError(err, res);            
      } else {
        const queryProduct = `SELECT * FROM ProductInfo 
        INNER JOIN OrdersProducts ON ProductInfo.id = OrdersProducts.productId
        WHERE OrdersProducts.orderId = ${product.orderId} AND ProductInfo.id = (SELECT MAX(id) FROM ProductInfo)`;
        
        pool.query(queryProduct, (err, recordset) => {
          if (err) {
            handleError(err, res);            
          } else {
            const product = recordset["recordset"][0];
            product.totalPrice = Math.round(product.quantity * product.price);
            res.status(200).json(product);
          }
        });
      }
    });
  });
});

app.put("/api/Orders/:orderId", (req, res) => {
  const { orderId } = req.params;
  const order = req.body;
  let query;

  // shipping address info
  if (order.ZIP && order.country) {
    query = `UPDATE OrderInfo SET 
    ZIP = '${order.ZIP}', region = '${order.region}', country = '${order.country}'
    WHERE id = ${orderId}
    
    UPDATE CustomerInfo SET
    firstName = '${order.firstName}', address = '${order.address}'
    WHERE id = (SELECT customerId FROM OrderInfo WHERE id = ${orderId})`;
  } else { // customer info
    query = `UPDATE CustomerInfo SET
    firstName = '${order.firstName}', lastName = '${order.lastName}', address = '${order.address}',
    phone = '${order.phone}', email = '${order.email}'
    WHERE id = (SELECT customerId FROM OrderInfo WHERE id = ${orderId})`;
  }

  sql.connect(dbConfig)
  .then(pool => {
    pool.query(query, (err, recordset) => {
      if (err) {
        handleError(err, res);            
      } else {
        if (recordset["rowsAffected"][0] !== 0) {
          const queryOrder = `SELECT * FROM OrderInfo 
          INNER JOIN CustomerInfo ON OrderInfo.customerId = CustomerInfo.id
          LEFT JOIN OrdersProducts ON OrderInfo.id = OrdersProducts.orderId
          LEFT JOIN ProductInfo ON ProductInfo.id = OrdersProducts.productId
          WHERE OrderInfo.id = ${orderId}`;

          pool.query(queryOrder, (err, recordset) => {
            if (err) {
              handleError(err, res);            
            } else {
              const data = recordset["recordset"];
              const totalPrice = data.reduce((acc, curr) => acc += curr.quantity * curr.price, 0);
              const { createdAt, shippedAt, status, ZIP, region, country, firstName, lastName, address, phone, email } = data[0];
              const order = {
                id: data[0]["id"][0], createdAt, shippedAt, status, ZIP, region, country, 
                firstName, lastName, address, phone, email, totalPrice
              };
              res.status(200).json(order);              
            }
          });
        } else {
          res.status(404).json({Error: "Unable to insert new data. Order with this id is not found"})
        }
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
        if (recordset["rowsAffected"][0] !== 0) {
          res.status(200).json(recordset);
        } else {
          res.status(404).json({Error: "Unable to delete order. Order with this id is not found"});
        }
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
        if (recordset["rowsAffected"][0] !== 0) {
          res.status(200).json(recordset);
        } else {
          res.status(404).json({Error: "Unable to delete product of the order. Product or order with it\'s id is not found"});
        }
      }
    });
  });
});

app.listen(PORT);
