import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {

let fixture : ComponentFixture<App>;
let compiled: HTMLElement;
let app : App;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    compiled = fixture.nativeElement as HTMLElement;
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it("should be 3", () =>{
    const num1 = 1;
    const num2 = 2;

    const result = num1 + num2;

    if(result !== 3){
      throw new Error('No es 3');
    }
  });

  it("should be 22", () =>{
    const num1 = 10;
    const num2 = 12;

    const result = num1 + num2;

    expect(result).toBe(22);
  });

  it('should render title', () => {
    fixture.detectChanges();
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, zoneless-calculator');
  });

  it('should render router-outler', () => {
    expect(compiled.querySelector('router-outlet')).not.toBeNull()
  });

  it('should render router-outler wrapped tith css clasess', () => {
    const divlement = compiled.querySelector('div');
    console.log(divlement);
    const mustHaveClasses = 'min-w-screen min-h-screen bg-slate-700 flex items-center justify-center px-5 py-5'.split(' ');
    // expect(divlement?.classList.value).toBe(cssClasses);

    expect(divlement).not.toBeNull();

    // divlement?.classList.forEach( className => {
    //   expect(mustHaveClasses).toContain(className);
    // });

    const divClasses = divlement?.classList.value.split(' ');

    mustHaveClasses.forEach(className =>{
      expect(divClasses).toContain(className);
    });

  });

  it("should contain the ' buy me a beer' link", () =>{
    const anchorElement = compiled.querySelector('a');

    expect(anchorElement).not.toBeNull();
    expect(anchorElement?.title).toBe('Buy me a beer');
    console.log(anchorElement?.href  + " es igual que " + anchorElement?.getAttribute('href'));
  });

});
