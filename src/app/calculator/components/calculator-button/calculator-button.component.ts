import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
  output,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-calculator-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button [class.is-command]="isCommand()" (click)="handleClick()">
      <ng-content />
    </button>
  `,
  styleUrl: './calculator-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400',
  },
})
export class CalculatorButtonComponent {

  public onClick = output<string>();
  public contentValue = viewChild('button');
  public isCommand = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });

  public isDoubleSize = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });
  @HostBinding('class.w-2/4') get commandStyle() {
    return this.isDoubleSize();
  }

  public handleClick(): void {
    //this.onClick.emit(this.contentValue());

  }
}
