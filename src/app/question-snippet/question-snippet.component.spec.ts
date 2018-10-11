import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionSnippetComponent } from './question-snippet.component';

describe('QuestionSnippetComponent', () => {
  let component: QuestionSnippetComponent;
  let fixture: ComponentFixture<QuestionSnippetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionSnippetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
