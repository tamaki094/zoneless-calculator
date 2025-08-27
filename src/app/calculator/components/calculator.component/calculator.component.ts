import { Component, HostListener, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button.component/calculator-button.component';

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

  public calculatorButtons = viewChildren(CalculatorButtonComponent)

  onClickButton(key : string){
    console.log({ key })
  }

  // @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event : KeyboardEvent){
    console.log(event, event.key);

    const keyEquivalents : Record<string, string>  = {
      Escape : 'C',
      Clear : 'C',
      '*' : 'X',
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
