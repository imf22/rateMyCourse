import express from 'express';
const app = express();
const port = 3000;


const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');
//db.exec('INSERT INTO TRUCKS (TRUCK_ID,USER_NAME,TRUCK_NAME,RATING,FOOD_TYPE,REVIEW) VALUES (1,"TEST","TEST",5,"TEST","GOOD")');
let sql = 'SELECT * FROM TRUCKS';
db.all(sql,  (err, row) => {
    if (err) {
        return console.error(err.message)
    }
    return console.log(row)
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
