import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

export type ButtonColor =
  | 'primary'
  | 'neutral'
  | 'blue'
  | 'green'
  | 'red'
  | 'yellow'
  | 'orange'
  | 'purple'
  | 'teal'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

export type ButtonAppearance = 'solid' | 'soft' | 'outline' | 'ghost' | 'link';

export type ButtonSize = 'small' | 'medium' | 'large';

export type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  standalone: false,
  styleUrl: './button.css',
  templateUrl: './button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  @Input()
  color: ButtonColor = 'primary';

  @Input()
  appearance: ButtonAppearance = 'solid';

  @Input()
  size: ButtonSize = 'medium';

  @Input()
  type: ButtonType = 'button';

  @Input()
  disabled = false;

  @Input()
  loading = false;

  @Input()
  fullWidth = false;

  @Input()
  iconOnly = false;

  @Input()
  ariaLabel?: string;

  @Input()
  name?: string;

  @Input()
  value?: string;

  @Input()
  loadingLabel = 'Loading';

  @Output()
  readonly buttonClick = new EventEmitter<MouseEvent>();

  get interactionDisabled(): boolean {
    return this.disabled || this.loading;
  }

  handleClick(event: MouseEvent): void {
    if (this.interactionDisabled) {
      event.preventDefault();
      event.stopPropagation();

      return;
    }

    this.buttonClick.emit(event);
  }
}
