import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';
import { CalculatorService } from '@/calculator/services/calculator-service';
import { By } from '@angular/platform-browser';


class MockCalculatorService{
  public resultText = jasmine.createSpy('resultText').and.returnValue('100.00');
  public subResultText = jasmine.createSpy('subResultText').and.returnValue('0');
  public lastOperator = jasmine.createSpy('lastOperator').and.returnValue('+');

  public constructNumber = jasmine.createSpy('constructNumber');
}

describe('CalculatorComponent', () => {

let fixture : ComponentFixture<CalculatorComponent>;
let compiled: HTMLElement;
let component : CalculatorComponent;

let mockCalculatorService : MockCalculatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [
        {
          provide: CalculatorService,
          useClass: MockCalculatorService
        },
        provideZonelessChangeDetection()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    mockCalculatorService = TestBed.inject(CalculatorService) as unknown as MockCalculatorService;
  });

  it('should create the CalculatorComponent', () => {
    console.log('should create the CalculatorComponent');
    console.log(compiled);
    expect(component).toBeTruthy();
  });

  it('should have 19 calculator-button components', () => {
    expect(component.calculatorButtons).toBeTruthy();
    expect(component.calculatorButtons().length).toBe(19);
  });

  it('should have 19 calculator-button with content projection', () => {
    const buttons = compiled.querySelectorAll('calculator-button');

    const buttonsByDirective = fixture.debugElement.queryAll(
      By.directive(CalculatorComponent)
    );

    expect(buttons.length).toBe(19);
    expect(buttons[0].textContent?.trim()).toBe('C');

  });

  it('should handle keyboard events correctly', () => {
    const eventEnter = new KeyboardEvent('keyup', { key: 'Enter' });
    document.dispatchEvent(eventEnter);

    expect(mockCalculatorService.constructNumber).toHaveBeenCalledOnceWith('=');
  });

  it('should display result text correctly', () => {
    mockCalculatorService.resultText.and.returnValue('123');

    fixture.detectChanges();

    expect(component.reusltText()).toBe('123');

    console.log(compiled.querySelector('#sub-result'));
    // expect(compiled.querySelector('#sub-result')?.textContent).toContain('10 -');
  });

});
