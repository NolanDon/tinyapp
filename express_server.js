const express = require("express");
const app = express();
const PORT = 8082; // default port 8081
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const { getUserByEmail, generateRandomString, urlsForUser } = require('./helpers.js');

const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ["bloop"]}));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
// ============================ remote databases
const urlDatabase = {
  b6UTxQ: { longURL: "https://www.tsn.ca", userID: "aJ48lW" },
  i3BoGr: { longURL: "https://www.google.ca", userID: "aJ48lW" }
};
const Users = {
  "userRandomID": {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk"
  }
// =========================================
};
// ========================================= get urls
app.get("/urls", (req, res) => {
  const user = Users[req.session.user_id];
  if (!user) {
    res.redirect('/login');
    return;
  }
  let userA = req.session.user_id;
  let userURL = urlsForUser(userA, urlDatabase);
  
  let templateVars = {
    urls: userURL,
    username: user && user.email
  };
  res.render("urls_index", templateVars);
});
// ========================================= get urls new
app.get("/urls/new", (req, res) => {
  const user = Users[req.session.user_id];
  if (req.session.user_id === undefined) {
    res.redirect('/login');
  } else {
    let templateVars = {
      username: user && user.email,
    };
    res.render("urls_new", templateVars);
  }
});
// ========================================= post urls new
app.post("/urls/new", (req, res) => {
  const longURL = req.body.longURL;
  const shortURL = generateRandomString();
  
  urlDatabase[shortURL] = {};
  urlDatabase[shortURL]['longURL'] = 'https://' + longURL;
  urlDatabase[shortURL]['userID'] = req.session.user_id;
  res.redirect('/urls');
});
// ========================================= get urls :id
app.get("/urls/:shortURL", (req, res) => {
  const user = Users[req.session.user_id];
  const longURL = urlDatabase[req.params.shortURL]['longURL'];

  let templateVars = {
    shortURL: req.params.shortURL,
    longURL: longURL,
    username: user && user.email
    
  };
  res.render("urls_show",templateVars);
});
// ========================================= get urls json
app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
  json.stringify("/urls");
});
// ========================================= get :shortURL
app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL].longURL;
  res.redirect(longURL);
});
// ========================================= post delete
app.post("/urls/:shortURL/delete", (req, res) => {
  delete urlDatabase[req.params.shortURL];
  res.redirect("/urls");
});
// ========================================= post edit
app.post("/urls/:shortURL/edit", (req, res) => {
  let user = req.session.user_id;
  if (!user) {
    res.status(400).send('You\'re not logged in, edits cannot be made.');
  }
  if (user) {
    console.log(urlDatabase[req.params.shortURL]);
    urlDatabase[req.params.shortURL].longURL = req.body.shortURL;
  }
  
  res.redirect("/urls");
});
// ========================================= post logout
app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect('/urls');
});
// ========================================= post register
app.post("/register", (req,res) => {
  // if password is left empty semd error
  if (!req.body.email || !req.body.password) {
    res.status(400).send('Password field cannot be left empty, please enter a password.');
  
  } //  loop throughdatabase to find matching username
  let getEmail;
  for (let email in Users) {
    users = Users[email];
    getEmail = users['email'];
  }
  if (req.body.email === getEmail) {
    res.status(400).send('That username already exists in our system, please try another.');
  
  } // if it already exists send error, otherwise add new user to database
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  const id = generateRandomString();
  Users[id] = {};
  Users[id]['id'] = id,
  Users[id]['email'] = req.body.email,
  Users[id]['password'] = hashedPassword;
  
  req.session.user_id = id;
  res.redirect('/urls');
  
});
// ========================================= get register
app.get("/register", (req, res) => {
  res.render("register_show", { username: undefined });
});
// ========================================= get login 
app.get("/login", (req, res) => {
  res.render("urls_login", { username: undefined });
});
// ========================================= post login 
app.post("/login", (req, res) => {
  
  let email = req.body.username;
  let enteredPass = req.body.password;
  
  let user = getUserByEmail(email, Users);
  if (user) {
    if (bcrypt.compareSync(enteredPass, user.password)) {
      console.log("Passwords match");
      req.session.user_id = user.id;
      res.redirect('/urls');
    } else {
      res.status(400).send("Passwords don't match");
      return;
    }
  } else {
    res.status(400).send('no account found');
    return;
  }
});
// ========================================= 
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
module.exports = { Users };




   
 
