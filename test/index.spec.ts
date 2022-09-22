// internat requirements:
import { isHabitablePlanet, findHabitablePlanet } from "../src/index"
import { K_disposition } from "../src/types"
// Initializing
const goodPath = "../kepler_data.csv";
const badPath = "../keplerXXX_data.csv";
const habitablePlanet = {
    koi_disposition: K_disposition.CONFIRMED,
    koi_insol: 1,
    koi_prad: 1
};
const inhabitablePlanet = {
    koi_disposition: undefined
};

describe("GIVEN we have some planets", () => {
    it("is planet habitable", () => {
        expect(isHabitablePlanet(habitablePlanet)).toBeTruthy();
        expect(isHabitablePlanet(inhabitablePlanet)).toBeFalsy();
    })
})

describe("GIVEN we created a readStream", () => {
    describe("WHEN THE PATH IS CORRECT", () => { 
        it("THEN error MUST NOT thrown", ()=>{
            expect(() => { findHabitablePlanet(goodPath) }).not.toThrow();
        })
    })
})