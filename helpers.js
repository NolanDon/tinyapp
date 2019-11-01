let Users = require('./express_server.js');
const getUserByEmail = function(email, Users) {
  for (const userID in Users) {
    const user = Users[userID];
    if (user.email === email) {
      return user;
    }
  }
};

const urlsForUser = function(id, urlDatabase) {
  let dataB = {};
  for (let key in urlDatabase) {
    let record = urlDatabase[key]; // object longurl and userid
     
    if (id === record.userID) {
      dataB[key] = record;
    }
  }
  return dataB;
};

 
const generateRandomString = function() {
  let random = Math.random().toString(36).substring(7);
  return random;
};
 
 
module.exports = { getUserByEmail, urlsForUser, generateRandomString };