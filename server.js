const sql = require("mssql");
const cors = require("cors");
const express = require("express");
const app = express();

const dbConfig = {
  server: "DESKTOP-9V3T2L9\\SQLEXPRESS01",
  user: "test",
  password: "123",
  database: "ORDERS",
  port: 1433
};

app.use(cors());
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/dist/main.js", (req, res) => {
  res.sendFile(__dirname + "/dist/main.js");
});

app.get("/api/Orders", (req, res) => {
  sql.connect(dbConfig)
  .then((pool) => {
    pool.query(`select * from OrderInfo`, (err, recordset) => {
      if (err) {
        handleError(err, res);            
      }
      else {
        console.log(recordset["recordset"]);
        
        res.status(200)
          .type("application/json")
          .send(JSON.stringify(recordset["recordset"]));
      }
    })
  });
  // conn.connect(err => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log("Подключено");

  //   let idProducts = [];

  //   const req = new sql.Request(conn);
  //   req.query(`select * from OrderInfo`, (err, recordset) => {
  //     if (err) {
  //       handleError(err, res);            
  //     }
  //     else {
  //       console.log(recordset["recordset"][0]["idProducts"]);
  //       idProducts = recordset["recordset"][0]["idProducts"];
  //       console.log(2);
        
  //       res.type("application/json")
  //         .status(200)
  //         .json(recordset["recordset"]);
  //     }
  //     conn.close();
  //   });
    // const req2 = new sql.Request(conn);
    // req2.query(`select * from ProductInfo where id IN (${idProducts.join("")})`, (err, recordset) => {
    //   if (err) {
    //     handleError(err, res);            
    //   }
    //   else {
    //     console.log(recordset);
        
    //     // res.type("application/json")
    //     //   .status(200)
    //     //   .json(recordset["recordset"]);
    //   }
    //   conn.close();
    // });
  // });
});

app.post("/api/Orders", (req ,res) => {
  res.status(200)
          .json({a: 5});
})

app.listen(3000);



