import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventsTableDirective } from './events-table.directive';
import { By } from '@angular/platform-browser';


@Component({
  template: `
  <div nexusEventsTable >Something Yellow</div>`
})
class TestComponent { }

describe('EventsTableDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let des: DebugElement[];  // the three elements w/ the directive
  let bareH2: DebugElement; // the <h2> w/o the directive

  it('should create an instance', () => {
    fixture = TestBed.configureTestingModule({
      declarations: [EventsTableDirective, TestComponent]
    }).createComponent(TestComponent);

    fixture.detectChanges();
    // all elements with an attached EventsTableDirective
    des = fixture.debugElement.queryAll(By.directive(EventsTableDirective));

  });
});


