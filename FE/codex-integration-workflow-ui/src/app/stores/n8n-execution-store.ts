import { Injectable, signal } from '@angular/core';

@Injectable()
export class N8NExecutionStore {
  readonly executions = signal<any[]>([]);

  add(item: any) {
    this.executions.update((executions) => [item, ...executions]);
  }
}
