import { TestBed }             from '@angular/core/testing';
import { MeetingAddPageGuard } from './meeting-add-page.guard';


describe('MeetingAddPage.GuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MeetingAddPageGuard = TestBed.get(MeetingAddPageGuard);
    expect(service).toBeTruthy();
  });
});
