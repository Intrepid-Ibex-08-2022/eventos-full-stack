import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/interface/users';
import { AuthService } from 'src/app/services/auth/auth.service';

type User = {
  email? : string,
  pswd? : string,
  id? :string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  position = 'position: relative;';
  user = {
    email : "fsswed",
    psswd : "sdfsdf"
  }
  array : any = [];
  userFiltered : User = {
    email : "",
    pswd : ""
  };

  constructor(
    private auth : AuthService,
    private router: Router
  ) {
    
   }

  ngOnInit(): void {
      
      
  }

 checkUser(){
        this.auth.getUser().subscribe(
          users => {
            this.array = users;
            this.userFiltered = this.array.filter( (u: { email: string; }) => u.email === this.user.email )[0] || this.userFiltered;
            if(this.userFiltered.email === this.user.email && this.userFiltered.pswd === this.user.psswd){
              localStorage.setItem("login", "true")
              this.router.navigateByUrl("")
            } else {
              localStorage.setItem("login", "false")
            } 
          }
        )
 }
}
