import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalShortcutComponent } from './modal-shortcut.component';


describe('ModalCancelReasonsComponent', () => {
  let component: ModalShortcutComponent;
  let fixture: ComponentFixture<ModalShortcutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalShortcutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalShortcutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
