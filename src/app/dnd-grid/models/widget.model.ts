import { WidgetType } from './widget-type.model';
import { Box } from './grid.models';

export interface Widget {
  type: WidgetType;
  box: Box;
  isActive: boolean;
}