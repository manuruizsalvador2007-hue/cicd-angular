import { Component, inject } from '@angular/core';
import { TaskService } from './services/task.service';
import { TaskForm } from './components/task-form/task-form';
import { TaskList } from './components/task-list/task-list';

@Component({
  imports: [TaskForm, TaskList],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly service = inject(TaskService);
  protected readonly title = 'Lista de tareas de Manuel';
}
