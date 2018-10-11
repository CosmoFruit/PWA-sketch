import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-snippet',
  templateUrl: './question-snippet.component.html',
  styleUrls: ['./question-snippet.component.scss']
})
export class QuestionSnippetComponent implements OnInit {

  constructor() { }

  definition = {
    1: 'Who is the lead singer for',
    2: 'the rock band Guns N’ Roses?'
  };
  answer = {
    1: 'Axl',
    2: 'Rose'
  };
  credit = 'Thomas';
  hint = 'His first name starts with Axl';
  isFavorite = false;

  userAnswer = '';
  isCorrect = false;

  expand = false;

  ngOnInit() {

  }

}
