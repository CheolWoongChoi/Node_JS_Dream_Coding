const bcrypt = require("bcrypt");

const password = "abcd1234";
const hashed = bcrypt.hashSync(password, 10);

console.log(`password: ${password}, hashed: ${hashed}`);
