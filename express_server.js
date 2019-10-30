const express = require("express");
const app = express();
const PORT = 8082; // default port 8081
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true})); 
app.set("view engine", "ejs");
  
const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};
app.get("/urls", (req, res) => {
  let templateVars = { urls: urlDatabase,
    username: req.cookies["username"], };
  res.render("urls_index", templateVars);

});
app.get("/urls/new", (req, res) => {
   let templateVars = { 
     username: req.cookies["username"]
   }
  res.render("urls_new", templateVars);
});
app.get("/urls/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL]
  let templateVars = { 
    shortURL: req.params.shortURL,
    longURL: longURL,
    username: req.cookies["username"]
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
  res.redirect("/url")
}); 

app.post("/urls/:shortURL/edit", (req, res) => {
  console.log('user attempting to edit a link...', req.body.name_field)
 urlDatabase[req.params.shortURL] = req.body.name_field;
 res.redirect("/urls")
}); 

app.post("/login", (req, res) => {
  console.log('user attempting')
  const username = req.body.username;
  res.cookie('username', username);
 res.redirect('/urls')
});

app.post("/logout", (req, res) => {
res.clearCookie("username");
res.redirect('/urls')
})
 










const generateRandomString = function() {
  let random = Math.random().toString(36).substring(7);
 return random;
  };
   
 