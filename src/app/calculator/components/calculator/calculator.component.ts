import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Host,
  inject,
  viewChildren,
} from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { CalculatorService } from '@/calculator/services/calculator.service';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)',
  },
})
export class CalculatorComponent {
  private calculatorService = inject(CalculatorService);
  public calculatorButtons = viewChildren(CalculatorButtonComponent);

  public resultText = computed(() => this.calculatorService.resultText());
  public subResultText = computed(() => this.calculatorService.subResultText());
  public lastOperator = computed(() => this.calculatorService.lastOperator());

  handleClick(key: string): void {
    this.calculatorService.constructNumber(key);
  }

  /* @HostListener("document:keyup", ["$event"]) */
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
      '*': 'x',
      '/': '÷'

    };
    const keyValue = keyEquivalents[event.key] ?? event.key;

    this.handleClick(keyValue);
    this.calculatorButtons().forEach(button => {
      button.keyboardPressedStyle(event.key);
    })
    console.log(event);
  }
}
