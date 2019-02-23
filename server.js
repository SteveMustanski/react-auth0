const express = require("express");
require("dotenv").config();
const jwt = require("express-jwt"); // for validating JWT and set the req.user
const jwksRsa = require("jwks-rsa"); // retriving RSA keys from JSON web key set JWKS endpoint
const checkScope = require("express-jwt-authz"); // for JWT scopes validattion

const checkJwt = jwt({
  // dynamically provide a signing key based on the kid in the header and the signing keys
  // provided by the JWKS endpoint
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5, // prevent malicious calls that try to flood more than 5 per minute
    jwksUri: `https://${
      process.env.REACT_APP_AUTH0_DOMAIN
    }/.well-known/jwks.json`
  }),
  // validate the issuer and the audience
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
  // this property must match the selected algorithm in the Auth0 dashboard under the app's advanced settings under the OAuth tab
  algorithms: ["RS256"]
});

const app = express();

app.get("/public", function(req, res) {
  res.json({
    message: "Hello from a public API"
  });
});

app.get("/private", checkJwt, function(req, res) {
  res.json({
    message: "Hello from a private API"
  });
});

// 3rd param is to check if the user has the read:courses scope
app.get("/courses", checkJwt, checkScope(["read:courses"]), function(req, res) {
  res.json({
    message: "Hello from a private API"
  });
});

app.listen(3001);
console.log(`The API server is listening on ${process.env.REACT_APP_API_URL}`);
