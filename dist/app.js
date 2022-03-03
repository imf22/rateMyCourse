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
app.get('/', (req, res) => { });
app.get('/test', (req, res) => {
    let r1 = { user: "Medha", rate: 3, review: `She looked at her student wondering if she could ever get through. "You need to learn to think for yourself," she wanted to tell him. "Your friends are holding you back and bringing you down." But she didn't because she knew his friends were all that he had and even if that meant a life of misery, he would never give them up.` };
    let r2 = { user: "Irving", rate: 4, review: `She was infatuated with color. She didn't have a favorite color per se, but she did have a fondness for teals and sea greens. You could see it in the clothes she wore that color was an important part of her overall style. She took great pride that color flowed from her and that color was always all around her. That is why, she explained to her date sitting across the table, that she could never have a serious relationship with him due to the fact that he was colorblind.` };
    let r3 = { user: "Trey", rate: 5, review: `Puppies are soft, cute, funny, and make a big mess. Every month or two our family fosters 6-12 week old puppies for a puppy rescue nonprofit organization. We all enjoy cuddling their furry bodies after a clean bath. Fresh puppy smell is great. The puppies play with each other and our adult dog. They look so funny when they lay on top of each other and sleep. While puppies can be great fun, they also can make big messes. 4-6 puppies can make a lot of puppy pee and poop. It's a challenge to keep the puppies and the puppy pen clean.` };
    let r4 = { user: "Hetong", rate: 2, review: `The light was out on the front porch of the house. This was strange. Judy couldn't remember a time when she had ever seen it out. She hopped out of her car and walked to the door. It was slightly ajar and she knew this meant something terrible. She gently pushed the door open and hall her fears were realized. "Surprise! Happy Birthday!" everyone shouted.` };
    // Each review must be in an array
    const reviews_t = [r1, r2, r3, r4];
    // Send request for custom truck page
    res.send(trucktemplate({ truckname: "McDonalds", cuisine: "Fastfood", rating: 2.5, reviews: reviews_t }));
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
//# sourceMappingURL=app.js.map