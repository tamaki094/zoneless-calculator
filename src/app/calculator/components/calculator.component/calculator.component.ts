import { Component, computed, HostListener, inject, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button.component/calculator-button.component';
import { CalculatorService } from '@/calculator/services/calculator-service';

@Component({
  selector: 'calculator',
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
  host: {
    '(document:keyup)' : 'handleKeyboardEvent($event)'
  },
})
export class CalculatorComponent {

  private calculatorService = inject(CalculatorService);
  public calculatorButtons = viewChildren(CalculatorButtonComponent)

  // get resultText(){
  //   return this.calculatorService.resultText;
  // }

  public reusltText = computed(() => this.calculatorService.resultText());
  public subResultText = computed(() => this.calculatorService.subResultText());
  public lastOperator = computed(() => this.calculatorService.lastOperator());


  onClickButton(key : string){
    console.log({ key })
    this.calculatorService.constructNumber(key);
  }

  // @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event : KeyboardEvent){
    console.log(event, event.key);

    const keyEquivalents : Record<string, string>  = {
      Escape : 'C',
      Clear : 'C',
      X : '*',
      '/' : '÷',
      Enter : '=',
      'c' : 'C'
    };

    const key = event.key;
    const keyValue = keyEquivalents[key] ?? key;

    this.onClickButton(keyValue);

    this.calculatorButtons().forEach(button => {
      button.keyboardPressedStyle(keyValue);
    });

  }
}
