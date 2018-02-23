var express = require('express');
var router = express.Router();

const { Client } = require('pg');
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});

client.connect();

// The following is an example of a query on the database
// client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('splash');
});

router.post('/login', function(req, res, next) {

  // Check user credentials against stored information

  // Redirect to account page if successful

  // This wont actually need to render anything in the future
  // This is really just to make sure it worked.
  res.render('login');
});

router.post('/register', function(req, res, next) {

  // Ensure user isnt already registered
  // Insert user information into table

  // Redirect to splash page to login, or give error on splash if unsuccessful

  // These wont actually need to render anything in the future
  // This is really just to make sure it worked.
  res.render('register');
});

router.get('/dashboard', function(req, res, next) {
  res.render('dashboard');
});

module.exports = router;
