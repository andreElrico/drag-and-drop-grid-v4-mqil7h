import { Cell, DndGridOptions, DragSession } from '../models';

/**
 * Utility service that deals with calculations related to grid cells.
 * 
 * @class
 */
export class CellUtil {

  /**
   * Generate the cells for the given grid size.
   * 
   * @param {DndGridOptions} options
   * @return {Cell[]}
   */
  public static generateGrid(options: DndGridOptions): Cell[] {
    const grid: Cell[] = [];
    for (let r = 0; r < options.rowCount; r++) {
      for (let c = 0; c < options.colCount; c++) {
        const cell = { rowPosition: r + 1, colPosition: c + 1 } as Cell;
        grid.push(cell);
      }
    }
    return grid;
  }

  /**
   * Convert an absolute position to a cell index (1 based).
   * Assumes that each cell is made up of the cell area plus the gap to its right.
   * The first cell also includes the preceeding gap.
   * 
   * @param {number} gapSize - length of the gap between cells.
   * @param {number} cellCount - number of cells in the range.
   * @param {number} length - total length of the range.
   * @param {number} offset - absolute offset within the range.
   * @return {number} cell index (1 based)
   */
  public static getCellPosition(
    gapSize: number,
    cellCount: number,
    length: number,
    offset: number
  ): { position: number, isBeforeCenterOfCell: boolean } {
    // account for starting gap
    length -= gapSize;
    offset -= gapSize;
    const cellLength = length / cellCount;
    
    let position;
    if (offset < 0) {
      position = 1
    } else {
      position = Math.floor(offset / cellLength) + 1;
    }

    const centerOfCell = (position - 1) * cellLength + (cellLength / 2);
    const isBeforeCenterOfCell = offset < centerOfCell;
    return { position, isBeforeCenterOfCell };
  }
}