import { Injectable, Inject } from '@angular/core';

import { WidgetType, DragType, DragSession, DND_GRID_OPTIONS, DndGridOptions, Box, Widget } from '../models';
import { OffsetUtil, CellMoveUtil, ValidationUtil } from '../utils';
import { StateService } from './state.service';
import { BaseWidgetService } from './base-widget.service';

@Injectable()
export class AddWidgetService extends BaseWidgetService<DragSession> {

  protected get otherWidgets(): Widget[] {
    return this.state.widgets;
  }

  constructor(
    @Inject(DND_GRID_OPTIONS) options: DndGridOptions,
    state: StateService
  ) {
    super(options, state);
  }

  public onDragStart(event: DragEvent, widgetType: WidgetType): void {
    widgetType.isActive = true;
    const { offsetX, offsetY } = OffsetUtil.calculateOffsetFromWidgetCenter(event);
    const session = {
      type: DragType.create,
      widgetType,
      widgetHandleOffsetCenterX: offsetX,
      widgetHandleOffsetCenterY: offsetY
    } as DragSession;
    this.state.session = session;
  }

  public onDragEnd(event: DragEvent, widgetType: WidgetType): void {
    widgetType.isActive = false;
    this.endDrag();
  }

  protected calculateDropZone(event: DragEvent, grid: Element): Box {
    const colSpan = this.state.session.widgetType.minColSpan || 1;
    const rowSpan = this.state.session.widgetType.minRowSpan || 1;
    return CellMoveUtil.calculateDropZone(this.options, this.state.session, event, grid, rowSpan, colSpan);
  }
}