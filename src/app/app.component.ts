import { Component } from '@angular/core';

import { WidgetType } from './dnd-grid';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  providers: [
  ]
})
export class AppComponent  {
  public widgetTypes = [
    { id: '1x1', isActive: false },
    { id: '2x1', isActive: false, minRowSpan: 2 },
    { id: '3x3', isActive: false, minRowSpan: 3, minColSpan: 3 }
  ] as WidgetType[];
}
