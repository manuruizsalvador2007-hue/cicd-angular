import { Component, input, output } from '@angular/core';
import { Task } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  template: `
    @if (tasks().length === 0) {
      <p class="empty">No hay tareas todavía</p>
    } @else {
      <ul>
        @for (task of tasks(); track task.id) {
          <li [class.done]="task.done">
            <span class="title" (click)="toggled.emit(task.id)">{{ task.title }}</span>
            <button class="remove" (click)="removed.emit(task.id)">✕</button>
          </li>
        }
      </ul>
    }
  `,
  styles: `
    ul { list-style: none; padding: 0; }
    li { display: flex; justify-content: space-between; padding: .4rem 0; border-bottom: 1px solid #ddd; }
    .title { cursor: pointer; }
    .done .title { text-decoration: line-through; color: #888; }
  `,
})
export class TaskList {
  readonly tasks = input.required<Task[]>();
  readonly toggled = output<number>();
  readonly removed = output<number>();
}
