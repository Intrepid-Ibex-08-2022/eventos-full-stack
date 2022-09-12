import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() position = 'position: fixed;'
  token: string | null = '';
  email: any;
  username: string | undefined;

  constructor(
    private route: Router,
    private activetedRoute: ActivatedRoute,
    private authServices: AuthService
  ){}

  async ngOnInit(): Promise<void> {
    this.token = localStorage.getItem('token');

    if(this.token){
      this.authServices.getUserByToken(this.token).subscribe( email =>{
        if(email !== undefined){
          this.email = email
          this.authServices.getUserByEmail(this.email).subscribe( username =>{
            if(username){
              this.username = username
            }
          })

        }
        return;
      })
    }


  }

  loginValido(){
    if(this.username){
      return true
    }else{
      return false
    }
  }

  navigate(ruta: string){
    this.route.navigateByUrl(`/${ruta}`)
  }

  logOut(){
    localStorage.removeItem('token');
    if(this.activetedRoute.snapshot.url.join('') == 'eventadd'){
      this.route.navigateByUrl('/');
    }
    this.username = undefined;

  }
}
