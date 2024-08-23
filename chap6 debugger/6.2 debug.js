function sayHello() {
  console.log("hello 🙏");
  console.log("hello!");
}

function calculate(x, y) {
  console.log("calculating...");
  const result = x + y;
  console.log("result: ", result);

  sayHello();
  return result;
}

calculate(1, 2);
