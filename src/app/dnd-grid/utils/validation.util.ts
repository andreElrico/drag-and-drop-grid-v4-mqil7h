import { DndGridOptions, Box, Widget } from '../models';
import { BoxUtil } from './box.util';

export class ValidationUtil {

  /**
   * Determine if a dropzone is valid.
   * 
   * @param {DndGridOptions} options
   * @param {Box} dropZone
   * @param {Widget[]} widgets
   */
  public static isDropZoneValid(
    options: DndGridOptions,
    dropZone: Box,
    widgets: Widget[]
  ): boolean {
    const gridBox = { rowPosition: 1, colPosition: 1, rowSpan: options.rowCount, colSpan: options.colCount } as Box;
    const isInGridBounds = BoxUtil.doesBoxContain(gridBox, dropZone);
    if (!isInGridBounds) {
      return false;
    }
    const overlapsWidgets = widgets.some((widget) => BoxUtil.doBoxesOverlap(widget.box, dropZone))
    return !overlapsWidgets;
  }
}