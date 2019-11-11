const express = require("express");
const app = express();
const PORT = 8082;
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const { getUserByEmail, generateRandomString, urlsForUser } = require('./helpers.js');

const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ["bloop"]}));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

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

};
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

app.post("/urls/new", (req, res) => {
  const longURL = req.body.longURL;
  const shortURL = generateRandomString();
  
  urlDatabase[shortURL] = {};
  urlDatabase[shortURL]['longURL'] = longURL;
  urlDatabase[shortURL]['userID'] = req.session.user_id;
  res.redirect('/urls');
});

app.get("/urls/:shortURL", (req, res) => {
  const user = Users[req.session.user_id];
  let shortURL = req.params.shortURL
  console.log(user)

  if (user === undefined || urlDatabase[shortURL].userID !== user.id) {
    res.status(403).send('You do not have permission');
  }
  
  longURL = urlDatabase[shortURL].longURL;

  let templateVars = {
    shortURL: shortURL,
    longURL: longURL,
    username: user && user.email
    
  };
  res.render("urls_show",templateVars);
});

app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL].longURL;
  res.redirect(longURL);
});

app.post("/urls/:shortURL/delete", (req, res) => {
  const user = Users[req.session.user_id];
  let shortURL = req.params.shortURL
  if (user === undefined || urlDatabase[shortURL].userID !== user.id) {
    res.status(403).send('You do not have permission');
  }
  delete urlDatabase[req.params.shortURL];
  res.redirect("/urls");
});

app.post("/urls/:shortURL/edit", (req, res) => {
  const user = Users[req.session.user_id];
  let shortURL = req.params.shortURL
 
  if (urlDatabase[shortURL].userID !== user.id) {
    res.status(403).send('You do not have permission');
  }
    urlDatabase[req.params.shortURL].longURL = req.body.shortURL;
  res.redirect("/urls");
});

app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect('/urls');
});

app.post("/register", (req,res) => {
  
  if (!req.body.email || !req.body.password) {
    res.status(400).send('Password field cannot be left empty, please enter a password.');
  
  } 
  let getEmail;
  for (let email in Users) {
    users = Users[email];
    getEmail = users['email'];
  }
  if (req.body.email === getEmail) {
    res.status(400).send('That username already exists in our system, please try another.');
  
  } 
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  const id = generateRandomString();
  Users[id] = {};
  Users[id]['id'] = id,
  Users[id]['email'] = req.body.email,
  Users[id]['password'] = hashedPassword;
  
  req.session.user_id = id;
  res.redirect('/urls');
  
});

app.get("/register", (req, res) => {
  res.render("register_show", { username: undefined });
});

app.get("/login", (req, res) => {
  res.render("urls_login", { username: undefined });
});

app.post("/login", (req, res) => {
  
  let email = req.body.username;
  let enteredPass = req.body.password;
  
  let user = getUserByEmail(email, Users);
  if (user) {
    if (bcrypt.compareSync(enteredPass, user.password)) {
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

app.listen(PORT, () => {
});
module.exports = { Users };




   
 
