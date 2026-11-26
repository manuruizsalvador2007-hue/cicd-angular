import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-task-form',
  template: `
    <form (submit)="submit($event)">
      <input
        type="text"
        placeholder="Nueva tarea"
        [value]="text()"
        (input)="text.set($any($event.target).value)"
      />
      <button type="submit" [disabled]="!text().trim()">Añadir</button>
    </form>
  `,
})
export class TaskForm {
  readonly text = signal('');
  readonly added = output<string>();

  submit(event: Event): void {
    event.preventDefault();
    const value = this.text().trim();
    if (value) {
      this.added.emit(value);
      this.text.set('');
    }
  }
}
