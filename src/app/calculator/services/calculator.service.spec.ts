import { TestBed } from "@angular/core/testing";
import { provideZonelessChangeDetection } from "@angular/core";
import { CalculatorService } from "./calculator-service";

describe('CalculatorService', ()=>{
  let service : CalculatorService;

  // // Para cuando el proyectpo una Zone.js en vez de zoneless
  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     imports: [CalculatorService],
  //     providers: [provideZonelessChangeDetection()]
  //   }).compileComponents();
  // });

  // Para cuando el proyecto es Zoneless
  beforeEach(() => {
    service = new CalculatorService();
  });

  beforeAll(() => {}); //antes de todas las pruebas
  afterAll(() => {}); //despues de todas las pruebas
  afterEach(() => {}); // despues de cada prueba

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it( ' should be created with default values', () =>{
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it(' should set resultText to "0" when C is pressed', () =>{
    service.resultText.set('123');
    service.subResultText.set('456');
    service.lastOperator.set('*');

    service.constructNumber('C');

    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it(' should update resultText with number input', () =>{
    service.constructNumber('1');
    expect(service.resultText()).toBe('1');

    service.constructNumber('2');
    expect(service.resultText()).toBe('12');
  });

  it(' should handle operators correclty', () =>{
    service.constructNumber('1');
    service.constructNumber('-');
    expect(service.lastOperator()).toBe('-');
    expect(service.subResultText()).toBe('1');
    expect(service.resultText()).toBe('0');
  });

  it(' should calculate result correctly for addition', () =>{
    service.constructNumber('1');
    service.constructNumber('+');
    service.constructNumber('2');
    service.constructNumber('=');
    expect(service.resultText()).toBe('3');
  });

  it(' should calculate result correctly for substraction', () =>{
    service.constructNumber('4');
    service.constructNumber('-');
    service.constructNumber('2');
    service.constructNumber('=');
    expect(service.resultText()).toBe('2');
  });

  it(' should calculate result correctly for divition', () =>{
    service.constructNumber('1');
    service.constructNumber('0');
    service.constructNumber('/');
    service.constructNumber('2');
    service.constructNumber('=');
    expect(service.resultText()).toBe('5');
  });


});
