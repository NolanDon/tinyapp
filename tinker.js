const rand = function() {
  let random = Math.random().toString(36).substring(7);
  return random;
  };

const randomNumber = rand();

console.log(randomNumber)