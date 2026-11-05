/** 0 when the journey enters the reading zone; 1 before it leaves. */
export function getJourneyProgress(
  top: number,
  height: number,
  viewportHeight: number,
): number {
  if (height <= 0 || viewportHeight <= 0) return 0;

  const startTop = viewportHeight * 0.75;
  const endTop = viewportHeight * 0.25 - height;
  const progress = (startTop - top) / (startTop - endTop);

  return Math.max(0, Math.min(1, progress));
}
