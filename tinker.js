const rand = function() {
setTimeout(() => {
  console.log(1 + 1)

  return rand(1);
}),200
}
rand();