const { assert } = require('chai');

const { getUserByEmail } = require('../helpers.js');
const { urlsForUser } = require('../helpers.js');

const urlDatabase = {
  b6UTxQ: { longURL: "https://www.tsn.ca", userID: "aJ48lW" },
  i3BoGr: { longURL: "https://www.google.ca", userID: "user2RandomID" },
  sdfgf: { longURL: "https://www.google.ca", userID: "user2RandomID" }
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

describe('getUserByEmail', function() {
  it('should return a user with valid email', function() {
    const user = getUserByEmail("user@example.com", Users);
    const expectedOutput = "userRandomID";
    assert.equal(expectedOutput, user.id);
  });
});

describe('getUrlByUser', function() {

  it('should return the object attached to that id ', function() {
  
    const user = urlsForUser("user2RandomID", urlDatabase);
    const firstShortURLForUser = Object.keys(user)[0];
    const expectedOutput = {
      i3BoGr: { longURL: "https://www.google.ca", userID: "user2RandomID" },
      sdfgf: { longURL: "https://www.google.ca", userID: "user2RandomID" }
    };
    assert.deepEqual(expectedOutput, user);
  });
});