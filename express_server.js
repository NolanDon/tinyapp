const express = require("express");
const app = express();
const PORT = 8085; // default port 8081
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true})); 
app.set("view engine", "ejs");

// LONG/SHORT URL DATABASE 
const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

// USER DATABASE
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
  
  let templateVars = { 
    urls: urlDatabase,
    //username: user.email
    username: req.cookies['user_id']
  };
  res.render("urls_index", templateVars);

});
app.get("/urls/new", (req, res) => {
   let templateVars = { 
     username: req.cookies['user_id']
   }
  res.render("urls_new", templateVars);
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
app.post("/urls", (req, res) => {
    let long = req.body.longURL;  // Log the POST request body to the console
    const rand = generateRandomString();
    urlDatabase[rand] = 'http://' + long;
    res.redirect('urls/' + rand);         // Respond with 'Ok' (we will replace this)
 });
app.get("/u/:shortURL", (req, res) => {
    const longURL = urlDatabase[req.params.shortURL];
    res.redirect(longURL);
    // res.redirect('/url');
  });

app.post("/urls/:shortURL/delete", (req, res) => {
  delete urlDatabase[req.params.shortURL];
  console.log('its type is: ' + typeof req.params.shortURL + ' and its property name is: ' + req.params.shortURL)
  res.redirect("/urls")
}); 

app.post("/urls/:shortURL/edit", (req, res) => {
  console.log('user attempting to edit a link...', req.body.name_field)
 urlDatabase[req.params.shortURL] = req.body.name_field;
 res.redirect("/urls")
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
  const id = generateRandomString();
  Users[id] = {}
  Users[id]['id'] = id,
  Users[id]['email'] = req.body.email,
  Users[id]['password'] = req.body.password;
  res.cookie('user_id', id);
  res.redirect('/urls') 
});

app.get("/register", (req, res) => {
 console.log(Users)
  res.render("register_show", { username: undefined });
});

app.get("/login", (req, res) => {
  res.render("urls_login", { username: undefined });
})

app.post("/login", (req, res) => {
  
  const enteredUsername = req.body.username
  const enteredPass = req.body.password
  
  for (const user in Users) {
  // console.log(typeof Users[user].id)
    userID = Users[user].id;
  console.log(userID);
    if (enteredUsername === Users[user].email && enteredPass === Users[user].password) {
    
      res.cookie('user_id', userID);
    res.redirect('/urls')
      console.log('User has successfully logged in')
    }
  }res.redirect('/login')
});



const generateRandomString = function() {
  let random = Math.random().toString(36).substring(7);
 return random;
  };
   
 
