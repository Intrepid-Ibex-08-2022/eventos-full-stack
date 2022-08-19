import { Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  @Input() events : any = [];

  constructor(private router : Router) { }

  ngOnInit(): void {
  }


goDetails() {
  this.router.navigateByUrl("/team");
}
}
