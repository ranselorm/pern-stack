import express from "express";

const app = express();
const PORT = 3000;

const router = express.Router();
app.use(express.json());

app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`New ${req.method} request made to ${req.url} at`, timestamp);
  next();
});

const cars = [
  { id: 1, make: "Toyota", model: "Camry", year: 2022, price: 28500 },
  { id: 2, make: "Honda", model: "Accord", year: 2023, price: 32000 },
  { id: 3, make: "Ford", model: "Mustang", year: 2021, price: 45000 },
  { id: 4, make: "Chevrolet", model: "Corvette", year: 2023, price: 68000 },
  { id: 5, make: "Tesla", model: "Model 3", year: 2022, price: 52000 },
  { id: 6, make: "BMW", model: "M3", year: 2023, price: 72000 },
  { id: 7, make: "Mercedes-Benz", model: "C-Class", year: 2022, price: 48000 },
  { id: 8, make: "Audi", model: "A4", year: 2023, price: 45500 },
  { id: 9, make: "Nissan", model: "Altima", year: 2021, price: 26000 },
  { id: 10, make: "Volkswagen", model: "Jetta", year: 2022, price: 24000 },
  { id: 11, make: "Subaru", model: "WRX", year: 2023, price: 35000 },
  { id: 12, make: "Mazda", model: "CX-5", year: 2022, price: 32500 },
  { id: 13, make: "Hyundai", model: "Sonata", year: 2023, price: 29000 },
  { id: 14, make: "Kia", model: "Stinger", year: 2022, price: 38000 },
  { id: 15, make: "Lexus", model: "ES 350", year: 2023, price: 46000 },
  { id: 16, make: "Lambo", model: "Veron", year: 2023, price: 46000 },
];

router.get("/", (req, res) => {
  res.json(cars);
});

router.post("/", (req, res) => {
  const { make, model, year, price } = req.body;
  if (!make || !model || !year || !price) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const newCar = {
    id: cars.length + 1,
    make,
    model,
    year,
    price,
  };

  cars.push(newCar);
  console.log(newCar);
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
