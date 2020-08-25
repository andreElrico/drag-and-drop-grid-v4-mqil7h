import { Component, ChangeDetectionStrategy, ContentChild, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';

import { Cell, Widget, ResizeDirection, DragType } from '../models';
import { StateService, AddWidgetService, MoveWidgetService, ResizeWidgetService } from '../services';

@Component({
  selector: 'dnd-grid',
  templateUrl: './dnd-grid.component.html',
  styleUrls: [ './dnd-grid.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DndGridComponent  {
  @ViewChild('grid')
  private readonly grid: ElementRef;

  @ContentChild(TemplateRef)
  public widgetTemplate: TemplateRef<any>;

  public cells: Observable<Cell[]>;
  public isDropZoneInvalid: Observable<boolean>;
  public widgets: Observable<Widget[]>;

  constructor(
    private stateService: StateService,
    private addWidgetService: AddWidgetService,
    private moveWidgetService: MoveWidgetService,
    private resizeWidgetService: ResizeWidgetService
  ) {
    this.cells = stateService.cells$;
    this.isDropZoneInvalid = stateService.isDropZoneInvalid$;
    this.widgets = stateService.widgets$;
  }

  public trackCell(index: number, cell: Cell): string {
    
    return `${cell.rowPosition}|${cell.colPosition}`;
  }

  public trackWidget(index: number, widget: Widget): string {
    console.log(widget,"cell")
    return `${widget.box.rowPosition}|${widget.box.colPosition}`;
  }

  public onDragStart(event: DragEvent, widget: Widget): void {
    this.moveWidgetService.onDragStart(event, widget);
  }

  public onDragEnd(event: DragEvent, widget: Widget): void {
    this.moveWidgetService.onDragEnd(event, widget);
  }

  public onDragOver(event: DragEvent): void {
    switch(this.stateService.session.type) {
      case DragType.create:
        this.addWidgetService.onDragOver(event, this.grid.nativeElement);
        break;
      case DragType.move:
        this.moveWidgetService.onDragOver(event, this.grid.nativeElement);
        break;
      case DragType.resize:
        this.resizeWidgetService.onDragOver(event, this.grid.nativeElement);
        break;
    }
  }

  public onDragLeave(event: DragEvent): void {
    switch(this.stateService.session.type) {
      case DragType.create:
        this.addWidgetService.onDragLeave(event);
        break;
      case DragType.move:
        this.moveWidgetService.onDragLeave(event);
        break;
      case DragType.resize:
        this.resizeWidgetService.onDragLeave(event);
        break;
    }
  }

  public onDrop(event: DragEvent): void {
    switch(this.stateService.session.type) {
      case DragType.create:
        this.addWidgetService.onDrop(event, this.grid.nativeElement);
        break;
      case DragType.move:
        this.moveWidgetService.onDrop(event, this.grid.nativeElement);
        break;
      case DragType.resize:
        this.resizeWidgetService.onDrop(event, this.grid.nativeElement);
        break;
    }
  }

  public onResizeHorizontalStart(event: DragEvent, widget: Widget): void {
    this.onResizeStart(event, widget, [ResizeDirection.horizontal]);
  }

  public onResizeVerticalStart(event: DragEvent, widget: Widget): void {
    this.onResizeStart(event, widget, [ResizeDirection.vertical]);
  }

  public onResizeDiagonalStart(event: DragEvent, widget: Widget): void {
    this.onResizeStart(event, widget, [ResizeDirection.horizontal, ResizeDirection.vertical]);
  }

  private onResizeStart(event: DragEvent, widget: Widget, directions: ResizeDirection[]): void {
    this.resizeWidgetService.onDragStart(event, widget, directions);
  }

  public onResizeEnd(event: DragEvent, widget: Widget): void {
    this.resizeWidgetService.onDragEnd(event, widget);
  }
}
