import { Component, Input, Output, EventEmitter, Injectable, forwardRef, OnDestroy } from '@angular/core';
import { NgbDateStruct, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;


//#region  idioma
const I18N_VALUES: { [unit: string]: any } = {
  'fr': {
    weekdays: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'],
    weekdaysLabel: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'],
    months: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Déc'],
  },
  'en': {
    weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    weekdaysLabel: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  'es': {
    weekdays: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
    weekdaysLabel: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
    months: ['Ene', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  },
  // other languages you would support
};

// Define a service holding the language. You probably already have one if your app is i18ned. Or you could also
// use the Angular LOCALE_ID value
@Injectable()
export class I18n implements OnDestroy{
  
  //suscription
  traslateSuscription: Subscription;

  language = this.translate.currentLang;
  constructor( public translate: TranslateService, ) {    
    this.language = this.translate.currentLang;
    this.traslateSuscription = this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
      this.language = event.lang;
    });
  }

  ngOnDestroy(){
    this.traslateSuscription.unsubscribe();
  }
}


// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  constructor(private _i18n: I18n) {
    super();
  }
  getWeekdayLabel(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdaysLabel[weekday - 1];
  }
  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}

//#endregion

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MultiDatePicker),
  multi: true
};

@Component({
  selector: 'ngb-multi-date-picker',
  templateUrl: 'multi-date-picker.html',
  styleUrls: ['multi-date-picker.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }],
})

@Injectable()
export class MultiDatePicker implements ControlValueAccessor {
  //The internal data model
  _datesSelected: NgbDateStruct[] = [];

  //#region ngModel
  //Placeholders for the callbacks which are later provided
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  //get accessor
  get value(): NgbDateStruct[] {
    return this._datesSelected;
  };

  //set accessor including call the onchange callback
  set value(v: NgbDateStruct[]) {
    if (v !== this._datesSelected) {
      this._datesSelected = v;
      this.onChangeCallback(v);
    }
  }

  //Set touched on blur
  onBlur() {
    this.onTouchedCallback();
  }

  //From ControlValueAccessor interface
  writeValue(value: NgbDateStruct[]) {
    if (value !== this._datesSelected) {
      this._datesSelected = value;
    }
  }
  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }

  //#endregion ngModel
  
  hoveredDate!: NgbDateStruct;

  fromDate!: NgbDateStruct;
  toDate!: NgbDateStruct;

  minDate: NgbDateStruct = this.dtFecha(new Date());

  @Input()
  set datesSelected(value: NgbDateStruct[]) {
    this._datesSelected = value;
  }
  get datesSelected(): NgbDateStruct[] {
    return this._datesSelected ? this._datesSelected : [];
  }

  @Output() datesSelectedChange = new EventEmitter<NgbDateStruct[]>();
  @Output() addNewDateSelected = new EventEmitter<NgbDateStruct>();
  @Output() deleteNewDateSelected = new EventEmitter<NgbDateStruct>();
  
  constructor() {
  }

  onDateSelection(event: any, date: NgbDateStruct) {
    if ((date.day >= this.minDate.day && date.month == this.minDate.month && date.year == this.minDate.year) || (date.month > this.minDate.month) || (date.year > this.minDate.year)) {
      event.target.parentElement.blur();  //make that not appear the outline
      if (!this.fromDate && !this.toDate) {
        if (event.ctrlKey == true)  //If is CrtlKey pressed
          this.fromDate = date;
        else
          this.addDate(date);
        this.datesSelectedChange.emit(this.datesSelected);

      } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
        this.toDate = date;
        this.addRangeDate(this.fromDate, this.toDate);
        this.fromDate == null;
        this.toDate == null;
      } else {
        this.toDate == null;
        this.fromDate = date;
      }
    }

  }

  addDate(date: NgbDateStruct) {
    let index = this.datesSelected.findIndex(f => f.day == date.day && f.month == date.month && f.year == date.year);
    if (index >= 0) {//If exist, remove the date
      this.deleteNewDateSelected.emit(date);
      this.datesSelected.splice(index, 1);
    } else {
      //a simple push
      this.addNewDateSelected.emit(date);
      this.datesSelected.push(date);
    }
  }

  addRangeDate(fromDate: NgbDateStruct, toDate: NgbDateStruct) {
    //We get the getTime() of the dates from and to
    let from = new Date(fromDate.year + "-" + fromDate.month + "-" + fromDate.day).getTime();
    let to = new Date(toDate.year + "-" + toDate.month + "-" + toDate.day).getTime();
    for (let time = from; time <= to; time += (24 * 60 * 60 * 1000)) //add one day
    {
      let date = new Date(time);
      //javascript getMonth give 0 to January, 1, to February...
      this.addDate({ year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() });
    }
    this.datesSelectedChange.emit(this.datesSelected);
  }
  //return true if is selected
  isDateSelected(date: NgbDateStruct) {
    return (this.datesSelected.findIndex(f => f.day == date.day && f.month == date.month && f.year == date.year) >= 0);
  }

  isHovered = (date: any) => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = (date: any) => after(date, this.fromDate!) && before(date, this.toDate!);
  isFrom = (date: any) => equals(date, this.fromDate!);
  isTo = (date: any) => equals(date, this.toDate!);

  dtFecha(date: any): NgbDateStruct {
    let day = date.getDate();

    const mes = (date.getMonth() + 1)
    let month = mes;

    const year = date.getFullYear();

    return { year: date.getFullYear(), month: (date.getMonth() + 1), day: date.getDate() };
  }

  public clearData() {
    this.datesSelected = []
  }
}
