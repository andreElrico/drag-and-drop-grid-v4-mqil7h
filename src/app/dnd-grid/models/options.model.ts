import { InjectionToken } from '@angular/core';

export const DND_GRID_OPTIONS = new InjectionToken('DND_GRID_OPTIONS');

export interface DndGridOptions {
  rowCount: number;
  colCount: number;
  gapSize: number;
}