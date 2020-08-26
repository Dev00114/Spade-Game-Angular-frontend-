import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {
  pomodoroTime : number = 1200;
  countdown    : any;
  constructor() { }

  ngOnInit(){
    this.display(localStorage.getItem("min"));
  }

  togglePomodoro(){
    this.runtimer(this.pomodoroTime);
  }

  display(seconds){
    const hour        = Math.floor(seconds / 3600);
    const modehour    = seconds % 3600;
    const munutes     = Math.floor(modehour / 60);
    const modeseconds = modehour % 60;
    const displayhour = `${hour < 10 ? '0' : ''}${hour}`;
    const displaymin  = `${munutes < 10 ? '0' : ''}${munutes}`;
    const disseconds  = `${modeseconds < 10 ? '0' : ''}${modeseconds}`;
    const hour_html   = $('#hours').html(displayhour);
    const min_html    = $('#min').html(displaymin);
    const sec_html    = $('#sec').html(disseconds);
  }

  runtimer(seconds){
    clearInterval(this.countdown);
    const now      = Date.now();
    const timeUp   = now + seconds * 1000;
    this.countdown = setInterval(() => {
      const secondsleft = Math.round((timeUp - Date.now()) / 1000);
      if(secondsleft < 0){
        alert("game over!")
      }
      if(secondsleft < 0){
        clearInterval(this.countdown);
        return
      }
      this.display(secondsleft);
    })
  }




}
