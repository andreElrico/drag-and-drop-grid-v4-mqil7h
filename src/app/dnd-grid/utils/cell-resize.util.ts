import { Cell, DndGridOptions, DragSession } from '../models';
import { CellUtil } from './cell.util';

/**
 * Utility service that deals with calculations related to resizing grid cells.
 * 
 * @class
 */
export class CellResizeUtil {

  /**
   * Calculate the number of cells spanned by the widget in a row.
   * 
   * @param {DndGridOptions} options
   * @param {Element} grid
   * @param {DragSession} session
   * @param {number} offsetY
   * @param {number} rowStartPosition
   * @return {number} row span
   */
  public static calculateRowSpan(
    options: DndGridOptions,
    grid: Element,
    session: DragSession,
    offsetY: number,
    rowStartPosition: number
  ): number {
    return this.calculateSpan(options.gapSize, options.rowCount, grid.clientHeight, offsetY, rowStartPosition, session.widgetType.minRowSpan);
  }

  /**
   * Calculate the number of cells spanned by the widget in a column.
   * 
   * @param {DndGridOptions} options
   * @param {Element} grid
   * @param {DragSession} session
   * @param {number} offsetX
   * @param {number} colStartPosition
   * @return {number} col span
   */
  public static calculateColSpan(
    options: DndGridOptions,
    grid: Element,
    session: DragSession,
    offsetX: number,
    colStartPosition: number
  ): number {
    return this.calculateSpan(options.gapSize, options.colCount, grid.clientWidth, offsetX, colStartPosition, session.widgetType.minColSpan);
  }

  /**
   * Calculate the span of the widget from the start position to the offset.
   * 
   * @param {number} grapSize
   * @param {number} cellCount
   * @param {number} length
   * @param {number} offset
   * @param {number} startPosition
   * @param {number} minSpan
   * @return {number} span
   */
  public static calculateSpan(
    gapSize: number,
    cellCount: number,
    length: number,
    offset: number,
    startPosition: number,
    minSpan: number
  ): number {
    const { position } = CellUtil.getCellPosition(gapSize, cellCount, length, offset);
    const span = 1 + position - startPosition;
    if (span < minSpan) {
      return minSpan;
    }
    return span;
  }
}