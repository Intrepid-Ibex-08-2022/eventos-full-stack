import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  position = 'position: relative;';
  email = "Sincere@april.biz";
  psswd = "1-770-736-8031 x6442";
  array : any = [];

  constructor(
    private auth : AuthService,
    private router: Router
  ) {
    console.log(localStorage.getItem("login"));
    
   }

  ngOnInit(): void {
      
      
  }


  checkUser(){
      this.auth.getUser().subscribe( users => {
        this.array = users;
        this.array.filter( (user: { email: string; phone: any; }) =>  
        user.email === this.email && user.phone === this.psswd 
        ?  localStorage.setItem("login", "true") : localStorage.setItem("login", "false"));
      });
  }

}