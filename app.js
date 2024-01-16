const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const routes = require('./routes/routes');
const path = require('path');

const app = express();
const port = 3000;

app.use(session({
  secret: 'kochampieski2',
  resave: false,
  saveUninitialized: true,
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/html/index.html');
})

app.listen(port, () => {
  console.log(`Server is running at http://pascal:${port}`);
});
