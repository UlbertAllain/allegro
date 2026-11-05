/** 0 when the feature enters the viewport, 1 when it reaches the reading zone. */
export function getMorphProgress(featureTop: number, viewportHeight: number): number {
  if (viewportHeight <= 0) return 0;
  const start = viewportHeight * 0.92;
  const end = viewportHeight * 0.22;
  return Math.max(0, Math.min(1, (start - featureTop) / (start - end)));
}
