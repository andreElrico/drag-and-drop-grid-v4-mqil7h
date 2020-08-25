import { Component, ChangeDetectionStrategy } from '@angular/core';

import { DragType, MoveDragSession, Widget } from '../models';
import { StateService } from '../services';
import { BoxUtil } from '../utils';

@Component({
  selector: 'dnd-trash',
  templateUrl: './dnd-trash.component.html',
  styleUrls: [ './dnd-trash.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DndTrashComponent  {
  public isActive = false;

  constructor(private state: StateService) {}

  public onDragLeave(event: DragEvent): void {
    this.isActive = false;
  }

  public onDragOver(event: DragEvent): void {
    if (this.state.session != null && this.state.session.type === DragType.move) {
      event.preventDefault();
      this.isActive = true;
    }
  }

  public onDrop(event: DragEvent): void {
    event.preventDefault();
    const session = this.state.session as MoveDragSession;
    const widget = {
      type: session.widgetType,
      box: session.box
    } as Widget;
    this.state.widgets = this.state.widgetsExcluding(widget);
    this.isActive = false;
  }
}
