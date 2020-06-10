const express = require("express");

const carsRouter = require("../cars-router");

const server = express();

server.use(express.json()); ///<<<< need to be on top - don't forget

server.use("/api/cars", carsRouter);

module.exports = server;
