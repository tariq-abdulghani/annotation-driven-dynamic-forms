import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SimpleDatePickerComponent } from '../simple-date-picker.component';

@Directive({
  selector: '[simpleDatePicker]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SimpleDatePickerDirective),
      multi: true,
    },
  ],
})
export class SimpleDatePickerDirective
  implements OnChanges, ControlValueAccessor
{
  @Input('config') config: any;
  @Input('showIcon') showIcon = false;
  isOpen = false;
  readonly svg = `<svg fill="none" height="16" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><rect height="18" rx="2" ry="2" width="18" x="3" y="4"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`;
  datePickerComponentRef!: ComponentRef<SimpleDatePickerComponent>;
  constructor(
    public viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    if (this.showIcon) {
      this.setIcon();
    }
    this.el.nativeElement.setAttribute('autocomplete', 'off');
  }

  writeValue(value: any): void {
    this.renderer.setProperty(this.el.nativeElement, 'value', value);
  }

  registerOnChange(fn: (_: any) => void): void {
    // console.log('register on chnage');
    this.onValueChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.el.nativeElement, 'disabled', isDisabled);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
    if (changes?.showIcon?.currentValue) {
      this.setIcon();
    }
  }

  @HostListener('click', ['$event']) onClick(event: any) {
    // console.log('click', this.isOpen, event.target == this.el.nativeElement);
    if (event.target == this.el.nativeElement) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (!this.isOpen) {
      this.loadDatePicker();
      this.isOpen = true;
    } else {
      this.viewContainerRef.remove();
      this.isOpen = false;
    }

    // this.el.nativeElement.value = new Date().toLocaleString('ar-EG');
    // this.el.nativeElement.target.vaue = 'yyyy / mm /dd'
  }

  @HostListener('blur') onBlur() {
    if (Date.parse(this.el.nativeElement.value) != NaN) {
      try {
        const val = new Date(Date.parse(this.el.nativeElement.value))
          ?.toISOString()
          .split('T')[0];
        console.log(val);
        this.onValueChange(val);
        this.writeValue(val);
      } catch (e) {
        console.log(e);
        this.writeValue(null);
        this.onValueChange(null);
      }
    } else {
      this.writeValue(null);
      this.onValueChange(null);
    }
  }

  @HostListener('keyup') onKeyUp() {}

  loadDatePicker() {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(
        SimpleDatePickerComponent
      );
    this.viewContainerRef.clear();

    this.datePickerComponentRef =
      this.viewContainerRef.createComponent<SimpleDatePickerComponent>(
        componentFactory
      );
    this.datePickerComponentRef.instance.config = this.config;
    this.datePickerComponentRef.instance.clickOutEvent.subscribe(
      (event: any) => {
        this.viewContainerRef.remove();
        this.isOpen = false;
      }
    );

    this.datePickerComponentRef.instance.dateSelectedEvent.subscribe(
      (e: any) => {
        console.log('selected', e);
        this.viewContainerRef.remove();
        this.isOpen = false;
      }
    );
  }

  setIcon() {
    this.el.nativeElement.style.backgroundImage = `url(data:image/svg+xml;base64,${window.btoa(
      this.svg
    )})`;
    this.el.nativeElement.style.paddingLeft = '25px';
    this.el.nativeElement.style.backgroundRepeat = 'no-repeat';
    this.el.nativeElement.style.backgroundPositionY = 'center';
    //   this.el.nativeElement.style.backgroundPositionX = 'right';
    //   this.el.nativeElement.style.direction = 'rtl';
  }

  onValueChange(nVal: any) {}

  onTouched() {}
}
