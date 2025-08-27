import { CalculatorComponent } from '@/calculator/components/calculator.component/calculator.component';
import { Component } from '@angular/core';

@Component({
  selector: 'calculator-view',
  imports: [CalculatorComponent],
  templateUrl: './calculator-view.html',
  styleUrl: './calculator-view.css'
})
export default class CalculatorViewComponent {

}
