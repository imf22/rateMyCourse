"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//const express = require("express");
const app = (0, express_1.default)();
const port = 3000;
const hostname = "localhost";
const pug = require('pug');
const trucktemplate = pug.compileFile('public/truckpage_template.pug');
app.use(express_1.default.json());
app.use(express_1.default.static("public"));
//create database
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');
// db.exec('CREATE TABLE IF NOT EXISTS TRUCKS(TRUCK_ID INTEGER PRIMARY KEY,USER_NAME TEXT NOT NULL UNIQUE,TRUCK_NAME TEXT NOT NULL UNIQUE,RATING INTEGER NOT NULL,FOOD_TYPE TEXT NOT NULL UNIQUE, REVIEW TEXT NOT NULL UNIQUE )');
//db.exec('INSERT INTO TRUCKS (TRUCK_ID,USER_NAME,TRUCK_NAME,RATING,FOOD_TYPE,REVIEW) VALUES (1,"TEST","TEST",5,"TEST","GOOD")');
//db.exec('CREATE TABLE TRUCKS(TRUCK_ID INTEGER PRIMARY KEY,USER_NAME TEXT NOT NULL UNIQUE,TRUCK_NAME TEXT NOT NULL UNIQUE,RATING INTEGER NOT NULL,FOOD_TYPE TEXT NOT NULL UNIQUE, REVIEW TEXT NOT NULL UNIQUE )');
//db.exec('INSERT INTO TRUCKS (USER_NAME,TRUCK_NAME,RATING,FOOD_TYPE,REVIEW) VALUES ("FT2","FT2",5,"Mexican","GOOD3")');
let sql = 'SELECT * FROM TRUCKS';
db.all(sql, (err, row) => {
    if (err) {
        return console.error(err.message);
    }
    return console.log(row);
});
app.get('/', (req, res) => { });
app.post('/getTruckPage', (req, res) => {
    // let sql = `SELECT * FROM TRUCKS WHERE FOOD_TYPE=\'${O1} AND TRUCK_NAME=\'${O2} AND RATING=${O3}`;
    let body = req.body;
    console.log(req.query);
    if (!body.hasOwnProperty("truckname")) {
        console.log(body.query);
        return res.sendStatus(400);
    }
    else {
        sql = `SELECT * FROM TRUCKS WHERE TRUCK_NAME = ?`;
        console.log(sql);
        db.all(sql, [body.truckname], (err, row) => {
            if (err) {
                console.error(err.message);
                res.sendStatus(500);
            }
            else {
                console.log(row);
                let truckName = row[0].TRUCK_NAME;
                let cuisine = row[0].RATING;
                let rating = row[0].FOOD_TYPE;
                let reviews_a = []; // An Array of Text obects        
                for (let user_review of row) {
                    // console.log(user_review.REVIEW,"\n");
                    reviews_a.push({ "user": user_review.USER_NAME, "rate": user_review.RATING, "review": user_review.REVIEW });
                }
                // console.log(reviews_a);
                // Send request for custom truck page
                res.send(trucktemplate({ truckname: truckName, cuisine: cuisine, rating: rating, reviews: reviews_a }));
            }
            // res.send(row)
            // res.end();
            // return console.log(row)
        });
        // console.log(req.body); 
        //   res.sendStatus(200);
    }
    // res.send(trucktemplate({truckname: "Happy Sunshine Food Truck", cuisine: "Breakfast", rating: 4.5 , reviews: reviews_t}));
});
app.get('/test', (req, res) => {
    let r1 = { user: "Medha", rate: 3, review: `She looked at her student wondering if she could ever get through. "You need to learn to think for yourself," she wanted to tell him. "Your friends are holding you back and bringing you down." But she didn't because she knew his friends were all that he had and even if that meant a life of misery, he would never give them up.` };
    let r2 = { user: "Irving", rate: 4, review: `She was infatuated with color. She didn't have a favorite color per se, but she did have a fondness for teals and sea greens. You could see it in the clothes she wore that color was an important part of her overall style. She took great pride that color flowed from her and that color was always all around her. That is why, she explained to her date sitting across the table, that she could never have a serious relationship with him due to the fact that he was colorblind.` };
    let r3 = { user: "Trey", rate: 5, review: `Puppies are soft, cute, funny, and make a big mess. Every month or two our family fosters 6-12 week old puppies for a puppy rescue nonprofit organization. We all enjoy cuddling their furry bodies after a clean bath. Fresh puppy smell is great. The puppies play with each other and our adult dog. They look so funny when they lay on top of each other and sleep. While puppies can be great fun, they also can make big messes. 4-6 puppies can make a lot of puppy pee and poop. It's a challenge to keep the puppies and the puppy pen clean.` };
    let r4 = { user: "Hetong", rate: 2, review: `The light was out on the front porch of the house. This was strange. Judy couldn't remember a time when she had ever seen it out. She hopped out of her car and walked to the door. It was slightly ajar and she knew this meant something terrible. She gently pushed the door open and hall her fears were realized. "Surprise! Happy Birthday!" everyone shouted.` };
    // Each review must be in an array
    const reviews_t = [r1, r2, r3, r4];
    // Send request for custom truck page
    res.send(trucktemplate({ truckname: "Happy Sunshine Food Truck", cuisine: "Breakfast", rating: 4.5, reviews: reviews_t }));
});
app.post('/postReview', function (req, res) {
    let body = req.body;
    console.log(req);
    if (!body.hasOwnProperty("name") ||
        !body.hasOwnProperty("foodTruck") ||
        !body.hasOwnProperty("rating") ||
        !body.hasOwnProperty("review") ||
        body.name === "" || body.name.length > 15 ||
        parseFloat(body.rating) == NaN || parseFloat(body.rating) > 5.0) {
        return res.sendStatus(400);
    }
    else {
        console.log(req.body);
        res.sendStatus(200);
    }
    // insert one row into the TRUCKS table
    db.exec(`INSERT INTO TRUCKS(TRUCK_ID,USER_NAME,TRUCK_NAME,RATING,FOOD_TYPE,REVIEW) VALUES(1,$1,$2,$3,"TEST",$4)`, function (err) {
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
app.get('/search', (req, res) => {
    let body = req.body;
    console.log(req.query);
    if (!body.hasOwnProperty("O1") &&
        !body.hasOwnProperty("O2") &&
        body.hasOwnProperty("O3")) {
        console.log(body.query);
        //  return res.sendStatus(400);
    }
    else {
        sql = `SELECT * FROM TRUCKS WHERE LOWER(FOOD_TYPE)=\"${req.query['O1']}\" OR TRUCK_NAME=\"${req.query['O2']}\" OR RATING=${req.query['O3']}`;
        console.log(sql);
        db.all(sql, (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            res.send(row);
            res.end();
            return console.log(row);
        });
        console.log(req.body);
        //   res.sendStatus(200);
    }
});
app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});
//# sourceMappingURL=app.js.map