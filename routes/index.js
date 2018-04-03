var express = require('express');
var pg = require('pg');
var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
const {Client} = require('pg');
var router = express.Router();

//db connection string
var dbString = 'postgres://whiidzewjaaqzm:0001b1a8a6fa014941cfa07feb3bb8f8049f2210a11f1d5f14895ea6fac6f955@ec2-184-73-196-65.compute-1.amazonaws.com:5432/deacrvvlj7rj32';

const client = new Client({
  connectionString: dbString,
  ssl: true,
});

const pool = new pg.Pool(client);
pool.on('error', function (err) {
  console.log('Connection error', err);
});

client.connect();

passport.use(new LocalStrategy({session: true}, function(email, password, cb) {
  client.query("SELECT id, email, password FROM users WHERE email = $1 AND password = $2", [email, password], (err, result) => {
    if(err) {
      console.log('Error when selecting user on login', err)
      return cb(err)
    }

    if(result.rows.length > 0) {
      const first = result.rows[0];
      cb(null, first);
    } else {
      console.log('Logging in was unsuccessful.');
      cb(null, false);
    }
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, cb) => {
  client.query('SELECT id, email FROM users WHERE id = $1', [parseInt(id, 10)], (err, results) => {

    if(err) {
      console.log('Error when selecting user on session deserialize', err);
      return cb(err);
    }

    cb(null, results.rows[0]);
  })
});

/*------------------Useful queries------------------*/

//DATABASE FILL CODE

//Drop data from users and userstocks

//Drop table users
client.query("DROP TABLE users;", (err,res) => {
   console.log("users dropped.");
});



//Drop table userstock
client.query("DROP TABLE userstocks;", (err,res) => {
   console.log("userstocks dropped.");
});

//Drop table usersettings
client.query("DROP TABLE usersettings;", (err,res) => { 
   console.log("usersettings dropped.");
});

//Make table users
client.query("CREATE TABLE users (id bigserial, fname varchar, lname varchar, email varchar UNIQUE, password varchar, AVkey varchar, PRIMARY KEY(id, email));", (err,res) => {
    console.log("users created");
});


//Make table userstocks
client.query("CREATE TABLE userstocks (id SERIAL, email varchar, stockticker varchar, numstocks int, algorithm varchar, params varchar, enabled bit, PRIMARY KEY(id), FOREIGN KEY(email) REFERENCES users(email));", (err,res) => {
console.log("userstocks created");
});

//Make table usersettings
//add to this as settings are developed
client.query("CREATE TABLE usersettings (id int, settingblob varchar, PRIMARY KEY(id), FOREIGN KEY(email) REFERENCES users(email));", (err,res) => {
console.log("usersettings created");
});

//Insert into users
client.query("INSERT INTO users (fname, lname, email, password, AVkey) VALUES ('Adam','Bagsby','bob2@gmail.com','apple123', 'CJWPUA7R3VDJNLV0'), ('John','Cena','JC1209@mail.com','pass1', 'CJWPUA7R3VDJNLV0'), ('Helen','Keller','nicetry@gmail.com','password', 'CJWPUA7R3VDJNLV0'), ('Serena','Williams','tennisyo@mail.com','tennis1', 'CJWPUA7R3VDJNLV0'), ('Thomas','Thetrain','choochewchewer@mail.com','sirtophatsux', 'CJWPUA7R3VDJNLV0'), ('Arnold','Schwartz','governor@california.gov','illbeme', 'CJWPUA7R3VDJNLV0'), ('Pete','Karl','whodisguy@mail.com','123badpass', 'CJWPUA7R3VDJNLV0'), ('Larry','David','bannana@gmail.com','curbyourpass', 'CJWPUA7R3VDJNLV0'), ('Pablo','Picasso','painted@mail.com','picksout', 'CJWPUA7R3VDJNLV0'), ('Freddie','Mercury','notanelement@mail.com','fredhelium', 'CJWPUA7R3VDJNLV0'), ('Ron','Paul','forpresident@gmail.com','ididntgetit', 'CJWPUA7R3VDJNLV0'), ('Danielle','Steel','mill@mail.com','steelmill', 'CJWPUA7R3VDJNLV0'), ('George','Washington','penn@gmail.com','weorgegash', 'CJWPUA7R3VDJNLV0'), ('Abraham','Lincoln','penny@gmail.com','worthless', 'CJWPUA7R3VDJNLV0'), ('Alexander','Thegreat','brutus@gmail.com','sendyocomplaints', 'CJWPUA7R3VDJNLV0'), ('Tim','Gaffigan','funny@mail.com','whodis', 'CJWPUA7R3VDJNLV0'), ('Jesse','Jackson','missing@gmail.com','stolen', 'CJWPUA7R3VDJNLV0'), ('Galileo','Galilei','lookup@mail.com','nosepas', 'CJWPUA7R3VDJNLV0'), ('Natalie','Portman','tasty@mail.com','plant', 'CJWPUA7R3VDJNLV0'), ('Frank','Sinatra','ok@mail.com','sing', 'CJWPUA7R3VDJNLV0'), ('Stephenie','Meyer','non@yahoo.com','write', 'CJWPUA7R3VDJNLV0')", (err,res) => {
   console.log("Block of users added to database.");
});

client.query("INSERT INTO users (fname, lname, email, password, AVkey) VALUES ('Adam','Bagsby','bob@gmail.com','apple123', 'CJWPUA7R3VDJNLV0')", (err,res) => {
   console.log("user added to database.");
});


//Insert into userstocks
client.query("INSERT INTO userstocks (email, stockticker, numstocks, algorithm, params, enabled) VALUES ('jwbhvb@mst.edu','AMD','40','Beta','highrisk','1'), ('JC1209@mail.com','WBT','40','Beta','highrisk','1'), ('nicetry@gmail.com','BEN','40','Beta','lowrisk','1'), ('tennisyo@mail.com','OBLN','40','Beta','lowrisk','1'), ('choochewchewer@mail.com','COWNZ','40','Beta','highrisk','1'), ('non@yahoo.com','DMLP','40','Beta','highrisk','1'), ('ok@mail.com','AFST','40','Beta','highrisk','1'), ('tasty@mail.com','RRD','40','Beta','lowrisk','1'), ('lookup@mail.com','MTFB','40','Beta','highrisk','1'), ('missing@gmail.com','EPAM','40','Beta','highrisk','1'), ('funny@mail.com','VIA','40','Beta','highrisk','1'), ('brutus@gmail.com','AMD','40','Beta','highrisk','1'), ('penny@gmail.com','WBT','40','Beta','highrisk','1'), ('penn@gmail.com','BEN','40','Beta','lowrisk','1'), ('mill@mail.com','OBLN','40','Beta','highrisk','1'), ('forpresident@gmail.com','COWNZ','40','Beta','highrisk','1'), ('forpresident@gmail.com','DMLP','40','Beta','highrisk','1'), ('bannana@gmail.com','AFST','40','Beta','highrisk','1'), ('choochewchewer@mail.com','RRD','40','Beta','highrisk','1'), ('choochewchewer@mail.com','MTFB','40','Beta','highrisk','1'), ('choochewchewer@mail.com','EPAM','40','Beta','highrisk','1'), ('choochewchewer@mail.com','VIA','40','Beta','highrisk','1')", (err,res) => {
   console.log("Block of userstocks added to database.");
});

// Alter users table to have id column
// client.query("ALTER TABLE users DROP PRIMARY KEY", (err, res) => {
//   console.log("drop pk");
// });
//
// client.query("ALTER TABLE users ADD id bigserial", (err, res) => {
//   console.log("added id");
// });
//
// client.query("ALTER TABLE users ADD PRIMARY KEY(id, email)", (err, res) => {
//   console.log("added pk");
// });

//Print # of users and all rows in users
client.query("SELECT * FROM users", (err,res) => {
  console.log("Number of users: "+res.rowCount);
  console.log(res.rows);
});

//Print # of userstocks and all rows in userstocks
/*
client.query("SELECT * FROM userstocks", (err,res) => {
  console.log("Number of userstocks: "+res.rowCount);
  console.log(res.rows);
});
*/

/*------------------End of queries------------------*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('splash');
});


//---------------------------------------------------------JSON SENDING EXAMPLES---------------------------------------------------------

router.get('/dash-get', function(req, res, next) {
  //Example of how this ojbect should be constructed for the simeple dashboard graph. More info about that on the google Doc.
  var myObj = {
    worth: 10000.00,//current portfolio worth
    price: [9000, 9200, 9460.43, 9750, 10000],//array of the portfolio worth day by day, first enrty is earliest data. Maybe keep size fix so the x-axis isnt hard to read.
    dates: ["2-21-2018", "2-22-2018", "2-23-2018", "2-24-2018", "2-25-2018"]//Value of dates corresponding to the dollar amounts.
  }
  res.json(JSON.stringify(myObj));
});

router.get('/tick-get', function(req, res, next) {
  //Example of how this ojject should be constructed to generate tickers on the dashboard
  var myObj = {
    api: 'QSZQSTA7ZLPXTAZO',//AlphaVantage API key that the user table has
    symbols: ['GOOG', 'TSLA', 'AAPL', 'BA', 'AMD', 'BAC']//An array of some of the most common stocks.
  }
  res.json(JSON.stringify(myObj));
});

//---------------------------------------------------------END EXAMPLES---------------------------------------------------------

//
// router.post('/login', function(req, res, next) {
//
//
//   var username = (req['body']['username']);
//   var password = (req['body']['password']);
//
//   client.query("SELECT email,password FROM users WHERE email='"+username+"' AND password='"+password+"';", (err,res2) => {
//     if(err) throw err;
//
//     if(res2.rows.length>0)
//     {
//       console.log("Logged in");
//       res.render('dashboard'); //pass the user in optional parameters
//     }
//     else
//     {
//       console.log("Wrong email/password");
//       res.render('splash'); //redirect back to splash
//     }
//   });
// });

router.post('/login', passport.authenticate('local', {successRedirect: '/dashboard', failureRedirect: '/'}));

router.post('/register', function(req, res, next) {

  var fName = req['body']['first'];
  var lName = req['body']['last'];
  var email = req['body']['email'];
  var pass1 = req['body']['password'][0];
  var pass2 = req['body']['password'][1];

  if(pass1!=pass2)
  {
    console.log("Passwords don't match");
  }
  else
  {
    client.query("INSERT INTO users (fname, lname, email, password, AVkey) VALUES ('"+fName+"','"+lName+"','"+email+"','"+pass1+"','CJWPUA7R3VDJNLV0');", (err,res2) => {
    if(err)
    {
      throw err;
      console.log("in here");
    }
    else
    {
      console.log('dashboard'); //pass the user in optional parameters
    }
    client.end();
    });
  }
  res.render('register');
});

router.get('/dashboard', function(req, res, next) {
  if (!req.isAuthenticated() || !req.isAuthenticated) {
    console.log("Auth Failed.");
    res.redirect('/');
  } else {
    console.log(req.user);
    res.render('dashboard');
  }
});

router.get('/investments', function(req, res, next) {
  res.render('investments');
});

router.get('/aboutalgorithms', function(req, res, next) {
  res.render('aboutalgorithms');
});

router.get('/accountsettings', function(req, res, next) {
  res.render('accountsettings');
});

router.get('/dataanalytics', function(req, res, next) {
  res.render('dataanalytics');
});


router.get('/logout', function(req, res) {
  console.log(req.user);
  req.logout();
  console.log(req.user);
  res.redirect('/');
})


module.exports = router;
