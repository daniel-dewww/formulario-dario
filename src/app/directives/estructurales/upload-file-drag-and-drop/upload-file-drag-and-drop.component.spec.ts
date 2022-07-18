import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFileDragAndDropComponent } from './upload-file-drag-and-drop.component';

describe('UploadFileDragAndDropComponent', () => {
  let component: UploadFileDragAndDropComponent;
  let fixture: ComponentFixture<UploadFileDragAndDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadFileDragAndDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFileDragAndDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
