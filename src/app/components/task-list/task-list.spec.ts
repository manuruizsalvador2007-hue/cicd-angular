import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskList } from './task-list';
import { Task } from '../../services/task.service';

describe('TaskList', () => {
  let fixture: ComponentFixture<TaskList>;
  let el: HTMLElement;
  const tasks: Task[] = [
    { id: 1, title: 'Primera', done: false },
    { id: 2, title: 'Segunda', done: true },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TaskList] }).compileComponents();
    fixture = TestBed.createComponent(TaskList);
    el = fixture.nativeElement;
  });

  it('muestra un mensaje cuando no hay tareas', async () => {
    fixture.componentRef.setInput('tasks', []);
    await fixture.whenStable();
    expect(el.querySelector('.empty')?.textContent).toContain('No hay tareas');
    expect(el.querySelectorAll('li').length).toBe(0);
  });

  it('pinta una fila por tarea y tacha las completadas', async () => {
    fixture.componentRef.setInput('tasks', tasks);
    await fixture.whenStable();
    const items = el.querySelectorAll('li');
    expect(items.length).toBe(2);
    expect(items[0].textContent).toContain('Primera');
    expect(items[0].classList.contains('done')).toBe(false);
    expect(items[1].classList.contains('done')).toBe(true);
  });

  it('emite toggled al hacer clic en el título y removed al pulsar ✕', async () => {
    fixture.componentRef.setInput('tasks', tasks);
    await fixture.whenStable();
    const toggled: number[] = [];
    const removed: number[] = [];
    fixture.componentInstance.toggled.subscribe((id) => toggled.push(id));
    fixture.componentInstance.removed.subscribe((id) => removed.push(id));
    (el.querySelectorAll('.title')[0] as HTMLElement).click();
    (el.querySelectorAll('.remove')[1] as HTMLElement).click();
    expect(toggled).toEqual([1]);
    expect(removed).toEqual([2]);
  });
});
