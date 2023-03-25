import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {
  position = 'position: relative;';
  token: string | null | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
