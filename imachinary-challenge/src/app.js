const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const router = require("./routes/index.js");

require("./database.js");

const server = express();

server.name = "API";

server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));


server.use("/", router);

server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});

module.exports = server;
