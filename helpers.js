let Users = require('./express_server.js');
const getUserByEmail = function(email, Users) {
  for (const userID in Users) {
   const user = Users[userID];
    if (user.email === email) {
      return user;
    }
  }
};

function urlsForUser(id, urlDatabase) {
  let dataB = {}; 
   for (let key in urlDatabase) {
     let record = urlDatabase[key] // object longurl and userid
     
     if (id === record.userID){  
       dataB[key] = record;
     }
   }
 return dataB;
 };

 module.exports = { getUserByEmail, urlsForUser };