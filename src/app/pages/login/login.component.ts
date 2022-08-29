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
  user = {
    email : "",
    psswd : ""
  }
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
        console.log(users);
        console.log(this.user.psswd, this.user.email);
        
        this.array = users;
        this.array.filter( (user: { email: string; pswd: any; }) =>  
        user.email === this.user.email && user.pswd === this.user.psswd ?
        (localStorage.setItem("login", "true"), 
        this.router.navigateByUrl("") ) : 
        localStorage.setItem("login", "false"));
      });
  }

}