const express = require("express");
const app = express();
const PORT = 8085; // default port 8081
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser');
app.use(cookieParser());
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
}
app.get("/urls", (req, res) => {
  const user = Users[req.cookies['user_id']];
 if (!user) {
    res.redirect('/login')
    return;
  }
  let userA = req.cookies['user_id']
  let userURL = urlsForUser(userA)
  
  let templateVars = { 
    urls: userURL,
    username: user
  };
  console.log(templateVars, "bogus")
  res.render("urls_index", templateVars);
});
app.get("/urls/new", (req, res) => {
  const user = Users[req.cookies['user_id']];
 
  if (req.cookies['user_id'] === undefined) {
    res.redirect('/login')
  } else {
     let templateVars = { 
     username: user && user.email,
    }
    res.render("urls_new", templateVars);

}});
app.post("/urls/new", (req, res) => {
  const user = Users[req.cookies['user_id']];
  const longURL = req.body.longURL
  const shortURL = generateRandomString();  
  urlDatabase[shortURL] = {};
  urlDatabase[shortURL]['longURL'] = longURL
  urlDatabase[shortURL]['userID'] = req.cookies['user_id']
  console.log(urlDatabase);
  
  let templateVars = { 
    username: user && user.email
   }
  
  res.redirect('/urls', );         
});
app.get("/urls/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL]
  let templateVars = { 
    shortURL: req.params.shortURL,
    longURL: longURL,
    username: req.cookies['user_id']
    
  };
  res.render("urls_show", templateVars);
});
app.get("/urls.json", (req, res) => {
    res.json(urlDatabase);
  json.stringify("/urls")
});
app.get("/", (req, res) => {
    res.send("Hello!");
});
app.get("/hello", (req, res) => {
    res.send("<html><body>Hello <b>World</b></body></html>\n");
});
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});
app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
});
app.post("/urls/:shortURL/delete", (req, res) => {
  if (user) {
  delete urlDatabase[req.params.shortURL];
  console.log('its type is: ' + typeof req.params.shortURL + ' and its property name is: ' + req.params.shortURL)
  res.redirect("/urls")
  }
}); 
app.post("/urls/:shortURL/edit", (req, res) => {
  let user = req.cookies['user_id']
  let templateVars = { 
    username: user && user.email,
  }
  if (!user){
    res.status(404).send('You\'re not logged in so, edits cannot be made.')
  }
  
  for (const user in Users) {
    if (req.cookie['user_id'] !== user) {
      res.status(404).send('You\'re not logged in so, edits cannot be made.')
   } else {
   if(user) {
  urlDatabase[req.params.shortURL] = req.body.shortURL;
  const user = Users[req.cookies['user_id']];
   }
}};
res.redirect("/urls", templateVars)
});
app.post("/logout", (req, res) => {
  res.clearCookie('user_id');
  res.redirect('/urls')
})
app.post("/register", (req,res) => {
  
 
  
  if (req.body.email === "" || req.body.password === "") {
    res.status(404).send('PASSWORD OR EMAIL WAS EMPTY 👺')
  }
  let copy = "";
  for (let email in Users) {
    users = Users[email];
    copy = users['email'];
  }
  if (req.body.email === copy) {
    res.send('DUPLICATE USERNAME 👺')
  }
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  
  console.log(req.body);
  const id = generateRandomString();
  Users[id] = {}
  Users[id]['id'] = id,
  Users[id]['email'] = req.body.email,
  Users[id]['password'] = hashedPassword;
  
  res.cookie('user_id', id);
  res.redirect('/urls') 
});
app.get("/register", (req, res) => {

  res.render("register_show", { username: undefined });
});
app.get("/login", (req, res) => {
  res.render("urls_login", { username: undefined });
})
app.post("/login", (req, res) => {
 
  const enteredUsername = req.body.username
  const enteredPass = req.body.password
  for (const user in Users) {
  
    userID = Users[user].id;
  if (enteredUsername === Users[user].email) {
  if (bcrypt.compareSync(enteredPass, Users[user].password)) {
  res.cookie('user_id', userID);
  res.redirect('/urls')
  console.log('User has successfully logged in')
}
}
  }
res.redirect('/login')
});
function urlsForUser(id) {
 let DataB = {}; 
  for (let key in urlDatabase) {
    let record = urlDatabase[key] // object longurl and userid
    
    if (id === record.userID){  
      DataB[key] = record;
    }
  }
return DataB;
};


const generateRandomString = function() {
  let random = Math.random().toString(36).substring(7);
 return random;
};
   
 
