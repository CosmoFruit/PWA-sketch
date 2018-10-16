import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingSnippetComponent } from './meeting-snippet.component';

describe('MeetingSnippetComponent', () => {
  let component: MeetingSnippetComponent;
  let fixture: ComponentFixture<MeetingSnippetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingSnippetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
