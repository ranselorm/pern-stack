import express from "express";
import { db } from "./db.js";
import { cars } from "./schema.js";

const app = express();
const PORT = 3000;

const router = express.Router();
app.use(express.json());

app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`New ${req.method} request made to ${req.url} at`, timestamp);
  next();
});

router.get("/", (req, res) => {
  res.json(cars);
});

// Post request
router.post("/", async (req, res) => {
  const { make, model, year, price } = req.body;

  if (!make || !model || !year || !price) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const [car] = await db
    .insert(cars)
    .values({ make, model, price, year })
    .returning();

  res.status(201).json(car);
});

router.patch("/:id", (req, res) => {
  const { params, body } = req;
  const parseId = parseInt(params.id);

  const carIndex = cars.findIndex((car) => car.id === parseId);

  console.log(carIndex);

  if (!carIndex === -1) {
    return res.status(404).send("No car found!");
  }

  cars[carIndex] = { ...cars[carIndex], ...req.body };
  res.json(cars[carIndex]);

  //   res.send("Update specific car by id");

  //   console.log(car);
});

router.delete("/:id", (req, res) => {
  res.send("Delete car");
});

router.get("/:id", (req, res) => {
  const parseId = parseInt(req.params.id);

  const car = cars.find((car) => car.id === parseId);

  if (!car) {
    return res.status(404).send("No car found!");
  }
  res.json(car);

  //   res.send("Get one car by id");
});

app.use("/api/v1/cars", router);

app.listen(PORT, () =>
  console.log(`App is listening on http://localhost:${PORT}`)
);
