"use strict";

const express = require("express");
const path = require('path')
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const steamRoutes = require("./routes/steamApps");

const app = express();
const buildPath = path.join(__dirname, 'build')

app.use(cors());
app.use(express.static(buildPath))
app.use(express.json());
app.use(authenticateJWT);

app.use("/users", usersRoutes);
app.use("/auth", authRoutes);
app.use("/steamApps", steamRoutes);


/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'))
})


module.exports = app;
