const db = new sqlite3.Database('data.db');
db.exec('CREATE TABLE IF NOT EXISTS TRUCKS(TRUCK_ID INTEGER PRIMARY KEY,USER_NAME TEXT NOT NULL UNIQUE,TRUCK_NAME TEXT NOT NULL UNIQUE,RATING INTEGER NOT NULL,FOOD_TYPE TEXT NOT NULL UNIQUE, REVIEW TEXT NOT NULL UNIQUE )');
//db.exec('INSERT INTO TRUCKS (TRUCK_ID,USER_NAME,TRUCK_NAME,RATING,FOOD_TYPE,REVIEW) VALUES (1,"TEST","TEST",5,"TEST","GOOD")');

//db.exec('CREATE TABLE TRUCKS(TRUCK_ID INTEGER PRIMARY KEY,USER_NAME TEXT NOT NULL UNIQUE,TRUCK_NAME TEXT NOT NULL UNIQUE,RATING INTEGER NOT NULL,FOOD_TYPE TEXT NOT NULL UNIQUE, REVIEW TEXT NOT NULL UNIQUE )');
//db.exec('INSERT INTO TRUCKS (USER_NAME,TRUCK_NAME,RATING,FOOD_TYPE,REVIEW) VALUES ("FT2","FT2",5,"Mexican","GOOD3")');
let sql = 'SELECT * FROM TRUCKS';
// db.all(sql,  (err, row) => {
//     if (err) {
//         return console.error(err.message)
//     }
//     return console.log(row)
// });

let r1 = {user: "Medha", rate: 3, review: `She looked at her student wondering if she could ever get through. "You need to learn to think for yourself," she wanted to tell him. "Your friends are holding you back and bringing you down." But she didn't because she knew his friends were all that he had and even if that meant a life of misery, he would never give them up.`};
let r2 = {user: "Irving", rate: 4, review: `She was infatuated with color. She didn't have a favorite color per se, but she did have a fondness for teals and sea greens. You could see it in the clothes she wore that color was an important part of her overall style. She took great pride that color flowed from her and that color was always all around her. That is why, she explained to her date sitting across the table, that she could never have a serious relationship with him due to the fact that he was colorblind.`};
let r3 = {user: "Trey", rate: 5, review: `Puppies are soft, cute, funny, and make a big mess. Every month or two our family fosters 6-12 week old puppies for a puppy rescue nonprofit organization. We all enjoy cuddling their furry bodies after a clean bath. Fresh puppy smell is great. The puppies play with each other and our adult dog. They look so funny when they lay on top of each other and sleep. While puppies can be great fun, they also can make big messes. 4-6 puppies can make a lot of puppy pee and poop. It's a challenge to keep the puppies and the puppy pen clean.`};
let r4 = {user: "Hetong", rate: 2, review: `The light was out on the front porch of the house. This was strange. Judy couldn't remember a time when she had ever seen it out. She hopped out of her car and walked to the door. It was slightly ajar and she knew this meant something terrible. She gently pushed the door open and hall her fears were realized. "Surprise! Happy Birthday!" everyone shouted.`};

// Each review must be in an array
const reviews_t = {r1, r2, r3, r4};
let str_data = JSON.stringify(reviews_t);

console.log(str_data);
