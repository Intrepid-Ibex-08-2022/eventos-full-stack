import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { UsersResponse } from '../../interface/users';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() position = 'position: fixed;'
  token: string | null = '';
  user?: UsersResponse;
  username?: string;
  isAdmin: Boolean = false;
  isUser: Boolean = false;

  constructor(
    private route: Router,
    private activetedRoute: ActivatedRoute,
    private authServices: AuthService
  ){}

  async ngOnInit(): Promise<void> {
    this.token = localStorage.getItem('token');

    if(this.token){
      (await this.authServices.getUserByToken(this.token)).subscribe( resp =>{
        if(resp){
          this.username = resp.user.username
          this.checkRol(resp.user.rol);
          this.loginValido()
        }
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

  checkRol(rol: String ){
    if(rol == 'sa' || rol=='admin'){
      this.isAdmin = true;
      this.isUser = false;
    }else if(rol == 'user'){
      this.isUser = true;
      this.isAdmin = false;
    }else{
      this.isUser = false;
      this.isAdmin = false;
    }
  }
}
