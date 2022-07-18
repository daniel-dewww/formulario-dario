import { inject, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { MilisecondsTimePipe } from './miliseconds-time.pipe';


describe('MilisecondsTimePipe', () => {
  // beforeEach(() => {
  //   TestBed
  //     .configureTestingModule({
  //       imports: [
  //         BrowserModule
  //       ]
  //     });
  // });

  let pipe: MilisecondsTimePipe;
  let traslateService: TranslateService

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [TranslateService]
    });
    traslateService = TestBed.get(TranslateService);
    pipe = new MilisecondsTimePipe(traslateService);
  });


  it('create an instance', inject([TranslateService], (traslateService: TranslateService) => {
    let pipe = new MilisecondsTimePipe(traslateService);
    expect(pipe).toBeTruthy();
  }));
});
