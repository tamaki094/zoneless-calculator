import { CalculatorComponent } from '@/calculator/components/calculator/calculator.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-calculator-view',
  imports: [
    CalculatorComponent
  ],
  templateUrl: './calculator-view.component.html',
  styleUrl: './calculator-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CalculatorViewComponent { }
