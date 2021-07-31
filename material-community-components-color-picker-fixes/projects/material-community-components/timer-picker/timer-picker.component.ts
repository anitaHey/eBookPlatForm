import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Observable, BehaviorSubject } from 'rxjs';
import {
  MccTimerPickerTimeType,
  MccTimerPickerFormat,
  MccTimerPickerHour,
  MccTimerPicker24Hour,
  MccTimerPickerMinute,
  MccTimerPickerPeriod,
  HOURS,
  HOURS24,
  MINUTES,
  MccTimerPickerTimeValue
} from './timer-picker';

@Component({
  selector: 'mcc-timer-picker',
  templateUrl: './timer-picker.component.html',
  styleUrls: ['./timer-picker.component.scss'],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MccTimerPickerComponent {
  /**
   * Receive selected _hour after confirm
   */
  private _selectedHour: MccTimerPickerHour | MccTimerPicker24Hour = '12';

  /**
   * Receive selected _minute after confirm
   */
  private _selectedMinute: MccTimerPickerMinute = '00';

  /**
   * Receive selected _period after confirm
   */
  private _selectedPeriod: MccTimerPickerPeriod = 'am';

  /**
   * Current value (hour/minute) to create the clock
   */
  get clock$(): Observable<MccTimerPickerTimeValue[]> {
    return this._clock.asObservable();
  }
  private _clock: BehaviorSubject<MccTimerPickerTimeValue[]> = new BehaviorSubject(HOURS);

  /**
   * Return hours in 24h format
   */
  get hours24(): MccTimerPicker24Hour[] {
    return HOURS24;
  }

  /**
   * Type there is in focus (hour/minute)
   */
  get focus(): MccTimerPickerTimeType {
    return this._focus;
  }
  set focus(value: MccTimerPickerTimeType) {
    if (value !== this._focus) {
      this._focus = value;
      this._clock.next(this._focus === 'hour' ? HOURS : MINUTES);
    }
  }
  private _focus: MccTimerPickerTimeType = 'hour';

  /**
   * State of the overlay
   */
  get isOpen(): boolean {
    return this._isOpen;
  }
  set isOpen(value: boolean) {
    this._isOpen = coerceBooleanProperty(value);
    this.changeDetectorRef.detectChanges();
  }
  private _isOpen: boolean;

  /**
   * Return temporary selected hour (const HOURS)
   */
  get hour(): MccTimerPickerHour | MccTimerPicker24Hour {
    return this._hour;
  }
  private _hour: MccTimerPickerHour | MccTimerPicker24Hour = '12';

  /**
   * Checks if hour has only one digit
   */
  get needsSpacer(): boolean {
    return parseInt(this._hour, 10) < 10;
  }

  /**
   * Return temporary selected minute (const MINUTES)
   */
  get minute(): MccTimerPickerMinute {
    return this._minute;
  }
  private _minute: MccTimerPickerMinute = '00';

  /**
   * Return temporary selected period (am/pm)
   */
  get period(): MccTimerPickerPeriod {
    return this._period;
  }
  private _period: MccTimerPickerPeriod = 'am';

  /**
   * Hide Confirm and Cancel buttons
   */
  @Input()
  set hideButtons(value: boolean) {
    this._hideButtons = coerceBooleanProperty(value);
  }
  get hideButtons(): boolean {
    return this._hideButtons;
  }
  private _hideButtons: boolean = false;
  static ngAcceptInputType_hideButtons: boolean | string;

  /**
   * Format of the hour to be emited on confirm
   */
  @Input('mccTimerPickerFormat') format: MccTimerPickerFormat = '12';

  @Input('mccTimerPickerMin') min: string = '00:00 am';

  @Input('mccTimerPickerMax') max: string = '12:00 pm';

  /**
   * Change btnCancel label
   */
  @Input() btnCancel: string = 'Cancel';

  /**
   * Change btnConfirm label
   */
  @Input() btnConfirm: string = 'Confirm';

  /**
   * Event emited when confirm button is pressed.
   * If buttons are hidden, the event is emited when value is changed
   */
  @Output() selected: EventEmitter<string> = new EventEmitter();

  /**
   * Origin reference of connected timer picker
   */
  trigger: CdkOverlayOrigin;

  /**
   * Set to true when timer picker have been connected with another component
   */
  connected: boolean = false;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  /**
   * Return timer option class to create line between the middle of the clock and
   * the option
   */
  getSelectedClass(): string {
    let name = 'selected-index-';
    if (this.focus === 'hour') {
      // convert to number
      const hour = parseInt(this.hour, 10);

      // check if hour is mid night or afternoon in 24h format
      if (hour === 0 || hour > 12) {
        name += HOURS24.findIndex(h => h === this.hour);
        name += ' hour-format-24';
      } else {
        name += HOURS.findIndex(h => h === this.hour);
      }
    } else {
      name += MINUTES.findIndex(m => m === this.minute);
    }

    return name;
  }

  /**
   * Select option from the clock.
   */
  select(value: MccTimerPickerTimeValue) {
    if (this.focus === 'hour') {
      this._hour = <MccTimerPickerHour | MccTimerPicker24Hour>value;
      this.focus = 'min';
    } else {
      this._minute = <MccTimerPickerMinute>value;
      // if buttons are hidden, emit new event when value is changed
      if (this._hideButtons) {
        this.confirmSelectedTime();
      }
    }
  }

  /**
   * Returns array containing time, hour and period fragments from time string
   */
  parseTimeInput(time: string): [number, number, string] {
    const parsed = time.split(/\s|:/).map((fragment, index) => {
      return index === 2 ? fragment : parseInt(fragment, 10);
    });

    if (parsed.length === 2) {
      // assume we are using 24 hour time format
      const hours = parsed[0] as number;
      if (hours > 11) {
        parsed[0] = hours - 12;
        parsed.push('pm');
      } else {
        parsed.push('am');
      }
    }

    return parsed as [number, number, string];
  }

  /**
   * Returns true if option value is not valid
   */
  isOptionDisabled(value: MccTimerPickerTimeValue): boolean {
    const [minHour, minMinutes, minPeriod] = this.parseTimeInput(this.min);
    const [maxHour, maxMinutes, maxPeriod] = this.parseTimeInput(this.max);

    const optionValue = parseInt(value, 10);
    const selectedHour = parseInt(this._hour, 10);
    const selectedPeriod = this._period;

    if (this.focus === 'hour') {
      if (optionValue < minHour && selectedPeriod === minPeriod) {
        return true;
      } else if (optionValue > maxHour && selectedPeriod === maxPeriod) {
        return true;
      }
    } else {
      if (selectedHour === minHour && selectedPeriod === minPeriod && optionValue < minMinutes) {
        return true;
      } else if (selectedHour === maxHour && selectedPeriod === maxPeriod && optionValue > maxMinutes) {
        return true;
      }
    }

    return false;
  }

  /**
   * Change period of the clock
   */
  changePeriod(period: MccTimerPickerPeriod) {
    this._period = period;
    // if buttons are hidden, emit new event when value is changed
  }

  /**
   * Update selected color, close the panel and notify the user
   */
  backdropClick() {
    if (this._hideButtons) {
      this.confirmSelectedTime();
    } else {
      this.cancelSelection();
    }
  }

  /**
   * Change values to last confirm select time
   */
  cancelSelection() {
    this._hour = this._selectedHour;
    this._minute = this._selectedMinute;
    this._period = this._selectedPeriod;
    this.isOpen = false;
  }

  /**
   * Set new values of time and emit new event with the formatted timer
   */
  confirmSelectedTime() {
    this._selectedHour = this.hour;
    this._selectedMinute = this.minute;
    this._selectedPeriod = this.period;

    // format string to emit selected time
    let formated: string;
    if (this.format === '12') {
      formated = `${this.hour}:${this.minute} ${this.period}`;
    } else {
      let hour: string = this.hour;
      if (this.period === 'pm') {
        hour = `${parseInt(hour, 10) + 12}`;
      }

      formated = `${hour}:${this.minute}`;
    }

    this.selected.emit(formated);

    this.isOpen = false;
  }
}
