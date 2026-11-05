import { describe, expect, it } from "vitest";
import { getJourneyProgress } from "./get-journey-progress";

describe("getJourneyProgress", () => {
  it("does not begin until the journey enters the reading zone", () => {
    expect(getJourneyProgress(750, 350, 1000)).toBe(0);
    expect(getJourneyProgress(950, 350, 1000)).toBe(0);
  });

  it("finishes before the last step leaves the reading zone", () => {
    expect(getJourneyProgress(-100, 350, 1000)).toBe(1);
    expect(getJourneyProgress(-400, 350, 1000)).toBe(1);
  });

  it("tracks scrolling in both directions", () => {
    expect(getJourneyProgress(325, 350, 1000)).toBeCloseTo(0.5);
    expect(getJourneyProgress(537.5, 350, 1000)).toBeCloseTo(0.25);
  });

  it("handles zero dimensions without NaN", () => {
    expect(getJourneyProgress(100, 0, 1000)).toBe(0);
    expect(getJourneyProgress(100, 350, 0)).toBe(0);
  });
});
