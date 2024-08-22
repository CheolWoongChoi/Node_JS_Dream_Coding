const logger = require("./4.19 logger.js");
const emitter = new logger.Logger();

// emitter
emitter.on("log", (event) => {
  console.log(event);
});

emitter.log(() => {
  console.log("... doing something!");
});
