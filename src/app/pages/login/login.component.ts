import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  opacity: string = 'opacity: 0.5;';
  constructor() { 
    fromEvent(document, 'scroll').subscribe( () => {
      this.opacity = (document.documentElement.scrollTop > 720)
          ? 'opacity: 1;'
          : 'opacity: 0.5;'
    });
  }

  ngOnInit(): void {
  }

}
