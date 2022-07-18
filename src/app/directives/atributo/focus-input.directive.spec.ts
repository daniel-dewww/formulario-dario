import { Component, DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { FocusInput } from "./focus-input.directive";

@Component({
  template: `
  <div nexusFocus [flagFocus]='true' >Something Yellow</div>`
})
class TestComponent { }

describe('EventsTableDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let des: DebugElement[];  // the three elements w/ the directive

  it('should create an instance', () => {
    fixture = TestBed.configureTestingModule({
      declarations: [FocusInput, TestComponent]
    }).createComponent(TestComponent);

    fixture.detectChanges();
    // all elements with an attached EventsTableDirective
    des = fixture.debugElement.queryAll(By.directive(FocusInput));

  });
});
