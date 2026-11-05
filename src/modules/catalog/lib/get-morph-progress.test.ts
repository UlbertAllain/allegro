import { describe, expect, it } from "vitest";
import { getMorphProgress } from "./get-morph-progress";

describe("getMorphProgress", () => {
  it("begins at zero when the image first approaches the viewport", () => {
    expect(getMorphProgress(920, 1000)).toBe(0);
    expect(getMorphProgress(1200, 1000)).toBe(0);
  });

  it("reaches one when the image enters the main reading zone", () => {
    expect(getMorphProgress(220, 1000)).toBe(1);
    expect(getMorphProgress(-150, 1000)).toBe(1);
  });

  it("moves in both directions and clamps safely", () => {
    expect(getMorphProgress(570, 1000)).toBeCloseTo(0.5);
    expect(getMorphProgress(780, 1000)).toBeCloseTo(0.2);
    expect(getMorphProgress(570, 0)).toBe(0);
  });
});
