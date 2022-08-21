import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';


@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent {
  opacity: string = 'opacity: 0.5;'

  constructor() {
    fromEvent(document, 'scroll').subscribe( () => {
      this.opacity = (document.documentElement.scrollTop > 720)
          ? 'opacity: 1;'
          : 'opacity: 0.5;'
    });
  }



}
