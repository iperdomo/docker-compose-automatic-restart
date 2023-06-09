const express = require("express");
const app = express();
const port = 5000;
const validator = require("express-json-validator-middleware");

app.use(express.json());

app.get("/", (req, res) => {
  console.log(`path: ${req.path}`);
  res.send("Hi");
});

app.get("/crash", (req, res) => {
  console.log(`path: ${req.path}`);
  process.exit(1);
});

const farmSchema = {
  type: "object",
  required: ["farmId", "userId"],
  properties: {
    farmId: {
      type: "string",
    },
    userId: {
      type: "string",
    },
  },
};

const { validate } = new validator.Validator();

app.post("/validate", validate({ body: farmSchema }), (req, res) => {
  res.send({ ok: true });
});

app.use((error, request, response, next) => {
  // Check the error is a validation error
  if (error instanceof validator.ValidationError) {
    // Handle the error
    response.status(400).send(error.validationErrors);
    next();
  } else {
    // Pass error on if not a validation error
    next(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
