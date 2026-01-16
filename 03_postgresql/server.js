import express from "express";
import { db } from "./db.js";
import { cars } from "./schema.js";
import { eq } from "drizzle-orm";

const app = express();
const PORT = 3000;

const router = express.Router();
app.use(express.json());

app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`New ${req.method} request made to ${req.url} at`, timestamp);
  next();
});

// Get all cars
router.get("/", async (req, res) => {
  const allCars = await db.select().from(cars);

  res.status(200).json(allCars);
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

// Patch request
router.patch("/:id", async (req, res) => {
  const { params, body } = req;
  const parseId = parseInt(params.id);

  //   const carIndex = cars.findIndex((car) => car.id === parseId);

  //   if (!carIndex === -1) {
  //     return res.status(404).send("No car found!");
  //   }

  const car = await db
    .update(cars)
    .set({ ...body })
    .where(eq(cars.id, parseId))
    .returning();

  res.status(200).json(car);
});

// Delete handler
router.delete("/:id", async (req, res) => {
  const parseId = parseInt(req.params.id);

  const [car] = await db.delete(cars).where(eq(cars.id, parseId)).returning();

  res.status(200).json(car);
});

// Get by id
router.get("/:id", async (req, res) => {
  const parseId = parseInt(req.params.id);

  const [car] = await db.select().from(cars).where(eq(cars.id, parseId));

  if (!car) {
    return res.status(404).json({ error: "No car found!" });
  }

  res.status(200).json(car);
});

app.use("/api/v1/cars", router);

app.listen(PORT, () =>
  console.log(`App is listening on http://localhost:${PORT}`)
);
