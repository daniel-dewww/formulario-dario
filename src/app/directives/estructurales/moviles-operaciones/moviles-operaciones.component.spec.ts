import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovilesOperacionesComponent } from './moviles-operaciones.component';

describe('MovilesOperacionesComponent', () => {
  let component: MovilesOperacionesComponent;
  let fixture: ComponentFixture<MovilesOperacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovilesOperacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovilesOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
