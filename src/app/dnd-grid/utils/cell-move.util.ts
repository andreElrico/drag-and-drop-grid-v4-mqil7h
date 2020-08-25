import { Cell, DndGridOptions, DragSession, Box } from '../models';
import { CellUtil } from './cell.util';
import { OffsetUtil } from './offset.util';

/**
 * Utility service that deals with calculations related to moving grid cells.
 * 
 * @class
 */
export class CellMoveUtil {

  /**
   * Calculate the drop zone for a widget.
   * 
   * @param {DndGridOptions} options
   * @param {DragSession} session
   * @param {DragEvent} event
   * @param {Element} grid
   * @param {number} rowSpan
   * @param {number} colSpan
   * @return {Box} drop zone
   */
  public static calculateDropZone(
    options: DndGridOptions,
    session: DragSession,
    event: DragEvent, 
    grid: Element,
    rowSpan: number,
    colSpan: number
  ): Box {
    const offsetX = OffsetUtil.calculateOffsetFromGridOriginX(event, grid, session);
    const offsetY = OffsetUtil.calculateOffsetFromGridOriginY(event, grid, session);
    const colPosition = this.calculateColStartPosition(options, grid, colSpan, offsetX);
    const rowPosition = this.calculateRowStartPosition(options, grid, rowSpan, offsetY);
    const dropZone = { rowPosition, colPosition, rowSpan, colSpan } as Box;
    return dropZone;
  }

  /**
   * Calculate the starting row position for the widget.
   * 
   * @param {DndGridOptions} options
   * @param {Element} grid
   * @param {number} rowSpan
   * @param {number} centerOffsetY
   * @return {number} row start position
   */
  public static calculateRowStartPosition(
    options: DndGridOptions,
    grid: Element,
    rowSpan: number,
    centerOffsetY: number
  ): number {
    const { position, isBeforeCenterOfCell } = CellUtil.getCellPosition(options.gapSize, options.rowCount, grid.clientHeight, centerOffsetY);
    return this.calculateStartPosition(position, isBeforeCenterOfCell, rowSpan, options.gapSize, options.rowCount);
  }

  /**
   * Calculate the starting column position for the widget.
   * 
   * @param {DndGridOptions} options
   * @param {Element} grid
   * @param {number} span
   * @param {number} centerOffsetX
   * @return {number} column start position
   */
  public static calculateColStartPosition(
    options: DndGridOptions,
    grid: Element,
    colSpan: number,
    centerOffsetX: number
  ): number {
    const { position, isBeforeCenterOfCell } = CellUtil.getCellPosition(options.gapSize, options.colCount, grid.clientWidth, centerOffsetX);
    return this.calculateStartPosition(position, isBeforeCenterOfCell, colSpan, options.gapSize, options.colCount);
  }

  /**
   * Calculate the starting position when the range is balanced at its center.
   * 
   * @param {number} centerPosition - cell position of the center of the range
   * @param {boolean} isBeforeCenterOfCell - leaning of the range within the cell
   * @param {number} span - length of the range
   * @param {number} cellCount - total number of cells on the axis
   * @return {number} start position
   */
  public static calculateStartPosition(
    centerPosition: number,
    isBeforeCenterOfCell: boolean,
    span: number,
    gapSize: number,
    cellCount: number
  ): number {
    // size
    let originPosition;
    if (span % 2 === 0) {
      originPosition = centerPosition - ((span / 2) + (isBeforeCenterOfCell ? 0 : -1));
    } else {
      originPosition = centerPosition - (span - 1) / 2;
    }

    return originPosition;
  }
}