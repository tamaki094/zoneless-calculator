import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'calculator',
  imports: [],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorComponent { }
