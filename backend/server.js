const express = require("express");
const cors = require("cors");
const app = express();
const { auth } = require("express-oauth2-jwt-bearer");

const port = process.env.PORT || 8080;

app.use(cors());

const jwtCheck = auth({
  audience: "https://local-api.example.com",
  issuerBaseURL: "https://dev-plqd6y6uy76yrwat.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

// enforce on all endpoints
app.use(jwtCheck);

app.get("/authorized", function (req, res) {
  res.send("Secured Resource");
});

app.get("/api/messages/protected", (req, res) => {
  res.json({ message: "Protected data from backend" });
});

app.listen(port);

console.log("Running on port ", port);
