import express from 'express';
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("public"));

app.get('/', (req, res) => {
  // res.send('Hello World!');
  // res.send();
  res.sendFile('main.html', {root:  "../rateMyCourse/src"});
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
