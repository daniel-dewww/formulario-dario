import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconMovilComponent } from './icon-movil.component';

describe('IconMovilComponent', () => {
  let component: IconMovilComponent;
  let fixture: ComponentFixture<IconMovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconMovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
