
let r1 = {user: "MedGup", rate: 3, review: `She looked at her student wondering if she could ever get through. "You need to learn to think for yourself," she wanted to tell him. "Your friends are holding you back and bringing you down." But she didn't because she knew his friends were all that he had and even if that meant a life of misery, he would never give them up.`};
let r2 = {user: "IrvingF", rate: 4, review: `She was infatuated with color. She didn't have a favorite color per se, but she did have a fondness for teals and sea greens. You could see it in the clothes she wore that color was an important part of her overall style. She took great pride that color flowed from her and that color was always all around her. That is why, she explained to her date sitting across the table, that she could never have a serious relationship with him due to the fact that he was colorblind.`};
let r3 = {user: "TreyTrey", rate: 5, review: `Puppies are soft, cute, funny, and make a big mess. Every month or two our family fosters 6-12 week old puppies for a puppy rescue nonprofit organization. We all enjoy cuddling their furry bodies after a clean bath. Fresh puppy smell is great. The puppies play with each other and our adult dog. They look so funny when they lay on top of each other and sleep. While puppies can be great fun, they also can make big messes. 4-6 puppies can make a lot of puppy pee and poop. It's a challenge to keep the puppies and the puppy pen clean.`};
let r4 = {user: "Hetongg", rate: 2, review: `The light was out on the front porch of the house. This was strange. Judy couldn't remember a time when she had ever seen it out. She hopped out of her car and walked to the door. It was slightly ajar and she knew this meant something terrible. She gently pushed the door open and hall her fears were realized. "Surprise! Happy Birthday!" everyone shouted.`};

const reviews_t = {r1, r2, r3, r4};
let str_data = JSON.stringify(reviews_t);

console.log(str_data);

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database("./data.db", (err) => { 
    if (err) { 
        console.log('Error when creating the database', err) 
    } else { 
        console.log('Database created!') 
        /* Put code to create table(s) here */
        createTable();
        fillrows();
    } 
})



const createTable = () => {
    console.log("create database table contacts");
    db.run('CREATE TABLE IF NOT EXISTS TRUCKS(TRUCK_ID INTEGER PRIMARY KEY,USER_NAME TEXT NOT NULL ,TRUCK_NAME TEXT NOT NULL, RATING INTEGER NOT NULL,FOOD_TYPE TEXT NOT NULL, REVIEW TEXT NOT NULL)');
}



function insertData(username, truckName, rating, foodType, review){
    console.log("Inserting data...\n");
    db.run(`INSERT INTO TRUCKS (USER_NAME, TRUCK_NAME, RATING, FOOD_TYPE, REVIEW) VALUES(?, ?, ?, ?, ?)`, [username, truckName, rating, foodType, review], function(err) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
        return console.log(`A row has been inserted`);
      });

    //   `INSERT INTO ${table} (username, hashed_password, palettes) VALUES (?, ?, ?)`, [username, hashed_password, palette]
}

function fillrows(){
    insertData(r2.user, "Kami", 3, "lunchdinner", r3.review);
    insertData(r4.user, "Kami", 4, "lunchdinner", r2.review);
    insertData(r1.user, "Kami", 2, "lunchdinner", r1.review);
    insertData(r4.user, "Pete's Little Lunch Box", 5, "american", r4.review);
    insertData(r3.user, "Pete's Little Lunch Box", 4, "american", r1.review);
    insertData(r2.user, "Dos Hermanos Tacos", 3, "mexican", r3.review);
    insertData(r4.user, "Dos Hermanos Tacos", 4, "mexican", r1.review);
    insertData(r1.user, "Dos Hermanos Tacos", 2, "mexican", r4.review);
    insertData(r3.user, "Halal Food Truck", 2, "lunchdinner", r1.review);
    insertData(r4.user, "The Spot Food Truck", 1, "american", r2.review);
}

// SOME TRUCK DATA
// ﻿Food truck name, rating, and food_type


// 1. Kami, 4.0, Lunch/Dinner
// 2. Andy’s Chinese Truck, 4.5, Lunch/Dinner
// 3. Pete’s Little Lunch Box, 5.0, American
// 4. Dos Hermanos Tacos, 4.5, Mexican
// 5. The Spot Food Truck, 4.5, American
// 6. Halal Food Truck, 4.5, Lunch/Dinner
// 7. The Jimmy Truck, 4.5, Lunch/Dinner
// 8. Cucina pizza, 4.5, Mexican 
// 9. Mommy’s Telly’s famous BBQ, 5.0, Lunch/Dinner
// 10. Los Compadres, 4.0, Mexican