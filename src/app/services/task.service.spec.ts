import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('empieza sin tareas', () => {
    expect(service.tasks()).toEqual([]);
    expect(service.pendingCount()).toBe(0);
  });

  it('añade una tarea quitando espacios y con id incremental', () => {
    const a = service.add('  Estudiar CI  ');
    const b = service.add('Desplegar');
    expect(a).toEqual({ id: 1, title: 'Estudiar CI', done: false });
    expect(b?.id).toBe(2);
    expect(service.tasks().length).toBe(2);
  });

  it('no añade tareas vacías', () => {
    expect(service.add('   ')).toBeNull();
    expect(service.tasks().length).toBe(0);
  });

  it('marca y desmarca una tarea y actualiza las pendientes', () => {
    const t = service.add('Tarea')!;
    service.add('Otra');
    service.toggle(t.id);
    expect(service.tasks()[0].done).toBe(true);
    expect(service.pendingCount()).toBe(1);
    service.toggle(t.id);
    expect(service.tasks()[0].done).toBe(false);
  });

  it('elimina una tarea', () => {
    const t = service.add('Borrar')!;
    service.remove(t.id);
    expect(service.tasks()).toEqual([]);
  });
});
