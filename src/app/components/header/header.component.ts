import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  @Input() position = 'position: fixed;'
  isloged = "false";

  constructor() {
    this.isloged = localStorage.getItem("login") || "";
   }

   exit(){
    localStorage.setItem("login", "false");
    location.reload();
   }
}
