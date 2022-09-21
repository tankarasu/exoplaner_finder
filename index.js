// Core module requirements:
import fs from "node:fs";
import path from "node:path";

// Third-party requirtements:
import { parse } from "csv-parse";

// Initializing
const habitablePlanets = [];
const filePath = path
  .format({
    dir: path.dirname("./"),
    base: "kepler_data.csv",
  })
  .normalize();

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

fs.createReadStream(filePath)
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", data => {
    if (isHabitablePlanet(data)) {
      habitablePlanets.push(data);
    }
  })
  .on("error", err => {
    console.log(err);
  })
  .on("end", () => {
    console.log(
      habitablePlanets.map(planet => {
        return planet["kepler_name"];
      })
    );
    console.log(
      `there's ${habitablePlanets.length} habitable planet${
        habitablePlanets.length > 1 ? "s" : ""
      }  `
    );
  });
