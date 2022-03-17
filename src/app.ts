import express from 'express';
const app = express();
const port = 3000;
const hostname = "localhost";

const pug = require('pug');
const trucktemplate = pug.compileFile('public/truckpage_template.pug');

app.use(express.json());
app.use(express.static("public"));


var dict = {"Kami":"Lunch/Dinner","Andy's Chinese Truck":"Lunch/Dinner","Pete's Little Lunch Box":"American","Dos Hermanos Tacos":"Mexican","The Spot Food Truck":"American","Halal Food Truck":"Lunch/Dinner","The Jimmy Truck":"Lunch/Dinner","Cucina pizza":"Mexican","Mommy's Telly's famous BBQ":"Lunch/Dinner","Los Compadres":"Mexican"}


//create database
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');
let sql;

app.get('/', (req, res) => {});

app.get('/getTruckPage', (req, res) => {

  let trucknames =  req.query.truck;
  console.log(trucknames)


  console.log(req.query);
  if (trucknames === ''){
    console.log(req.query);
    return res.sendStatus(400);
  }
  else{
    sql=`SELECT * FROM TRUCKS WHERE TRUCK_NAME = ?`;
    console.log(sql);
    console.log("TruckName:", trucknames);
    db.all(sql, [trucknames], (err, row) => {
    if (err) {
      console.error(err.message)
      res.sendStatus(500);
    }
    else{
      console.log(row);

      let truckName= row[0]["TRUCK_NAME"]; 
      let cuisine= row[0]["FOOD_TYPE"];
      let reviews_a= []; // An Array of Text obects        
      
      
      let i = 0;
      let sum = 0;
      for (let user_review of row){
        reviews_a.push({"user": user_review.USER_NAME, "rate": user_review.RATING, "review": user_review.REVIEW});
        i++;
        sum += user_review.RATING;
      }
       
      // let rating= Math.round(100 * (sum / i)) / 100;
      let rating = (sum / i).toFixed(2);

      // Send request for custom truck page
      res.send(trucktemplate({truckname: truckName, cuisine: cuisine, rating: rating , reviews: reviews_a}));

    }

    });

  } 

})

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
   // insert one row into the REVIEW table
   db.run(`INSERT INTO TRUCKS(USER_NAME,TRUCK_NAME,RATING,FOOD_TYPE,REVIEW) VALUES(?,?,?,?,?)`,[body.name, body.foodTruck, body.rating, dict[body.foodTruck], body.review] ,function(err) {
    if (err) {
      return console.log(err.message);
      return res.sendStatus(500);
    }
    // get the last insert id
    console.log(`A row has been inserted`);
    return res.send();
  });

});


app.get('/search', (req, res) => {
    let body = req.body;
    console.log(req.query);
  if (
      !body.hasOwnProperty("O1") &&
      !body.hasOwnProperty("O2") &&
      body.hasOwnProperty("O3") 
  ) {
	console.log(body.query);
    //  return res.sendStatus(400);
  }
  else{
    sql=`SELECT * FROM TRUCKS WHERE LOWER(FOOD_TYPE)=\"${req.query['O1']}\" OR TRUCK_NAME=\"${req.query['O2']}\" OR RATING=${req.query['O3']}`;
    console.log(sql);
    db.all(sql,  (err, row) => {
      if (err) {
          return console.error(err.message)
      }
    res.send(row)
    res.end();
    return console.log(row)
});
    console.log(req.body); 
 //   res.sendStatus(200);
    
} 

    
});

app.listen(port, hostname, () => {
  console.log(`Listening at: http://${hostname}:${port}`);
});
