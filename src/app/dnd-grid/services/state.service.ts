import { Injectable, Inject } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { scan, shareReplay, startWith, pairwise, filter, map, distinctUntilChanged } from 'rxjs/operators';

import { DragSession, Widget, Box, Cell, DND_GRID_OPTIONS, DndGridOptions } from '../models';
import { BoxUtil, CellUtil, ValidationUtil } from '../utils';

@Injectable()
export class StateService {
  private _session: DragSession;

  private readonly dropZoneSource = new BehaviorSubject<Box>(null);
  private readonly widgetsSource = new BehaviorSubject<Widget[]>([]);
  private readonly isDropZoneInvalidSource = new BehaviorSubject<boolean>(false);

  private readonly dropZone$: Observable<Box>;
  public readonly cells$: Observable<Cell[]>;
  public readonly widgets$ = this.widgetsSource.asObservable();
  public readonly isDropZoneInvalid$ = this.isDropZoneInvalidSource.asObservable().pipe(distinctUntilChanged());

  public set session(value: DragSession) {
    this._session = value;
  }

  public get session(): DragSession {
    return this._session;
  }

  public set dropZone(value: Box) {
    this.dropZoneSource.next(value);
  }

  public get dropZone(): Box {
    return this.dropZoneSource.value;
  }

  public set isDropZoneInvalid(value: boolean) {
    this.isDropZoneInvalidSource.next(value);
  }

  public set widgets(value: Widget[]) {
    this.widgetsSource.next(value);
  }

  public get widgets(): Widget[] {
    return this.widgetsSource.value;
  }

  constructor(
    @Inject(DND_GRID_OPTIONS) private options: DndGridOptions
  ) {
    this.dropZone$ = this.initDropZone();
    this.cells$ = this.initCells();
  }

  private initDropZone(): Observable<Box> {
    return this.dropZoneSource.pipe(
      pairwise(),
      filter(([prev, curr]) => prev == null || curr == null || !BoxUtil.areBoxesEquivalent(prev, curr)),
      map(([prev, curr]) => curr),
      shareReplay(1)
    );
  }

  private initCells(): Observable<Cell[]> {
    const cells = CellUtil.generateGrid(this.options);
    return this.dropZone$.pipe(
      startWith(null), // trigger the scan
      scan((cells: Cell[], dropZone: Box) => {
        return cells.map(cell => {
          cell.isHighlighted = dropZone != null && BoxUtil.isPointInBox(cell, dropZone);
          return cell;
        });
      }, cells),
      shareReplay(1)
    )
  }

  public widgetsExcluding(widget: Widget): Widget[] {
    return this.widgets.filter(x => {
      return x.type.id !== widget.type.id || !BoxUtil.areBoxesEquivalent(x.box, widget.box);
    });
  }
}