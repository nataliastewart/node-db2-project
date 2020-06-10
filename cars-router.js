const express = require("express");

const db = require("./data/migrations/connection"); //<<<<<<<< connection

const router = express.Router();

//-------endpoints start here--------/

//-----------GET cars---------
router.get("/", (req, res) => {
  db("cars")
    .then((cars) => {
      res.json(cars);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to retrieve cars" });
    });
});

//----------GET car BY ID-----//
router.get("/:id", (req, res) => {
  const { id } = req.params;

  db("cars")
    .where({ id })
    .first()
    .then((car) => {
      res.json(car);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to retrieve car" });
    });
});

//---------POST / INSERT car---/
router.post("/", (req, res) => {
  const newCar = req.body;
  db("cars")
    .insert(newCar)
    .then((car) => {
      res.status(201).json(car);
    })
    .catch((error) => {
      console.log("POST/INSERT/ error:", error);
      res.status(500).json({ message: error.message });
    });
});

//------PUT/UPDATE car -----//
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db("cars")
    .where({ id })
    .update(changes)
    .then((count) => {
      if (count >= 0) {
        res.status(200).json({ message: "car updated successfully" });
      } else {
        res.status(404).json({ message: "no car updated or found" });
      }
    })
    .catch((error) => {
      console.log("PUT / error", error);
    });
});

//----------DELETE car by ID----//
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db("cars")
    .where({ id }) // if not using a where, all records will be removed
    .del() // <----- don't forget this part
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "car deleted successfully" });
      } else {
        res.status(404).json({ message: "no cars found" });
      }
    })
    .catch((error) => {
      console.log("DELETE / error", error);
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;
