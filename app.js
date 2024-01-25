const express = require('express');
const path = require('path');

const expressLayouts = require('express-ejs-layouts');
const router = require('./router/index');
const app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// expressLayouts
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

app.get('/me', (req, res) => {
  res.send('Dashboard Wa Bomberss , created by ikaa ❤️');
})
app.use('/', router.router)
app.listen(3000, () => {
  console.log('Server is running on port 3000');
})
