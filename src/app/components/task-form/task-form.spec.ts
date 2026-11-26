import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskForm } from './task-form';

describe('TaskForm', () => {
  let fixture: ComponentFixture<TaskForm>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TaskForm] }).compileComponents();
    fixture = TestBed.createComponent(TaskForm);
    el = fixture.nativeElement;
    await fixture.whenStable();
  });

  function type(value: string) {
    const input = el.querySelector('input')!;
    input.value = value;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  it('el botón está desactivado si el texto está vacío', () => {
    expect(el.querySelector('button')!.disabled).toBe(true);
    type('   ');
    expect(el.querySelector('button')!.disabled).toBe(true);
  });

  it('emite el texto al enviar y limpia el campo', () => {
    const emitted: string[] = [];
    fixture.componentInstance.added.subscribe((v) => emitted.push(v));
    type('  Nueva tarea  ');
    expect(el.querySelector('button')!.disabled).toBe(false);
    el.querySelector('form')!.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(emitted).toEqual(['Nueva tarea']);
    expect(fixture.componentInstance.text()).toBe('');
  });

  it('no emite nada si se envía vacío', () => {
    const emitted: string[] = [];
    fixture.componentInstance.added.subscribe((v) => emitted.push(v));
    fixture.componentInstance.submit(new Event('submit'));
    expect(emitted).toEqual([]);
  });
});
