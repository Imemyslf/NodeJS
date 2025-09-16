const sum = (a, b) => {
  if (a && b) {
    return a + b;
  }
  throw new Error("Invalid argumnets");
};

try {
  console.log("sum(a , b ):", sum(1));
} catch (err) {
  console.log(err);
}
