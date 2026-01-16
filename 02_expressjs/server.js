import express from "express";

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello from Cars API");
});

app.get("/api/v1/cars", (req, res) => {
  res.send("All cars endpoint");
});

app.post("/api/v1/cars", (req, res) => {
  res.send("New car created");
});

app.put("/api/v1/cars/:id", (req, res) => {
  res.send("Update specific car by id");
});

app.delete("/api/v1/cars/:id", (req, res) => {
  res.send("Delete car");
});

app.get("/api/v1/cars/:id", (req, res) => {
  res.send("Get one car by id");
});

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
