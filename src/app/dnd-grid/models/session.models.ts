import { WidgetType } from './widget-type.model';
import { Box } from './grid.models';

export enum ResizeDirection {
  vertical,
  horizontal
}

export enum DragType {
  create,
  move,
  resize
}

export interface DragSession {
  type: DragType;
  widgetType: WidgetType;
  widgetHandleOffsetCenterX: number;
  widgetHandleOffsetCenterY: number;
}

export interface MoveDragSession extends DragSession {
  box: Box;
}

export interface ResizeDragSession extends MoveDragSession {
  directions: ResizeDirection[];
}