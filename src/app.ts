import express from 'express';
//const express = require("express");
const app = express();
const port = 3000;
const hostname = "localhost";

app.use(express.json());
app.use(express.static("public"));

//create database
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');
db.exec('CREATE TABLE TRUCKS(TRUCK_ID INTEGER PRIMARY KEY,USER_NAME TEXT NOT NULL UNIQUE,TRUCK_NAME TEXT NOT NULL UNIQUE,RATING INTEGER NOT NULL,FOOD_TYPE TEXT NOT NULL UNIQUE, REVIEW TEXT NOT NULL UNIQUE )');
//db.exec('INSERT INTO TRUCKS (TRUCK_ID,USER_NAME,TRUCK_NAME,RATING,FOOD_TYPE,REVIEW) VALUES (1,"TEST","TEST",5,"TEST","GOOD")');
let sql = 'SELECT * FROM TRUCKS';
db.all(sql,  (err, row) => {
    if (err) {
        return console.error(err.message)
    }
    return console.log(row)
});

app.get('/', (req, res) => {
  // res.send('Hello World!');
  //res.send();
  //res.sendFile('public/index.html', {root:  "../rateMyCourse/src"});
  //res.sendFile('index.html');
});


app.post('/postReview', function (req, res) {
  let body = req.body;
  console.log(req);
  if (
      !body.hasOwnProperty("name") ||
      !body.hasOwnProperty("foodTruck") ||
      !body.hasOwnProperty("rating") ||
      !body.hasOwnProperty("review") ||
      body.name === "" || body.name.length>15 ||
      parseFloat(body.rating) == NaN || parseFloat(body.rating) > 5.0
  ) {

      return res.sendStatus(400);
  }
  else{
    console.log(req.body); 
    res.sendStatus(200);
  } 
   // insert one row into the TRUCKS table
   db.exec(`INSERT INTO TRUCKS(TRUCK_ID,USER_NAME,TRUCK_NAME,RATING,FOOD_TYPE,REVIEW) VALUES(1,$1,$2,$3,"TEST",$4)`, function(err) {
    if (err) {
      return console.log(err.message);
      return res.sendStatus(500);
    }
    // get the last insert id
    console.log(`A row has been inserted`);
    return res.send();
  });
  // pool.query(
  //     "INSERT INTO books(title, genre, quality) VALUES($1, $2, $3) RETURNING *",
  //     [body.title, body.genre, body.quality]
  // )
  //     .then(function (response) {
  //         console.log(response.rows);
  //         return res.send();
  //     })
  //     .catch(function (error) {
  //         console.log("error here?");
  //         return res.sendStatus(500);
  //     });
});

app.listen(port, hostname, () => {
  console.log(`Listening at: http://${hostname}:${port}`);
});
