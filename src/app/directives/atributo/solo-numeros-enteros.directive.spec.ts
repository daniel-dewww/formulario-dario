import { Component, DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { SoloNumerosEnterosDirective } from './solo-numeros-enteros.directive';

@Component({
  template: `
  <input nexusSoloNumerosEnteros="true" type="text" placeholder="TestComponent">`
})
class TestComponent { }

describe('SoloNumerosEnterosDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let des: DebugElement[];  // the three elements w/ the directive

  it('should create an instance', () => {
    fixture = TestBed.configureTestingModule({
      declarations: [SoloNumerosEnterosDirective, TestComponent]
    }).createComponent(TestComponent);

    fixture.detectChanges();
    // all elements with an attached EventsTableDirective
    des = fixture.debugElement.queryAll(By.directive(SoloNumerosEnterosDirective));

  });
  
});
