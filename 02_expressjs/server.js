import express from "express";

const app = express();
const PORT = 3000;

const router = express.Router();

router.get("/", (req, res) => {
  res.send("All cars endpoint");
});

router.post("/", (req, res) => {
  res.send("New car created");
});

router.put("/:id", (req, res) => {
  res.send("Update specific car by id");
});

router.delete("/:id", (req, res) => {
  res.send("Delete car");
});

router.get("/:id", (req, res) => {
  res.send("Get one car by id");
});

app.use("/api/v1/cars", router);

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
