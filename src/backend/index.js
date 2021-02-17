const express = require("express");
const app = express();
app.use(express.json());
const port = 3008;
const fs = require("fs");

app.get("/tasks", (req, res) => {
  const data = fs.readdirSync("./src/backend/tasks", (err, files) => {
    files.forEach((file) => {
      return fs.readFileSync(`./src/backend/tasks/${file}.json`, {
        encoding: "utf8",
        flag: "r",
      });
    });
  });
  console.log(data);
  res.send(data);
});

app.get("/tasks/:id", (req, res) => {
  //picture
  const id = req.params.id;
  const data = fs.readFileSync(`./src/backend/tasks/${id}.json`, {
    encoding: "utf8",
    flag: "r",
  });
  res.send(data);
});

app.post("/tasks", (req, res) => {
  tasks.push(req.body);
  res.send("ok");
});

app.put("/tasks", (req, res) => {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === req.body.id) {
      tasks[i] = req.body;
      res.send(req.body);
    }
  }
});

app.delete("/tasks", (req, res) => {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === req.body.id) {
      tasks.splice(i, 1);
      res.send("removed");
    }
  }
});

app.listen(port, () => console.log(`app listening on port ${port}`));
