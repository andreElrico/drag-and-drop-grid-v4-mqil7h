import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DND_GRID_OPTIONS, DndGridOptions, DndGridComponent, DndWidgetTypesComponent, DndTrashComponent, StateService,
  AddWidgetService, MoveWidgetService, ResizeWidgetService } from './dnd-grid';

@NgModule({
  imports: [ BrowserModule, FormsModule ],
  declarations: [
    AppComponent,
    DndGridComponent,
    DndWidgetTypesComponent,
    DndTrashComponent
  ],
  providers: [
    StateService,
    AddWidgetService,
    MoveWidgetService,
    ResizeWidgetService,
    { provide: DND_GRID_OPTIONS, useValue: { rowCount: 12, colCount: 12, gapSize: 10 } as DndGridOptions } 
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
