import express from "express";
import cluster from "node:cluster";
import { availableParallelism } from "node:os";
import os from "os";

const cpus = availableParallelism();

if (cluster.isPrimary) {
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
} else {
  const app = express();
  const port = 9002;

  app.get("/", (req, res) => {
    res.send(`Hii I am working at cluster : ${process.pid}`);
  });

  app.listen(port, (req, res) => {
    console.log("Server running at port :", port);
  });
}
