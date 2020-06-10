const express = require("express");

// const knex = require("knex");

const db = require("./data/migrations/connection"); //<<<<<<<< connection

const router = express.Router();

//-------endpoints start here--------/

router.get("/", (req, res) => {
  db("cars")
    .then((cars) => {
      res.json(cars);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to retrieve cars" });
    });
});

module.exports = router;
