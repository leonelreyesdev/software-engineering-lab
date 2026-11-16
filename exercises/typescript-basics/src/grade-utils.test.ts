
import { describe, expect, it } from "vitest";
import { calculateAverage, getStatus } from "./grade-utils";

describe("calculateAverage", () => {
    it("calculates the average correctly", () => {
        expect(calculateAverage([95, 88, 92])).toBeCloseTo(91.67, 2);
    });

    it("returns null when grades are empty", () => {
        expect(calculateAverage([])).toBeNull();
    });

    it("handles a single grade", () => {
        expect(calculateAverage([80])).toBe(80);
    });
});

describe("getStatus", () => {
    it("passes students with an average of 70", () => {
        expect(getStatus(70)).toBe("PASS");
    });

    it("fails students below 70", () => {
        expect(getStatus(69.99)).toBe("FAIL");
    });

    it("handles students without grades", () => {
        expect(getStatus(null)).toBe("NO GRADES");
    });
});

describe("invalid numeric inputs", () => {
    it("rejects NaN grades", () => {
        expect(() => calculateAverage([90, NaN])).toThrow(RangeError);
    });

    it("rejects Infinity grades", () => {
        expect(() => calculateAverage([90, Infinity])).toThrow(RangeError);
    });

    it("rejects invalid averages", () => {
        expect(() => getStatus(NaN)).toThrow(RangeError);
    });
});
