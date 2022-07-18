import { Component, DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { NoTextDirective } from './no-text.directive';

@Component({
  template: `
  <div nexusNoText >Something Yellow</div>`
})
class TestComponent { }

describe('EventsTableDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let des: DebugElement[];  // the three elements w/ the directive

  it('should create an instance', () => {
    fixture = TestBed.configureTestingModule({
      declarations: [NoTextDirective, TestComponent]
    }).createComponent(TestComponent);

    fixture.detectChanges();
    // all elements with an attached EventsTableDirective
    des = fixture.debugElement.queryAll(By.directive(NoTextDirective));

  });
});