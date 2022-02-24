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
app.use(express_1.default.json());
app.use(express_1.default.static("public"));
app.get('/', (req, res) => {
    // res.send('Hello World!');
    //res.send();
    //res.sendFile('public/index.html', {root:  "../rateMyCourse/src"});
    //res.sendFile('index.html');
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