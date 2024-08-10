import {
  ChangeDetectionStrategy,
  Component,
  Host,
  viewChildren,
} from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';

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

  public calculatorButtons = viewChildren(CalculatorButtonComponent);
  handleClick(key: string): void {
    console.log('key', key);
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
