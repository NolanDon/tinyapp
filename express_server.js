const express = require("express");
const app = express();
const PORT = 8081; // default port 8081
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true})); 
app.set("view engine", "ejs");
  
const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};
app.get("/urls", (req, res) => {
  let templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
  });
app.get("/urls/new", (req, res) => {
    res.render("urls_new");
});
app.get("/urls/:shortURL", (req, res) => {
    let templateVars = { shortURL: req.params.shortURL, longURL: req.params.longURL };
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
    urlDatabase[rand] = 'http://'+long;
    res.redirect('u/' + rand);         // Respond with 'Ok' (we will replace this)
 });
app.get("/u/:shortURL", (req, res) => {
    console.log(urlDatabase, req.params);
    const longURL = urlDatabase[req.params.shortURL];
    res.redirect(longURL);
});
const generateRandomString = function() {
  let random = Math.random().toString(36).substring(7);
  return random;
};
   
 
