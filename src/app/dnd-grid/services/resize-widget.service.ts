import { Injectable, Inject } from '@angular/core';

import { WidgetType, DragType, ResizeDragSession, DND_GRID_OPTIONS, DndGridOptions, Box, Widget, ResizeDirection } from '../models';
import { OffsetUtil, CellResizeUtil, BoxUtil, ValidationUtil } from '../utils';
import { StateService } from './state.service';
import { BaseWidgetService } from './base-widget.service';

@Injectable()
export class ResizeWidgetService extends BaseWidgetService<ResizeDragSession> {

  protected get otherWidgets(): Widget[] {
    const widget = {
      type: this.session.widgetType,
      box: this.session.box
    } as Widget;
    return this.state.widgetsExcluding(widget);
  }

  constructor(
    @Inject(DND_GRID_OPTIONS) options: DndGridOptions,
    state: StateService
  ) {
    super(options, state);
  }

  public onDragStart(event: DragEvent, widget: Widget, directions: ResizeDirection[]): void {
    // to prevent the move drag event from fireing too
    event.cancelBubble = true;
    // to hide the preview
    event.dataTransfer.setDragImage(document.createElement('div'), 0, 0);
    widget.isActive = true;
    const { offsetX, offsetY } = OffsetUtil.calculateOffsetFromWidgetCenter(event);
    const session = {
      type: DragType.resize,
      widgetType: widget.type,
      widgetHandleOffsetCenterX: offsetX,
      widgetHandleOffsetCenterY: offsetY,
      box: widget.box,
      directions
    } as ResizeDragSession;
    this.state.session = session;
  }

  public onDragEnd(event: DragEvent, widget: Widget): void {
    widget.isActive = false;
    this.endDrag();
  }

  protected calculateDropZone(event: DragEvent, grid: Element): Box {
    const { rowPosition, colPosition } = this.session.box;
    let { rowSpan, colSpan } = this.session.box;

    if (this.session.directions.indexOf(ResizeDirection.vertical) > -1) {
      const offsetY = OffsetUtil.calculateOffsetFromGridOriginY(event, grid, this.state.session);
      rowSpan = CellResizeUtil.calculateRowSpan(this.options, grid, this.state.session, offsetY, rowPosition);
    }

    if (this.session.directions.indexOf(ResizeDirection.horizontal) > -1) {
      const offsetX = OffsetUtil.calculateOffsetFromGridOriginX(event, grid, this.state.session);
      colSpan = CellResizeUtil.calculateColSpan(this.options, grid, this.state.session, offsetX, colPosition);
    }

    return { rowPosition, colPosition, rowSpan, colSpan } as Box;
  }
}