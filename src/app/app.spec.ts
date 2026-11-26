import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
  });

  it('muestra el título y añade tareas a través del formulario', async () => {
    const fixture = TestBed.createComponent(App);
    const el: HTMLElement = fixture.nativeElement;
    await fixture.whenStable();
    expect(el.querySelector('h1')?.textContent).toContain('Lista de tareas CI/CD');

    const input = el.querySelector('input')!;
    input.value = 'Probar la app';
    input.dispatchEvent(new Event('input'));
    el.querySelector('form')!.dispatchEvent(new Event('submit'));
    await fixture.whenStable();

    expect(el.querySelectorAll('li').length).toBe(1);
    expect(el.querySelector('.pending')?.textContent).toContain('1');

    (el.querySelector('.title') as HTMLElement).click();
    await fixture.whenStable();
    expect(el.querySelector('.pending')?.textContent).toContain('0');

    (el.querySelector('.remove') as HTMLElement).click();
    await fixture.whenStable();
    expect(el.querySelector('.empty')).toBeTruthy();
  });
});
