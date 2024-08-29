const jwt = require("jsonwebtoken");
const secret = 'q9!r#I79KYCXs`EW=-PC`YZe|9GU_"KF';

const token = jwt.sign(
  {
    id: "Cheols",
    message: "weather is good",
  },
  secret
);

const edited =
  "https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkNoZW9scyIsIm1lc3NhZ2UiOiJ3ZWF0aGVyIGlzIGdvb2QifQ.YmMW4N2sEjPnF680L6uU07sVR0rmczFcde6aOHuKDT4";

// console.log(token );

jwt.verify(edited, secret, (error, decoded) => {
  console.log(error, decoded);
});
