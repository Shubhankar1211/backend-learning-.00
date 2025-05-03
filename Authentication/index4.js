// create a middleware called auth that verifies if a user is logged in and ends the request early if the user isn't logged in
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
const JWT_SECRET = "shubhankar";

const users = [];

function logger(req, res, next) {
  console.log(req.method + " request came");
  next();
}

app.post('/signup', logger, function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  users.push({
    username: username,
    password: password
  });

  res.json({
    msg: "you are signed in"
  });

  console.log(users);
});

app.post('/signin', logger, function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  let foundUser = null;

  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username && users[i].password === password) {
      foundUser = users[i];
    }
  }

  if (!foundUser) {
    res.json({
      messsage: "credentials incorrect"
    });
    return;
  } else {
    const token = jwt.sign({
      username: foundUser.username
    }, JWT_SECRET);

    res.header("jwt", token);
    res.header("random", "shubhankar");

    res.json({
      token: token
    });
  }
});

function auth(req, res, next) {
  const token = req.headers.token;

  try {
    const decodedData = jwt.verify(token, JWT_SECRET);
    if (decodedData.username) {
      req.username = decodedData.username;
      next();
    } else {
      res.status(403).json({ msg: "Unauthorized access" });
    }
  } catch (e) {
    res.status(403).json({ msg: "Invalid or expired token" });
  }
}

app.get('/me', logger, auth, function (req, res) {
  let foundUser = null;

  for (let i = 0; i < users.length; i++) {
    if (users[i].username === req.username) {
      foundUser = users[i];
    }
  }

  if (!foundUser) {
    return res.status(404).json({ msg: "User not found" });  // ✅ added safe check
  }

  res.json({
    username: foundUser.username,
    password: foundUser.password
  });
});

app.listen(3002)
