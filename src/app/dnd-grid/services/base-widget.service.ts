import { Injectable, Inject } from '@angular/core';

import { WidgetType, DragType, DragSession, DND_GRID_OPTIONS, DndGridOptions, Box, Widget } from '../models';
import { OffsetUtil, CellMoveUtil, BoxUtil, ValidationUtil } from '../utils';
import { StateService } from './state.service';

@Injectable()
export abstract class BaseWidgetService<T extends DragSession> {

  protected get session(): T {
    return this.state.session as T;
  }

  /**
   * Get widgets on the grid excluding the active one.
   */
  protected abstract get otherWidgets(): Widget[];

  constructor(
    protected options: DndGridOptions,
    protected state: StateService
  ) {}

  public onDragOver(event: DragEvent, grid: Element): void {
    if (this.session == null) {
      return;
    }
    const dropZone = this.calculateDropZone(event, grid);
    const isDropZoneValid = this.isDropZoneValid(dropZone);
    
    if (isDropZoneValid) {
      event.preventDefault();
    }
    this.state.dropZone = dropZone;
    this.state.isDropZoneInvalid = !isDropZoneValid;
  }

  public onDragLeave(event: DragEvent): void {
    this.state.dropZone = null;
    this.state.isDropZoneInvalid = false;
  }

  public onDrop(event: DragEvent, grid: Element): void {
    event.preventDefault();
    const widget = {
      type: { ...this.session.widgetType } as WidgetType,
      box: this.state.dropZone
    } as Widget;
    this.state.widgets = [ ...this.otherWidgets, widget ];
    this.endDrag();
  }

  protected endDrag(): void {
    this.state.session = null;
    this.state.dropZone = null;
    this.state.isDropZoneInvalid = false;
  }

  protected abstract calculateDropZone(event: DragEvent, grid: Element): Box;

  protected isDropZoneValid(dropZone: Box): boolean {
    const isDropZoneValid = ValidationUtil.isDropZoneValid(this.options, dropZone, this.otherWidgets);
    return isDropZoneValid;
  }
}