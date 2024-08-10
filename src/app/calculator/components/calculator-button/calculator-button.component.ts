import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-calculator-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      #button
      [class.is-command]="isCommand()"
      [class.is-pressed]="isPressed()"
      (click)="handleClick()"
    >
      <ng-content />
    </button>
  `,
  styleUrl: './calculator-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'border-r border-b border-indigo-400',
    '[class.w-2/4]': 'isDoubleSize()',
    '[class.w-1/4]': '!isDoubleSize()',
  },
})
export class CalculatorButtonComponent {
  public onClick = output<string>();
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');
  public isCommand = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });

  public isPressed = signal(false);

  public isDoubleSize = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });
  /*  @HostBinding('class.w-2/4') get commandStyle() {
    return this.isDoubleSize();
  }
 */
  public handleClick(): void {
    if (!this.contentValue()?.nativeElement) return;

    const value = this.contentValue()!.nativeElement.innerText;
    this.onClick.emit(value.trim());
  }
  public keyboardPressedStyle(key: string): void {
    if (!this.contentValue()) return;

    const value = this.contentValue()?.nativeElement.innerText;

    if (value !== key) return;

    this.isPressed.set(true);

    setTimeout(() => {
      this.isPressed.set(false);
    }, 100);
  }
}
