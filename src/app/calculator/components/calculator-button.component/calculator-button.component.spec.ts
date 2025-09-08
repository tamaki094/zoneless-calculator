import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import  { CalculatorButtonComponent } from './calculator-button.component';


/*
*Esto es un componente de prueba (host) que se usa para verificar si el contenido proyectado (lo que va dentro del <calculator-button>...</calculator-button>) se muestra correctamente.
**standalone: true: indica que este componente no necesita un módulo para funcionar.
**imports: [CalculatorButtonComponent]: importa el componente que se va a probar.
**template: define el HTML que se va a renderizar en la prueba.
*/
@Component({
  standalone: true,
  imports: [CalculatorButtonComponent],
  template: `
  <calculator-button>
    <span class="projected-content underline">Test Content</span>
  </calculator-button>`
})
class TestHostComponent {

}

describe('CalculatorButtonComponent', () => {

let fixture : ComponentFixture<CalculatorButtonComponent>;
let compiled: HTMLElement;
let component : CalculatorButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorButtonComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorButtonComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the CalculatorButtonComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should apply w-1/4 doubleSize is false', () => {
    const hostClasses: string[] = compiled.classList.value.split(' ');
    expect(hostClasses).toContain('w-1/4');
    expect(component.isDoubleSize()).toBeFalse();
  });

  it('should apply w-2/4 doubleSize is true', () => {
    fixture.componentRef.setInput('isDoubleSize', true);
    fixture.detectChanges();
    const hostClasses: string[] = compiled.classList.value.split(' ');
    expect(hostClasses).toContain('w-2/4');
    expect(component.isDoubleSize()).toBeTruthy();
  });

  it('should emit onclick when handleclick is called', () => {
    spyOn(component.onClick, 'emit');
    component.handleClick();
    expect(component.onClick.emit).toHaveBeenCalled();
  });

  it('should set isPressed to true and then false when KeyBoardPressedStyle is called with a matching key', (done) => {
    component.contentValue()!.nativeElement.innerText = '1';
    component.keyboardPressedStyle('1');

    expect(component.isPressed()).toBeTrue();

    setTimeout(() => {
      expect(component.isPressed()).toBeFalse();
      done();
    }, 101);
  });

    it('should set isPressed to true and then false when KeyBoardPressedStyle is called with a matching key', (done) => {
      component.contentValue()!.nativeElement.innerText = '1';
      component.keyboardPressedStyle('1');

      expect(component.isPressed()).toBeTrue();

      setTimeout(() => {
        expect(component.isPressed()).toBeFalse();
        done();
      }, 101);
  });

  it('shpuld not set isPressed to true if key is not matching', () => {
    component.contentValue()!.nativeElement.innerText = '1';
    component.keyboardPressedStyle('2');
    expect(component.isPressed()).toBeFalse();
  });

  it('should display projected content', () => {
    const testHostFixture = TestBed.createComponent(TestHostComponent);
    const compiled = testHostFixture.nativeElement as HTMLDivElement;
    const projectedContent = compiled.querySelector('.projected-content');

    expect(projectedContent).not.toBeNull();
    expect(projectedContent?.classList.contains('underline')).toBeTrue();
  });

});
