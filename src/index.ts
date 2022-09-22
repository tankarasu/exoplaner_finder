// Core module requirements:
import * as fs from "node:fs";
import * as path from "node:path";

// Third-party requirtements:
import { parse } from "csv-parse";
import { Planet } from "./types";

// Initializing
const habitablePlanets: Object[] = [];
const filePath: string = path
  .format({
    dir: path.dirname("./"),
    base: "kepler_data.csv",
  })
  .normalize(); // This could have been done in more easily way :)

/**
 * this function check if a planet is habitable.
 * @param {*} planet string representation of the planet name.
 * @returns  true if habitable otherwise else.
 */
export function isHabitablePlanet(planet: Planet): boolean {
  return (
    planet["koi_disposition"] === "CONFIRMED" && // disposition like earth CONFIRMED
    planet["koi_insol"] > 0.36 && // Stellar flux
    planet["koi_insol"] < 1.11 && // Stellar flux
    planet["koi_prad"] < 1.6 // Radius of the planet 
  );
}

export function findHabitablePlanet(pathToFile: string): void {
  fs.createReadStream(pathToFile)
    // we parse buffer => string and arrange inside object
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
      throw new Error();
    })
    .on("end", () => {
      console.log(
        habitablePlanets.map(planet => {
          return planet["kepler_name"];
        })
      );
      console.log(
        `there's ${habitablePlanets.length} habitable planet${habitablePlanets.length > 1 ? "s" : ""
        }  `
      );
    });
}

findHabitablePlanet(filePath)