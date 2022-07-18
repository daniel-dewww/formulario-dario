import { inject, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { TranslateCodePipe } from './translate-code.pipe';

describe('TranslateCodePipe', () => {
  // beforeEach(() => {
  //   TestBed
  //     .configureTestingModule({
  //       imports: [
  //         BrowserModule
  //       ]
  //     });
  // });

  let pipe: TranslateCodePipe;
  let traslateService: TranslateService

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [TranslateService]
    });
    traslateService = TestBed.get(TranslateService);
    pipe = new TranslateCodePipe(traslateService);
  });


  it('create an instance', inject([TranslateService], (traslateService: TranslateService) => {
    let pipe = new TranslateCodePipe(traslateService);
    expect(pipe).toBeTruthy();
  }));
});
