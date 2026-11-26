import { Injectable, computed, signal } from '@angular/core';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private nextId = 1;
  private readonly _tasks = signal<Task[]>([]);

  readonly tasks = this._tasks.asReadonly();
  readonly pendingCount = computed(() => this._tasks().filter((t) => !t.done).length);

  add(title: string): Task | null {
    const clean = title.trim();
    if (!clean) {
      return null;
    }
    const task: Task = { id: this.nextId++, title: clean, done: false };
    this._tasks.update((list) => [...list, task]);
    return task;
  }

  toggle(id: number): void {
    this._tasks.update((list) => list.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  remove(id: number): void {
    this._tasks.update((list) => list.filter((t) => t.id !== id));
  }

  doneCount(): number {
    return this._tasks().filter((t) => t.done).length;
  }

  stats(): { total: number; done: number; percent: number; label: string } {
    const total = this._tasks().length;
    const done = this.doneCount();
    const percent = total === 0 ? 0 : Math.round((done / total) * 100);
    let label = 'Sin empezar';
    if (percent === 100) {
      label = 'Completado';
    } else if (percent >= 50) {
      label = 'Mas de la mitad';
    } else if (percent > 0) {
      label = 'En progreso';
    }
    return { total, done, percent, label };
  }

  clearDone(): void {
    this._tasks.update((list) => list.filter((t) => !t.done));
  }
}
