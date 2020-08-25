import { DndGridOptions, DragSession } from '../models';

/**
 * Utility service used to calculate the offset of elements or events relative to other elements.
 * 
 * @class
 */
export class OffsetUtil {

  /**
   * Calculate the offset the drag event
   * from the center of the element being dragged.
   * @param {DragEvent} event
   * @return {{ centerOffsetX: number, centerOffsetY: number }}
   */
  public static calculateOffsetFromWidgetCenter(
    event: DragEvent
  ): { offsetX: number, offsetY: number } {
    const target = event.target as Element;
    const { left, top, width, height } = target.getBoundingClientRect();
    console.log( { left, top, width, height } );
    return {
      offsetX: (window.pageXOffset + left) + (width / 2) - event.pageX,
      offsetY: (window.pageYOffset + top)  + (height / 2) - event.pageY
    };
  }

  /**
   * Calculate the offset of the widget center relative to the gird origin on the x-axis.
   * 
   * @param {DragEvent} event
   * @param {Element} grid
   * @param {DragSession} session
   * @return {number}
   */
  public static calculateOffsetFromGridOriginY(
    event: DragEvent,
    grid: Element,
    session: DragSession
  ): number {
    const { top, height } = grid.getBoundingClientRect();
    return this.calculateOffsetFromOrigin(window.pageYOffset, top, height, grid.clientHeight, event.pageY, session.widgetHandleOffsetCenterY);
  }

  /**
   * Calculate the offset of the widget center relative to the gird origin on the y-axis.
   * 
   * @param {DragEvent} event
   * @param {Element} grid
   * @param {DragSession} session
   * @return {number}
   */
  public static calculateOffsetFromGridOriginX(
    event: DragEvent,
    grid: Element,
    session: DragSession
  ): number {
    const { left, width } = grid.getBoundingClientRect();
    return this.calculateOffsetFromOrigin(window.pageXOffset, left, width, grid.clientWidth, event.pageX, session.widgetHandleOffsetCenterX);
  }

  /**
   * Calculate the offset of the widget center relative to the grid origin.
   * 
   * @param {number} scrollOffset - offset of the viewport from the page origin.
   * @param {number} gridOffset - offset of the grid from the viewport origin.
   * @param {number} gridOuterLength - length of the grid including border, padding, and content
   * @param {number} gridInnerLength - length of the grid including 
   * @param {number} eventPageOffset - offset of the event relative to the page.
   * @param {number} widgetHandleOffsetCenter - offset of where the widget is held relative to its center.
   */
  public static calculateOffsetFromOrigin(
    scrollOffset: number,
    gridOffset: number,
    gridOuterLength: number,
    gridInnerLength: number,
    eventPageOffset: number,
    widgetHandleOffsetCenter: number
  ): number {
    const widgetCenterOffsetFromPageOrigin = eventPageOffset + widgetHandleOffsetCenter;
    const gridOriginFromPageOrigin = scrollOffset + gridOffset + ((gridOuterLength - gridInnerLength) / 2)
    const widgetOffsetFromGrid = widgetCenterOffsetFromPageOrigin - gridOriginFromPageOrigin;
    return widgetOffsetFromGrid;
  }
}