import { Point, Box } from '../models';

/**
 * Utility service for comparing boxes.
 * 
 * @class
 */
export class BoxUtil {

  public static isPointInBox(point: Point, box: Box): boolean {
    return point.rowPosition >= box.rowPosition
      && point.rowPosition <= (box.rowPosition + (box.rowSpan - 1))
      && point.colPosition >= box.colPosition
      && point.colPosition <= (box.colPosition + (box.colSpan - 1));
  }

  public static areBoxesEquivalent(a: Box, b: Box): boolean {
    return a.rowPosition === b.rowPosition
      && a.colPosition === b.colPosition
      && a.rowSpan === b.rowSpan
      && a.colSpan === b.colSpan;
  }

  public static doesBoxContain(outer: Box, inner: Box): boolean {
    const { colEnd: innerColEnd, rowEnd: innerRowEnd } = this.boxToBounds(inner);
    const { colEnd: outerColEnd, rowEnd: outerRowEnd } = this.boxToBounds(outer);
    return inner.colPosition >= outer.colPosition
      && innerColEnd <= outerColEnd
      && inner.rowPosition >= outer.rowPosition
      && innerRowEnd <= outerRowEnd;
  }

  public static boxToBounds(box: Box): { colEnd: number, rowEnd: number } {
    return {
      colEnd: box.colPosition + box.colSpan - 1,
      rowEnd: box.rowPosition + box.rowSpan - 1
    };
  }

  public static doBoxesOverlap(a: Box, b: Box): boolean {
    const { colEnd: aColEnd, rowEnd: aRowEnd } = this.boxToBounds(a);
    const { colEnd: bColEnd, rowEnd: bRowEnd } = this.boxToBounds(b);
    const colOverlap = this.doIntervalsIntersect(a.colPosition, aColEnd, b.colPosition, bColEnd);
    const rowOverlap = this.doIntervalsIntersect(a.rowPosition, aRowEnd, b.rowPosition, bRowEnd);
    return colOverlap && rowOverlap;
  }

  private static doIntervalsIntersect(aMin: number, aMax: number, bMin: number, bMax: number): boolean {
    return aMin <= bMax && bMin <= aMax;
  }
}